import React, { Component } from 'react';
import axios from '../../axios';
import BaseCard from '../../components/common/Card/BaseCard';
import { Pagination, Row, Col } from 'antd';

import './Photo.scss';

class Photo extends Component {

  state = {
    isLoading: true,
    photos: [],
    minValue: 0,
    maxValue: 10
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get('photos?albumId='+id).then(response => {
      this.setState({ isLoading: false })
      this.setState({ photos: response.data });
      console.log(response.data);
    });
  }

  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 10
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 10
      });
    }
  };

  render() {

    let photoCard =this.state.photos;

    return (
      <div>
        <h3>Display All Photos</h3>
        <Row>
          {photoCard && photoCard.length > 0 && photoCard.slice(this.state.minValue, this.state.maxValue).map(val => (
            <Col span={12} key={val.id}> 
            <div className="card-photo">
              <BaseCard 
                loading={this.state.isLoading}
                img={val.url}
                alt={val.title}
                title={val.title}
              />
            </div>
            </Col>
          ))}
        </Row>
        <Pagination
            defaultCurrent={1}
            onChange={this.handleChange}
            total={photoCard.length}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={10}
          />
      </div>
    ) 
  }

};

export default Photo;