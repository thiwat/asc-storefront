import { FieldProps } from 'rc-field-form/es/Field';
import React from 'react';

export type FormItemProps = FieldProps & {
  label?: string | React.ReactNode | React.ReactNode[];
  className?: string;
  required?: boolean;
  description?: React.ReactNode | React.ReactNode[];
  validateTrigger?: string | string[];
  noStyle?: boolean;
  info?: string;
  onFieldChange?: any;
}