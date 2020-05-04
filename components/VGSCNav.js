import Component from '../Component.js';

class VGSCNav extends Component {
  constructor() {
    super('vgsc-nav');
  }

  styles() {
    return /*css*/`
      nav button.active {
        background-color: teal;
        color: white;
      }
    `;
  }

  onLoad() {
    this.root.querySelector('#home').addEventListener('click', () => {
      window.history.pushState({}, null, '/');
      this.connectedState.currentRoute.value = '/';
    });

    this.root.querySelector('#about').addEventListener('click', () => {
      window.history.pushState({}, null, '/about');
      this.connectedState.currentRoute.value = '/about';
    });
  }

  template() {
    return /*html*/`
      <nav>
        <div state="currentRoute"></div>
        <button class="${this.connectedState.currentRoute.value === '/' ? 'active' : ''}" id="home">Home</button>
        <button class="${this.connectedState.currentRoute.value === '/about' ? 'active' : ''}" id="about">About</button>
      </nav>
    `;
  }
}

window.customElements.define('vgsc-nav', VGSCNav);