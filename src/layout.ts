
import * as Hierarchy from '@antv/hierarchy'


export default function layout(data) {
    return Hierarchy.indented(data, {
      direction: 'LR',
      getId: function getId(d) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 12;
      },
      // getWidth: function getWidth() {
      //   return 16;
      // },
      getVGap: function getVGap() {
        return 6;
      },
      getHGap: function getHGap() {
        return 80;
      }
    });
  }