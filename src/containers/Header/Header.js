import React, { Component } from 'react';
import './Header.scss';

import { Menu, Icon } from 'antd';
import MenuItem from './MenuItem/MenuItem';



class Header extends Component {
  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <div className="header">
        <div className="header-wrapper--blue">
          <div className="header__top">
            <h3 className="header__title">User</h3>
            <h3 className="header__title">Dashboard</h3>
          </div>
        </div>
        <div className="header-wrapper">
          <div className="header__bottom">
            <MenuItem />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;