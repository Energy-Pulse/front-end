import { SectionWrapper } from './SectionWrapper';

export const ContactSection = () => {
    return (
        <SectionWrapper id="contact" className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Contact Us
          </span>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-primary mt-1 mb-3">
                        <span className="gradient-text">Ready to get</span>{' '}
                        <span className="gradient-text-accent">started?</span>
                    </h2>
                    <p className="font-body-md text-body-md text-secondary">
                        Have questions? We'd love to hear from you. Our team is ready to help you optimize your energy management.
                    </p>
                </div>
                <div className="glass-image rounded-2xl p-8 md:p-12 border border-outline-variant/40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <form className="space-y-4">
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Inquiry about SmartEnergy AI"
                                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        rows="3"
                                        placeholder="Tell us how we can help..."
                                        className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-10 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Send Message</span>
                                    <span className="material-symbols-outlined text-base">send</span>
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col justify-between space-y-6">
                            <div>
                                <h4 className="font-headline-sm text-headline-sm font-semibold text-primary mb-2">
                                    Get in touch
                                </h4>
                                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                                    Our team is available Monday through Friday, 9am to 6pm EST. We typically respond
                                    within 24 hours.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">email</span>
                                    <span className="font-body-md text-body-md text-secondary">hello@smartenergy.ai</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">phone</span>
                                    <span className="font-body-md text-body-md text-secondary">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    <span className="font-body-md text-body-md text-secondary">San Francisco, CA</span>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-outline-variant/40">
                                <a href="#" className="w-10 h-10 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                                    <span className="material-symbols-outlined text-primary">link</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                                    <span className="material-symbols-outlined text-primary">link</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors">
                                    <span className="material-symbols-outlined text-primary">link</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};