import { SectionWrapper } from './SectionWrapper';

export const AboutSection = () => {
    return (
        <SectionWrapper id="about" className="py-20 border-b border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
              About EnergyPulse
            </span>
                        <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-2 mb-4">
                            <span className="gradient-text">Built for the</span>{' '}
                            <span className="gradient-text-accent">next generation</span>{' '}
                            <span className="gradient-text">of energy management</span>
                        </h2>
                        <p className="font-body-lg text-body-lg text-secondary leading-relaxed mb-6">
                            EnergyPulse was founded with a single mission: to democratize access to enterprise-grade
                            energy intelligence. Our platform combines cutting-edge machine learning with real-time
                            telemetry to help households and businesses make data-driven decisions about their energy
                            consumption.
                        </p>
                        <p className="font-body-md text-body-md text-secondary leading-relaxed mb-8">
                            We process over 4.2 million kWh of energy data daily, using advanced ML algorithms to
                            detect patterns, predict usage, and optimize consumption across thousands of properties.
                        </p>
                        <div className="about-stats flex flex-wrap gap-6">
                            <div>
                                <div className="about-kpi font-display-kpi text-display-kpi text-primary tracking-tight gradient-text">2019</div>
                                <div className="font-label-sm text-label-sm text-secondary">Founded</div>
                            </div>
                            <div>
                                <div className="about-kpi font-display-kpi text-display-kpi text-primary tracking-tight gradient-text">8,400+</div>
                                <div className="font-label-sm text-label-sm text-secondary">Active Users</div>
                            </div>
                            <div>
                                <div className="about-kpi font-display-kpi text-display-kpi text-primary tracking-tight gradient-text">94.2%</div>
                                <div className="font-label-sm text-label-sm text-secondary">Accuracy Rate</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="about-image-grid glass-image rounded-2xl p-8 border border-outline-variant/40">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="about-image-card bg-surface-container-low/80 rounded-xl p-6 text-center card-hover">
                                    <span className="material-symbols-outlined text-4xl text-primary">lightbulb</span>
                                    <div className="about-image-value font-headline-sm text-headline-sm font-bold text-primary mt-2">94.2%</div>
                                    <div className="about-image-label font-label-sm text-label-sm text-secondary">Forecast Accuracy</div>
                                </div>
                                <div className="about-image-card bg-surface-container-low/80 rounded-xl p-6 text-center card-hover">
                                    <span className="material-symbols-outlined text-4xl text-primary">speed</span>
                                    <div className="about-image-value font-headline-sm text-headline-sm font-bold text-primary mt-2">14.2ms</div>
                                    <div className="about-image-label font-label-sm text-label-sm text-secondary">Inference Speed</div>
                                </div>
                                <div className="about-image-card bg-surface-container-low/80 rounded-xl p-6 text-center card-hover">
                                    <span className="material-symbols-outlined text-4xl text-primary">bolt</span>
                                    <div className="about-image-value font-headline-sm text-headline-sm font-bold text-primary mt-2">4.2M</div>
                                    <div className="about-image-label font-label-sm text-label-sm text-secondary">kWh Monitored</div>
                                </div>
                                <div className="about-image-card bg-surface-container-low/80 rounded-xl p-6 text-center card-hover">
                                    <span className="material-symbols-outlined text-4xl text-primary">devices</span>
                                    <div className="about-image-value font-headline-sm text-headline-sm font-bold text-primary mt-2">1,400+</div>
                                    <div className="about-image-label font-label-sm text-label-sm text-secondary">Utilities Covered</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};