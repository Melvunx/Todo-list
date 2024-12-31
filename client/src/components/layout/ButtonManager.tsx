import clsx from "clsx";
import { Button } from "../ui/button";

type ButtonManagerProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

const ButtonManager: React.FC<ButtonManagerProps> = ({
  variant,
  type,
  children,
  className,
  onClick,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={clsx(
        "relative font-mono text-lg font-medium transition-colors",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonManager;
