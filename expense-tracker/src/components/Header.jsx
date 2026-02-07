import HeaderLogo from '../assets/header-logo.png'
import HamburgerLogo from '../assets/burger-menu-closed.png'

import './Header.css'
import { useState } from 'react';

export function Header() {

  const [state, setState] = useState(false);

  return (
    <>
      <div className="header">
        <div className='header-left'>
          <div className='hamburger-wrapper'>
            <img src={HamburgerLogo} className='hamburger-logo' onClick={() => {
              if(state) setState(false);
              else setState(true);
            }} />
            <div className={"hamburger-menu" + ((state) ? " show-hamburger-menu" : "")}>
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