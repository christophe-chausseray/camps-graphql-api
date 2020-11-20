import { Container } from 'inversify';

var container: Container;

function initContainer(): Container {
  container = new Container();

  return container;
}

export { container, initContainer };
