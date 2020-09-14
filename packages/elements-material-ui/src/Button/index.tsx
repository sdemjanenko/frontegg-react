import React from 'react';
import { ButtonProps } from '@frontegg/react-core';
import MaterialButton, { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import classNames from 'classnames';
import './style.scss';
import { Loader } from '../Loader';

const mapper = (props: ButtonProps): MaterialButtonProps => {
  const { className, inForm, variant, fullWidth, loading, disabled, type, onClick, isCancel, size } = props;
  return {
    fullWidth,
    onClick,
    type,
    size,
    disabled: loading || disabled,
    variant: isCancel ? 'text' : 'contained',
    color: variant === 'danger' ? 'default' : variant,
    classes: {
      root: classNames('fe-button', className, {
        'fe-button__danger': variant === 'danger',
        'fe-button__in-form': inForm,
      }),
    },
  };
};

export class Button extends React.Component<ButtonProps> {
  render() {
    const { children, loading } = this.props;
    const buttonProps = mapper(this.props);
    return (
      <MaterialButton {...buttonProps}>
        {children}
        {loading && <Loader />}
      </MaterialButton>
    );
  }
}
