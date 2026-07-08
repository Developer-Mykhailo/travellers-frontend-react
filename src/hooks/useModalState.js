import { useState } from 'react';

/**
 * Manage modal open/close state.
 *
 * @param {boolean} [initialValue=false] - Initial open state of the modal.
 * @returns {{isOpen: boolean, setIsOpen: import('react').Dispatch<import('react').SetStateAction<boolean>>, openModal: function(boolean|function():void):void, closeModal: function(boolean|function():void):void}}
 */
export const useModalState = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openModal = (value = true) => {
    if (typeof value === 'function') {
      value();
      return;
    }

    setIsOpen(Boolean(value));
  };

  const closeModal = (value = false) => {
    if (typeof value === 'function') {
      value();
      return;
    }

    setIsOpen(Boolean(value));
  };

  return { isOpen, setIsOpen, openModal, closeModal };
};
