
import * as $ from 'jquery'
import  './nodeStyle'
import './edgeStyle'
import {graph} from './graphStyle'

$.getJSON('http://localhost:8080/treeNode', function(data) {
  graph.data(data);
  graph.render();
  graph.fitView();
});
