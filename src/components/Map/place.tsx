import React, { PureComponent} from 'react';
import { Icon } from 'antd';

export default class MyGreatPlaceWithControllableHover extends PureComponent<any,any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Icon style={{ fontSize: '2.0rem', color: '#0f73d0' }} type='environment' />
        <strong>{this.props.text}</strong>
      </div>
    );
  }
}
