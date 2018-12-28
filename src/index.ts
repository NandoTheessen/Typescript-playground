import express from 'express';
import add from './add';
import morgan from 'morgan';

export const server = express();
export const a: number = 5;
export const b: number = 15;

server.use(express.json());
server.use(morgan('dev'));
server.get('/', (req, res) => {
  res.send({ msg: 'booooojaaa!' });
});

export const router = express.Router();
server.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

server.listen(3000, () => console.log('Server is listening!'));

console.log('Hello World!', add(a, b));
console.log('OOOOH');
