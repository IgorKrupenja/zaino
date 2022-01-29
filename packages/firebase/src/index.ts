import admin from 'firebase-admin';

admin.initializeApp();

export * from './database/functions/addSeedData';
export * from './database/functions/backupDb';
