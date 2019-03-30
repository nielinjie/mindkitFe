
import * as G6 from '@antv/g6'

import modes from '../modes';

import  layout from '../layout'

export var graph = new G6.TreeGraph({
    container: 'mountNode',
    renderer:'svg',
    width: 1000,
    height: 800,
    modes,
    defaultNode: {
      shape: 'tree-node',
    },
    defaultEdge: {
      shape: 'tree-edge'
    },
    layout
  });