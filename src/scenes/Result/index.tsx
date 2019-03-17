import { Col, Row, Divider } from 'antd';
import React, { Component } from 'react';
import MyResult from 'components/Result';
import Map from 'components/Map';
import { connect } from 'react-redux';
import Loading from 'components/Loading';
import { withRouter } from 'react-router-dom';
import './index.css';

class Result extends Component<any,any> {
  render() {
    const { city } = this.props;
    if (!(this.props.selected && this.props.selected.id)) {
      this.props.history.push('/');
    }
    if (this.props.isFetchingSchools) {
      return (
        <Loading />
      );
    }
    return (
      <div>

       {(city && city.latitude && city.longitude) &&
        <div className={'map'}>
          <Row>
            <Col span={24} >
              <Map zoom={13} center={{
                lat: city.latitude,
                lng: city.longitude
              }} />
            </Col>
          </Row>
        </div>
       }
       { (city && city.id) &&
        <div>
          <Row>
            <Col span={24} >
              <MyResult />
            </Col>
          </Row>
          <Divider className={'no-margin'} />
        </div>
       }
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    city: state.app.City.selected,
    isFetchingSchools: state.app.School.list.isFetching,
    selected: state.app.City.selected,
  };
}
export default withRouter(connect(mapStateToProps)(Result));
