import { useEffect, useRef } from 'react';
import { useSection } from '../hooks/useSection';

export const SectionWrapper = ({ id, children, className = '' }) => {
    const { activeSection, registerSection } = useSection();
    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            registerSection(id, sectionRef.current);
        }
    }, [id, registerSection]);

    const isVisible = activeSection === id;

    return (
        <div
            ref={sectionRef}
            id={id}
            className={`${className} ${isVisible ? 'block' : 'hidden'}`}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            {children}
        </div>
    );
};