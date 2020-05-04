import Component from '../Component.js';

class VGSCAboutView extends Component {
  constructor() {
    super('vgsc-about-view');
  }

  template() {
    return /*html*/`
      <div>
        <h1>About</h1>
      </div>
    `;
  }
}

window.customElements.define('vgsc-about-view', VGSCAboutView);