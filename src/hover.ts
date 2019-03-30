import * as G6 from '@antv/g6'


G6.registerBehavior('hover-node', {
    getEvents() {
        return {
            'node:mouseenter': 'onEnter',
            'node:mouseleave': 'onLeave',
            'node:mouseover': 'onEnter'
        };
    },

    // 事件处理函数
    onEnter(e) {
        const graph = this.graph;
        const node = e.item;
        // console.log(node)
        graph.setItemState(node, 'hovering', true);
        graph.paint()
    },
    onLeave(e) {
        const graph = this.graph;
        const node = e.item;
        // console.log(node)
        graph.setItemState(node, 'hovering', false);
        graph.paint()

    }
});