import { ReactNode } from "react";

export type ButtonProps = {
  type?: 'primary' | 'default' | 'secondary';
  htmlType?: 'submit' | 'reset' | 'button';
  icon?: string;
  link?: boolean;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}