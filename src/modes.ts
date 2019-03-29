import { EXPAND_ICON, COLLAPSE_ICON } from './nodeStyle';


export default {
    default: [
        {
            type: 'collapse-expand',
            animate: {
                duration: 150, 
            },
            onChange: function onChange(item, collapsed) {
                var data = item.get('model').data;
                var icon = item.get('group').findByClassName('collapse-icon');
                if (collapsed) {
                    icon.attr('symbol', EXPAND_ICON);
                } else {
                    icon.attr('symbol', COLLAPSE_ICON);
                }
                data.collapsed = collapsed;
                return true;
            }
        },
        'drag-canvas',
        {
            type: 'zoom-canvas',
            sensitivity: 1
        }
    ]
} 