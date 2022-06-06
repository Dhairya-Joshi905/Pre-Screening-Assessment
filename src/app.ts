import { createServer, startServer } from './server'

createServer()
  .then(startServer)
  .catch((error: Error) => {
    console.log(error);
  })