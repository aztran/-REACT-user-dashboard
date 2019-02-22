import React, { Component } from 'react';
import axios from '../../axios';
import { Table } from 'antd';
const { Column } = Table;

class BaseTable extends Component {

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
          columns={this.props.columns}
        />
      </div>
    )
  }
};

export default BaseTable;