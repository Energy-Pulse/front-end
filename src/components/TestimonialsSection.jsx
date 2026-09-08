import { SectionWrapper } from './SectionWrapper';

const testimonialsData = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Property Manager',
        company: 'GreenLeaf Apartments',
        image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=000000&color=fff&size=60',
        quote: 'SmartEnergy AI reduced our building\'s energy costs by 23% in the first quarter. The ML predictions are incredibly accurate — we\'ve eliminated peak demand charges entirely.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Michael Torres',
        role: 'CTO',
        company: 'EcoTech Solutions',
        image: 'https://ui-avatars.com/api/?name=Michael+Torres&background=5d5e66&color=fff&size=60',
        quote: 'The telemetry precision is unmatched. We\'re using SmartEnergy AI to optimize our EV charging network, and the ROI has been phenomenal.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Dr. Emily Park',
        role: 'Energy Researcher',
        company: 'Stanford Energy Lab',
        image: 'https://ui-avatars.com/api/?name=Emily+Park&background=000000&color=fff&size=60',
        quote: 'As a researcher, I appreciate the transparency of the ML models. The R² scores and feature importance metrics give us confidence in every prediction.',
        rating: 5,
    },
];

export const TestimonialsSection = () => {
    return (
        <SectionWrapper id="testimonials" className="py-20 border-b border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Testimonials
          </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-3">
                        <span className="gradient-text">What our users</span>{' '}
                        <span className="gradient-text-accent">are saying</span>
                    </h2>
                    <p className="font-body-md text-body-md text-secondary">
                        Hear from real users who transformed their energy management with SmartEnergy AI.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonialsData.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="glass-image rounded-xl p-8 border border-outline-variant/40 card-hover flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full border-2 border-outline-variant/40"
                                />
                                <div>
                                    <div className="font-headline-sm text-headline-sm font-semibold text-primary">
                                        {testimonial.name}
                                    </div>
                                    <div className="font-label-sm text-label-sm text-secondary">
                                        {testimonial.role} · {testimonial.company}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-0.5 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-amber-500 text-sm">
                    {i < testimonial.rating ? 'star' : 'star_border'}
                  </span>
                                ))}
                            </div>
                            <p className="font-body-md text-body-md text-secondary leading-relaxed flex-1">
                                "{testimonial.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};