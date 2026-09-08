import { SectionWrapper } from './SectionWrapper';

export const InsightsSection = () => {
    const insights = [
        {
            icon: 'analytics',
            title: 'Real-time Monitoring',
            description: 'Track consumption patterns as they happen. Our platform ingests and processes telemetry data with sub-second latency for immediate insights.',
            metric: 'Update cadence',
            value: '15-second intervals',
        },
        {
            icon: 'trending_up',
            title: 'Predictive Analytics',
            description: 'Forecast energy consumption up to 7 days in advance with 94.2% accuracy, allowing proactive decision-making and cost optimization.',
            metric: 'Forecast horizon',
            value: '7-day rolling window',
        },
        {
            icon: 'warning',
            title: 'Anomaly Detection',
            description: 'Automatically identify unusual consumption patterns that could indicate equipment failure, energy waste, or unexpected usage spikes.',
            metric: 'Detection rate',
            value: '99.7% accuracy',
        },
    ];

    return (
        <SectionWrapper id="insights" className="py-20 border-b border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-14">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Data-Driven Insights
          </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-3">
                        <span className="gradient-text">Turn telemetry</span> into{' '}
                        <span className="gradient-text-accent">actionable intelligence</span>
                    </h2>
                    <p className="font-body-md text-body-md text-secondary">
                        Our platform processes millions of data points to deliver insights that drive real savings.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {insights.map((item, index) => (
                        <div
                            key={index}
                            className="glass-image rounded-xl p-8 border border-outline-variant/40 card-hover"
                        >
                            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-2xl text-primary">{item.icon}</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mb-2">
                                {item.title}
                            </h3>
                            <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                                {item.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-outline-variant/40">
                                <span className="font-label-sm text-label-sm text-secondary">{item.metric}</span>
                                <div className="font-semibold text-primary">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};