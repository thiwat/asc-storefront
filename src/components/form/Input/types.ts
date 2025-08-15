export type InputProps = {
  value?: any;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  format?: (value: string) => string;
  normalize?: (value: string) => string;
  onBlur?: () => void;
  onChange?: (value: any) => void;
};
