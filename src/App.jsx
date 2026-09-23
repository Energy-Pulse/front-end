import { useState } from 'react';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { Background } from './components/Background';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SectionProvider } from './context/SectionContext';
import { useSection } from './hooks/useSection';
import './styles/custom-ui.css';

const AppContent = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');//Navigate to dashboard
    const [user, setUser] = useState(null);
    const { scrollToSection } = useSection();

    const isAuthenticated = () =>
        Boolean(localStorage.getItem('smartEnergyToken'));

    const handleNavigate = (page) => setCurrentPage(page);

    // Just navigates back to landing  does NOT clear auth
    const handleBackToHome = () => setShowDashboard(false);

    // Real logout — clears localStorage resets state, goes home
    const handleLogout = () => {
        localStorage.removeItem('smartEnergyToken');
        localStorage.removeItem('smartEnergyUserId');
        setUser(null);
        setCurrentPage('dashboard');
        setShowDashboard(false);
    };

    // Wrapper used by "Go to Dashboard" buttons — requires auth
    const handleGoToDashboard = () => {
        if (!isAuthenticated()) {
            setShowLoginModal(true);
            return;
        }
        setCurrentPage('dashboard');
        setShowDashboard(true);
    };

    const handleAuthSuccess = (response) => {
        console.log('Auth success:', response);

        if (response?.user) {
            setUser({
                name: response.user.name || response.user.firstName || 'User',
                email: response.user.email || '',
            });
        } else if (response?.email) {
            setUser({
                name: response.name || response.firstName || 'User',
                email: response.email,
            });
        }

        setShowLoginModal(false);
        setShowRegisterModal(false);
        setCurrentPage('dashboard');
        setShowDashboard(true);
    };

    return (
        <Background variant="unsplash">
            {showDashboard ? (
                <Dashboard
                    user={user}
                    onNavigate={handleNavigate}
                    currentPage={currentPage}
                    onBackToHome={handleBackToHome}
                    onLogout={handleLogout}
                />
            ) : (
                <>
                    <Header
                        onSignIn={() => setShowLoginModal(true)}
                        onGetStarted={() => setShowRegisterModal(true)}
                        onNavigateToDashboard={handleGoToDashboard}
                        onScrollToSection={scrollToSection}
                    />
                    <LandingPage
                        onShowRegisterModal={() => setShowRegisterModal(true)}
                        onShowDashboard={handleGoToDashboard}
                    />
                    <footer className="relative z-10 mt-auto border-t border-outline-variant/30 glass-image py-12">
                        <div className="footer-content max-w-7xl mx-auto px-6 text-center font-body-sm text-body-sm text-secondary">
                            <p>© 2026 EnergyPulse Inc. All rights reserved.</p>
                        </div>
                    </footer>
                </>
            )}

            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToRegister={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                }}
                onLogin={handleAuthSuccess}
            />

            <RegisterModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSwitchToLogin={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                }}
                onRegister={handleAuthSuccess}
            />
        </Background>
    );
};

function App() {
    return (
        <SectionProvider>
            <AppContent />
        </SectionProvider>
    );
}

export default App;