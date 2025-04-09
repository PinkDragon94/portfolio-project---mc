import { StyledNavbar } from './Navbar.styles';
import { Button } from '../../common/Button/Button';

export const Navbar: React.FC = () => {
  return (
    <StyledNavbar position="static">
      <div className="navbar-content">
        <div className="logo">Mugen</div>
        <div className="nav-buttons">
          <Button variant="secondary">Register</Button>
          <Button>Login</Button>
        </div>
      </div>
    </StyledNavbar>
  );
};
