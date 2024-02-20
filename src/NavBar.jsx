/*eslint react/prop-types: "off"*/

import { Logo } from './Logo';

export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
