import { initApplication } from './application';

async function startServer(): Promise<void> {
  // Init the server application
  const app = await initApplication();

  const port = process.env.PORT || process.env.APP_PORT;

  // Run the server
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
}

export { startServer };
