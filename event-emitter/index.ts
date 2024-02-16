import { EventEmitter } from 'node:events';

EventEmitter.captureRejections = true;
const eventEmitter = new EventEmitter();

eventEmitter.on('my-event', async () => {
  throw new Error('kaboom');
});

eventEmitter.on('error', (err: Error) => {
  console.log(`An error occurred: ${err.message}`);
});

eventEmitter.emit('my-event');