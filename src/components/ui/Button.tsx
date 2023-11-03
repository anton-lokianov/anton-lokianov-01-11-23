type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button;
