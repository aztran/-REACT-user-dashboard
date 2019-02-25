import React, { Component } from 'react';
import axios from '../../axios';
import { Card, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import BaseTable from '../../components/common/Table/BaseTable';
import './UserPost.scss';

class UserPost extends Component {

  state = {
    isLoading: true,
    loadingSpinner: true,
    selectedId: null,
    posts: [],
    user: [],
    albums: [],
    nama: 'a',
    columnsPost: [
      {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
      }, 
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, 
      {
        title: 'Content',
        dataIndex: 'body',
        key: 'body',
      },
      {
        title: 'Action',
        render: (text,record) => (
          <span>
           {/* <Button type="primary" onClick={this.showModal}> */}
           <Button type="primary" onClick={() => this.showModal(record.id)}>
            View All Comments
          </Button>
          </span>
        ) 
      }
    ],
    columnsAlbum: [
      {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
      }, 
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

  showModal = (id) => {
    
    axios.get('comments?postId='+id).then(response => {
      this.setState({selectedId: response.data});
      this.setState({
        visible: true,
      });
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
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
    let modal = null;
    if (this.state.selectedId) {
       modal = (
         <div>
          <Modal
            title="View Comments "
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Ok
              </Button>,
            ]}
          >
            {
              this.state.selectedId.map(comment => {
                return (
                  <div className="modal-comment" key={comment.id}>
                    <h5 className="modal-comment__sender">{comment.name} | {comment.email}</h5> 
                    <h6 className="modal-comment__body">{comment.body}</h6>
                  </div>
                
                )
              })
            }
          </Modal>
         </div>
       );
    }
    return (
    
      <div className="user-post">
      
        {modal}
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
          id="id"
          loading={this.state.isLoading}
          data={this.state.posts}
          columns={this.state.columnsPost}
        />
        <div className="Posts">
          <h3 className="posts__title">All Albums</h3>
        </div>
        <BaseTable
          id="id"
          loading={this.state.isLoading}
          data={this.state.albums}
          columns={this.state.columnsAlbum}
        />
      </div>
    )
  }
};

export default UserPost;