import React, { FC } from 'react';
import { InputProps } from '@frontegg/react-core';
import { WithInput } from './Input';
import { Form as SemanticForm, TextArea as SemanticTextArea, Input as SemanticInput } from 'semantic-ui-react';

export const Input: FC<InputProps> = (props) => {
  const { inForm = false } = props;
  const InputComponent = pickInputComponent(inForm);
  return <InputComponent {...props} />;
};

const pickInputComponent = (inForm: boolean) => {
  if (inForm) {
    return WithInput(SemanticForm.Input);
  }

  return WithInput(SemanticInput);
};
