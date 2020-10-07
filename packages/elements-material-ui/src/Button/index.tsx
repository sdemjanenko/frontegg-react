import React, { FC } from 'react';
import { ButtonProps } from '@frontegg/react-core';
import { Button as MaterialButton, ButtonProps as MaterialButtonProps, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { Loader } from '../Loader';

const useStyles = makeStyles({
  dangerStyle: {
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-red-7)',
    '&:hover': {
      backgroundColor: 'var(--color-red-8)',
    },
  },
});

const mapper = (props: ButtonProps): MaterialButtonProps => {
  const {
    className,
    inForm,
    variant,
    fullWidth,
    loading,
    disabled,
    type,
    onClick,
    isCancel,
    size,
    ...restProps
  } = props;
  const variantColor = variant === 'danger' || variant === 'disabled' ? 'default' : variant;

  const classes = useStyles();

  return {
    ...restProps,
    fullWidth,
    onClick,
    type,
    size,
    disabled: loading || disabled,
    variant: isCancel ? 'text' : 'contained',
    color: variantColor,
    classes: {
      root: classNames(className, {
        [classes.dangerStyle]: variant === 'danger',
      }),
    },
  };
};

export const Button: FC<ButtonProps> = (props) => {
  const { children, loading } = props;
  const buttonProps = mapper(props);
  return (
    <MaterialButton {...buttonProps}>
      {children}
      {loading && <Loader />}
    </MaterialButton>
  );
};
