import State from './State.js';

export const color = new State('black');
export const fontSize = new State('16px');
export const currentRoute = new State(window.location.pathname);