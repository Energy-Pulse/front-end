import 'react';

export const Badge = ({ type, children, className = '' }) => {
    const styles = {
        high: 'bg-red-50 text-red-700 border border-red-200',
        medium: 'bg-surface-container-high text-primary border border-outline-variant',
        low: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        default: 'bg-surface-container-low text-secondary border border-outline-variant',
    };

    return (
        <span
            className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-medium ${styles[type]} ${className}`}
        >
      {children}
    </span>
    );
};