import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../../../assets/icons/close.svg?react';
import Button from '../Button/Button';

import css from './ConfirmModal.module.css';

/**
 * @typedef {Object} ConfirmModalProps
 * @property {() => void} onClose - Called when the modal should close.
 * @property {string} title - Main title text displayed in the modal.
 * @property {string} descr - Description text displayed below the title.
 * @property {string} confirmButtonText - Label for the confirm action button.
 * @property {string} cancelButtonText - Label for the cancel action button.
 * @property {() => void} onConfirm - Called when the confirm button is clicked.
 * @property {() => void} onCancel - Called when the cancel button is clicked.
 */

/**
 * A confirmation modal dialog rendered via a React portal.
 *
 * @param {ConfirmModalProps} props
 * @returns {JSX.Element}
 */
const ConfirmModal = ({
  onClose,
  title,
  descr,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const titleId = useId();
  const descrId = useId();
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const previousActiveElementRef = useRef(null);
  const modalRoot = document.getElementById('modal-root');

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement;

    const getFocusableElements = () => {
      if (!modalRef.current) return [];

      return Array.from(
        modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled'));
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements();

        if (!focusableElements.length) {
          e.preventDefault();
          modalRef.current?.focus();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const isShiftTab = e.shiftKey;
        const activeElement = document.activeElement;

        if (isShiftTab) {
          if (
            activeElement === firstElement ||
            !modalRef.current?.contains(activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else if (
          activeElement === lastElement ||
          !modalRef.current?.contains(activeElement)
        ) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    closeButtonRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';

      if (previousActiveElementRef.current instanceof HTMLElement) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [onClose]);

  if (!modalRoot) return null;

  //JSX
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descrId}
    >
      <div className={css.modal} ref={modalRef} tabIndex={-1}>
        <button
          ref={closeButtonRef}
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        <h2 className={css.title} id={titleId}>
          {title}
        </h2>
        <p className={css.descr} id={descrId}>
          {descr}
        </p>

        <div className={css.btnWrap}>
          <Button
            className={css.confirmBtn}
            variant="secondary"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
          <Button className={css.cancelBtn} onClick={onCancel}>
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ConfirmModal;
