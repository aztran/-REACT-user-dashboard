import React, { Component } from 'react';
import axios from '../../axios';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import BaseTable from '../../components/common/Table/BaseTable';
import './UserPost.scss';

class UserPost extends Component {

  state = {
    isLoading: true,
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
      },
      {
        title: 'Action',
        render: (text,record) => (
          <span>
          <Link to={'/photo-album/'+record.id}>
            View Photos
          </Link>
          </span>
        ) 
      }
    ]
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get('/posts?userId='+id).then(response => {
        this.setState({isLoading: false})
        this.setState({posts: response.data});
    });

    axios.get('/albums?users='+id).then(response => {
      this.setState({isLoading: false})
      this.setState({albums: response.data});
    });

    axios.get('/users/'+id).then(user => {
      this.setState({isLoading: false})
      this.setState({user: user.data});
    });
    
  }
  render() {
    return (
      <div className="user-post">
        <div className="Posts">
          <h3 className="posts__title">Profile</h3>
          <Card
            loading={this.state.isLoading}
            title={this.state.user['name']}
            style={{ width: 300 }}
          >
            <div className="card-user">
              <p className="card-user__left">Website</p>
              <p>{this.state.user['website']}</p>
            </div>
            <div className="card-user">
              <p className="card-user__left">Email</p>
              <p>{this.state.user['email']}</p>
            </div>
            <div className="card-user">
              <p className="card-user__left">Phone</p>
              <p>{this.state.user['phone']}</p>
            </div>
          </Card>
        </div>
        <div className="Posts">
          <h3 className="posts__title">All Posts</h3>
        </div>
        <BaseTable
          id={this.state.posts.id}
          loading={this.state.isLoading}
          data={this.state.posts}
          columns={this.state.columnsPost}
        />
        <div className="Posts">
          <h3 className="posts__title">All Albums</h3>
        </div>
        <BaseTable
          id={this.state.albums.id}
          loading={this.state.isLoading}
          data={this.state.albums}
          columns={this.state.columnsAlbum}
        />
      </div>
    )
  }
};

export default UserPost;