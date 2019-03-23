import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

class ChartRecommend extends Component<any, any> {
  render(){
    const { recommend, norecommend, intl } = this.props;
    const getOption = () => ({
      title : {
        text: intl.formatMessage({ id: 'chartRecommendTitle', defaultMessage: 'Alunos que recomendam a escola' }),
        subtext: intl.formatMessage({ id: 'chartRecommendDescription', defaultMessage: '% de alunos recomendam a escola para um amigo' }),
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series : [
        {
        name: intl.formatMessage({ id: 'students', defaultMessage: 'Alunos' }),
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        color: ['#0f73d0', '#ff0000'],
        data:[
          {value: recommend ? recommend : 0, name: intl.formatMessage({ id: 'recommend', defaultMessage: 'Recomendam' })},
          {value: norecommend ? norecommend : 0, name: intl.formatMessage({ id: 'noRecommend', defaultMessage: 'Não recomendam' })}
        ],
        itemStyle: {
          emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
        }
      ]
    });

    return (
        <ReactEcharts
        option={getOption()}
        style={{height: 200}} />
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    reviews: state.app.Review.list.data
  };
}

export default injectIntl(connect(mapStateToProps)(ChartRecommend));