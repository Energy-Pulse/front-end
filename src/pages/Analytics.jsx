import { useState } from 'react';
import { ConsumptionChart } from '../components/ConsumptionChart';

const dailyData = [
    { date: 'Mon', actual: 28.4 },
    { date: 'Tue', actual: 32.1 },
    { date: 'Wed', actual: 35.6 },
    { date: 'Thu', actual: 29.8 },
    { date: 'Fri', actual: 33.2 },
    { date: 'Sat', actual: 38.5 },
    { date: 'Sun', actual: 31.0 },
];

const weeklyData = [
    { date: 'Week 1', actual: 228.4 },
    { date: 'Week 2', actual: 245.1 },
    { date: 'Week 3', actual: 268.6 },
    { date: 'Week 4', actual: 252.8 },
];

const monthlyData = [
    { date: 'Jan', actual: 820.4 },
    { date: 'Feb', actual: 890.1 },
    { date: 'Mar', actual: 945.6 },
    { date: 'Apr', actual: 920.8 },
    { date: 'May', actual: 1020.5 },
    { date: 'Jun', actual: 1120.2 },
    { date: 'Jul', actual: 1180.9 },
    { date: 'Aug', actual: 1150.3 },
    { date: 'Sep', actual: 980.7 },
];

const timeLabels = {
    daily: { label: 'Daily', icon: 'today' },
    weekly: { label: 'Weekly', icon: 'calendar_view_week' },
    monthly: { label: 'Monthly', icon: 'calendar_month' },
};

export const Analytics = () => {
    const [view, setView] = useState('daily');

    const getData = () => {
        switch (view) {
            case 'daily':
                return { data: dailyData, label: 'Daily', unit: 'kWh' };
            case 'weekly':
                return { data: weeklyData, label: 'Weekly', unit: 'kWh' };
            case 'monthly':
                return { data: monthlyData, label: 'Monthly', unit: 'kWh' };
            default:
                return { data: dailyData, label: 'Daily', unit: 'kWh' };
        }
    };

    const currentData = getData();
    const total = currentData.data.reduce((sum, d) => sum + d.actual, 0);
    const average = total / currentData.data.length;
    const peak = Math.max(...currentData.data.map(d => d.actual));
    const trend = ((currentData.data[currentData.data.length - 1].actual - currentData.data[0].actual) / currentData.data[0].actual * 100).toFixed(1);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="page-header-row flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Energy Analytics
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Deep insights into your consumption patterns and trends
                    </p>
                </div>
                <div className="page-header-actions flex items-center gap-3">
                    <button className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2 btn-premium">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Report
                    </button>
                    <button className="h-9 w-9 rounded-lg border border-outline-variant bg-surface-container-lowest text-secondary hover:text-primary hover:bg-surface-container-low transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="filter-chip-row flex items-center gap-2 border border-outline-variant/40 rounded-lg p-1 bg-surface-container-low/80">
                    {['daily', 'weekly', 'monthly'].map((v) => (
                        <button
                            key={v}
                            className={`px-4 py-1.5 text-sm font-medium rounded transition-all duration-200 flex items-center gap-1.5 ${
                                view === v
                                    ? 'bg-surface-container-lowest shadow-sm text-primary'
                                    : 'text-secondary hover:text-primary hover:bg-surface-container-low/50'
                            }`}
                            onClick={() => setView(v)}
                        >
                            <span className="material-symbols-outlined text-[16px]">{timeLabels[v].icon}</span>
                            {timeLabels[v].label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-secondary font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>Last {view === 'daily' ? '7 days' : view === 'weekly' ? '4 weeks' : '9 months'}</span>
                </div>
            </div>

            {/* KPI Cards with Trend */}
            <div className="kpi-grid-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Total Consumption</span>
                        <span className="material-symbols-outlined text-primary/60 text-[22px]">functions</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {total.toFixed(1)}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
                            {currentData.unit}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            <span className="material-symbols-outlined text-[14px]">{trend >= 0 ? 'trending_up' : 'trending_down'}</span>
                            {Math.abs(trend)}%
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary">vs start</span>
                    </div>
                </div>

                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Average</span>
                        <span className="material-symbols-outlined text-primary/60 text-[22px]">show_chart</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {average.toFixed(1)}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
                            {currentData.unit}
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                        Per {view === 'daily' ? 'day' : view === 'weekly' ? 'week' : 'month'}
                    </p>
                </div>

                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Peak</span>
                        <span className="material-symbols-outlined text-amber-500 text-[22px]">trending_up</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {peak.toFixed(1)}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
                            {currentData.unit}
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                        Highest recorded
                    </p>
                </div>

                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">Data Points</span>
                        <span className="material-symbols-outlined text-primary/60 text-[22px]">data_usage</span>
                    </div>
                    <div className="mt-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {currentData.data.length}
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                        {currentData.label} entries
                    </p>
                </div>
            </div>

            {/* Main Chart */}
            <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest card-hover-glow">
                <div className="chart-header flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                            {currentData.label} Consumption Trend
                        </h3>
                        <p className="font-body-sm text-body-sm text-secondary">
                            {view.charAt(0).toUpperCase() + view.slice(1)} consumption pattern analysis
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                            <span className="font-label-sm text-label-sm text-secondary">Consumption</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-full border border-outline-variant bg-surface-container-low/50 text-primary font-label-sm text-label-sm font-semibold">
                            {view === 'daily' ? '7D' : view === 'weekly' ? '4W' : '9M'}
                        </div>
                    </div>
                </div>
                <div className="w-full h-72">
                    <ConsumptionChart data={currentData.data} height={220} showForecast={false} />
                </div>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </div>
                    <div>
                        <h4 className="font-label-md text-label-md font-semibold text-primary">Lowest Usage</h4>
                        <p className="font-body-sm text-body-sm text-secondary">
                            {currentData.data.reduce((min, d) => d.actual < min.actual ? d : min).actual.toFixed(1)} {currentData.unit}
                            <span className="text-secondary/60 ml-1">
                                ({currentData.data.reduce((min, d) => d.actual < min.actual ? d : min).date})
                            </span>
                        </p>
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">warning</span>
                    </div>
                    <div>
                        <h4 className="font-label-md text-label-md font-semibold text-primary">Peak Alert</h4>
                        <p className="font-body-sm text-body-sm text-secondary">
                            {peak.toFixed(1)} {currentData.unit}
                            <span className="text-secondary/60 ml-1">
                                ({currentData.data.find(d => d.actual === peak).date})
                            </span>
                        </p>
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest/60 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">trending_flat</span>
                    </div>
                    <div>
                        <h4 className="font-label-md text-label-md font-semibold text-primary">Avg Trend</h4>
                        <p className="font-body-sm text-body-sm text-secondary">
                            {trend >= 0 ? 'Upward' : 'Downward'} trend
                            <span className="text-secondary/60 ml-1">({Math.abs(trend)}%)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};