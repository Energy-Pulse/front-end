import { SectionWrapper } from './SectionWrapper';

export const BenefitsSection = () => {
    const benefits = [
        {
            icon: 'savings',
            title: 'Cost Reduction',
            description: 'Reduce energy bills by up to 23% through intelligent consumption forecasting and proactive peak load management.',
            items: [
                'Average annual savings: $420',
                'Peak demand reduced by 18%',
            ],
        },
        {
            icon: 'eco',
            title: 'Sustainability',
            description: 'Optimize energy usage patterns to reduce your carbon footprint while maintaining comfort and operational efficiency.',
            items: [
                'Carbon footprint: -15%',
                'Renewable energy integration',
            ],
        },
        {
            icon: 'security',
            title: 'Reliability',
            description: 'Ensure your systems operate efficiently with proactive anomaly detection and automated load balancing capabilities.',
            items: [
                '99.99% uptime guarantee',
                'Real-time system health',
            ],
        },
    ];

    return (
        <SectionWrapper id="benefits" className="py-20 border-b border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mb-14">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Why EnergyPulse
          </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-3">
                        <span className="gradient-text">The benefits</span> of intelligent{' '}
                        <span className="gradient-text-accent">energy management</span>
                    </h2>
                </div>
                <div className="benefits-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="benefit-card glass-image rounded-xl p-8 border border-outline-variant/40 card-hover"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="benefit-icon material-symbols-outlined text-3xl text-primary">{benefit.icon}</span>
                                <div>
                                    <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                                        {benefit.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="font-body-md text-body-md text-secondary leading-relaxed mb-6">
                                {benefit.description}
                            </p>
                            <ul className="space-y-2">
                                {benefit.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 font-body-sm text-body-sm text-secondary">
                                        <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};