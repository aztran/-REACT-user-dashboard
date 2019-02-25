import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Sidebar extends Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <Menu mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="home" />
          <span className="nav-text">Home</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          <span className="nav-text">View Users</span>
          <Link to="/Users" />
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="diff" />
          <span className="nav-text">Add Post</span>
          <Link to="/add-post" />
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="form" />
          <span className="nav-text">Add Comment</span>
          <Link to="/add-comment" />
        </Menu.Item>
      </Menu>
    );
  }
}

// ReactDOM.render(<Sider />, mountNode); 
export default Sidebar;