import { MdHomeFilled, MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AppMainBarBase = styled.nav`
  display: flex;
  align-content: center;
  justify-content: center;
  position: sticky;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;

  padding: 0.5rem;
  gap: 1rem;
  /* background: #FF512F;
  background: linear-gradient(to right, #DD2476, #FF512F); */

  background: #cc2b5e;
  background: linear-gradient(115deg, #753a88, #cc2b5e);
`;

const NavItemIcon = styled.span``;
const NavItemDescription = styled.span``;

type NavItemProps = {
  active?: boolean;
};

const NavItem = styled.button<NavItemProps>(props => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 0.2rem;
  
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: ${(props?.active) ? '#feac13' : 'rgba(255,255,255,0.7)'};
  transition: .5s color;

  ${NavItemIcon} {
    display: block;
    color: inherit;
    
    > svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  ${NavItemDescription} {
    font-size: 0.8rem;
  }
  
  :focus-visible {
    outline-color: #FF512F;
    outline-width: 2px;
    outline-style: solid;
  }

  :hover {
    cursor: pointer;
    color: ${(props?.active) ? '#feac13' : 'rgba(255,255,255,0.9)'};
  }

  :active {
    color: #FF512F;
  }
`);

export type AppMainBarProps = {
  className?: string;
}

function AppMainBar({...props}: AppMainBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  console.debug(location);

  return (
    <AppMainBarBase {...props}>
      <NavItem onClick={() => navigate('/')} active={isActive('/')}>
        <NavItemIcon><MdHomeFilled /></NavItemIcon>
        <NavItemDescription>Painel</NavItemDescription>
      </NavItem>
      <NavItem onClick={() => navigate('/places')} active={isActive('/places')}>
        <NavItemIcon><MdLocationOn /></NavItemIcon>
        <NavItemDescription>Casas</NavItemDescription>
      </NavItem>
    </AppMainBarBase>
  );
}

AppMainBar.displayName = 'AppMainBar'
export default AppMainBar;