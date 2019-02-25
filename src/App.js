import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Users from './views/Users/Users';
import Home from './views/Home/Home';
import UserPost from './views/UserPost/UserPost';
import albumPhoto from './views/Album/Photo';
import AddPost from './views/AddPost/AddPost';
import AddComment from './views/AddComment/AddComment';
import './App.scss';
import logo from './assets/img/az.png';

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
              className=""
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => { console.log(broken); }}
              onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
              <div className="App-sider"> 
                <div className="App-sider__wrapper">
                  <img src={logo} className="App-sider--icon"/>
                  <h3 class="c-white">Welcome</h3>
                  <h4 class="c-white">User Dashboard</h4>
                </div>
              </div>
              <Sidebar />
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/post-user/:id" component={UserPost}/>
                    <Route path="/photo-album/:id" component={albumPhoto}/>
                    <Route path="/add-post" component={AddPost}/>
                    <Route path="/add-comment" component={AddComment}/>
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
