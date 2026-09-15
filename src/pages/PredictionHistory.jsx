import { useEffect, useMemo, useState } from 'react';
import { fetchPredictionHistory } from '../services/historyApi';
import { ErrorMessage } from '../components/ErrorMessage.jsx';

const formatDateTime = (iso) => {
    if (!iso) return '—';
    try {
        const d = new Date(iso);
        return d.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return iso;
    }
};

export const PredictionHistory = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // ---------- Fetch ----------
    const loadHistory = async () => {
        setIsLoading(true);
        setApiError('');
        try {
            const userId = localStorage.getItem('smartEnergyUserId');
            const data = await fetchPredictionHistory(userId);
            // Newest first
            const sorted = [...data].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setHistory(sorted);
        } catch (err) {
            console.error('[PredictionHistory] error:', err);
            setApiError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ---------- Derived ----------
    const models = useMemo(() => {
        const set = new Set(history.map((h) => h.selectedModel).filter(Boolean));
        return ['all', ...Array.from(set)];
    }, [history]);

    const filteredData = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return history.filter((item) => {
            const matchesFilter =
                filter === 'all' || item.selectedModel === filter;

            const matchesSearch =
                !term ||
                (item.date || '').toLowerCase().includes(term) ||
                (item.district || '').toLowerCase().includes(term) ||
                (item.province || '').toLowerCase().includes(term) ||
                String(item.predictedConsumptionKwh ?? '').includes(term);

            return matchesFilter && matchesSearch;
        });
    }, [history, filter, searchTerm]);

    const stats = useMemo(() => {
        if (history.length === 0) {
            return {
                total: 0,
                avgR2: '—',
                bestModel: '—',
                bestR2: '—',
                avgKwh: '—',
            };
        }

        const avgR2 =
            history.reduce((s, h) => s + Number(h.confidenceR2 || 0), 0) /
            history.length;

        const best = history.reduce(
            (acc, h) =>
                Number(h.confidenceR2 || 0) > Number(acc.confidenceR2 || 0)
                    ? h
                    : acc,
            history[0]
        );

        const avgKwh =
            history.reduce(
                (s, h) => s + Number(h.predictedConsumptionKwh || 0),
                0
            ) / history.length;

        return {
            total: history.length,
            avgR2: (avgR2 * 100).toFixed(1) + '%',
            bestModel: best.selectedModel || '—',
            bestR2: (Number(best.confidenceR2 || 0) * 100).toFixed(1) + '%',
            avgKwh: avgKwh.toFixed(2),
        };
    }, [history]);

    // ---------- Export CSV ----------
    const handleExport = () => {
        if (history.length === 0) return;

        const headers = [
            'Date',
            'Time',
            'Province',
            'District',
            'Predicted kWh',
            'Estimated Cost (LKR)',
            'Model',
            'R2 Confidence',
            'Monthly kWh',
        ];

        const rows = history.map((h) => [
            h.date ?? '',
            h.time ?? '',
            h.province ?? '',
            h.district ?? '',
            h.predictedConsumptionKwh ?? '',
            h.estimatedCost ?? '',
            h.selectedModel ?? '',
            h.confidenceR2 ?? '',
            h.monthlyPredictedConsumptionKwh ?? '',
        ]);

        const csv = [headers, ...rows]
            .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prediction-history-${new Date()
            .toISOString()
            .slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // ---------- Render ----------
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
                    <button
                        onClick={loadHistory}
                        disabled={isLoading}
                        className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2 disabled:opacity-60"
                    >
                        <span
                            className={`material-symbols-outlined text-[18px] ${
                                isLoading ? 'animate-spin' : ''
                            }`}
                        >
                            refresh
                        </span>
                        Refresh
                    </button>

                    <button
                        onClick={handleExport}
                        disabled={history.length === 0}
                        className="h-9 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-on-surface-variant transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            file_download
                        </span>
                        Export Data
                    </button>
                </div>
            </div>

            {/* Error banner */}
            {apiError && (
                <ErrorMessage
                    message={apiError}
                    onDismiss={() => setApiError('')}
                />
            )}

            {/* Stats Cards */}
            <div className="stats-row-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        Total Predictions
                    </span>
                    <div className="kpi-card-value mt-1 font-display-kpi text-display-kpi text-primary tracking-tight">
                        {stats.total}
                    </div>
                </div>

                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        Avg Confidence (R²)
                    </span>
                    <div className="kpi-card-value mt-1 font-display-kpi text-display-kpi text-primary tracking-tight">
                        {stats.avgR2}
                    </div>
                </div>

                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        Best Model
                    </span>
                    <div className="mt-1 font-headline-md text-headline-md font-semibold text-primary truncate">
                        {stats.bestModel}
                    </div>
                    <span className="font-body-sm text-body-sm text-secondary">
                        {stats.bestR2} confidence
                    </span>
                </div>

                <div className="kpi-card p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
                    <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                        Avg Predicted
                    </span>
                    <div className="kpi-card-value mt-1 font-display-kpi text-display-kpi text-primary tracking-tight">
                        {stats.avgKwh}
                    </div>
                    <span className="font-body-sm text-body-sm text-secondary">kWh</span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="filter-chip-row flex items-center gap-2 border border-outline-variant rounded-lg p-1 bg-surface-container-low/80 overflow-x-auto">
                    {models.map((model) => (
                        <button
                            key={model}
                            className={`px-3 py-1 text-sm font-medium rounded transition-colors whitespace-nowrap ${
                                filter === model
                                    ? 'bg-surface-container-lowest shadow-sm text-primary'
                                    : 'text-secondary hover:text-primary'
                            }`}
                            onClick={() => setFilter(model)}
                        >
                            {model === 'all' ? 'All Models' : model}
                        </button>
                    ))}
                </div>

                <div className="filter-search relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search by date, district or value..."
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
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Date
                            </th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Location
                            </th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Predicted
                            </th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Cost (LKR)
                            </th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Confidence (R²)
                            </th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Model
                            </th>
                            <th className="py-3 px-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                        {isLoading && (
                            <tr>
                                <td colSpan={7} className="py-10 text-center">
                                        <span className="material-symbols-outlined text-[32px] text-primary animate-spin">
                                            progress_activity
                                        </span>
                                    <p className="font-body-sm text-body-sm text-secondary mt-2">
                                        Loading history...
                                    </p>
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            filteredData.map((item) => {
                                const r2 = Number(item.confidenceR2 || 0);
                                const isHigh = r2 >= 0.85;
                                const isMedium = r2 >= 0.7 && r2 < 0.85;

                                return (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-surface-container-low/50 transition-colors"
                                    >
                                        <td className="py-3 px-4 font-body-sm text-body-sm text-primary whitespace-nowrap">
                                            {formatDateTime(item.createdAt)}
                                        </td>
                                        <td className="py-3 px-4 font-body-sm text-body-sm text-secondary">
                                            {item.district || '—'}
                                            {item.province ? `, ${item.province}` : ''}
                                        </td>
                                        <td className="py-3 px-4 font-body-sm text-body-sm font-semibold text-primary whitespace-nowrap">
                                            {Number(item.predictedConsumptionKwh).toFixed(4)} kWh
                                        </td>
                                        <td className="py-3 px-4 font-body-sm text-body-sm text-primary whitespace-nowrap">
                                            {Number(item.estimatedCost).toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4">
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                        isHigh
                                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                            : isMedium
                                                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                                : 'bg-red-50 text-red-700 border border-red-200'
                                                    }`}
                                                >
                                                    {(r2 * 100).toFixed(2)}%
                                                </span>
                                        </td>
                                        <td className="py-3 px-4 font-body-sm text-body-sm text-secondary">
                                            {item.selectedModel || '—'}
                                        </td>
                                        <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 font-label-sm text-label-sm ${
                                                        isHigh
                                                            ? 'text-emerald-600'
                                                            : isMedium
                                                                ? 'text-amber-600'
                                                                : 'text-red-600'
                                                    }`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${
                                                            isHigh
                                                                ? 'bg-emerald-500'
                                                                : isMedium
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-red-500'
                                                        }`}
                                                    />
                                                    {isHigh
                                                        ? 'Excellent'
                                                        : isMedium
                                                            ? 'Good'
                                                            : 'Needs Review'}
                                                </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {!isLoading && filteredData.length === 0 && (
                    <div className="py-10 text-center">
                        <span className="material-symbols-outlined text-[40px] text-secondary/40">
                            history
                        </span>
                        <p className="font-body-sm text-body-sm text-secondary mt-3">
                            {history.length === 0
                                ? 'No predictions yet. Run a prediction to see it here.'
                                : 'No predictions found matching your filters.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};