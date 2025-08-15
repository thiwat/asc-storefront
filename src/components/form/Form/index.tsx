import React, { useContext, useState, useMemo, useRef } from "react";
import RCForm, { Field, FormProps } from "rc-field-form";
import { FieldData, FormInstance } from "rc-field-form/es/interface";
import _omit from 'lodash/omit'
import _has from 'lodash/has'
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import { FormItemProps } from "./types";
import { t } from "@/utils/translate";

export const FormContext = React.createContext({ errors: {}, form: null, disabled: false });

export const FormItem = ({
  children,
  label,
  className,
  required,
  description,
  noStyle,
  validateTrigger,
  info,
  ...props
}: FormItemProps) => {

  const { disabled, errors } = useContext(FormContext);

  const listName = ''

  const rawName = props.name as string | string[];
  const name = listName
    ? `${listName}__${Array.isArray(rawName) ? rawName.join("__") : rawName}`
    : Array.isArray(rawName)
      ? rawName.join("__")
      : rawName;

  const error = _get(errors, name);
  const isError = error !== undefined;
  const rules = props.rules || [];

  const validateStatus = isError ? "error" : "";

  if (required) {
    rules.push({
      required: true,
      message: t(`common_error_require`),
    });
  }

  const childProps = {
    id: name,
    error,
    validateStatus,
  }

  if (disabled) childProps['disabled'] = disabled

  const Child = React.cloneElement(children as React.ReactElement<any>, childProps);

  return (
    <div
      id={name}
      className={`group ${noStyle ? '' : 'mb-2'} text-font ${validateStatus ? "field-error" : ""} ${className || ""}`}
    >
      <div className={'flex flex-row items-start'}>
        <p className={`body-strong ml-1 ${label ? "mb-1" : ""}`}>
          {label}{" "}
          {!!required && !!label && (
            <span className="text-error">{'*'}</span>
          )}
        </p>
      </div>
      {!!description &&
        <div
          className={`text-font-light text-[12px] ml-1 mb-2`}
        >
          {description}
        </div>
      }
      <Field {...props} rules={rules} validateTrigger={validateTrigger}>
        {Child}
      </Field>
      {!noStyle &&
        <>
          <div
            className={`text-error text-[12px] h-2 ml-1`}
          >
            {error}
          </div>
        </>
      }
    </div>
  );
};

const Form = ({
  children,
  form,
  disabled,
  onFieldsChange,
  onFinishFailed,
  ...props
}: FormProps & { disabled?: boolean }) => {

  const [errors, setErrors] = useState({});
  const memoError = useMemo(() => ({ errors }), [errors]);

  const isFocus = useRef<boolean>(false);

  const handleOnFinishFailed = (data) => {
    const { errorFields } = data;
    const res = {};
    for (const error of errorFields) {
      const name = error.name.join("__");
      const [err] = error.errors;
      res[name] = err;
    }
    setErrors(res);

    if (onFinishFailed) onFinishFailed(data);

    setTimeout(() => {
      const elements = document.getElementsByClassName('field-error')
      if (elements.length > 0) {
        elements[0].scrollIntoView({ behavior: 'auto', block: 'center' })
      }
    }, 10)
  };

  const _setErrors = (error: any, clear?: boolean) => {
    if (clear) {
      return setErrors(prev => _omit(prev, error))
    }
    setErrors(error);
  };

  form["setErrors"] = _setErrors;

  const handleOnFieldsChange = (
    changedFields: FieldData[],
    allFields: FieldData[]
  ) => {
    if (onFieldsChange) onFieldsChange(changedFields, allFields);

    setErrors((prev) => {
      const res = { ...prev };
      let isChange = false
      for (const field of changedFields) {
        const key: string[] = _isArray(field.name)
          ? (field.name as string[])
          : [field.name as string];
        const name = key.join("__");

        if (_has(res, name)) isChange = true
        delete res[name];

        if (!isFocus.current && field.errors.length) {
          res[name] = field.errors[0];
          isChange = true
        }
      }

      return isChange ? res : prev
    });
  };

  const onFocus = () => {
    isFocus.current = true;
  };

  const onBlur = () => {
    isFocus.current = false;
  };

  form['onBlur'] = onBlur

  return (
    <FormContext.Provider value={{ ...memoError, form, disabled }}>
      <RCForm
        form={form}
        validateTrigger={"onBlur"}
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        onFinishFailed={handleOnFinishFailed}
        onFieldsChange={handleOnFieldsChange}
      >
        {children}
      </RCForm>
    </FormContext.Provider>
  );
};

export const FormList = RCForm.List;

export const useWatch = RCForm.useWatch;

export const useForm = (): [
  FormInstance & { onBlur?: () => void, setErrors?: (errors: any, clear?: boolean) => void }
] => {
  const [form] = RCForm.useForm();
  return [form];
};

export default Form;
