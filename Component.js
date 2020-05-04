class Component extends HTMLElement {
  constructor(componentName, open) {
    super();

    if(!componentName) {
      throw new Error('Missing component name!');
    }

    if(!open) {
      this.root = this.attachShadow({ mode: 'open' });
    } else {
      this.root = this;
    }
    
    this.hasLoaded = false;
    this.connectedState = {};
    this.unsubs = {};
    this.templateId = `${componentName}-template`;
    this.templateEl = document.querySelector(`#${this.templateId}`);
    this.styleEl = document.createElement('style');
  }

  initTemplateTag() {
    if(!this.templateEl) {
      this.templateEl = document.createElement('template');
      this.templateEl.id = `${this.templateId}`;
      document.body.appendChild(this.templateEl);
    }

    const template = this.template();
    if(typeof template === 'string') {
      this.templateEl.innerHTML = template;
    } else if(template instanceof Node) {
      this.templateEl.appendChild(template);
    }

    this.root.appendChild(this.templateEl.content.cloneNode(true));
  }

  styles() {
    return ``;
  }

  template() {
    return ``;
  }

  beforeLoad() {}

  connectedCallback() {
    this.beforeLoad();
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

          this.initTemplateTag();
          this.render();
        })
        .catch(err => {
          throw new Error(err);
        });
      }
    } else {
      this.initTemplateTag();
      this.render();
    }
  }

  render() {
    const boundEls = this.root.querySelectorAll('[state]');
    boundEls.forEach(node => {
      const state = this.connectedState[node.getAttribute('state')];
      if(state) {
        if(typeof state === 'object' && state.hasOwnProperty('__value')) {
          node.innerText = state.value;
        } else {
          node.innerText = state;
        }
      }
    });

    if(!this.hasLoaded) {
      this.onLoad();
      this.hasLoaded = true;
    }
  }

  onLoad() {}

  disconnectedCallback() {
    Object.keys(this.unsubs).forEach(key => {
      this.unsubs[key]();
    });

    this.onUnload();
  }

  onUnload() {}
}

export default Component;