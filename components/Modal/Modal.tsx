"use client"

import css from './Modal.module.css';
import { useEffect, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
   children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>
    , document.body);
}

export default Modal;