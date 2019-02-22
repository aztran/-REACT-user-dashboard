import React, { Component } from 'react';
import axios from '../../axios';
import { Card } from 'antd';


import PostUser from '../../components/Posts/PostUser';

class UserPost extends Component {

  state = {
    posts: [],
    user: [],
    nama: 'a'
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get('/posts?userId='+id).then(response => {
        this.setState({posts: response.data});
    });

    axios.get('/users/'+id).then(user => {
      this.setState({user: user.data});
    });
    
  }
  render() {
    return (
      <div className="user-post">
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
        <div className="Posts">
          <h3 className="posts__title">All Posts</h3>
        </div>
        <PostUser data={this.state.posts}/>
      </div>
    )
  }
};

export default UserPost;