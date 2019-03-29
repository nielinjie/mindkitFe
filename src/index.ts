import * as G6 from '@antv/g6'
import * as Hierarchy from '@antv/hierarchy'
import * as $ from 'jquery'

var COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y]];
};
var EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y], ['M', x + r, y - r + 2], ['L', x + r, y + r - 2]];
};
G6.registerNode('tree-node', {
  drawShape: function drawShape(cfg, group) {
    var rect = group.addShape('rect', {
      attrs: {
        fill: '#fff',
        stroke: '#666'
      }
    });
    var content = cfg.data.title.replace(/(.{19})/g, '$1\n');
    var text = group.addShape('text', {
      attrs: {
        text: content,
        x: 0,
        y: 0,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#666'
      }
    });
    var bbox = text.getBBox();
    var hasChildren = cfg.data.children && cfg.data.children.length > 0;
    if (hasChildren) {
      group.addShape('marker', {
        attrs: {
          x: bbox.maxX + 6,
          y: bbox.minX + bbox.height / 2 - 6,
          r: 6,
          symbol: COLLAPSE_ICON,
          stroke: '#666',
          lineWidth: 2
        },
        className: 'collapse-icon'
      });
    }
    rect.attr({
      x: bbox.minX - 4,
      y: bbox.minY - 6,
      width: bbox.width + (hasChildren ? 26 : 8),
      height: bbox.height + 12
    });
    return rect;
  }
}, 'single-shape');
var graph = new G6.TreeGraph({
  container: 'mountNode',
  width: window.innerWidth,
  height: window.innerHeight,
  modes: {
    default: [{
      type: 'collapse-expand',
      onChange: function onChange(item, collapsed) {
        var data = item.get('model').data;
        var icon = item.get('group').findByClassName('collapse-icon');
        if (collapsed) {
          icon.attr('symbol', EXPAND_ICON);
        } else {
          icon.attr('symbol', COLLAPSE_ICON);
        }
        data.collapsed = collapsed;
        return true;
      }
    }, 'drag-canvas', {type:'zoom-canvas',sensitivity:1}]
  },
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
$.getJSON('http://localhost:8080/treeNode', function(data) {
  graph.data(data);
  graph.render();
  graph.fitView();
});
