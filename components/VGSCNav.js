import Component from '../Component.js';

class VGSCNav extends Component {
  constructor() {
    super();
  }

  styles() {
    return /*css*/`
      nav {
        background-color: blue;
      }
    `;
  }

  template() {
    return /*html*/`
      <nav>Nav</nav>
    `;
  }
}

window.customElements.define('vgsc-nav', VGSCNav);