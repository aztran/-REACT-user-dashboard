import React, { Component } from 'react';
import axios from '../../axios';
import { Button, Modal, Input, notification, Form, Divider } from 'antd';
import BaseTable from '../../components/common/Table/BaseTable';
import './AddPost.scss';


const { TextArea } = Input;
const openNotificationWithIcon = (type) => {
  if(type==='success') {
    notification[type]({
      message: 'success',
      description: 'your post has been saved',
    });
  } else if(type==='info') {
    notification[type]({
      message: 'info',
      description: 'your post has been delete',
    });
  } else if(type==='warning') {
    notification[type]({
      message: 'info',
      description: 'your post has been update',
    });
  }
  
};

class AddPost extends Component {

  state = {
    message: '',
    description: '',
    isLoading: true,
    titleModal: '',
    titlePost: '',
    bodyPost: '',
    posts: [],
    visible: false,
    confirmLoading: false,
    columnsPost: [
      {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
        width: 10,
      }, 
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 150,
      }, 
      {
        title: 'Content',
        dataIndex: 'body',
        key: 'body',
        width: 250,
      },
      {
        title: 'Action',
        render: (text,record) => (
          <span>
            <Button type="primary" onClick={() => this.showModal({data: record.id})}> Edit</Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => this.deleteHandler({data: record.id})}> Delete</Button>
          </span>
        ) ,
        width: 150,
      }
    ],
  }

  showModal = (id) => {
    if(id.data) {
      this.setState({titleModal: 'Update Post'});
      axios.get('/posts/'+id.data).then(response => {
        this.props.form.setFieldsValue({
          title: response.data.title,
          content: response.data.body,
          id: response.data.id,
        });
        this.setState({
          visible: true,
        });
      });
    }
    else {
      this.setState({titleModal: 'Insert Post'});
      this.props.form.setFieldsValue({
        title: '',
        content: '',
        id: '',
      });
      this.setState({
        visible: true,
      });
    }
  }

  handleCancel = (e) => {
    this.props.form.setFieldsValue({
      title: '',
      content: '',
      id: '',
    });
    this.setState({
      visible: false,
    });
  }

  deleteHandler = (id) => {
    axios.delete('/posts/' +id.data).then(response => {
      if(response.status) {
        openNotificationWithIcon('info');
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.id !== ''){
          const post ={
            title: this.state.titlePost,
            body: this.state.bodyPost,
            id: values.id
          }
          axios.put('/posts/' + values.id, post)
          .then(response => {
            console.log(response);
            if (response.status) {
              openNotificationWithIcon('warning');
              this.setState({
                visible: false,
              });
            }
          })
        }
        else  {
          const post ={
            title: this.state.titlePost,
            body: this.state.bodyPost,
          }
          axios.post('/posts', post)
          .then(response => {
            if (response.status) {
              openNotificationWithIcon('success');
              this.setState({
                visible: false,
              });
            }
          })
        }
      }  
    }); 
  }

  componentDidMount() {
    axios.get('/posts').then(response => {
        this.setState({isLoading: false})
        this.setState({posts: response.data});
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="add-post">
         <Modal
          title={this.state.titleModal}
          visible={visible}
          confirmLoading={confirmLoading}
          footer={[]}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
              {getFieldDecorator('id', {
                rules: [{ required: false, message: 'Please Input the title'}],
              })(
                <Input type="hidden"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please Input the title'}],
              })(
                <Input placeholder="Input Title"
                  onChange={(event) => this.setState({titlePost: event.target.value})}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: 'Please fill the cintent'}],
              })(
                <TextArea
                  placeholder="Input content"
                  autosize={{ minRows: 10, maxRows: 20 }}
                  onChange={(event) => this.setState({bodyPost: event.target.value})}
                />
              )}
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="add-post__flex">
          <h3>List All Posts</h3>
          <Button type="primary" onClick={this.showModal}>
            Add New Post
          </Button>
        </div>
         <BaseTable
          id="id"
          loading={this.state.isLoading}
          data={this.state.posts}
          columns={this.state.columnsPost}
        />
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddPost);

export default WrappedNormalLoginForm;