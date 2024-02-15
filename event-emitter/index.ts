import { EventEmitter } from 'node:events';

const eventEmitter = new EventEmitter();

eventEmitter.on('my-event', function(this: typeof EventEmitter, a, b) {
  console.log(a);
  console.log(b);
  console.log(this);
  console.log('my event occurred!');
});

eventEmitter.emit('my-event', 10, 'hello');