import React, { ComponentType, FC, useCallback, useState } from 'react';
import { Icon, InputProps, Size } from '@frontegg/react-core';
import {
  Form,
  Input as SemanticInput,
  TextArea as SemanticTextArea,
  InputProps as SemanticInputProps,
  Label,
} from 'semantic-ui-react';
import { Button } from '../Button';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import classNames from 'classnames';
import './style.scss';

const feSizeToSemanticSize: { [feSize in Size]: SemanticInputProps['size'] } = {
  small: 'small',
  medium: 'large',
  large: 'big',
};

const prefixCls = 'fe-semantic-input';

const mapper = (props: InputProps): SemanticInputProps | FormInputProps => {
  const {
    className,
    size = 'medium',
    type = 'text',
    inForm,
    fullWidth,
    onSearch,
    label,
    labelButton,
    error,
    multiline,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = useCallback(() => setShowPassword((_) => !_), []);

  return {
    ...rest,
    className: classNames(prefixCls, className),
    fluid: fullWidth,
    size: feSizeToSemanticSize[size],
    type: type === 'password' && showPassword ? 'text' : type,
    error: inForm ? error : !!error,
    icon:
      type === 'password' ? (
        <Icon
          className={`${prefixCls}__icon`}
          name={showPassword ? 'visibility' : 'visibility-off'}
          onClick={toggleShowPassword}
        />
      ) : type === 'search' ? (
        <Icon className={`${prefixCls}__icon`} name='search' onClick={() => onSearch?.(props.value)} />
      ) : undefined,
    label: (
      <div className={`${prefixCls}__labels`}>
        {inForm && label}
        {labelButton && inForm && (
          <label className={`${prefixCls}__label-button`}>
            <Button {...labelButton} />
          </label>
        )}
      </div>
    ),
  } as SemanticInputProps;
};

export const WithInput: (InputComponent: ComponentType) => FC<Omit<InputProps, 'inForm' | 'multi'>> = (
  InputComponent
) => (props) => {
  return <InputComponent {...mapper(props)} />;
};
