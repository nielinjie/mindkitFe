

import { Graph, Node, Edge, Layouts, registerNode, registerEdge } from 'viser-graph-react'
import { FC, useState } from 'react';
import * as React from 'react';
import { useFetch } from 'react-hooks-fetch';
import '@antv/g6/build/plugin.edge.polyline';

const graph = {
  type: 'tree',
  width: 1000,
  height: 800,
  fitView: 'autoZoom',
  fitViewPadding: true,
  animate: true,
  minZoom: 0.2,
  maxZoom: 10,
  onAfterchange: function (ev, graph) {
    graph.getNodes().forEach(function (node) {
      var label = node.getLabel();
      var keyShape = node.getKeyShape();
      var box = keyShape.getBBox();
      var labelBox = label.getBBox();
      var dx = (box.maxX - box.minX + labelBox.maxX - labelBox.minX) / 2 + 8;
      var dy = 0;
      label.translate(dx, dy);
    });
    graph.draw();
  },
  onClick: function(ev, graph) {
    console.log('click', ev, graph);
    console.log(ev.item.model.style.stroke)
  },
};


const nodeAttr = {
  shape: 'treeNode',
  size: 20,
  label: (obj: any) => {
    return obj.title;
  },
  style: {
    stroke: 'blue',
  },
};

const edgeAttr = {
  shape: 'VH'
}

registerNode('treeNode', {
  anchor: [[0, 0.5], [0.5, 1]]
});
registerNode('treeNodeF', {
  getStyle: (item) =>{return {
    stroke: 'red',
  }},

});

registerEdge('VH', {
  getPath: function getPath(item) {
    var points = item.getPoints();
    var start = points[0];
    var end = points[points.length - 1];
    return [['M', start.x, start.y], ['L', start.x, end.y], ['L', end.x, end.y]];
  }
});
export const TreeGraph: FC = () => {
  // const [data, setData] = useState({ roots: [{}] });

  var layout = new Layouts.IndentedTree({
    direction: 'LR', // 方向（LR/RL/H）
    indent: 30, // 缩进量
    getVGap: function getVGap() {
      return 4; // 竖向间距
    },
  })
  const { error, data } = useFetch('http://localhost:8080/treeNode');
  if (error) {
    return <span>Error:{error.message}</span>;
  }
  if (!data) return null; // this is important
  // return <span>RemoteData:{data}</span>;



  return (
    <div>
      <Graph {...graph} data={{ roots: [data] }} layout={layout}>
        <Node {...nodeAttr} />
        <Edge {...edgeAttr} />
      </Graph>
    </div>
  );

}