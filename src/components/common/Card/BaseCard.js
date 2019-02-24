import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const BaseCard = (props) => (
  <Card
      hoverable
      loading={props.loading}
      cover={<img alt={props.alt} src={props.img} />}
    >
      <Meta
        title={props.title}
        description={props.desc}
      />
    </Card>
);


export default BaseCard;