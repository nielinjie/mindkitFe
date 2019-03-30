import * as G6 from '@antv/g6'

//TODO 实现这个
G6.registerBehavior('node-editing', {
    getEvents() {
        return {
            'node:doubleclick': 'onEnter',
            'node:mouseleave': 'onLeave',
            'node:mouseover': 'onEnter'
        };
    },
    onEnter(e) {
        const graph = this.graph;
        const node = e.item;
        graph.setItemState(node, 'hovering', true);
        graph.paint()
    },
    onLeave(e) {
        const graph = this.graph;
        const node = e.item;
        graph.setItemState(node, 'hovering', false);
        graph.paint()

    }
});