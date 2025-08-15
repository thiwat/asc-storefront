import Icon from "../Icon";
import { ButtonProps } from "./types";

const TYPE_STYLE = {
  primary: 'bg-primary text-white hover:bg-opacity-90 disabled:bg-opacity-50',
  secondary: 'bg-secondary text-white hover:bg-opacity-90 disabled:bg-opacity-50',
  default: 'border border-primary bg-white text-primary hover:opacity-70 disabled:text-line disabled:border-line !disabled:opacity-100'
};

const LINK_STYLE = {
  primary: 'text-primary',
  secondary: 'text-secondary'
}

const Button = ({
  children,
  className,
  htmlType,
  icon,
  link,
  type = "default",
  disabled,
  loading,
  onClick,
}: ButtonProps) => {


  if (link) {

    const typeClass = LINK_STYLE[type]

    return (
      <button
        disabled={disabled || loading}
        className={`underline text-sm ${typeClass} ${className || ''}`}
        onClick={onClick}
        type={htmlType || 'button'}
      >
        {children}
      </button>
    )
  }

  const typeClass = TYPE_STYLE[type]

  return (
    <button
      disabled={disabled || loading}
      className={`flex px-4 justify-center items-center w-full min-w-[150px] font-semibold rounded-full text-sm  h-[40px] ${typeClass} ${className || ''}`}
      onClick={onClick}
      type={htmlType || 'button'}
    >
      {loading &&
        <Icon
          name={'ArrowClockwise'}
          size={18}
          className={'mr-2 mb-0.5 animate-spin'}
        />
      }
      {!!icon && !loading && <Icon name={icon as any} size={18} className={'mr-2 mb-0.5'} />}
      {children}
    </button>
  );
};

export default Button;
