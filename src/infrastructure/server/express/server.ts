import { initApplication } from './application';

async function startServer(): Promise<void> {
  // Init the server application
  const app = await initApplication();

  // Run the server
  app.listen(process.env.APP_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
  });
}

export { startServer };
