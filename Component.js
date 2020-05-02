class Component extends HTMLElement {
  constructor(open) {
    super();

    if(!open) {
      this.root = this.attachShadow({ mode: 'open' });
    } else {
      this.root = this;
    }

    this.connectedState = {};
    this.unsubs = {};
    this.styleEl = document.createElement('style');
    this.templateEl = document.createElement('template');
  }

  connectedCallback() {
    const statePath = this.getAttribute('state');
    if(statePath) {
      const splitPath = statePath.split(',');
      if(splitPath.length > 0) {
        Promise.all(splitPath.map(path => import(path)))
        .then(mods => {
          mods.forEach(mod => {
            Object.keys(mod).forEach(key => {
              this.connectedState[key] = mod[key];
              this.unsubs[key] = this.connectedState[key].subscribe((newVal, oldVal) => {
                this.render();
              });
            });
          });

          this.render();
        })
        .catch(err => {
          throw new Error(err);
        });
      }
    } else {
      this.render();
    }
  }

  styles() {
    return ``;
  }

  template() {
    return ``;
  }

  onLoad() {}

  onUnload() {}

  render() {
    this.root.innerHTML = '';
    this.templateEl.innerHTML = this.template();
    this.styleEl.innerText = this.styles();
    this.root.appendChild(this.templateEl.content.cloneNode(true));
    this.root.appendChild(this.styleEl);
    this.onLoad();
  }

  disconnectedCallback() {
    Object.keys(this.unsubs).forEach(key => {
      this.unsubs[key]();
    });

    this.onUnload();
  }
}

export default Component;