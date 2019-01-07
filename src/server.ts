import add, { divide } from './add';
import express from 'express';
import morgan from 'morgan';

export const server = express();
const a = 5;
const b = 15;

server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send({ msg: req.babies });
});

export const router = express.Router();
server.post('/', (req, res) => {
  res.send(req.body);
});

server.listen(3000, () => console.log('Server is listening!'));

/* eslint-disable */
if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
