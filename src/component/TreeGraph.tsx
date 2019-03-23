

import { Graph, Node, Edge, Layouts } from 'viser-graph-react'
import { FC, useState } from 'react';
import * as React from 'react';
import { useFetch } from 'react-hooks-fetch';

const graph = {
  type: 'tree',
  width: 2000,
  height: 800,
  fitView: 'lc',
  fitViewPadding: true,
  animate: true,
  minZoom: 0.2,
  maxZoom: 10,
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

}

export const TreeGraph: FC = () => {
  // const [data, setData] = useState({ roots: [{}] });
  
  var layout = new Layouts.IndentedTree({
    direction: 'LR', // 方向（LR/RL/H）
    indent: 30, // 缩进量
    getVGap: function getVGap() {
      return 4; // 竖向间距
    },
  })
  const { error, data} = useFetch('http://...');
  if (error) return <span>Error:{error.message}</span>;
  if (!data) return null; // this is important
  // return <span>RemoteData:{data}</span>;

  

  return (
    <div>
      <Graph {...graph} data={data} layout={layout}>
        <Node {...nodeAttr} />
        <Edge {...edgeAttr} />
      </Graph>
    </div>
  );

}