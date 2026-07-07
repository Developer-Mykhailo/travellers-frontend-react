import { useEffect } from 'react';
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
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  //JSX
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-descr"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        <p className={css.title} id="confirm-modal-title">
          {title}
        </p>
        <p className={css.descr} id="confirm-modal-descr">
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
    document.body
  );
};

export default ConfirmModal;
