import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

class ChartRecommend extends Component<any, any> {
  render(){
    const { recommend, norecommend } = this.props;
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
        color: ['#0f73d0', '#ff0000'],
        data:[
          {value: recommend ? recommend : 0, name:'Recomendam'},
          {value: norecommend ? norecommend : 0, name:'Não Recomendam'}
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