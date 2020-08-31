// note that function deploy fails if using synthetic import here
import * as functions from 'firebase-functions';
import data from '../../common/demo-data/output-data.json';
import Item from '../../common/types/Item';
import Label from '../../common/types/Label';
import regionJson from '../region.json';

const root = '/users/6fYlf75Kopbt07sAOAyHzJxDkTH3';

const items: Item[] = data.items;
const labels: Label[] = data.labels;

console.log(root, items, labels, regionJson);

export const addDemoDataDb = functions
  .region(regionJson.region)
  .pubsub.topic('add-demo-data-db')
  .onPublish(() => {
    functions.logger.info('Hello from imported fn!', { structuredData: true });
  });
