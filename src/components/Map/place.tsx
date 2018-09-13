import React, { PureComponent} from 'react';
import { Icon } from 'antd';

export default class MyGreatPlaceWithControllableHover extends PureComponent<any,any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Icon style={{ fontSize: '1.7rem', color: '#0f73d0' }} type='environment' />
        <strong style={{ fontSize: '0.7rem'}}>{this.props.text}</strong>
      </div>
    );
  }
}
