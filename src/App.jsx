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
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user] = useState({ name: 'Alex Morgan', email: 'alex@example.com' });
  const { scrollToSection } = useSection();

  const handleNavigate = (page) => setCurrentPage(page);
  const handleBackToHome = () => setShowDashboard(false);

  return (
      <Background variant="unsplash">
        {showDashboard ? (
            <Dashboard
                user={user}
                onNavigate={handleNavigate}
                currentPage={currentPage}
                onBackToHome={handleBackToHome}
            />
        ) : (
            <>
              <Header
                  onSignIn={() => setShowLoginModal(true)}
                  onGetStarted={() => setShowRegisterModal(true)}
                  onNavigateToDashboard={() => setShowDashboard(true)}
                  onScrollToSection={scrollToSection}
              />
              <LandingPage
                  onShowRegisterModal={() => setShowRegisterModal(true)}
                  onShowDashboard={() => setShowDashboard(true)}
              />
              <footer className="relative z-10 border-t border-outline-variant/30 glass-image py-12">
                <div className="max-w-7xl mx-auto px-6 text-center font-body-sm text-body-sm text-secondary">
                  <p>© 2026 SmartEnergy AI Inc. All rights reserved.</p>
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
            onLogin={() => setShowLoginModal(false)}
        />

        <RegisterModal
            isOpen={showRegisterModal}
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
            onRegister={() => setShowRegisterModal(false)}
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