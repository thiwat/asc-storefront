export type UploadHookProps = {
  accept?: string[];
  data?: any;
  path?: string;
  resizable?: boolean;
  onBlur?: () => void;
  onChange?: (value: any) => void;
}