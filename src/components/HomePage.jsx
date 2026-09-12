import 'react';
import { Badge } from './Badge.jsx';
import { BenchmarksTable } from './BenchmarksTable.jsx';
import { ConsumptionChart } from './ConsumptionChart.jsx';
import { BoltIcon } from './Icons.jsx';

// Mock data
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

const modelData = [
    {
        name: 'XGBoost Regressor (Ensemble v2.4)',
        resolution: '15-minute intervals',
        mae: '0.082 kWh',
        rmse: '0.114 kWh',
        r2: '0.964',
        latency: '14.2 ms',
        isBest: true,
    },
    {
        name: 'Random Forest (500 Trees)',
        resolution: 'Hourly aggregates',
        mae: '0.104 kWh',
        rmse: '0.138 kWh',
        r2: '0.941',
        latency: '38.6 ms',
        isBest: false,
    },
    {
        name: 'Gradient Boosting Regressor',
        resolution: 'Daily forecasting',
        mae: '0.091 kWh',
        rmse: '0.126 kWh',
        r2: '0.952',
        latency: '22.1 ms',
        isBest: false,
    },
];

const features = [
    {
        icon: 'tune',
        title: 'Multi-Variate ML Regressors',
        description:
            'Parallel training runs on Random Forest, XGBoost, and Gradient Boosting algorithms. Continually selects lowest RMSE and highest R² metrics for every circuit.',
        metric: 'RMSE Metric',
        value: '±0.14 kWh',
    },
    {
        icon: 'thermostat',
        title: 'Hyperlocal Environmental Telemetry',
        description:
            'Ingests localized outdoor ambient temperature, solar irradiance, barometric pressure, and relative humidity to isolate HVAC thermal dissipation curves.',
        metric: 'Weather Cadence',
        value: '15-min Intervals',
    },
    {
        icon: 'nest_multi_room',
        title: 'Occupancy & Appliance Profiling',
        description:
            'Non-intrusive appliance load disaggregation (NIALM) recognizes dual inverter compressors, heat pumps, and EV chargers without per-outlet hardware.',
        metric: 'Disaggregation',
        value: '98.1% Accuracy',
    },
    {
        icon: 'price_change',
        title: 'Automated Tariff & Cost Arbitrage',
        description:
            'Dynamic Time-of-Use (TOU) tariff tracking syncs with major municipal providers to delay battery discharge and thermal cooling before rate spikes trigger.',
        metric: 'TOU Coverage',
        value: '1,400+ Utilities',
    },
];

export const HomePage = ({ onNavigate }) => {
    return (
        <main className="flex-1 relative z-10">
            {/* Hero Section */}
            <section className="relative pt-16 pb-20 border-b border-outline-variant/30 overflow-hidden scroll-offset" id="hero">
                {/* Hero decorative elements */}
                <div className="hero-decoration hero-decoration-1" />
                <div className="hero-decoration hero-decoration-2" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/40 bg-surface-container-low/80 backdrop-blur-sm mb-6">
                            <span className="pulse-dot online" />
                            <span className="hero-badge-text font-label-sm text-label-sm text-secondary tracking-wider uppercase font-semibold">
                SMARTENERGY AI v1.2 — PRECISION HOUSEHOLD TELEMETRY &amp; ML FORECASTING
              </span>
                        </div>

                        <h1 className="hero-heading font-headline-lg text-headline-lg md:text-[44px] md:leading-[52px] font-bold tracking-tight mb-4">
                            <span className="gradient-text">Understand your energy.</span>
                            <br className="hidden sm:inline" />
                            <span className="gradient-text-accent">Predict tomorrow with 94% ML accuracy.</span>
                        </h1>

                        <p className="hero-subtitle font-body-lg text-body-lg text-secondary max-w-2xl mb-8 leading-relaxed">
                            A full-stack predictive energy intelligence platform. Train on historical household
                            consumption, weather telemetry, and occupancy patterns to forecast kWh demand before
                            peak rates hit.
                        </p>

                        <div className="hero-ctas flex flex-wrap items-center justify-center gap-3 mb-12">
                            <button
                                className="btn-premium px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm"
                                onClick={() => onNavigate('register')}
                            >
                                <span>Start Free Trial</span>
                                <BoltIcon className="text-base" />
                            </button>
                            <button
                                className="btn-premium px-5 py-2.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest/80 backdrop-blur-sm text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors flex items-center gap-2"
                                onClick={() => onNavigate('dashboard')}
                            >
                                <span>Go to Dashboard</span>
                                <span className="material-symbols-outlined text-base">dashboard</span>
                            </button>
                        </div>

                        <div className="hero-stats-bar w-full max-w-2xl py-3 px-6 rounded-xl border border-outline-variant/40 bg-surface-container-low/80 backdrop-blur-sm glass-effect flex flex-wrap items-center justify-between text-secondary font-label-md text-label-md gap-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">data_thresholding</span>
                                <span className="font-semibold text-primary metric-value">4.2M kWh</span> Monitored
                            </div>
                            <div className="hero-stats-divider h-3 w-px bg-outline-variant/40 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">tune</span>
                                <span className="font-semibold text-primary metric-value">94.2%</span> Model Confidence
                            </div>
                            <div className="hero-stats-divider h-3 w-px bg-outline-variant/40 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">payments</span>
                                <span className="font-semibold text-primary metric-value">$420</span> Avg. Annual Savings
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="hero-preview mt-14 max-w-5xl mx-auto rounded-xl border border-outline-variant/40 glass-image shadow-sm overflow-hidden card-hover-glow" id="showcase">
                        <div className="hero-preview-header px-4 py-3 bg-surface-container-low/80 backdrop-blur-sm border-b border-outline-variant/40 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                                <div className="w-2.5 h-2.5 rounded-full bg-outline-variant" />
                                <span className="hero-preview-title ml-2 font-label-sm text-label-sm text-secondary font-medium">
                  SmartEnergy AI Telemetry Node // Primary Residence (Live Feed)
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="pulse-dot online" />
                                <span className="font-label-sm text-label-sm text-emerald-800 font-medium">
                  Live Telemetry Ingest
                </span>
                            </div>
                        </div>

                        <div className="hero-preview-grid p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container-lowest/60 backdrop-blur-sm">
                            <div className="lg:col-span-8 flex flex-col justify-between border border-outline-variant/40 rounded-lg p-5 glass-image card-hover">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">
                      Today's Aggregated Consumption
                    </span>
                                        <div className="flex items-baseline gap-2 mt-1">
                      <span className="hero-kpi-value font-display-kpi text-display-kpi text-primary tracking-tight gradient-text">
                        14.63
                      </span>
                                            <span className="font-label-md text-label-md text-secondary">kWh</span>
                                            <Badge type="high" className="ml-2 badge-pulse">
                                                +12.4% vs median
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 border border-outline-variant/40 rounded-lg p-1 bg-surface-container-low/80 backdrop-blur-sm">
                                        <button className="px-2.5 py-1 text-xs font-medium rounded bg-surface-container-lowest shadow-sm text-primary">
                                            Hourly
                                        </button>
                                        <button className="px-2.5 py-1 text-xs font-medium text-secondary hover:text-primary">
                                            7D
                                        </button>
                                        <button className="px-2.5 py-1 text-xs font-medium text-secondary hover:text-primary">
                                            30D
                                        </button>
                                    </div>
                                </div>
                                <div className="hero-chart w-full h-44 relative mt-2">
                                    <ConsumptionChart data={consumptionData} />
                                </div>
                                <div className="hero-timeline-labels flex items-center justify-between text-xs text-secondary pt-3 border-t border-outline-variant/40 mt-2">
                                    <span>00:00</span>
                                    <span>06:00 (Off-peak)</span>
                                    <span className="font-medium text-primary">14:00 (Current)</span>
                                    <span>18:00 (Peak Tariff Window)</span>
                                    <span>23:59</span>
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col justify-between border border-outline-variant/40 rounded-lg p-5 glass-image card-hover">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                      Prediction Engine
                    </span>
                                        <Badge type="high" className="badge-pulse">High Usage Alert</Badge>
                                    </div>
                                    <div className="font-headline-sm text-headline-sm font-semibold text-primary mb-1">
                                        Peak Anomaly Predicted
                                    </div>
                                    <p className="font-body-sm text-body-sm text-secondary mb-4">
                                        XGBoost Regressor forecasts <strong>+3.4 kWh</strong> surge between 17:30 and
                                        19:30 due to forecasted 91°F ambient temperature and expected EV charger sync.
                                    </p>
                                    <div className="space-y-2.5 pt-2 border-t border-outline-variant/40">
                                        <div className="flex items-center justify-between font-label-sm text-label-sm">
                                            <span className="text-secondary">Expected Peak Load</span>
                                            <span className="font-semibold text-primary metric-value">4.85 kW</span>
                                        </div>
                                        <div className="flex items-center justify-between font-label-sm text-label-sm">
                                            <span className="text-secondary">Predicted Tariff Cost</span>
                                            <span className="font-semibold text-primary metric-value">$0.38 / kWh</span>
                                        </div>
                                        <div className="flex items-center justify-between font-label-sm text-label-sm">
                                            <span className="text-secondary">Model Certainty (R²)</span>
                                            <span className="font-semibold text-primary metric-value">0.964</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-outline-variant/40">
                                    <button className="btn-premium w-full py-2 px-3 rounded-lg bg-primary text-on-primary text-xs font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">auto_mode</span>
                                        <span>Enable Auto-Shedding</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 border-b border-outline-variant/30 scroll-offset" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-14">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Architected for Precision
            </span>
                        <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-3">
                            <span className="gradient-text">Multi-model telemetry</span> built without guesswork.
                        </h2>
                        <p className="font-body-md text-body-md text-secondary">
                            Deterministic energy accounting paired with probabilistic ML regressors. Built for
                            engineers, property managers, and telemetry-first households.
                        </p>
                    </div>

                    <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card p-6 rounded-xl border border-outline-variant/40 glass-image hover:border-primary/60 transition-colors flex flex-col justify-between card-hover"
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
            </section>

            {/* Benchmarks Section */}
            <section className="py-20 border-b border-outline-variant/30 scroll-offset" id="benchmarks">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl mb-12">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Empirical Benchmarks
            </span>
                        <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-2">
                            <span className="gradient-text">Model Performance</span> vs Real Telemetry
                        </h2>
                        <p className="font-body-md text-body-md text-secondary">
                            Validated against 1.2M hours of smart meter telemetry across diverse residential load profiles.
                        </p>
                    </div>
                    <div className="table-responsive">
                        <BenchmarksTable data={modelData} />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 scroll-offset">
                <div className="max-w-5xl mx-auto px-6 text-center border border-outline-variant/40 rounded-2xl p-12 glass-image cta-premium">
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mb-3">
                        <span className="gradient-text">Ready to predict</span> your energy tomorrow?
                    </h2>
                    <p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto mb-8">
                        Join 8,400+ households and energy managers utilizing telemetry-driven ML models. Setup
                        takes under 4 minutes.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            className="btn-premium px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center gap-2"
                            onClick={() => onNavigate('register')}
                        >
                            <span>Get Started for Free</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                        <button
                            className="btn-premium px-6 py-3 rounded-lg border border-outline-variant/40 bg-surface-container-lowest/80 backdrop-blur-sm text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors"
                            onClick={() => onNavigate('login')}
                        >
                            Access Existing Account
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};