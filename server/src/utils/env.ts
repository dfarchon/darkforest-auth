import type { Writable } from 'type-fest';

// default NODE_ENV to development if none set
if (!Object.hasOwn(process.env, 'NODE_ENV')) {
  (process.env as Writable<typeof process.env>).NODE_ENV = 'development';
}
