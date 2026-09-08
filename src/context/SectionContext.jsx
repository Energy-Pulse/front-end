import { createContext, useRef, useState } from 'react';

export const SectionContext = createContext(null);

export const SectionProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('hero');
    const sectionRefs = useRef({});

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    const registerSection = (id, ref) => {
        sectionRefs.current[id] = ref;
    };

    const getSectionRefs = () => sectionRefs.current;

    const value = {
        activeSection,
        setActiveSection,
        scrollToSection,
        registerSection,
        getSectionRefs,
    };

    return (
        <SectionContext.Provider value={value}>
            {children}
        </SectionContext.Provider>
    );
};