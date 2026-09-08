import { ModernChart } from './ModernChart';

export const ConsumptionChart = ({
                                     data = [],
                                     height = 160,
                                     showForecast = true,
                                     color = '#111111',
                                     forecastColor = '#71717a'
                                 }) => {
    // If data is empty, return null (matching original behavior)
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-full">
            <ModernChart
                data={data}
                height={height}
                showForecast={showForecast}
                showGradient={true}
                showPoints={true}
                color={color}
                forecastColor={forecastColor}
                label="Consumption"
                unit="kWh"
            />
        </div>
    );
};