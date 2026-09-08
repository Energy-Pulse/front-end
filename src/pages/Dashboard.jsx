import { useState } from 'react';
import { ModernChart } from '../components/ModernChart';
import { Analytics } from './Analytics';
import { Household } from './HouseholdManagement';
import { Predictions } from './Prediction';
import { PredictionHistory } from './PredictionHistory';
import { Profile } from './Profile';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'predictions', label: 'Predictions', icon: 'online_prediction' },
    { id: 'prediction-history', label: 'History', icon: 'history' },
    { id: 'household', label: 'Household', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'person' },
];

export const Dashboard = ({ user, onNavigate, currentPage = 'dashboard', onBackToHome }) => {
    const [timeRange, setTimeRange] = useState('daily');

    const metrics = {
        today: 12.8,
        predicted: 14.63,
        average: 13.2,
        monthly: 396.4,
    };

    const getHeaderInfo = () => {
        const pageMap = {
            'analytics': { title: 'Analytics', subtitle: 'Data Insights' },
            'household': { title: 'Household', subtitle: 'Device & Member Management' },
            'predictions': { title: 'Predictions', subtitle: 'ML Load Forecasting' },
            'prediction-history': { title: 'History', subtitle: 'Forecast Performance' },
            'profile': { title: 'Profile', subtitle: 'Account Settings' },
            'dashboard': { title: 'Dashboard', subtitle: 'Operational Overview' },
        };
        return pageMap[currentPage] || pageMap.dashboard;
    };

    const headerInfo = getHeaderInfo();

    const renderPage = () => {
        switch (currentPage) {
            case 'analytics':
                return <Analytics />;
            case 'household':
                return <Household />;
            case 'predictions':
                return <Predictions />;
            case 'prediction-history':
                return <PredictionHistory />;
            case 'profile':
                return <Profile user={user} />;
            default:
                return (
                    <DashboardContent
                        metrics={metrics}
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                        user={user}
                    />
                );
        }
    };

    return (
        <div className="flex min-h-screen bg-surface-container-lowest">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 flex flex-col justify-between p-4 border-r border-outline-variant z-40 bg-surface-container-lowest">
                <div className="flex flex-col gap-6">
                    {/* Brand */}
                    <div className="px-3 pt-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">bolt</span>
                        </div>
                        <div>
                            <h1 className="font-headline-sm text-headline-sm font-semibold text-primary tracking-tight">SmartEnergy AI</h1>
                            <p className="font-label-sm text-label-sm text-secondary font-medium">Precision Telemetry</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={`flex items-center gap-3 px-3 py-2 font-label-md text-label-md font-medium rounded-lg transition-colors w-full text-left ${
                                    currentPage === item.id
                                        ? 'bg-surface-container-low text-primary font-semibold'
                                        : 'text-secondary hover:text-primary hover:bg-surface-container-low'
                                }`}
                                onClick={() => onNavigate?.(item.id)}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="pt-4 border-t border-outline-variant flex flex-col gap-2">
                    <button
                        className="flex items-center gap-2 px-3 py-2 text-secondary hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors w-full text-left font-label-md text-label-md"
                        onClick={onBackToHome}
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        <span>Back to Home</span>
                    </button>

                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-semibold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <div className="font-label-md text-label-md font-semibold text-primary">{user?.name || 'User'}</div>
                                <div className="font-body-sm text-body-sm text-secondary">Household Admin</div>
                            </div>
                        </div>
                        <button className="text-secondary hover:text-primary transition-colors" title="Logout">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Section */}
            <main className="ml-64 flex-1 min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-30 h-16 px-6 flex justify-between items-center bg-surface-container-lowest border-b border-outline-variant">
                    <div className="flex items-center gap-4">
                        <h2 className="font-headline-md text-headline-md font-semibold text-primary">
                            {headerInfo.title}
                        </h2>
                        <div className="h-4 w-px bg-outline-variant"></div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                            {headerInfo.subtitle}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary text-label-md font-medium hover:bg-surface-container-low transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px] text-secondary">calendar_today</span>
                            <span>Sep 01 - Sep 07, 2026</span>
                        </div>
                        <button className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                    </div>
                </header>

                {/* Main View Router */}
                <div className="max-w-7xl mx-auto p-6 space-y-6">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

// Subcomponent: Dashboard Main Overview View
const DashboardContent = ({ metrics, timeRange, setTimeRange, user }) => {
    // Different data for each time range
    const chartDataMap = {
        daily: [
            { date: '00:00', actual: 8.4 },
            { date: '04:00', actual: 6.1 },
            { date: '08:00', actual: 15.6 },
            { date: '12:00', actual: 22.8 },
            { date: '16:00', actual: 28.2 },
            { date: '20:00', actual: 18.5 },
            { date: '23:00', actual: 12.0 },
        ],
        weekly: [
            { date: 'Mon', actual: 28.4 },
            { date: 'Tue', actual: 32.1 },
            { date: 'Wed', actual: 35.6 },
            { date: 'Thu', actual: 29.8 },
            { date: 'Fri', actual: 33.2 },
            { date: 'Sat', actual: 38.5 },
            { date: 'Sun', actual: 31.0 },
        ],
        monthly: [
            { date: 'W1', actual: 228.4 },
            { date: 'W2', actual: 245.1 },
            { date: 'W3', actual: 268.6 },
            { date: 'W4', actual: 252.8 },
        ],
    };

    const currentChartData = chartDataMap[timeRange] || chartDataMap.daily;

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        Good evening, {user?.name || 'User'}
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Your household energy overview and ML-powered forecast
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2 btn-premium">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export
                    </button>
                    <button className="h-9 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-on-surface-variant transition-colors inline-flex items-center gap-2 shadow-sm btn-premium">
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                        Predict
                    </button>
                </div>
            </div>

            {/* KPI Cards with Modern styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Today's Usage</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="material-symbols-outlined text-[12px]">trending_up</span>
                            +2.4%
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display-kpi text-display-kpi text-primary tracking-tight">{metrics.today}</span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">kWh</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
                        Peak at 18:30
                    </p>
                </div>

                <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Predicted</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <span className="material-symbols-outlined text-[12px]">warning</span>
                            High Usage
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display-kpi text-display-kpi text-primary tracking-tight">{metrics.predicted}</span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">kWh</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">model_training</span>
                        Random Forest v1.2
                    </p>
                </div>

                <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Average</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant">
                            <span className="material-symbols-outlined text-[12px]">trending_down</span>
                            -1.8%
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display-kpi text-display-kpi text-primary tracking-tight">{metrics.average}</span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">kWh</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">hourglass_top</span>
                        Per hour
                    </p>
                </div>

                <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Monthly</span>
                        <span className="text-xs font-medium text-secondary">Target: 420</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display-kpi text-display-kpi text-primary tracking-tight">{metrics.monthly}</span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">kWh</span>
                    </div>
                    <div className="mt-2">
                        <div className="flex items-center justify-between font-body-sm text-body-sm text-secondary mb-1">
                            <span>Progress</span>
                            <span>94.3%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                style={{ width: '94.3%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section with Modern Chart */}
            <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest card-hover-glow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-outline-variant">
                    <div>
                        <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">Consumption Overview</h3>
                        <p className="font-body-sm text-body-sm text-secondary mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-secondary">graphic_eq</span>
                            {timeRange === 'daily' ? '24h' : timeRange === 'weekly' ? '7 days' : '4 weeks'} telemetry tracking
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex p-0.5 rounded-lg border border-outline-variant bg-surface-container-low">
                            {['daily', 'weekly', 'monthly'].map((range) => (
                                <button
                                    key={range}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
                                        timeRange === range
                                            ? 'bg-surface-container-lowest text-primary shadow-sm'
                                            : 'text-secondary hover:text-primary hover:bg-surface-container-low/50'
                                    }`}
                                    onClick={() => setTimeRange(range)}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-secondary font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            <span>Live</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-72 mt-4">
                    <ModernChart
                        data={currentChartData}
                        height={250}
                        showForecast={timeRange === 'daily'}
                        showGradient={true}
                        showPoints={true}
                        color="#000000"
                        forecastColor="#71717a"
                    />
                </div>
            </div>
        </>
    );
};