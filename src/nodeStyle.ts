import * as G6 from '@antv/g6'




export var COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
    return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y]];
};
export var EXPAND_ICON = function EXPAND_ICON(x, y, r) {
    return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y], ['M', x + r, y - r + 2], ['L', x + r, y + r - 2]];
};
G6.registerNode('tree-node', {
    drawShape: function drawShape(cfg, group) {
        var circle = group.addShape('circle', {
            attrs: {
                x:0,
                y:0,
                r: 5,
                fill: '#6699ff',
                stroke: '#666'
            }
        });
        var content = cfg.data.title.replace(/(.{19})/g, '$1\n');
        // var cbox = circle.getBBox();
        var text = group.addShape('text', {
            attrs: {
                text: content,
                x: 10,//circle.x + 20,
                y:0,// circle.y,
                textAlign: 'left',
                textBaseline: 'middle',
                fill: '#1a2a3a'
            }
        });
        var hasChildren = cfg.data.children && cfg.data.children.length > 0;
        if (hasChildren) {
            group.addShape('marker', {
                attrs: {
                    // x: cbox.maxX + 6,
                    // y: cbox.minX + cbox.height / 2 - 6,
                    r: 0,
                    symbol: COLLAPSE_ICON,
                    stroke: '#666',
                    lineWidth: 2
                },
                className: 'collapse-icon'
            });
        }
        
        return circle;
    },
    getAnchorPoints:function getAnchorPoints(){
        return  [
            [0.5, 0.5]]
    }
}, 'single-shape');