import React, {useRef, useImperativeHandle, forwardRef} from 'react';

import type {CheckboxHandles} from '../../types';
import {classNames} from '../../utilities/css';
import {Checkbox} from '../Checkbox';
import type {IndexTableHeadingCheckbox} from '../IndexTable';

import styles from './CheckableButton.scss';

export interface CheckboxProps
  extends Omit<IndexTableHeadingCheckbox, 'checked'> {
  checked?: boolean | 'indeterminate';
}
export interface CheckableButtonProps {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  disabled?: boolean;
  onToggleAll?(): void;
  ariaLive?: 'off' | 'polite';
  checkbox?: (props: CheckboxProps) => React.ReactNode;
}

export const CheckableButton = forwardRef(function CheckableButton(
  {
    accessibilityLabel,
    label = '',
    onToggleAll,
    selected,
    disabled,
    ariaLive,
    checkbox,
  }: CheckableButtonProps,
  ref,
) {
  const checkBoxRef = useRef<CheckboxHandles>(null);

  function focus() {
    checkBoxRef?.current?.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus,
    };
  });

  const className = classNames(styles.CheckableButton);

  return (
    <div className={className} onClick={onToggleAll}>
      <div className={styles.Checkbox}>
        {checkbox ? (
          checkbox?.({
            onChange: onToggleAll,
            checked: selected,
            indeterminate: selected === 'indeterminate',
          })
        ) : (
          <Checkbox
            label={accessibilityLabel}
            labelHidden
            checked={selected}
            disabled={disabled}
            onChange={onToggleAll}
            ref={checkBoxRef}
          />
        )}
      </div>
      <span className={styles.Label} aria-live={ariaLive}>
        {label}
      </span>
    </div>
  );
});
