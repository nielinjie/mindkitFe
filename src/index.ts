
import * as $ from 'jquery'
import './style/nodeStyle'
import './style/edgeStyle'
import { graph } from './style/graphStyle'
import './index.css'
import * as _ from 'lodash'

$.getJSON('http://localhost:8080/treeNode', function (data) {
  //FIXME 不应该在这里来翻转，应该在layout的内部。这里翻转导致model有关的计算都很别扭。
  // reverse(data)
  graph.data(data);
  graph.render();
  graph.fitView();
});

function reverse(data) {
  _.reverse(data.children)
  data.children.forEach((d) => {
    reverse(d)
  }
  )
  
}