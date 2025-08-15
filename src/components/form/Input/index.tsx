import { InputProps } from "./types";

const Input = ({
  value,
  disabled,
  placeholder,
  format,
  normalize,
  onBlur,
  onChange
}: InputProps) => {

  const _onChange = (e) => {
    const newValue = e.target.value || ''
    normalize
      ? onChange(normalize(newValue))
      : onChange(newValue)
  }

  return (
    <input
      value={format ? format(value || '') : value || ""}
      autoComplete={'off'}
      className={`w-full placeholder-font-disabled flex-1 outline-none text-[14px] h-[34px] rounded-lg border border-line px-3 disabled:bg-disabled focus-within:border-primary group-[.field-error]:border-error`}
      onBlur={onBlur}
      onChange={_onChange}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}

export default Input