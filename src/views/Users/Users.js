import React, { Component } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const { Column, ColumnGroup } = Table;


class Users extends Component {

  state ={
    users: [],
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Company',
        dataIndex: 'company.name',
        key: 'company.name',
      }
    ],
    loading: true
  }

  componentDidMount() {
    axios.get('/users').then(response => {
      this.setState({loading: false})
      const data = response.data;
      console.log(data);
      this.setState({users: data});
    });
  }
  render() {
    return (
      <div>
        <h3>Data User</h3>
        <Table
          dataSource={this.state.users}
          loading={this.state.loading}
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
            title="Name"
            dataIndex="name"
            key="name"
            render={(text, record) => (
              <span>
                <Link to={'/post-user/'+record.id}>
                  {text}
                </Link>
              </span>
            )}
          />
          <Column
            title="Username"
            dataIndex="username"
            key="username"
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
            width="50"
          />
          <Column
            title="Phone"
            dataIndex="phone"
            key="phone"
          />
          <Column
            title="Website"
            dataIndex="website"
            key="website"
          />
          <Column
            title="Company"
            dataIndex="company.name"
            key="company.name"
          />
          <ColumnGroup title="Address">
            <Column
              title="City"
              dataIndex="address.city"
              key="address.city"
              width="50"
            />
            <Column
              title="street"
              dataIndex="address.street"
              key="address.street"
            />
            <Column
              title="Suite"
              dataIndex="address.suite"
              key="address.suite"
            />
            <Column
              title="Zip-code"
              dataIndex="address.zipcode"
              key="address.zipcode"
            />
          </ColumnGroup>
        
        </Table>
      </div>
    )
  }
}

export default Users;