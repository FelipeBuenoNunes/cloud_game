/* eslint-disable react/display-name */
/* eslint-disable react/react-in-jsx-scope */
import { MouseEventHandler } from 'react';

interface PropTypes {
  className?: string;
  category: 'primary' | 'secondary' | 'cancel';
  label: string;
  type?: 'button' | 'submit';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Archive: src/components/Button.tsx
 *
 * Description: Button component
 *
 * Date: 2022/07/22
 *
 * Author: Rey
 */

export const ModalButton = ({
  className,
  label,
  type = 'button',
  onClick,
  category,
}: PropTypes) => (
  <button
    className={`h-10 px-3 text-btn-text rounded   ${className}`}
    type={type}
    onClick={onClick}
  >
    {label}
  </button>
);
