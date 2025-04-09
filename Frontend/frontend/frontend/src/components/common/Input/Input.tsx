import { StyledInput } from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <StyledInput {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
