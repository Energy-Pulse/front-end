import { SectionWrapper } from './SectionWrapper';
import { Badge } from './Badge';
import { BoltIcon } from './Icons';
import { ConsumptionChart } from './ConsumptionChart';

const consumptionData = [
    { date: 'Sep 01', actual: 11.2 },
    { date: 'Sep 02', actual: 12.4 },
    { date: 'Sep 03', actual: 13.8 },
    { date: 'Sep 04', actual: 11.9 },
    { date: 'Sep 05', actual: 13.1 },
    { date: 'Sep 06', actual: 12.0 },
    { date: 'Sep 07', actual: 12.8, isForecast: false },
    { date: 'Sep 08', actual: 14.63, isForecast: true },
];

export const HeroSection = ({ onShowRegisterModal, onShowDashboard }) => {
    return (
        <SectionWrapper id="hero" className="relative pt-16 pb-20 border-b border-outline-variant/30 overflow-hidden">
            <div className="hero-decoration hero-decoration-1" />
            <div className="hero-decoration hero-decoration-2" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/40 bg-surface-container-low/80 backdrop-blur-sm mb-6">
                        <span className="pulse-dot online" />
                        <span className="hero-badge-text font-label-sm text-label-sm text-secondary tracking-wider uppercase font-semibold">
              EnergyPulse AI v1.2 — PRECISION TELEMETRY
            </span>
                    </div>
                    <h1 className="hero-heading font-headline-lg text-headline-lg md:text-[44px] font-bold tracking-tight mb-4">
                        <span className="gradient-text">Understand your energy.</span>
                        <br />
                        <span className="gradient-text-accent">Predict tomorrow with 94% ML accuracy.</span>
                    </h1>
                    <p className="hero-subtitle font-body-lg text-body-lg text-secondary max-w-2xl mb-8">
                        Predictive energy intelligence platform. Forecast kWh demand before peak rates hit.
                    </p>
                    <div className="hero-ctas flex flex-wrap items-center justify-center gap-3 mb-12">
                        <button
                            className="btn-premium px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md font-medium hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm"
                            onClick={onShowRegisterModal}
                        >
                            <span>Start Free Trial</span>
                            <BoltIcon className="text-base" />
                        </button>
                        <button
                            className="px-5 py-2.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest/80 backdrop-blur-sm text-primary font-label-md font-medium hover:bg-surface-container-low transition-colors flex items-center gap-2"
                            onClick={onShowDashboard}
                        >
                            <span className="material-symbols-outlined text-base">dashboard</span>
                            <span>Go to Dashboard</span>
                        </button>
                    </div>
                    <div className="hero-stats-bar w-full max-w-2xl py-3 px-6 rounded-xl border border-outline-variant/40 bg-surface-container-low/80 backdrop-blur-sm glass-effect flex flex-wrap items-center justify-between text-secondary font-label-md gap-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">data_thresholding</span>
                            <span className="font-semibold text-primary metric-value">4.2M kWh</span> Monitored
                        </div>
                        <div className="hero-stats-divider h-3 w-px bg-outline-variant/40 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">tune</span>
                            <span className="font-semibold text-primary metric-value">94.2%</span> Confidence
                        </div>
                        <div className="hero-stats-divider h-3 w-px bg-outline-variant/40 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">payments</span>
                            <span className="font-semibold text-primary metric-value">$420</span> Avg. Savings
                        </div>
                    </div>
                </div>

                <div className="hero-preview mt-14 max-w-5xl mx-auto rounded-xl border border-outline-variant/40 glass-image shadow-sm overflow-hidden card-hover-glow" id="showcase">
                    <div className="hero-preview-header px-4 py-3 bg-surface-container-low/80 backdrop-blur-sm border-b border-outline-variant/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                            <div className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                            <span className="hero-preview-title ml-2 font-label-sm text-label-sm text-secondary font-medium">
                EnergyPulse Telemetry Node // Live Feed
              </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="pulse-dot online" />
                            <span className="font-label-sm text-label-sm text-emerald-800 font-medium">Live Telemetry</span>
                        </div>
                    </div>
                    <div className="hero-preview-grid p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container-lowest/60 backdrop-blur-sm">
                        <div className="lg:col-span-8 border border-outline-variant/40 rounded-lg p-5 glass-image card-hover">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                    Today's Consumption
                  </span>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="hero-kpi-value font-display-kpi text-display-kpi text-primary tracking-tight gradient-text">14.63</span>
                                        <span className="font-label-md text-label-md text-secondary">kWh</span>
                                        <Badge type="high" className="ml-2 badge-pulse">+12.4% vs median</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="hero-chart w-full h-44 relative mt-2">
                                <ConsumptionChart data={consumptionData} />
                            </div>
                        </div>
                        <div className="lg:col-span-4 border border-outline-variant/40 rounded-lg p-5 glass-image card-hover">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Prediction Engine</span>
                                <Badge type="high" className="badge-pulse">Alert</Badge>
                            </div>
                            <div className="font-headline-sm text-headline-sm font-semibold text-primary mb-1">Peak Anomaly Predicted</div>
                            <p className="font-body-sm text-body-sm text-secondary mb-4">
                                XGBoost forecasts <strong>+3.4 kWh</strong> surge due to 91°F temperature.
                            </p>
                            <div className="space-y-2.5 pt-2 border-t border-outline-variant/40">
                                <div className="flex items-center justify-between font-label-sm">
                                    <span className="text-secondary">Expected Peak Load</span>
                                    <span className="font-semibold text-primary">4.85 kW</span>
                                </div>
                                <div className="flex items-center justify-between font-label-sm">
                                    <span className="text-secondary">Model Certainty (R²)</span>
                                    <span className="font-semibold text-primary">0.964</span>
                                </div>
                            </div>
                            <button className="btn-premium w-full mt-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">auto_mode</span>
                                <span>Enable Auto-Shedding</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};