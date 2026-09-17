import { useState, useRef, useEffect } from 'react';
import { Modal } from './Modal';
import { GoogleIcon } from './Icons';
import { registerUser } from '../services/authApi';

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegister }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        occupants: '4',
        hvacType: 'central-ac',
        termsAccepted: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // --- Auto-hide Scrollbar Logic ---
    const [setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);

    const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);
    // ---------------------------------

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            setIsSubmitting(true);
            const response = await registerUser(formData);

            // Persist token/userId (same keys as login)
            if (response.token) {
                localStorage.setItem('smartEnergyToken', response.token);
                localStorage.setItem('smartEnergyUserId', String(response.userId));
            }

            if (onRegister) {
                onRegister(response);
            }
            onClose();
        } catch (error) {
            setErrorMessage(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-lg max-h-[92vh] overflow-y-auto scrollbar-hidden pr-3"
            onScroll={handleScroll}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        bolt
                    </span>
                </div>
                <span className="font-headline-sm text-headline-sm font-semibold text-primary">
                    EnergyPulse
                </span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-primary mt-3">
                Create your EnergyPulse account
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-1 mb-6">
                Start your 14-day free trial with full ML forecasting.
            </p>

            {/* Google Sign Up */}
            <button
                className="w-full h-10 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md font-medium flex items-center justify-center gap-3 transition-colors mb-4"
                type="button"
            >
                <GoogleIcon />
                <span>Sign up with Google</span>
            </button>

            <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="flex-shrink mx-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    or register with email
                </span>
                <div className="flex-grow border-t border-outline-variant" />
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                        Full Name
                    </label>
                    <input
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="First and last name"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                        Household / Work Email
                    </label>
                    <input
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="name@household.net"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                        Password
                    </label>
                    <input
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="Minimum 8 characters"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                            Household Occupants
                        </label>
                        <select
                            className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            name="occupants"
                            value={formData.occupants}
                            onChange={handleChange}
                        >
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4 People</option>
                            <option value="5">5 People</option>
                            <option value="6+">6+ People</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                            Primary HVAC Type
                        </label>
                        <select
                            className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            name="hvacType"
                            value={formData.hvacType}
                            onChange={handleChange}
                        >
                            <option value="heat-pump">Heat Pump (Dual)</option>
                            <option value="central-ac">Central AC & Gas</option>
                            <option value="mini-split">Ductless Mini-Split</option>
                            <option value="radiant">Electric Radiant</option>
                            <option value="other">Other / Multi-zone</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                    <input
                        className="w-4 h-4 mt-0.5 rounded border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer"
                        id="register-terms-modal"
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        required
                    />
                    <label className="font-body-sm text-body-sm text-secondary cursor-pointer leading-tight" htmlFor="register-terms-modal">
                        I agree to the <a className="text-primary underline" href="#">Terms of Service</a> and allow EnergyPulse to ingest smart meter telemetry.
                    </label>
                </div>

                {errorMessage && (
                    <div className="rounded-lg border border-red-500/30 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <button
                    className="w-full h-10 mt-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                >
                    <span>{isSubmitting ? 'Creating account...' : 'Create Account & Connect Telemetry'}</span>
                    <span className="material-symbols-outlined text-base">cloud_sync</span>
                </button>
            </form>

            <div className="mt-6 pt-4 border-t border-outline-variant text-center font-label-md text-label-md text-secondary">
                Already registered?
                <button
                    className="font-semibold text-primary hover:underline ml-1"
                    onClick={onSwitchToLogin}
                >
                    Sign in
                </button>
            </div>
        </Modal>
    );
};