import 'reflect-metadata';
import Application from './application';

async function start(): Promise<void> {
  // Init the server application
  const { app } = await Application.init();

  // Run the server
  app.listen(process.env.APP_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
  });
}

export default { start };
