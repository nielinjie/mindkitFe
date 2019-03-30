import * as G6 from '@antv/g6'


G6.registerBehavior('hover-node', {
    getEvents() {
        return {
            'node:mouseenter': 'onEnter',
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