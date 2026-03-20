import clsx from 'clsx';
import ui from '../ui.module.css';

/**
 * Reusable UI button component.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content (text or elements).
 * @param {'button'|'submit'|'reset'} [props.type='button'] - HTML button type.
 * @param {'primary'|'secondary'} [props.variant='primary'] - Visual style variant.
 * @param {boolean} [props.disabled=false] - Disables the button.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick] - Click handler.
 */

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        ui.shared,
        ui[variant],
        disabled && ui.disabled,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
