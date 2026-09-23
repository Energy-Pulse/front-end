import { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { submitContactForm } from '../services/contactApi';

const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export const ContactSection = () => {
    const [formData, setFormData] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            setIsSubmitting(true);
            await submitContactForm(formData);
            setSuccessMessage('Your message was sent successfully. Our team will get back to you soon.');
            setFormData(initialForm);
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <div className="contact-card glass-image rounded-2xl p-8 md:p-12 border border-outline-variant/40">
                    <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div><form className="contact-form space-y-4" onSubmit={handleSubmit}>

                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Inquiry about EnergyPulse"
                                        required
                                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-label-sm text-label-sm font-medium text-primary mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        rows="3"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help..."
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-primary font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-none"
                                    />
                                </div>

                                {errorMessage && (
                                    <div className="rounded-lg border border-red-500/30 bg-red-50 px-3 py-2 text-sm text-red-700">
                                        {errorMessage}
                                    </div>
                                )}

                                {successMessage && (
                                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                        {successMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-10 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-medium hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
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
                                    <span className="font-body-md text-body-md text-secondary">hello@EnergyPulse.com</span>
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
                            <div className="contact-social flex gap-3 pt-4 border-t border-outline-variant/40">
                                {/* Facebook */}
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="social-icon w-10 h-10 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary" aria-hidden="true">
                                        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.9h2.78l-.44 2.91h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94Z" />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="social-icon w-10 h-10 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary" aria-hidden="true">
                                        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-2.04a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
                                    </svg>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="social-icon w-10 h-10 rounded-lg border border-outline-variant/40 flex items-center justify-center hover:bg-surface-container-low transition-colors"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary" aria-hidden="true">
                                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};