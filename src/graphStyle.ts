
import * as G6 from '@antv/g6'
import * as Hierarchy from '@antv/hierarchy'

import modes from './modes';


export var graph = new G6.TreeGraph({
    container: 'mountNode',
    width: window.innerWidth,
    height: window.innerHeight,
    modes,
    defaultNode: {
      shape: 'tree-node',
      anchorPoints: [[0, 0.5], [1, 0.5]]
    },
    defaultEdge: {
      shape: 'cubic-horizontal'
    },
    edgeStyle: {
      default: {
        stroke: '#A3B1BF'
      }
    },
    layout: function layout(data) {
      return Hierarchy.compactBox(data, {
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 80;
        }
      });
    }
  });