import React from 'react';
import {NavLink} from 'react-router-dom';


const MainNav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/oceans" activeStyle={{background: 'tomato'}}>Oceans</NavLink></li>
        <li><NavLink to="/flowers" activeStyle={{background: 'tomato'}}>Flowers</NavLink></li>
        <li><NavLink to="/cities" activeStyle={{background: 'tomato'}}>Cities</NavLink></li>
      </ul>
    </nav>
  );
}

export default MainNav;
