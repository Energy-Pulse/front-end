import { SectionWrapper } from './SectionWrapper';
import { BenchmarksTable } from './BenchmarksTable';

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

export const BenchmarksSection = () => {
    return (
        <SectionWrapper id="benchmarks" className="py-20 border-b border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mb-12">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Empirical Benchmarks
          </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-2">
                        <span className="gradient-text">Model Performance</span> vs Real Telemetry
                    </h2>
                </div>
                <BenchmarksTable data={modelData} />
            </div>
        </SectionWrapper>
    );
};