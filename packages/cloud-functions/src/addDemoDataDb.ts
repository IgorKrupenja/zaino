// function deployment fails if using synthetic import here
import * as functions from 'firebase-functions';
// two below should have been import from @zaino/shared but that is broken in Firebase, see #223
import { Item, Label } from '../../shared/';
import demoData from '../../shared/src/demo-data/output-data.json';

const root = '/users/6fYlf75Kopbt07sAOAyHzJxDkTH3';

const items: Item[] = demoData.items;
const labels: Label[] = demoData.labels;

export const addDemoDataDb = functions
  .region(functions.config().settings.region)
  .pubsub.topic('add-demo-data-db')
  .onPublish(() => {
    functions.logger.info('Hello from NEW fn!', { structuredData: true });
  });
