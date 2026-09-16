import { useState, useEffect } from 'react';
import { ModernChart } from '../components/ModernChart';
import { Predictions } from './Prediction';
import { PredictionHistory } from './PredictionHistory';
import { Profile } from './Profile';
import { fetchPredictionHistory } from '../services/historyApi';
import { useCurrentUser } from '../hooks/useCurrentUser';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'predictions', label: 'Predictions', icon: 'online_prediction' },
    { id: 'prediction-history', label: 'History', icon: 'history' },
    { id: 'profile', label: 'Profile', icon: 'person' },
];

// ── Live clock ───────────────────────────────────────────────
const useLiveClock = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return now;
};

export const Dashboard = ({
                              user: fallbackUser,
                              onNavigate,
                              currentPage = 'dashboard',
                              onBackToHome,
                              onLogout,
                          }) => {
    const [timeRange, setTimeRange] = useState('daily');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [livePrediction, setLivePrediction] = useState(null);
    const [history, setHistory] = useState([]);

    const now = useLiveClock();

    //  Real user details from /api/ml/me/{userId}
    const { user: currentUser } = useCurrentUser(fallbackUser);

    // Load latest prediction from history for the dashboard view
    useEffect(() => {
        const userId = localStorage.getItem('smartEnergyUserId');
        if (!userId) return;
        fetchPredictionHistory(userId)
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const sorted = [...data].sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setLivePrediction(sorted[0]);
                    setHistory(sorted);
                }
            })
            .catch(() => {
                /* silent fallback to mock metrics */
            });
    }, []);

    const getHeaderInfo = () => {
        const pageMap = {
            predictions: { title: 'Predictions', subtitle: 'ML Load Forecasting' },
            'prediction-history': { title: 'History', subtitle: 'Forecast Performance' },
            profile: { title: 'Profile', subtitle: 'Account Settings' },
            dashboard: { title: 'Dashboard', subtitle: 'Operational Overview' },
        };
        return pageMap[currentPage] || pageMap.dashboard;
    };

    const headerInfo = getHeaderInfo();

    const handleNavClick = (id) => {
        onNavigate?.(id);
        setSidebarOpen(false);
    };

    const handleExit = () => {

        setSidebarOpen(false);
        // Clear auth + user data, then go home
        if (onLogout) {
            localStorage.clear();
            localStorage.removeItem('token');
            onLogout();
        } else {
            onBackToHome?.();
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'predictions':
                return <Predictions />;
            case 'prediction-history':
                return <PredictionHistory />;
            case 'profile':
                return <Profile user={currentUser} />;
            default:
                return (
                    <DashboardContent
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                        user={currentUser}
                        now={now}
                        livePrediction={livePrediction}
                        history={history}
                        onNavigate={onNavigate}
                    />
                );
        }
    };

    return (
        <div className="flex min-h-screen bg-surface-container-lowest">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`dashboard-sidebar fixed top-0 left-0 bottom-0 w-64 flex flex-col justify-between p-4 border-r border-outline-variant z-50 bg-surface-container-lowest ${
                    sidebarOpen ? 'is-open' : ''
                }`}
            >
                <div className="flex flex-col gap-6">
                    <div className="sidebar-brand-row px-3 pt-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[20px]">bolt</span>
                            </div>
                            <div className="sidebar-label-text">
                                <h1 className="font-headline-sm text-headline-sm font-semibold text-primary tracking-tight">
                                    SmartEnergy AI
                                </h1>
                                <p className="font-label-sm text-label-sm text-secondary font-medium">
                                    Precision Telemetry
                                </p>
                            </div>
                        </div>
                        <button
                            className="md:hidden text-secondary hover:text-primary p-1 flex-shrink-0"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <span className="material-symbols-outlined text-[22px]">close</span>
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={`flex items-center gap-3 px-3 py-2 font-label-md text-label-md font-medium rounded-lg transition-colors w-full text-left ${
                                    currentPage === item.id
                                        ? 'bg-surface-container-low text-primary font-semibold'
                                        : 'text-secondary hover:text-primary hover:bg-surface-container-low'
                                }`}
                                onClick={() => handleNavClick(item.id)}
                            >
                                <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                                    {item.icon}
                                </span>
                                <span className="sidebar-label-text">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Footer — real user from /api/ml/me/{userId} */}
                <div className="pt-4 border-t border-outline-variant">
                    <div className="sidebar-footer-user flex items-center justify-between gap-2 px-2 py-2">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-semibold flex-shrink-0">
                                {currentUser?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="sidebar-label-text min-w-0">
                                <div className="font-label-md text-label-md font-semibold text-primary truncate">
                                    {currentUser?.name || 'User'}
                                </div>
                                <div className="font-body-sm text-body-sm text-secondary truncate">
                                    {currentUser?.email || 'Household Admin'}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleExit}
                            className="sidebar-exit-btn flex items-center justify-center gap-1.5 p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors flex-shrink-0"
                            title="Log out"
                            aria-label="Log out"
                        >
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="dashboard-main ml-64 flex-1 min-h-screen">
                <header className="dashboard-top-header sticky top-0 z-30 h-16 px-6 flex justify-between items-center bg-surface-container-lowest border-b border-outline-variant">
                    <div className="flex items-center gap-4">
                        <button
                            className="dashboard-mobile-toggle hidden items-center justify-center p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <span className="material-symbols-outlined text-[22px]">menu</span>
                        </button>
                        <h2 className="font-headline-md text-headline-md font-semibold text-primary">
                            {headerInfo.title}
                        </h2>
                        <div className="h-4 w-px bg-outline-variant hidden sm:block"></div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary hidden sm:inline">
                            {headerInfo.subtitle}
                        </span>
                    </div>

                    <div className="dashboard-header-meta flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest">
                            <span className="material-symbols-outlined text-[18px] text-secondary">
                                schedule
                            </span>
                            <div className="flex flex-col leading-tight">
                                <span className="font-label-sm text-label-sm font-semibold text-primary">
                                    {now.toLocaleDateString('en-GB', {
                                        weekday: 'short',
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                                <span className="font-body-sm text-body-sm text-secondary">
                                    {now.toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>

                        <button className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-surface-container-low transition-colors">
                            <span className="material-symbols-outlined text-[20px]">
                                notifications
                            </span>
                        </button>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto p-6 space-y-6">{renderPage()}</div>
            </main>
        </div>
    );
};

/* ────────────────────────────────────────────────────────────
   Dashboard Main Overview View
   All KPIs are derived from real prediction history (or safe
   fallbacks when history is empty).
   ──────────────────────────────────────────────────────────── */
const DashboardContent = ({
                              timeRange,
                              setTimeRange,
                              user,
                              now,
                              livePrediction,
                              history,
                              onNavigate,
                          }) => {
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

    // ── KPI values — all derived from real prediction history ──
    const totalPredictions = history.length;

    const avgPredicted =
        history.length > 0
            ? (
                history.reduce(
                    (s, h) => s + Number(h.predictedConsumptionKwh || 0),
                    0
                ) / history.length
            ).toFixed(2)
            : '—';

    const avgConfidence =
        history.length > 0
            ? (
            (history.reduce(
                    (s, h) => s + Number(h.confidenceR2 || 0),
                    0
                ) /
                history.length) *
            100
        ).toFixed(1) + '%'
            : '—';

    const latestPredicted = livePrediction
        ? Number(livePrediction.predictedConsumptionKwh).toFixed(4)
        : '—';

    const monthlyEstimate = livePrediction?.monthlyPredictedConsumptionKwh
        ? Number(livePrediction.monthlyPredictedConsumptionKwh).toFixed(1)
        : '—';

    const monthlyTarget = 420;
    const monthlyProgress =
        monthlyEstimate !== '—'
            ? Math.min((Number(monthlyEstimate) / monthlyTarget) * 100, 100)
            : 0;

    const predictedModel = livePrediction?.selectedModel || 'No prediction yet';

    const getGreeting = () => {
        const h = now.getHours();
        if (h < 12) return 'Good morning';
        if (h < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <>
            {/* Page header with greeting + live time */}
            <div className="page-header-row flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight">
                        {getGreeting()}, {user?.name || 'User'}
                    </h1>
                    <p className="font-body-md text-body-md text-secondary mt-1">
                        Your household energy overview and ML-powered forecast
                    </p>
                </div>
                <div className="page-header-actions flex items-center gap-3">
                    <button
                        onClick={() => onNavigate?.('predictions')}
                        className="h-9 px-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-md text-label-md font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-2 btn-premium"
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export
                    </button>
                    <button
                        onClick={() => onNavigate?.('predictions')}
                        className="h-9 px-4 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-on-surface-variant transition-colors inline-flex items-center gap-2 shadow-sm btn-premium"
                    >
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                        Predict
                    </button>
                </div>
            </div>

            {/* KPI cards — all real data */}
            <div className="kpi-grid-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                            Total Predictions
                        </span>
                        <span className="material-symbols-outlined text-primary/60 text-[22px]">
                            functions
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {totalPredictions}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
                            entries
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                            history
                        </span>
                        From your prediction history
                    </p>
                </div>

                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                            Latest Predicted
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <span className="material-symbols-outlined text-[12px]">bolt</span>
                            ML
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {latestPredicted}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
                            kWh
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                            model_training
                        </span>
                        {predictedModel}
                    </p>
                </div>

                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                            Avg Predicted
                        </span>
                        <span className="material-symbols-outlined text-primary/60 text-[22px]">
                            show_chart
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {avgPredicted}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
                            kWh
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                            analytics
                        </span>
                        Mean over {totalPredictions} predictions
                    </p>
                </div>

                <div className="kpi-card p-5 rounded-xl border border-outline-variant bg-surface-container-lowest card-hover">
                    <div className="flex items-center justify-between">
                        <span className="kpi-card-title font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                            Avg Confidence
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="material-symbols-outlined text-[12px]">verified</span>
                            R²
                        </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="kpi-card-value font-display-kpi text-display-kpi text-primary tracking-tight">
                            {avgConfidence}
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                            verified
                        </span>
                        Mean model R² score
                    </p>
                </div>
            </div>

            {/* Chart + Latest Prediction Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border border-outline-variant rounded-xl p-6 bg-surface-container-lowest card-hover-glow">
                    <div className="chart-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-outline-variant">
                        <div>
                            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                                Consumption Overview
                            </h3>
                            <p className="font-body-sm text-body-sm text-secondary mt-0.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-secondary">
                                    graphic_eq
                                </span>
                                {timeRange === 'daily'
                                    ? '24h'
                                    : timeRange === 'weekly'
                                        ? '7 days'
                                        : '4 weeks'}{' '}
                                telemetry tracking
                            </p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="filter-chip-row flex p-0.5 rounded-lg border border-outline-variant bg-surface-container-low">
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

                {/* Latest Prediction Panel */}
                <div className="lg:col-span-1 border border-outline-variant rounded-xl p-6 bg-surface-container-lowest flex flex-col justify-between card-hover-glow">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                Latest Prediction
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live
                            </span>
                        </div>

                        {livePrediction ? (
                            <>
                                <div className="font-display-kpi text-display-kpi text-primary tracking-tight">
                                    {Number(livePrediction.predictedConsumptionKwh).toFixed(4)}
                                    <span className="font-headline-sm text-headline-sm text-secondary font-normal ml-2">
                                        kWh
                                    </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-secondary mt-1">
                                    {livePrediction.district}
                                    {livePrediction.province
                                        ? `, ${livePrediction.province}`
                                        : ''}
                                </p>

                                <div className="space-y-2.5 pt-4 mt-4 border-t border-outline-variant/40">
                                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                                        <span className="text-secondary">Estimated Cost</span>
                                        <span className="font-semibold text-emerald-600">
                                            LKR{' '}
                                            {Number(livePrediction.estimatedCost).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                                        <span className="text-secondary">Model</span>
                                        <span className="font-semibold text-primary">
                                            {livePrediction.selectedModel || '—'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                                        <span className="text-secondary">Confidence (R²)</span>
                                        <span className="font-semibold text-primary">
                                            {Number(livePrediction.confidenceR2).toFixed(4)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between font-label-sm text-label-sm">
                                        <span className="text-secondary">Monthly Est.</span>
                                        <span className="font-semibold text-primary">
                                            {Number(
                                                livePrediction.monthlyPredictedConsumptionKwh
                                            ).toFixed(2)}{' '}
                                            kWh
                                        </span>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-outline-variant/40">
                                        <div className="flex items-center justify-between font-label-sm text-label-sm mb-1">
                                            <span className="text-secondary">
                                                Monthly Progress
                                            </span>
                                            <span className="font-semibold text-primary">
                                                {monthlyProgress.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${monthlyProgress}%` }}
                                            />
                                        </div>
                                        <p className="font-body-sm text-body-sm text-secondary mt-1">
                                            Target: {monthlyTarget} kWh
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <span className="material-symbols-outlined text-[48px] text-secondary/40">
                                    online_prediction
                                </span>
                                <p className="font-body-sm text-body-sm text-secondary mt-3">
                                    No predictions yet. Run your first forecast.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-outline-variant/40">
                        <button
                            onClick={() => onNavigate?.('predictions')}
                            className="btn-premium w-full py-2 px-3 rounded-lg bg-primary text-on-primary text-xs font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-sm">auto_mode</span>
                            <span>Run New Prediction</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Prediction History preview */}
            {history.length > 0 && (
                <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-lowest card-hover-glow">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                                Recent Predictions
                            </h3>
                            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                                Your latest forecast entries
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate?.('prediction-history')}
                            className="h-8 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-label-sm text-label-sm font-medium hover:bg-surface-container-low transition-colors inline-flex items-center gap-1.5"
                        >
                            View All
                            <span className="material-symbols-outlined text-[16px]">
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-outline-variant">
                            <tr>
                                <th className="py-2.5 px-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="py-2.5 px-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="py-2.5 px-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                    Predicted
                                </th>
                                <th className="py-2.5 px-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                    Cost (LKR)
                                </th>
                                <th className="py-2.5 px-3 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                                    R²
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant">
                            {history.slice(0, 5).map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-surface-container-low/50 transition-colors"
                                >
                                    <td className="py-2.5 px-3 font-body-sm text-body-sm text-primary whitespace-nowrap">
                                        {new Date(item.createdAt).toLocaleDateString(
                                            'en-GB',
                                            {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }
                                        )}
                                    </td>
                                    <td className="py-2.5 px-3 font-body-sm text-body-sm text-secondary">
                                        {item.district || '—'}
                                    </td>
                                    <td className="py-2.5 px-3 font-body-sm text-body-sm font-semibold text-primary whitespace-nowrap">
                                        {Number(item.predictedConsumptionKwh).toFixed(4)} kWh
                                    </td>
                                    <td className="py-2.5 px-3 font-body-sm text-body-sm text-primary whitespace-nowrap">
                                        {Number(item.estimatedCost).toFixed(2)}
                                    </td>
                                    <td className="py-2.5 px-3">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                    Number(item.confidenceR2) >= 0.85
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                }`}
                                            >
                                                {(
                                                    Number(item.confidenceR2) * 100
                                                ).toFixed(2)}
                                                %
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};