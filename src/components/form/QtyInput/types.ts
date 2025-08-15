export type QtyInputProps = {
  min: number;
  max: number;
  value?: number;
  onChange?: (value: number) => void;
}