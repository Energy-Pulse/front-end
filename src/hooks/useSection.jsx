import { useContext } from 'react';
import { SectionContext } from '../context/SectionContext';

export const useSection = () => {
    const context = useContext(SectionContext);//consume here
    if (!context) {
        throw new Error('useSection must be used within a SectionProvider');
    }
    return context;
};