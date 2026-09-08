import  { useState } from 'react';
import { Modal } from './Modal';
import { GoogleIcon } from './Icons';

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password, rememberMe });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            bolt
          </span>
                </div>
                <span className="font-headline-sm text-headline-sm font-semibold text-primary">
          SmartEnergy AI
        </span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-primary mt-3">
                Sign in to SmartEnergy AI
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-1 mb-6">
                Enter your credentials to access precision telemetry.
            </p>

            {/* Google Sign In */}
            <button
                className="w-full h-10 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md font-medium flex items-center justify-center gap-3 transition-colors mb-4"
                type="button"
            >
                <GoogleIcon />
                <span>Continue with Google</span>
            </button>

            <div className="relative flex py-2 items-center mb-4">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="flex-shrink mx-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
          or continue with email
        </span>
                <div className="flex-grow border-t border-outline-variant" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                        Email address
                    </label>
                    <input
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="name@domain.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="font-label-sm text-label-sm font-medium text-primary">Password</label>
                        <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors" href="#">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <input
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer"
                        id="login-remember-modal"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="font-label-md text-label-md text-secondary cursor-pointer" htmlFor="login-remember-modal">
                        Remember me for 30 days
                    </label>
                </div>

                <button
                    className="w-full h-10 mt-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                    type="submit"
                >
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
            </form>

            <div className="mt-6 pt-4 border-t border-outline-variant text-center font-label-md text-label-md text-secondary">
                Don't have an account?
                <button
                    className="font-semibold text-primary hover:underline ml-1"
                    onClick={onSwitchToRegister}
                >
                    Create account
                </button>
            </div>
        </Modal>
    );
};