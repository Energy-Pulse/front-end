import { BoltIcon } from './Icons';

export const Header = ({
                           onSignIn,
                           onGetStarted,
                           onNavigateToDashboard,
                           onScrollToSection
                       }) => {
    const navLinks = [
        { label: 'About', id: 'about' },
        { label: 'Features', id: 'features' },
        { label: 'Insights', id: 'insights' },
        { label: 'Benefits', id: 'benefits' },
        { label: 'Testimonials', id: 'testimonials' },
        { label: 'Contact', id: 'contact' },
    ];

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        if (onScrollToSection) {
            onScrollToSection(sectionId);
        }
    };

    return (
        <header className="header-wrapper sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur border-b border-outline-variant glass-effect">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Brand Logo - Click to go to Dashboard */}
                <button
                    className="flex items-center gap-2.5 group cursor-pointer"
                    onClick={onNavigateToDashboard}
                >
                    <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <BoltIcon filled className="text-lg" />
                    </div>
                    <div className="header-brand-text flex flex-col">
            <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-primary leading-none">
              EnergyPulse
            </span>
                        <span className="header-brand-tagline font-label-sm text-label-sm text-secondary font-medium tracking-wider">
              PRECISION TELEMETRY
            </span>
                    </div>
                </button>

                {/* Desktop Navigation Links */}
                <nav className="header-nav hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            className="font-label-md text-label-md text-secondary hover:text-primary transition-colors nav-link cursor-pointer"
                            href="#"
                            onClick={(e) => handleNavClick(e, link.id)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right Action CTAs */}
                <div className="header-actions flex items-center gap-3">
                    <button
                        className="header-sign-in px-3.5 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors btn-premium"
                        onClick={onSignIn}
                    >
                        Sign In
                    </button>
                    <button
                        className="header-cta-btn btn-premium px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center gap-1.5"
                        onClick={onGetStarted}
                    >
                        <span className="header-cta-label">Get Started Free</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </header>
    );
};