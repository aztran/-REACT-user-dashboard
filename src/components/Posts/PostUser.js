import React, { Component } from 'react';
import axios from '../../axios';
import { Table } from 'antd';
const { Column } = Table;

class PostUser extends Component {

  state= {
    posts: [],
  }


  render() {
    return (
      <div>
        <Table
          dataSource={this.props.data}
          loading={this.props.loading}
          bordered={true}
          scroll={{ x: 1300 }}
          rowKey="id"
        >
          <Column
            title="No"
            dataIndex="id"
            key="id"
          />
          <Column
            title="Title"
            dataIndex="title"
            key="title"
          />
          <Column
            title="Content"
            dataIndex="body"
            key="body"
          />
        </Table>
      </div>
    )
  }
};

export default PostUser;