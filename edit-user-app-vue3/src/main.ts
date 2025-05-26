// Create an async boundary before bootstrapping the app
import('./bootstrap').then(({default: mount}) => {
  mount(document.getElementById('app')!);
}).catch(err => console.error('Failed to load application:', err));