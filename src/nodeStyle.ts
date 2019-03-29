import * as G6 from '@antv/g6'




export var COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
    return [['M', x, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x + 2, y], ['L', x + 2 * r - 2, y]];
};
export var EXPAND_ICON = function EXPAND_ICON(x, y, r) {
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