import { EventEmitter } from 'node:events';

const eventEmitter = new EventEmitter();

eventEmitter.on('my-event', (a, b) => {
  console.log('my event occurred!');
});

eventEmitter.emit('my-event');