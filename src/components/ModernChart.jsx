import { useMemo } from 'react';

export const ModernChart = ({
                                data = [],
                                height = 200,
                                showForecast = true,
                                showGradient = true,
                                showPoints = true,
                                color = '#000000',
                                forecastColor = '#71717a'
                            }) => {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) {
            return { points: [], maxValue: 1, minValue: 0, chartWidth: 700, chartHeight: height };
        }

        const values = data.map(d => d.actual || 0);
        const maxValue = Math.max(...values, 1);
        const minValue = Math.min(...values, 0);
        const range = maxValue - minValue || 1;

        const padding = { top: 20, bottom: 30, left: 20, right: 20 };
        const chartWidth = 700;
        const chartHeight = height;

        const points = data.map((d, i) => {
            const divisor = data.length > 1 ? data.length - 1 : 1;
            const x = padding.left + (i / divisor) * (chartWidth - padding.left - padding.right);
            const y = padding.top + ((maxValue - (d.actual || 0)) / range) * (chartHeight - padding.top - padding.bottom);
            return { x, y, data: d };
        });

        return { points, maxValue, minValue, chartWidth, chartHeight, padding };
    }, [data, height]);

    const actualPoints = chartData.points.filter(p => !p.data.isForecast);
    const forecastPoints = chartData.points.filter(p => p.data.isForecast);

    // Build path for actual data
    const actualPath = actualPoints
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)},${p.y.toFixed(2)}`)
        .join(' ');

    // Build path for forecast data
    let forecastPath = '';
    if (showForecast && forecastPoints.length > 0 && actualPoints.length > 0) {
        const lastActual = actualPoints[actualPoints.length - 1];
        const forecastPathStr = forecastPoints.map(p => `L ${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
        forecastPath = `M ${lastActual.x.toFixed(2)},${lastActual.y.toFixed(2)} ${forecastPathStr}`;
    }

    // Area path for gradient fill
    const areaPoints = [...actualPoints];
    if (showForecast && forecastPoints.length > 0) {
        areaPoints.push(...forecastPoints);
    }

    const areaPath = areaPoints.length > 0
        ? `M ${areaPoints[0].x.toFixed(2)},${chartData.chartHeight - chartData.padding.bottom} ` +
        areaPoints.map(p => `L ${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') +
        ` L ${areaPoints[areaPoints.length - 1].x.toFixed(2)},${chartData.chartHeight - chartData.padding.bottom} Z`
        : '';

    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-full">
            <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${chartData.chartWidth} ${chartData.chartHeight}`}
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((percent, i) => {
                    const y = chartData.padding.top + (percent / 100) * (chartData.chartHeight - chartData.padding.top - chartData.padding.bottom);
                    const value = chartData.maxValue - (percent / 100) * (chartData.maxValue - chartData.minValue);
                    return (
                        <g key={i}>
                            <line
                                x1={chartData.padding.left}
                                x2={chartData.chartWidth - chartData.padding.right}
                                y1={y}
                                y2={y}
                                stroke="#e5e2e1"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                opacity="0.5"
                            />
                            <text
                                x={2}
                                y={y + 4}
                                fontSize="9"
                                fill="#a1a1aa"
                                textAnchor="start"
                                className="font-medium"
                            >
                                {value.toFixed(1)}
                            </text>
                        </g>
                    );
                })}

                {/* Gradient area under the curve */}
                {showGradient && areaPath && (
                    <>
                        <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                                <stop offset="100%" stopColor={color} stopOpacity="0.01" />
                            </linearGradient>
                        </defs>
                        <path
                            d={areaPath}
                            fill="url(#areaGradient)"
                            stroke="none"
                        />
                    </>
                )}

                {/* Forecast area */}
                {showForecast && forecastPoints.length > 0 && (
                    <>
                        <defs>
                            <linearGradient id="forecastAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={forecastColor} stopOpacity="0.1" />
                                <stop offset="100%" stopColor={forecastColor} stopOpacity="0.01" />
                            </linearGradient>
                        </defs>
                        <path
                            d={`M ${actualPoints[actualPoints.length - 1].x.toFixed(2)},${chartData.chartHeight - chartData.padding.bottom} ` +
                                forecastPoints.map(p => `L ${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') +
                                ` L ${forecastPoints[forecastPoints.length - 1].x.toFixed(2)},${chartData.chartHeight - chartData.padding.bottom} Z`}
                            fill="url(#forecastAreaGradient)"
                            stroke="none"
                        />
                    </>
                )}

                {/* Actual line */}
                {actualPath && (
                    <path
                        d={actualPath}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}

                {/* Forecast line */}
                {showForecast && forecastPath && (
                    <path
                        d={forecastPath}
                        fill="none"
                        stroke={forecastColor}
                        strokeDasharray="6 4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}

                {/* Data points */}
                {showPoints && actualPoints.map((p, i) => (
                    <circle
                        key={`actual-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill={color}
                        stroke="white"
                        strokeWidth="2"
                        className="transition-all duration-200 cursor-pointer hover:r-6"
                    />
                ))}

                {/* Forecast data points */}
                {showForecast && forecastPoints.map((p, i) => (
                    <circle
                        key={`forecast-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill={forecastColor}
                        stroke="white"
                        strokeWidth="1.5"
                        className="transition-all duration-200"
                    />
                ))}

                {/* X-axis labels */}
                {chartData.points.map((p, i) => (
                    <text
                        key={`label-${i}`}
                        x={p.x}
                        y={chartData.chartHeight - 4}
                        fontSize="10"
                        fill="#a1a1aa"
                        textAnchor="middle"
                        className="font-medium"
                    >
                        {p.data.date}
                    </text>
                ))}

                {/* Current value highlight */}
                {actualPoints.length > 0 && (
                    <line
                        x1={actualPoints[actualPoints.length - 1].x}
                        x2={actualPoints[actualPoints.length - 1].x}
                        y1={actualPoints[actualPoints.length - 1].y - 8}
                        y2={actualPoints[actualPoints.length - 1].y + 8}
                        stroke={color}
                        strokeWidth="1.5"
                        opacity="0.3"
                    />
                )}
            </svg>
        </div>
    );
};