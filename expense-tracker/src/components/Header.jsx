import HeaderLogo from '../assets/header-logo.png'
import HamburgerLogo from '../assets/burger-menu-closed.png'

import './Header.css'

export function Header() {
  return (
    <>
      <div className="header">
        <div className='header-left'>
          <div className='hamburger-wrapper'>
            <img src={HamburgerLogo} className='hamburger-logo'/>
            <div className="hamburger-menu">
              <div>Graphs</div>
              <div>Settings</div>
              <div>Dark Mode</div>
            </div>
          </div>
          <div className="header-logo-container">
            <img src={HeaderLogo} className="header-logo"/>
          </div>
        </div>        
        <div className='header-right'>
          <a>Dashboard</a>
          <a>Charts</a>
        </div>
      </div>
    </>
  );
}