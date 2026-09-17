import { useState, useMemo } from 'react';
import { predictConsumption } from '../services/predictionApi';
import { ErrorMessage } from '../components/ErrorMessage.jsx';

// Helpers — always use "now" at the moment of submission
const todayISO = () => new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const nowHHMM = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
    ).padStart(2, '0')}`; // HH:MM
};
const prettyNow = () => {
    const d = new Date();
    return d.toLocaleString('en-GB', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// date/time no longer held in the form — captured live at submit
const INITIAL_FORM = {
    district: '',
    province: '',
    temperatureC: '',
    humidityPct: '',
    previousConsumptionKwh: '',
    householdSize: '',
    acUsage: 0,
    fanUsage: 0,
    workFromHome: 0,
};

const PROVINCES = [
    'Western',
    'Central',
    'Southern',
    'Northern',
    'Eastern',
    'North Western',
    'North Central',
    'Uva',
    'Sabaragamuwa',
];

const DISTRICTS_BY_PROVINCE = {
    Western: ['Colombo', 'Gampaha', 'Kalutara'],
    Central: ['Kandy', 'Matale', 'Nuwara Eliya'],
    Southern: ['Galle', 'Matara', 'Hambantota'],
    Northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    Eastern: ['Trincomalee', 'Batticaloa', 'Ampara'],
    'North Western': ['Kurunegala', 'Puttalam'],
    'North Central': ['Anuradhapura', 'Polonnaruwa'],
    Uva: ['Badulla', 'Monaragala'],
    Sabaragamuwa: ['Ratnapura', 'Kegalle'],
};

export const Predictions = () => {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState(null);

    // ✅ Simple error string for the UI banner
    const [apiError, setApiError] = useState('');

    // Live "now" display — recomputes on every render
    const nowDisplay = useMemo(
        () => prettyNow(),
        [form, result, apiError, isRunning]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => {
            if (name === 'province') {
                return { ...prev, province: value, district: '' };
            }
            return { ...prev, [name]: value };
        });

        setErrors((prev) => ({ ...prev, [name]: undefined }));

        if (name === 'province') {
            setErrors((prev) => ({
                ...prev,
                province: undefined,
                district: undefined,
            }));
        }
    };

    const handleToggle = (name) => {
        setForm((prev) => ({ ...prev, [name]: prev[name] ? 0 : 1 }));
    };

    const validate = () => {
        const errs = {};

        if (!form.province?.trim()) errs.province = 'Province is required.';
        if (!form.district?.trim()) errs.district = 'District is required.';

        const temp = Number(form.temperatureC);
        if (form.temperatureC === '' || Number.isNaN(temp) || temp <= 0) {
            errs.temperatureC = 'Temperature must be a positive number.';
        }

        const humidity = Number(form.humidityPct);
        if (
            form.humidityPct === '' ||
            Number.isNaN(humidity) ||
            humidity < 0 ||
            humidity > 100
        ) {
            errs.humidityPct = 'Humidity must be between 0 and 100.';
        }

        const prevKwh = Number(form.previousConsumptionKwh);
        if (
            form.previousConsumptionKwh === '' ||
            Number.isNaN(prevKwh) ||
            prevKwh < 0
        ) {
            errs.previousConsumptionKwh =
                'Previous consumption must be zero or positive.';
        }

        const size = Number(form.householdSize);
        if (
            form.householdSize === '' ||
            !Number.isInteger(size) ||
            size < 1
        ) {
            errs.householdSize = 'Household size must be at least 1.';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleRunForecast = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validate()) return;

        setIsRunning(true);
        setResult(null);

        // ✅ date/time captured here — uses current moment
        const payload = {
            date: todayISO(),
            time: nowHHMM(),
            district: form.district,
            province: form.province,
            temperatureC: Number(form.temperatureC),
            humidityPct: Number(form.humidityPct),
            previousConsumptionKwh: Number(form.previousConsumptionKwh),
            householdSize: Number(form.householdSize),
            acUsage: Number(form.acUsage),
            fanUsage: Number(form.fanUsage),
            workFromHome: Number(form.workFromHome),
        };

        try {
            const data = await predictConsumption(payload);

            setResult({
                predictedKwh: data.predictedConsumptionKwh,
                estimatedCostLkr: data.estimatedCostLkr,
                tariffRateLkrPerKwh: data.tariffRateLkrPerKwh,
                selectedModel: data.selectedModel,
                confidenceR2: data.confidenceR2,
                costNote: data.costNote,
                monthlyKwh: data.monthlyPredictedConsumptionKwhAmount,
            });
        } catch (err) {
            console.error('[Predictions] error:', err);
            setApiError('Something went wrong. Please try again.');
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setForm(INITIAL_FORM);
        setErrors({});
        setResult(null);
        setApiError('');
    };

    const inputClass = (field) =>
        `w-full h-10 px-3 rounded-lg border bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition ${
            errors[field] ? 'border-red-400' : 'border-outline-variant'
        }`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="page-header-row flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Household Consumption Prediction
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Enter household and environmental parameters to predict
                        electricity consumption (kWh)
                    </p>
                </div>

                <div className="page-header-actions flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            restart_alt
                        </span>
                        Reset
                    </button>
                </div>
            </div>

            {/* ✅ Black + red error banner */}
            {apiError && (
                <ErrorMessage
                    message={apiError}
                    onDismiss={() => setApiError('')}
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <form
                    onSubmit={handleRunForecast}
                    className="lg:col-span-2 border border-outline-variant rounded-xl p-6 bg-surface-container-lowest space-y-6"
                >
                    {/* Date & Time — read-only display */}
                    <div>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary/70">
                                schedule
                            </span>
                            Date &amp; Time
                        </h3>

                        <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-outline-variant bg-surface-container-low/60">
                            <div>
                                <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                    Current Timestamp
                                </div>
                                <div className="font-label-md text-label-md font-semibold text-primary mt-0.5">
                                    {nowDisplay}
                                </div>
                            </div>

                            <span className="material-symbols-outlined text-primary/60 text-[22px]">
                                schedule
                            </span>
                        </div>

                        <p className="font-body-sm text-body-sm text-secondary mt-2">
                            Predictions are timestamped automatically with the
                            current date and time.
                        </p>
                    </div>

                    {/* Location */}
                    <div className="pt-4 border-t border-outline-variant/50">
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary/70">
                                location_on
                            </span>
                            Location Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Province <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="province"
                                    value={form.province}
                                    onChange={handleChange}
                                    className={inputClass('province')}
                                >
                                    <option value="">Select province</option>
                                    {PROVINCES.map((province) => (
                                        <option key={province} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </select>
                                {errors.province && (
                                    <p className="font-body-sm text-body-sm text-red-600 mt-1">
                                        {errors.province}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    District <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="district"
                                    value={form.district}
                                    onChange={handleChange}
                                    disabled={!form.province}
                                    className={`${inputClass('district')} ${
                                        !form.province
                                            ? 'opacity-60 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    <option value="">Select district</option>
                                    {(DISTRICTS_BY_PROVINCE[form.province] || []).map(
                                        (district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        )
                                    )}
                                </select>
                                {errors.district && (
                                    <p className="font-body-sm text-body-sm text-red-600 mt-1">
                                        {errors.district}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Environmental */}
                    <div className="pt-4 border-t border-outline-variant/50">
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary/70">
                                thermostat
                            </span>
                            Environmental Factors
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Temperature (°C) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="temperatureC"
                                    value={form.temperatureC}
                                    onChange={handleChange}
                                    placeholder="e.g. 30.5"
                                    className={inputClass('temperatureC')}
                                />
                                {errors.temperatureC && (
                                    <p className="font-body-sm text-body-sm text-red-600 mt-1">
                                        {errors.temperatureC}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Humidity (%) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    name="humidityPct"
                                    value={form.humidityPct}
                                    onChange={handleChange}
                                    placeholder="0 – 100"
                                    className={inputClass('humidityPct')}
                                />
                                {errors.humidityPct && (
                                    <p className="font-body-sm text-body-sm text-red-600 mt-1">
                                        {errors.humidityPct}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Household */}
                    <div className="pt-4 border-t border-outline-variant/50">
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary/70">
                                home
                            </span>
                            Household Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Previous Consumption (kWh){' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    name="previousConsumptionKwh"
                                    value={form.previousConsumptionKwh}
                                    onChange={handleChange}
                                    placeholder="e.g. 12.4"
                                    className={inputClass('previousConsumptionKwh')}
                                />
                                {errors.previousConsumptionKwh && (
                                    <p className="font-body-sm text-body-sm text-red-600 mt-1">
                                        {errors.previousConsumptionKwh}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-label-sm text-label-sm font-medium text-secondary mb-1">
                                    Household Size <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    name="householdSize"
                                    value={form.householdSize}
                                    onChange={handleChange}
                                    placeholder="e.g. 4"
                                    className={inputClass('householdSize')}
                                />
                                {errors.householdSize && (
                                    <p className="font-body-sm text-body-sm text-red-600 mt-1">
                                        {errors.householdSize}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Appliance Usage */}
                    <div className="pt-4 border-t border-outline-variant/50">
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary/70">
                                power
                            </span>
                            Appliance Usage
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    key: 'acUsage',
                                    label: 'AC Usage',
                                    hint: 'Air conditioner active',
                                },
                                {
                                    key: 'fanUsage',
                                    label: 'Fan Usage',
                                    hint: 'Ceiling / pedestal fan',
                                },
                                {
                                    key: 'workFromHome',
                                    label: 'Work From Home',
                                    hint: 'Occupants working remotely',
                                },
                            ].map(({ key, label, hint }) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between p-3 rounded-lg border border-outline-variant bg-surface-container-lowest"
                                >
                                    <div>
                                        <div className="font-label-md text-label-md font-medium text-primary">
                                            {label}
                                        </div>
                                        <div className="font-body-sm text-body-sm text-secondary">
                                            {hint}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(key)}
                                        className={`w-11 h-6 flex-shrink-0 flex items-center rounded-full p-1 transition-colors duration-200 ${
                                            form[key]
                                                ? 'bg-primary justify-end'
                                                : 'bg-outline-variant justify-start'
                                        }`}
                                        aria-pressed={!!form[key]}
                                        aria-label={`Toggle ${label}`}
                                    >
                                        <span className="w-4 h-4 rounded-full bg-white shadow-md" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 border-t border-outline-variant/50 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                        <button
                            type="submit"
                            disabled={isRunning}
                            className={`h-10 px-5 rounded-lg font-label-md text-label-md font-medium inline-flex items-center justify-center gap-2 shadow-sm transition-all ${
                                isRunning
                                    ? 'bg-surface-container-low text-secondary cursor-not-allowed'
                                    : 'bg-primary text-on-primary hover:bg-on-surface-variant'
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined text-[18px] ${
                                    isRunning ? 'animate-spin' : ''
                                }`}
                            >
                                {isRunning ? 'progress_activity' : 'bolt'}
                            </span>
                            {isRunning ? 'Predicting...' : 'Predict Consumption'}
                        </button>
                    </div>
                </form>

                {/* Result / Info Panel */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest">
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-primary/70">
                                online_prediction
                            </span>
                            Prediction Result
                        </h3>

                        {/* Empty State */}
                        {!result && !isRunning && (
                            <div className="text-center py-8">
                                <span className="material-symbols-outlined text-[48px] text-secondary/40">
                                    insights
                                </span>
                                <p className="font-body-sm text-body-sm text-secondary mt-3">
                                    Fill in the form and click{' '}
                                    <strong>Predict Consumption</strong> to see the
                                    estimated kWh.
                                </p>
                            </div>
                        )}

                        {/* Loading */}
                        {isRunning && (
                            <div className="text-center py-8">
                                <span className="material-symbols-outlined text-[40px] text-primary animate-spin">
                                    progress_activity
                                </span>
                                <p className="font-body-sm text-body-sm text-secondary mt-3">
                                    Running regression model...
                                </p>
                            </div>
                        )}

                        {/* Result */}
                        {result && !isRunning && (
                            <div className="space-y-4">
                                <div className="text-center py-4 rounded-lg bg-surface-container-low/60">
                                    <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                        Predicted Consumption
                                    </div>
                                    <div className="font-display-kpi text-display-kpi text-primary tracking-tight mt-1">
                                        {Number(result.predictedKwh).toFixed(4)}
                                    </div>
                                    <div className="font-headline-sm text-headline-sm text-secondary font-normal">
                                        kWh
                                    </div>
                                </div>

                                <div className="text-center py-3 rounded-lg bg-emerald-50/60">
                                    <div className="font-label-sm text-label-sm text-emerald-700 uppercase tracking-wider">
                                        Estimated Cost
                                    </div>
                                    <div className="font-headline-md text-headline-md font-bold text-emerald-700 mt-1">
                                        LKR {Number(result.estimatedCostLkr).toFixed(2)}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-outline-variant/40 space-y-2">
                                    <div className="flex items-center justify-between font-body-sm text-body-sm">
                                        <span className="text-secondary">Model</span>
                                        <span className="font-semibold text-primary">
                                            {result.selectedModel || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between font-body-sm text-body-sm">
                                        <span className="text-secondary">Confidence (R²)</span>
                                        <span className="font-semibold text-emerald-600">
                                            {Number(result.confidenceR2).toFixed(4)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between font-body-sm text-body-sm">
                                        <span className="text-secondary">Tariff Rate</span>
                                        <span className="font-semibold text-primary">
                                            LKR {result.tariffRateLkrPerKwh} / kWh
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between font-body-sm text-body-sm">
                                        <span className="text-secondary">
                                            Monthly Estimate
                                        </span>
                                        <span className="font-semibold text-primary">
                                             LKR {Number(result.monthlyKwh).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between font-body-sm text-body-sm">
                                        <span className="text-secondary">Province</span>
                                        <span className="font-semibold text-primary">
                                            {form.province || '—'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between font-body-sm text-body-sm">
                                        <span className="text-secondary">District</span>
                                        <span className="font-semibold text-primary">
                                            {form.district || '—'}
                                        </span>
                                    </div>
                                </div>

                                {result.costNote && (
                                    <p className="pt-3 border-t border-outline-variant/40 font-body-sm text-body-sm text-secondary leading-relaxed">
                                        {result.costNote}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Information */}
                    <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary/70 text-[20px]">
                            info
                        </span>
                        <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                            Predictions use a trained regression model served via the
                            Spring Boot REST API. Inputs are validated against the DTO
                            constraints before submission.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};