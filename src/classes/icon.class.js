import "../js/icon-imports";
import {findIconDefinition, icon} from '@fortawesome/fontawesome-svg-core';

export class Icon {

    static getIcon(iconName, prefix = 'fas') {
        const iconLookup = {prefix: prefix, iconName: iconName};
        const icons = icon(findIconDefinition(iconLookup));
        const tmpDiv = document.createElement('div');

        tmpDiv.innerHTML = icons.html.shift();
        return tmpDiv.firstChild;
    }
}