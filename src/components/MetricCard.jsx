export const MetricCard = ({
                               title,
                               value,
                               unit,
                               badge,
                               footer,
                               trend,
                               children
                           }) => {
    const badgeStyles = {
        high: 'bg-red-50 text-red-700 border border-red-200',
        medium: 'bg-surface-container-high text-primary border border-outline-variant',
        low: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        default: 'bg-surface-container-low border border-outline-variant text-secondary',
    };

    return (
        <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest flex flex-col justify-between hover:border-outline transition-colors">
            <div>
                <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            {title}
          </span>
                    {badge && (
                        <span
                            className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-medium ${badgeStyles[badge.type]}`}
                        >
              {badge.text}
            </span>
                    )}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display-kpi text-display-kpi text-primary tracking-tight">
            {value}
          </span>
                    {unit && (
                        <span className="font-headline-sm text-headline-sm text-secondary font-normal">
              {unit}
            </span>
                    )}
                </div>
                {trend && (
                    <div
                        className={`mt-1 text-sm font-medium ${
                            trend.direction === 'up' ? 'text-red-600' : 'text-emerald-600'
                        }`}
                    >
                        {trend.value}
                    </div>
                )}
                {children && <div className="mt-2">{children}</div>}
            </div>
            {footer && <div className="mt-4 pt-3 border-t border-outline-variant">{footer}</div>}
        </div>
    );
};