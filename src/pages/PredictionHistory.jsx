import { useState } from 'react';

const historyData = [
    { id: 1, date: '2026-09-08', predicted: 34.5, actual: 33.8, accuracy: 98.0, model: 'Random Forest v1.2' },
    { id: 2, date: '2026-09-07', predicted: 31.2, actual: 32.1, accuracy: 97.2, model: 'Random Forest v1.2' },
    { id: 3, date: '2026-09-06', predicted: 28.7, actual: 29.4, accuracy: 97.6, model: 'LSTM v2.0' },
    { id: 4, date: '2026-09-05', predicted: 36.8, actual: 35.6, accuracy: 96.7, model: 'XGBoost v2.4' },
    { id: 5, date: '2026-09-04', predicted: 30.1, actual: 31.0, accuracy: 97.1, model: 'Random Forest v1.2' },
    { id: 6, date: '2026-09-03', predicted: 33.4, actual: 32.8, accuracy: 98.2, model: 'LSTM v2.0' },
    { id: 7, date: '2026-09-02', predicted: 29.9, actual: 30.2, accuracy: 99.0, model: 'XGBoost v2.4' },
    { id: 8, date: '2026-09-01', predicted: 27.6, actual: 28.4, accuracy: 97.2, model: 'Random Forest v1.2' },
];

export const PredictionHistory = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = historyData.filter(item => {
        const matchesFilter = filter === 'all' || item.model.includes(filter);
        const matchesSearch = item.date.includes(searchTerm) ||
            item.predicted.toString().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    const avgAccuracy = (historyData.reduce((sum, d) => sum + d.accuracy, 0) / historyData.length).toFixed(1);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="page-header-row flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Prediction History
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Track forecast accuracy and model performance over time
                    </p>
                </div>
                <div className="page-header-actions flex items-center gap-3">
                    <button className="h-9 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-on-surface-variant transition-colors inline-flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        Export Data
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-row-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Total Predictions</span>
                    <div className="kpi-card-value mt-1 font-display-kpi text-display-kpi text-primary tracking-tight">{historyData.length}</div>
                </div>
                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Avg Accuracy</span>
                    <div className="kpi-card-value mt-1 font-display-kpi text-display-kpi text-primary tracking-tight">{avgAccuracy}%</div>
                </div>
                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Best Model</span>
                    <div className="mt-1 font-headline-md text-headline-md font-semibold text-primary">XGBoost</div>
                    <span className="font-body-sm text-body-sm text-secondary">99.0% accuracy</span>
                </div>
                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Avg Error</span>
                    <div className="kpi-card-value mt-1 font-display-kpi text-display-kpi text-primary tracking-tight">±1.2</div>
                    <span className="font-body-sm text-body-sm text-secondary">kWh</span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="filter-chip-row flex items-center gap-2 border border-outline-variant rounded-lg p-1 bg-surface-container-low/80">
                    {['all', 'Random Forest', 'LSTM', 'XGBoost'].map((model) => (
                        <button
                            key={model}
                            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                                filter === model ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-secondary hover:text-primary'
                            }`}
                            onClick={() => setFilter(model)}
                        >
                            {model === 'all' ? 'All Models' : model}
                        </button>
                    ))}
                </div>
                <div className="filter-search relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">search</span>
                    <input
                        type="text"
                        placeholder="Search by date or value..."
                        className="w-full h-9 pl-9 pr-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* History Table */}
            <div className="history-table-wrapper border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-container-low border-b border-outline-variant">
                        <tr>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Date</th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Predicted</th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Actual</th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Accuracy</th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Model</th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                        {filteredData.map((item) => {
                            const isHighAccuracy = item.accuracy >= 98;
                            const isMediumAccuracy = item.accuracy >= 95 && item.accuracy < 98;
                            return (
                                <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-3 px-4 font-body-sm text-body-sm text-primary">{item.date}</td>
                                    <td className="py-3 px-4 font-body-sm text-body-sm font-semibold text-primary">{item.predicted} kWh</td>
                                    <td className="py-3 px-4 font-body-sm text-body-sm text-secondary">{item.actual} kWh</td>
                                    <td className="py-3 px-4">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                isHighAccuracy ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                    isMediumAccuracy ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                        'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                                {item.accuracy}%
                                            </span>
                                    </td>
                                    <td className="py-3 px-4 font-body-sm text-body-sm text-secondary">{item.model}</td>
                                    <td className="py-3 px-4">
                                            <span className={`inline-flex items-center gap-1.5 font-label-sm text-label-sm ${
                                                isHighAccuracy ? 'text-emerald-600' :
                                                    isMediumAccuracy ? 'text-amber-600' : 'text-red-600'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    isHighAccuracy ? 'bg-emerald-500' :
                                                        isMediumAccuracy ? 'bg-amber-500' : 'bg-red-500'
                                                }`} />
                                                {isHighAccuracy ? 'Excellent' : isMediumAccuracy ? 'Good' : 'Needs Review'}
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                {filteredData.length === 0 && (
                    <div className="py-8 text-center text-secondary font-body-sm text-body-sm">
                        No predictions found matching your filters.
                    </div>
                )}
            </div>
        </div>
    );
};