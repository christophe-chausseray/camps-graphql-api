import { Container } from 'inversify';

function init(): Container {
  const container = new Container();

  return container;
}

export default { init };
