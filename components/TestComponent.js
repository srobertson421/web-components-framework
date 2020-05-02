import Component from '../Component.js';

class TestComponent extends Component {
  constructor() {
    super();
  }

  onLoad() {
    this.root.querySelector('#red').addEventListener('click', () => {
      this.connectedState.color.value = 'red';
    });

    this.root.querySelector('#black').addEventListener('click', () => {
      this.connectedState.color.value = 'black';
    });

    this.root.querySelector('#bigFont').addEventListener('click', () => {
      this.connectedState.fontSize.value = '48px';
    });

    this.root.querySelector('#smallFont').addEventListener('click', () => {
      this.connectedState.fontSize.value = '16px';
    });
  }

  styles() {
    return `
      :host {
        color: ${this.connectedState.color.value};
        font-size: ${this.connectedState.fontSize.value};
      }
    `;
  }

  template() {
    return `
      <div>
        ${this.connectedState.color.value}
        <button id="red">red</button>
        <button id="black">black</button>
        <button id="bigFont">big</button>
        <button id="smallFont">small</button>
      </div>
    `;
}
}

window.customElements.define('test-component', TestComponent);