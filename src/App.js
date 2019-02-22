import React, { Component } from 'react';
import Header from './containers/Header/Header';
import Sidebar from './containers/Sidebar/Sidebar';
import { Layout, Menu, Icon } from 'antd';
import Users from './components/Users/Users';
import UserPost from './containers/UserPost/UserPost';
import './App.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
const {Sider, Content } = Layout;
class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout className="App__layout">
            <Sider
              className="App_sider"
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => { console.log(broken); }}
              onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
              <div className="logo" />
              <Sidebar />
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '24px 16px 0' }}>
                
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Switch>
                    <Route path="/users" exact={true} component={Users}/>
                    <Route path="/:id" component={UserPost}/>
                  </Switch> 
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
