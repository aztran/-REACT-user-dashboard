import React, { Component } from 'react';
import axios from '../../axios';
import { Row, Col } from 'antd';

import './Home.scss'

class Home extends Component {

  state = {
    users: null,
    posts: null,
    comments: null,
    albums: null,
    photo: null,
  }

  componentDidMount() {
    axios.get('/users').then(user => {
      this.setState({users: user.data.length});
    });

    axios.get('/albums').then(album => {
      this.setState({albums: album.data.length});
    });

    axios.get('/posts').then(post => {
      this.setState({posts: post.data.length});
    });

    axios.get('/comments').then(comment => {
      this.setState({comments: comment.data.length});
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6} className="p-8">
            <div className="panel orange">
              <span className="panel__top">Users</span>
              <div className="panel__bottom">
                <span>Total</span>
                <span>{this.state.users}</span>
              </div>
            </div>
          </Col>
          <Col span={6} className="p-8">
            <div className="panel soft-blue">
              <span className="panel__top">Album</span>
              <div className="panel__bottom">
                <span>Total</span>
                <span>{this.state.albums}</span>
              </div>
            </div>
          </Col>
          <Col span={6} className="p-8">
            <div className="panel red">
              <span className="panel__top">Posts</span>
              <div className="panel__bottom">
                <span>Total</span>
                <span>{this.state.posts}</span>
              </div>
            </div>
          </Col>
          <Col span={6} className="p-8">
            <div className="panel green">
              <span className="panel__top">Comments</span>
              <div className="panel__bottom">
                <span>Total</span>
                <span>{this.state.comments}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home