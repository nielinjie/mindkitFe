
import * as G6 from '@antv/g6'




G6.registerEdge('tree-edge',{
    draw(cfg, group) {
        const start = cfg.startPoint;
        const end = cfg.endPoint;
        const shape = group.addShape('path', {
          attrs: {
            stroke: '#aaaaaa',
            path: [['M', start.x, start.y], ['L', start.x, end.y], ['L', end.x, end.y]]
          }
        });
        return shape;
      }
})
