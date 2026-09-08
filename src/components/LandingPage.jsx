import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { FeaturesSection } from './FeaturesSection';
import { InsightsSection } from './InsightsSection';
import { BenefitsSection } from './BenefitsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { BenchmarksSection } from './BenchmarksSection';
import { ContactSection } from './ContactSection';

export const LandingPage = ({ onShowRegisterModal, onShowDashboard }) => {
    return (
        <main className="flex-1 relative z-10">
            <HeroSection
                onShowRegisterModal={onShowRegisterModal}
                onShowDashboard={onShowDashboard}
            />
            <AboutSection />
            <FeaturesSection />
            <InsightsSection />
            <BenefitsSection />
            <TestimonialsSection />
            <BenchmarksSection />
            <ContactSection />
        </main>
    );
};