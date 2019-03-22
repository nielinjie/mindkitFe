

import * as React from 'react';
import {Graph} from 'viser-graph-react'

const graph = {
    type: 'graph',
    width: 500,
    height: 500,
    fitView: 'cc',
    fitViewPadding: true,
    animate: true,
    minZoom: 0.2,
    maxZoom: 10,
    data:{
        nodes:[
            {
                id: 'node1',             // id 必须唯一
                // x: number,            // 横向位置
                // y: number,           // 纵向位置
                color: '#333',           // 颜色
                size: 10 ,  // 尺寸 || [宽, 高]
                shape: 'circle',         // 所用图形（目前只测验了circle可用）
                style: {                 // 关键形样式（优先级高于color）
                  fill: 'red',
                    stroke: 'blue'
                },
                label: '文本标签',
                index: 1,                 // 渲染层级（暂未测试）
              }
        ],
        edges:[],
      }
  };
  export default class GraphV extends React.Component {
    
    public render() {
      return (
        <div>
          <Graph {...graph} />
        </div>
      );
    }
  }