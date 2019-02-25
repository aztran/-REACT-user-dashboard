import React, { Component } from 'react';
import axios from '../../axios';
import { Button, Modal, Input, notification, Form, Divider } from 'antd';
import BaseTable from '../../components/common/Table/BaseTable';
import './AddComment.scss';


const { TextArea } = Input;
const openNotificationWithIcon = (type) => {
  if(type==='success') {
    notification[type]({
      message: 'success',
      description: 'your comment has been saved',
    });
  } else if(type==='info') {
    notification[type]({
      message: 'info',
      description: 'your comment has been delete',
    });
  } else if(type==='warning') {
    notification[type]({
      message: 'info',
      description: 'your comment has been update',
    });
  }
  
};

class AddPost extends Component {

  state = {
    message: '',
    description: '',
    isLoading: true,
    titleModal: '',
    name: '',
    email: '',
    comments: [],
    visible: false,
    confirmLoading: false,
    columnsComment: [
      {
        title: 'No',
        dataIndex: 'id',
        key: 'id',
        width: 10,
      }, 
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      }, 
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
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
      this.setState({titleModal: 'Update Comment'});
      axios.get('/comments/'+id.data).then(response => {
        this.props.form.setFieldsValue({
          name: response.data.name,
          email: response.data.email,
          content: response.data.body,
          id: response.data.id,
        });
        this.setState({
          visible: true,
        });
      });
    }
    else {
      this.setState({titleModal: 'Insert comment'});
      this.props.form.setFieldsValue({
        name: '',
        email: '',
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
      name: '',
      email: '',
      content: '',
      id: '',
    });
    this.setState({
      visible: false,
    });
  }

  deleteHandler = (id) => {
    axios.delete('/comments/' +id.data)
      .then(response => {
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
            name: this.state.name,
            email: this.state.email,
            body: this.state.bodyPost,
            id: values.id
          }
          axios.put('/comments/' + values.id, post)
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
            name: this.state.name,
            email: this.state.email,
            body: this.state.bodyPost,
          }
          axios.post('/comments', post)
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
    axios.get('/comments').then(response => {
      this.setState({isLoading: false})
      this.setState({comments: response.data});
      console.log(this.state.comments);
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
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please Input the title'}],
              })(
                <Input placeholder="Input your name"
                  onChange={(event) => this.setState({titlePost: event.target.value})}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please Input the title'}],
              })(
                <Input placeholder="Input your email"
                  type="email"
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
          <h3>List All Comments</h3>
          <Button type="primary" onClick={this.showModal}>
            Add New Post
          </Button>
        </div>
         <BaseTable
          id="id"
          loading={this.state.isLoading}
          data={this.state.comments}
          columns={this.state.columnsComment}
        />
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(AddPost);

export default WrappedNormalLoginForm;