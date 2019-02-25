import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Users from './views/Users/Users';
import UserPost from './views/UserPost/UserPost';
import albumPhoto from './views/Album/Photo';
import AddPost from './views/AddPost/AddPost';
import './App.scss';

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
                    <Route path="/post-user/:id" component={UserPost}/>
                    <Route path="/photo-album/:id" component={albumPhoto}/>
                    <Route path="/add-post" component={AddPost}/>
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
