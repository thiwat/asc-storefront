export type UploadProps = {
  name: string;
  value?: any;
  path?: string;
  max?: number;
  disabled?: boolean;
  isFile?: boolean;
  accept?: string[];
  description?: string;
  resizable?: boolean;
  onBlur?: () => void;
  onChange?: (value: any) => void;
}

export type PreviewModalProps = {
  data?: any;
  open?: boolean;
  onClose?: () => void;
}