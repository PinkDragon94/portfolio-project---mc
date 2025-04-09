import { StyledButton } from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return <StyledButton variant={variant} {...props} />;
};
