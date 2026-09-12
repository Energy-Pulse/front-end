import { useState } from 'react';
import { ConsumptionChart } from '../components/ConsumptionChart';

const forecastData = [
    { date: 'Mon', actual: 28.4 },
    { date: 'Tue', actual: 32.1 },
    { date: 'Wed', actual: 35.6 },
    { date: 'Thu', actual: 29.8 },
    { date: 'Fri', actual: 33.2 },
    { date: 'Sat (Fcst)', actual: 38.5, isForecast: true },
    { date: 'Sun (Fcst)', actual: 36.0, isForecast: true },
];

const modelOptions = [
    { id: 'random_forest', label: 'Random Forest Regressor v1.2', accuracy: '96.8%', latency: '14.2ms' },
    { id: 'lstm', label: 'LSTM Neural Net v2.0', accuracy: '95.4%', latency: '22.7ms' },
    { id: 'arima', label: 'ARIMA Statistical Model', accuracy: '93.1%', latency: '8.9ms' },
];

export const Predictions = () => {
    const [model, setModel] = useState('random_forest');
    const [isRunning, setIsRunning] = useState(false);

    const currentModel = modelOptions.find(m => m.id === model);

    const handleRunForecast = () => {
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 1500);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="page-header-row flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Predictive Insights
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Machine learning forecasts and automated tariff optimizations
                    </p>
                </div>
                <div className="page-header-actions flex items-center gap-3">
                    <button
                        onClick={handleRunForecast}
                        disabled={isRunning}
                        className={`h-9 px-4 rounded-lg font-label-md text-label-md font-medium inline-flex items-center gap-2 shadow-sm transition-all ${
                            isRunning
                                ? 'bg-surface-container-low text-secondary cursor-not-allowed'
                                : 'bg-primary text-on-primary hover:bg-on-surface-variant'
                        }`}
                    >
                        <span className={`material-symbols-outlined text-[18px] ${isRunning ? 'animate-spin' : ''}`}>
                            {isRunning ? 'progress_activity' : 'refresh'}
                        </span>
                        {isRunning ? 'Running...' : 'Run Forecast'}
                    </button>
                </div>
            </div>

            {/* Model Selector & Stats */}
            <div className="prediction-model-grid grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1">
                    <div className="border border-outline-variant rounded-xl p-4 bg-surface-container-lowest h-full">
                        <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block mb-2">
                            Active Model
                        </label>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        >
                            {modelOptions.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                        {currentModel && (
                            <div className="mt-3 pt-3 border-t border-outline-variant/40">
                                <div className="flex items-center justify-between font-body-sm text-body-sm">
                                    <span className="text-secondary">Accuracy</span>
                                    <span className="font-semibold text-primary">{currentModel.accuracy}</span>
                                </div>
                                <div className="flex items-center justify-between font-body-sm text-body-sm mt-1">
                                    <span className="text-secondary">Latency</span>
                                    <span className="font-semibold text-primary">{currentModel.latency}</span>
                                </div>
                            </div>
                        )}
                        <div className="mt-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span className="font-body-sm text-body-sm text-secondary">Model ready</span>
                        </div>
                    </div>
                </div>

                <div className="prediction-stats-grid lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                        <div className="flex items-center justify-between">
                            <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Expected Next 24h</span>
                            <span className="material-symbols-outlined text-primary/60 text-[22px]">online_prediction</span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">34.5</span>
                            <span className="font-headline-sm text-headline-sm text-secondary font-normal">kWh</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                                <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                                4.2%
                            </span>
                            <span className="font-body-sm text-body-sm text-secondary">below average</span>
                        </div>
                    </div>

                    <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                        <div className="flex items-center justify-between">
                            <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Model Confidence</span>
                            <span className="material-symbols-outlined text-primary/60 text-[22px]">verified</span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">96.8</span>
                            <span className="font-headline-sm text-headline-sm text-secondary font-normal">%</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-secondary mt-1">MAPE: 3.2%</p>
                    </div>

                    <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                        <div className="flex items-center justify-between">
                            <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Peak Spike</span>
                            <span className="material-symbols-outlined text-amber-500 text-[22px]">warning</span>
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">18:30</span>
                            <span className="font-headline-sm text-headline-sm text-secondary font-normal">PM</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-amber-600 font-medium mt-1">Tariff Spike: +$0.14/kWh</p>
                    </div>
                </div>
            </div>

            {/* Main Forecast Chart */}
            <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest card-hover-glow">
                <div className="chart-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                            7-Day Load Forecast Envelope
                        </h3>
                        <p className="font-body-sm text-body-sm text-secondary">
                            95% statistical confidence bounds for forecast period
                        </p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                            <span className="font-label-sm text-label-sm text-secondary">Actual</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-zinc-400"></span>
                            <span className="font-label-sm text-label-sm text-secondary">Predicted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-6 h-3 rounded bg-zinc-200/60 border border-zinc-300"></span>
                            <span className="font-label-sm text-label-sm text-secondary">Confidence</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-72">
                    <ConsumptionChart data={forecastData} height={220} showForecast={true} />
                </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                        </div>
                        <div>
                            <h4 className="font-headline-sm text-headline-sm font-semibold text-primary">Load Shift Opportunity</h4>
                            <p className="font-body-sm text-body-sm text-secondary">Optimal HVAC Pre-Cooling</p>
                        </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                        Pre-cool your living spaces by 2°C between <strong>14:00 and 16:00</strong> to reduce energy draw during peak rates starting at 17:00.
                    </p>
                    <div className="mt-3 pt-3 border-t border-outline-variant/40 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">savings</span>
                        <span className="font-body-sm text-body-sm text-emerald-600 font-medium">Estimated savings: $0.84/day</span>
                    </div>
                </div>

                <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="material-symbols-outlined text-[22px]">ev_station</span>
                        </div>
                        <div>
                            <h4 className="font-headline-sm text-headline-sm font-semibold text-primary">EV Smart Schedule</h4>
                            <p className="font-body-sm text-body-sm text-secondary">Recommended Charging Window</p>
                        </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                        Shift vehicle charging to start at <strong>01:00 AM</strong> off-peak hours to save on tomorrow's billing cycle.
                    </p>
                    <div className="mt-3 pt-3 border-t border-outline-variant/40 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-amber-600">payments</span>
                        <span className="font-body-sm text-body-sm text-amber-600 font-medium">Estimated savings: $1.42/day</span>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 text-center">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Forecast Horizon</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-primary">7 Days</span>
                </div>
                <div className="p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 text-center">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Data Points</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-primary">2.4K</span>
                </div>
                <div className="p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 text-center">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Features</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-primary">12</span>
                </div>
                <div className="p-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 text-center">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Last Trained</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-primary">2h ago</span>
                </div>
            </div>
        </div>
    );
};