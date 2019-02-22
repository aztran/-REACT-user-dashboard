import React, { Component } from 'react';
import axios from '../../axios';
import { Card, Row, Col } from 'antd';

import './UserPost.scss';


import BaseTable from '../../components/Table/BaseTable';

class UserPost extends Component {

  state = {
    posts: [],
    user: [],
    albums: [],
    nama: 'a',
    columnsPost: [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 'Content',
        dataIndex: 'body',
        key: 'body',
      }
    ],
    columnsAlbum: [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }
    ]
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get('/posts?userId='+id).then(response => {
        this.setState({posts: response.data});
    });

    axios.get('/albums?users='+id).then(response => {
      this.setState({albums: response.data});
    });

    axios.get('/users/'+id).then(user => {
      this.setState({user: user.data});
    });
    
  }
  render() {
    return (
      <div className="user-post">
        <div className="Posts">
          <h3 className="posts__title">Profile</h3>
          <Card title={this.state.user['name']} style={{ width: 300 }}>
            <div className="card-user">
              <p class="card-user__left">Website</p>
              <p>{this.state.user['website']}</p>
            </div>
            <div className="card-user">
              <p class="card-user__left">Email</p>
              <p>{this.state.user['email']}</p>
            </div>
            <div className="card-user">
              <p class="card-user__left">Phone</p>
              <p>{this.state.user['phone']}</p>
            </div>
          </Card>
        </div>
        <div className="Posts">
          <h3 className="posts__title">All Posts</h3>
        </div>
        <BaseTable data={this.state.posts} columns={this.state.columnsPost}/>
        <div className="Posts">
          <h3 className="posts__title">All Albums</h3>
        </div>
        <BaseTable data={this.state.albums} columns={this.state.columnsAlbum}/>
      </div>
    )
  }
};

export default UserPost;