import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

class ChartRecommend extends Component<any, any> {
  render(){
    const { reviews } = this.props;
    let yes = reviews ? reviews.filter(( item: any ) =>
      item.recommend === true
    ).length : 0;
    let no = reviews ? reviews.filter(( item: any ) =>
      item.recommend === false
    ).length : 0;

    const getOption = () => ({
      title : {
        text: 'Alunos que recomendam a escola',
        subtext: '% de alunos recomendam a escola para um amigo',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series : [
        {
        name: 'Alunos',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        color: ['#ff0000', '#0f73d0'],
        data:[
          {value: yes, name:'Não Recomendam'},
          {value: no, name:'Recomendam'}
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

export default connect(mapStateToProps)(ChartRecommend);