/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');

const nextApp = require("./nextApp").nextApp;

nextApp.prepare().then(() => {
  const server = app.listen(port);

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () => {

    setTimeout(async () => {

      const users = await app.service('users').find();
      const email = 'admin';
      const password = 'admin';

      if (users.total == 0) {
        await app.service('users').create({ email, password }).then(() => {
          logger.info('User created : email=admin; password=admin');
        });
      }

    }, 2000);

    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  });
})