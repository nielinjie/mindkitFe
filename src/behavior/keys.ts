
import * as G6 from '@antv/g6'
import * as _ from 'lodash'


G6.registerBehavior('keypress', {
    getEvents() {
        return {
            'keydown': 'onKeypress',
        };
    },
    onKeypress(e) {

        const keycode = e.code
        const graph = this.graph;
        let nextId = '_root'
        const selectedNodes = graph.findAllByState('node', 'selected')
        const currentNode = _.first(selectedNodes) //|| graph.findById('_root')
        if (currentNode) {
            const id = currentNode._cfg.id
            const parentNode = currentNode._cfg.model.parent
            const children = currentNode._cfg.model.children
            if (keycode == 'ArrowDown') {
                if (parentNode) {
                    const thisIndex = _.findIndex(parentNode.children, (cn) => cn.id == id)
                    console.log(thisIndex)
                    if (thisIndex == parentNode.children.length - 1) {
                        nextId = parentNode.id
                    } else {
                        nextId = parentNode.children[thisIndex + 1].id
                    }
                }
            } else if (keycode == 'ArrowUp') {
                if (parentNode) {
                    const thisIndex = _.findIndex(parentNode.children, (cn) => cn.id == id)
                    console.log(thisIndex)
                    if (thisIndex == 0) {
                        nextId = parentNode.id
                    } else {
                        nextId = parentNode.children[thisIndex - 1].id
                    }
                }
            } else if (keycode == 'ArrowLeft') {
                if (parentNode) {
                    nextId = parentNode.id
                }
            } else if (keycode == 'ArrowRight') {
                if (children && children.length > 1) {
                    nextId = children[0].id
                } else {
                    nextId = id
                }
            }
        }
        moveSelectTo(graph, nextId)
        graph.paint()
    },
})

function moveSelectTo(graph, nextId) {
    _.each(graph.findAllByState('node', 'selected'), (n) => {
        graph.setItemState(n, 'selected', false)
    })
    const nextNode = graph.findById(nextId)
    if (nextNode) {
        graph.setItemState(nextNode, 'selected', true)
    }
}
