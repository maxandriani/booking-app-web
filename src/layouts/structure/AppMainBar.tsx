import { MdContactPage, MdHomeFilled, MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const AppMainBarBase = styled.nav(({theme}) => css`
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

  background: ${theme.navBar.surface};
`);

const NavItemIcon = styled.span``;
const NavItemDescription = styled.span``;

type NavItemProps = {
  current?: boolean;
};

const NavItem = styled.button<NavItemProps>(({ theme, current }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 0.2rem;
  
  color: ${(!!current) ? theme.navBar.button.current.color : theme.navBar.button.default.color};
  background: ${(!!current) ? theme.navBar.button.current.background : theme.navBar.button.default.background};;
  border: ${(!!current) ? theme.navBar.button.current.border : theme.navBar.button.default.border};;
  border-radius: ${theme.border.radius.medium};
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
    outline-color: ${theme.border.focusVisible};
  }

  :hover {
    cursor: pointer;
    color: ${(!!current) ? theme.navBar.button.current.color : theme.navBar.button.hover.color};
    background: ${theme.navBar.button.hover.background};
    border: ${theme.navBar.button.hover.border};
  }

  :active {
    color: ${theme.navBar.button.active.color};
    background: ${theme.navBar.button.active.background};
    border: ${theme.navBar.button.active.border};
  }
`);

export type AppMainBarProps = {
  className?: string;
}

function AppMainBar({...props}: AppMainBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function isCurrent(path: string) {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  }

  console.debug(location);

  return (
    <AppMainBarBase {...props}>
      <NavItem onClick={() => navigate('/')} current={isCurrent('/')}>
        <NavItemIcon><MdHomeFilled /></NavItemIcon>
        <NavItemDescription>Painel</NavItemDescription>
      </NavItem>
      <NavItem onClick={() => navigate('/guests')} current={isCurrent('/guests')}>
        <NavItemIcon><MdContactPage /></NavItemIcon>
        <NavItemDescription>Hóspedes</NavItemDescription>
      </NavItem>
      <NavItem onClick={() => navigate('/places')} current={isCurrent('/places')}>
        <NavItemIcon><MdLocationOn /></NavItemIcon>
        <NavItemDescription>Casas</NavItemDescription>
      </NavItem>
    </AppMainBarBase>
  );
}

AppMainBar.displayName = 'AppMainBar'
export default AppMainBar;