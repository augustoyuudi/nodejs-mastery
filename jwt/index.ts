import jwt from 'jsonwebtoken';

const secret = 'secret'

const user = {
  name: 'Augusto',
  height: 169
}

const token = jwt.sign(user, secret);
const decoded = jwt.verify(token, secret);

console.log(token);
console.log(decoded);
