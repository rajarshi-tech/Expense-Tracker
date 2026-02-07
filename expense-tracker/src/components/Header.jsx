import HeaderLogo from '../assets/header-logo.png'
import HamburgerLogoClosed from '../assets/burger-menu-closed.png'
import HamburgerLogoOpen from '../assets/burger-menu-open.png'
import { Link } from 'react-router-dom' 
import { ExpenseContext } from '../context/ExpenseContext'

import './Header.css'
import { useContext, useState } from 'react';

export function Header() {

  const [state, setState] = useState(false);

  const { deleteTotal } = useContext(ExpenseContext);

  return (
    <>
      <div className="header">
        <div className='header-left'>
          <div className='hamburger-wrapper'>
            <img src={state ? HamburgerLogoOpen : HamburgerLogoClosed} className='hamburger-logo' onClick={() => {
              if(state) setState(false);
              else setState(true);
            }} />
            <div className={"hamburger-menu" + ((state) ? " show-hamburger-menu" : "")}>
              <Link className="hamburger-item" to="/charts">Graphs</Link>
              <div className="hamburger-item clear-data" onClick={() => {
                if (window.confirm("Clear all expenses?")) {
                  deleteTotal();
                  setState(false);
                }
              }}>Clear Data</div>
            </div>
          </div>
          <div className="header-logo-container">
            <img src={HeaderLogo} className="header-logo"/>
          </div>
        </div>        
        <div className='header-right'>
          <Link to="/" className='link'>Dashboard</Link>
          <Link to="/charts" className='link'>Charts</Link>
        </div>
      </div>
    </>
  );
}