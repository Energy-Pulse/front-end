import 'react';

export const Background = ({
                               children,
                               variant = 'default',
                               className = ''
                           }) => {
    const variants = {
        default: 'bg-smartenergy-image',
        overlay: 'bg-smartenergy-energy-overlay',
        unsplash: 'bg-smartenergy-unsplash',
        city: 'bg-smartenergy-city',
        tech: 'bg-smartenergy-tech',
        clean: 'bg-smartenergy-clean',
    };

    return (
        <div className={`${variants[variant] || variants.default} ${className} relative min-h-screen`}>
            {children}
        </div>
    );
};