import { Col, Row, Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane;
import './index.css';

class Profile extends Component<any,any> {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
          <div className='card-container'>
            <Tabs type='card'>
              <TabPane tab='Dados básicos' key='1'>
                <p>Content of Tab Pane 1</p>
                <p>Content of Tab Pane 1</p>
                <p>Content of Tab Pane 1</p>
              </TabPane>
              <TabPane tab='Minhas postagens' key='2'>
                <p>Content of Tab Pane 2</p>
                <p>Content of Tab Pane 2</p>
                <p>Content of Tab Pane 2</p>
              </TabPane>
            </Tabs>
          </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    city: state.app.City.selected
  };
}
export default connect(mapStateToProps)(Profile);
