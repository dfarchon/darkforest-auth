/// <reference types="node" />

// Extend the NodeJS namespace with custom properties
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
  }
}
