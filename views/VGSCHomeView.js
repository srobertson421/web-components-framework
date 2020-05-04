import Component from '../Component.js';

class VGSCHomeView extends Component {
  constructor() {
    super('vgsc-home-view');
  }

  template() {
    return /*html*/`
      <div>
        <h1>Home</h1>
      </div>
    `;
  }
}

window.customElements.define('vgsc-home-view', VGSCHomeView);