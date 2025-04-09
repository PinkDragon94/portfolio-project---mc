import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)<{ variant: 'primary' | 'secondary' }>(({ theme, variant }) => ({
  backgroundColor: variant === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: variant === 'primary' ? theme.palette.primary.dark : theme.palette.secondary.dark,
  },
}));
