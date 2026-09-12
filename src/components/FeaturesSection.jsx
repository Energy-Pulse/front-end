import { SectionWrapper } from './SectionWrapper';

const features = [
    {
        icon: 'tune',
        title: 'Multi-Variate ML Regressors',
        description: 'Parallel training on Random Forest, XGBoost, and Gradient Boosting.',
        metric: 'RMSE Metric',
        value: '±0.14 kWh',
    },
    {
        icon: 'thermostat',
        title: 'Hyperlocal Environmental Telemetry',
        description: 'Ingests temperature, solar irradiance, barometric pressure, and humidity.',
        metric: 'Weather Cadence',
        value: '15-min Intervals',
    },
    {
        icon: 'nest_multi_room',
        title: 'Occupancy & Appliance Profiling',
        description: 'Non-intrusive appliance load disaggregation without per-outlet hardware.',
        metric: 'Disaggregation',
        value: '98.1% Accuracy',
    },
    {
        icon: 'price_change',
        title: 'Automated Tariff & Cost Arbitrage',
        description: 'Dynamic Time-of-Use tariff tracking to avoid rate spikes.',
        metric: 'TOU Coverage',
        value: '1,400+ Utilities',
    },
];

export const FeaturesSection = () => {
    return (
        <SectionWrapper id="features" className="py-20 border-b border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mb-14">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Architected for Precision
          </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-3">
                        <span className="gradient-text">Multi-model telemetry</span> built without guesswork.
                    </h2>
                    <p className="font-body-md text-body-md text-secondary">
                        Deterministic energy accounting paired with probabilistic ML regressors.
                    </p>
                </div>
                <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card p-6 rounded-xl border border-outline-variant/40 glass-image hover:border-primary/60 transition-colors card-hover"
                        >
                            <div>
                                <div className="icon-glow w-10 h-10 rounded-lg bg-surface-container-low/80 backdrop-blur-sm border border-outline-variant/40 flex items-center justify-center mb-5">
                                    <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-2">
                                    {feature.title}
                                </h3>
                                <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="feature-meta mt-6 pt-4 border-t border-outline-variant/40 font-label-sm text-label-sm text-secondary flex items-center justify-between">
                                <span>{feature.metric}</span>
                                <span className="font-semibold text-primary metric-value">{feature.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};