import  { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ isOpen, onClose, children, className = '' }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e) => {
            if (modalRef.current && e.target === modalRef.current) onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <div
                className={`modal-panel bg-surface-container-lowest rounded-2xl border border-outline-variant w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 ${className}`}
            >
                <button
                    className="absolute top-5 right-5 text-secondary hover:text-primary p-1 rounded-lg hover:bg-surface-container-low transition"
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};