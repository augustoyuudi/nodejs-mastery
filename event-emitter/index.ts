import { EventEmitter } from 'node:events';

const eventEmitter = new EventEmitter();

eventEmitter.on('my-event', () => {
  process.nextTick(() => {
    console.log('my event occurred!');
  });
});

eventEmitter.on('new-event', () => {
  console.log('new event');
});

eventEmitter.on('error', (err) => {
  console.log('An error occurred.');
  console.log(err)
});

eventEmitter.emit('my-event');
eventEmitter.emit('new-event');
eventEmitter.emit('error', new Error('fucked up'));