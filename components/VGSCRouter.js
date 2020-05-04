import Component from '../Component.js';
import { pathToRegexp } from '../utils/pathToRegExp.js';

class VGSCRouter extends Component {
  constructor() {
    super('vgsc-router');
  }

  matchRouteToView() {
    for(let view of this.children) {
      if(this.connectedState.currentRoute.value.match(pathToRegexp(view.getAttribute('path')))) {
        this.currentView = view.getAttribute('slot');
      }
    }
  }

  template() {
    return /*html*/`
      <slot name="${this.currentView}"></slot>
    `;
  }
}

window.customElements.define('vgsc-router', VGSCRouter);