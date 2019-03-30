
import * as $ from 'jquery'
import  './style/nodeStyle'
import './style/edgeStyle'
import {graph} from './style/graphStyle'
import  './index.css'

$.getJSON('http://localhost:8080/treeNode', function(data) {
  graph.data(data);
  graph.render();
  graph.fitView();
});
