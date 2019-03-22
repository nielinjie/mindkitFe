

import { Graph, Node, Edge, Layouts } from 'viser-graph-react'
import { FC, useState } from 'react';
import * as React from 'react';

const graph = {
  type: 'graph',
  width: 2000,
  height: 1000,
  fitView: 'cc',
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

export const GraphV: FC = () => {

  const [data, setData] = useState({});



  const refresh = () => {

    fetch( "http://localhost:8080/graph"   )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data)
      })
      .catch(e => console.log('错误:', e))



    
  }

  var layout = new Layouts.Dagre();
  return (
    <div>
      <Graph {...graph} data={data} layout = {layout}>
        <Node {...nodeAttr} />
        <Edge {...edgeAttr}/>
      </Graph>
      <a onClick={refresh}>reload</a>
    </div>
  );

}