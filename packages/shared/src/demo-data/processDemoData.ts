import { createReadStream, writeFileSync } from 'fs';
import { createInterface, Interface } from 'readline';
import { v4 as uuid } from 'uuid';
import { ColorName } from '../constants/Colors';
import { Item } from '../types/Item';
import { Label } from '../types/Label';

const path = './src/demo-data';
const inputFile = `${path}/input-data.csv`;
const outputFile = `${path}/output-data.json`;

const labels: Label[] = [];

const readRawInputData = () => {
  const fileStream = createReadStream(inputFile);
  const lineReader = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return lineReader;
};

const createItems = async (lineReader: Interface) => {
  const items: Item[] = [];

  for await (const line of lineReader) {
    const csvEntry = line.split(';');

    let name = csvEntry[2].split(' (pair)')[0];
    const categoryName = csvEntry[0];
    const weight = csvEntry[5];
    // set 10 quantity for 'Refill' items
    const quantity = csvEntry[6] === 'R' ? 10 : Number(csvEntry[6]);
    let notes = csvEntry[10].trim();

    // skip header
    if (name === 'Item') continue;

    // individual item property tweaks
    if (name === 'All chargers (phone, GoPro, Suunto) + cables (incl multiport)') {
      notes = name;
      name = 'Chargers and cables';
    }
    if (name === 'Phone with cover') {
      notes = '';
      name = 'OnePlus 3 phone with cover';
    }
    // convert 0 weight (< 1g) to undefined to fit app logic
    if (name === 'Memory cards 64 Gb micro-SD') quantity === undefined;

    let item: Item = {
      id: uuid(),
      name,
      categoryName,
      quantity,
      packQuantity: 0,
      addedAt: '',
      notes,
    };
    // set weight and labels ids only if present in data
    if (weight) item.weight = Number(weight);

    item = createLabelsForItem(item, csvEntry[4], csvEntry[1], csvEntry[3]);

    items.push(item);
  }

  return items;
};

const createLabelsForItem = (item: Item, year: string, originalCategory: string, size: string) => {
  const labelIds: string[] = [];

  // labels for technical climbing gear
  // todo under consideration
  switch (originalCategory) {
    case 'Gear':
      assignLabel('misc gear', 'Autumn', labelIds);
      break;
    case 'Ropes/Slings':
      assignLabel('ropes/slings', 'Flower', labelIds);
      break;
    case 'Quickdraws/carbs':
      assignLabel('quickdraws/carbs', 'Mountain', labelIds);
      break;
    case 'Protection':
      assignLabel('protection', 'Storm', labelIds);
      break;
  }

  // year labels
  year && assignLabel(`year ${year}`, 'Sky', labelIds);

  // misc labels based on  comments
  if (
    item.notes === 'Damaged – need repair' ||
    item.notes === 'Need new laces' ||
    item.notes === 'The lace needs adjusting / replacing'
  ) {
    assignLabel('repair/adjust', 'Sunset', labelIds);
  }

  if (item.notes === 'Damaged – need replacing' || item.name === 'Beal Joker Golden Dry rope') {
    assignLabel('replace', 'Beach', labelIds);
  }

  if (
    item.notes === 'Something else now' ||
    item.notes === 'Lost – new one need re-weighting' ||
    item.notes === 'buy and weigh' ||
    item.notes === 'Needs weighing'
  ) {
    assignLabel('weigh', 'Grass', labelIds);
  }

  if (item.notes === 'Something else now' || item.notes === 'Lost – new one need re-weighting') {
    assignLabel('update', 'Forest', labelIds);
  }

  item.notes === 'lost?' && assignLabel('lost?', 'Autumn', labelIds);
  item.notes === 'buy and weigh' && assignLabel('buy', 'Beach', labelIds);
  item.notes === 'Borrowed from Huw' && assignLabel('borrowed', 'Sky', labelIds);
  item.notes == 'Locking carb' && assignLabel('carb: locking', 'Sky', labelIds);
  item.notes == 'Non-locking carb' && assignLabel('carb: non-locking', 'Sky', labelIds);
  item.notes?.includes('Static single') && assignLabel('rope: static', 'Forest', labelIds);
  item.notes?.includes('Dynamic single') && assignLabel('rope: dynamic', 'Grass', labelIds);

  // size labels and related name changes
  if (['L', 'XL', 'M/L', 'L/XL', '13'].includes(size)) {
    assignLabel(`size ${size}`, 'Autumn', labelIds);
  } else if (item.name === 'Black Diamond Venom Adze with leash') {
    item.name = 'Black Diamond Venom Adze 64cm with leash';
    item.notes = size;
  } else if (item.name === 'Mountain House Salmon and Potato in Dill Sauce') {
    item.name += ` (${size})`;
  } else if (item.name === 'Liberty Mountain Stuff Sack') {
    item.name = `${item.name} (9x20 inch)`;
    assignLabel(`size L`, 'Autumn', labelIds);
  } else if (
    item.categoryName === 'Climbing' ||
    item.categoryName === 'Kitchen & nutrition' ||
    item.name === 'LifeVenture Compact Trek Towel' ||
    (item.categoryName === 'Backpacks & bags' && !size.includes('('))
  ) {
    item.name += ` ${size}`;
  } else if (item.categoryName === 'Backpacks & bags' && size.includes('(')) {
    const sizeParts = size.split(' ');
    item.name += ` ${sizeParts[1]}`;
    assignLabel(`size ${sizeParts[0]}`, 'Autumn', labelIds);
  }

  // only add to item object if there are labels
  if (labelIds.length > 0) item.labelIds = labelIds;

  return item;
};

const assignLabel = (name: string, colorName: ColorName, labelIds: string[]) => {
  // check if label already exists
  const labelId = labels.find(label => label.name === name)?.id;
  if (labelId) {
    labelIds.push(labelId);
  } else {
    // maybe make itemCount optional in Label
    const label: Label = { id: uuid(), name, colorName, itemCount: 0 };
    labels.push(label);
    labelIds.push(label.id);
  }
};

const processDemoData = async () => {
  const items = await createItems(readRawInputData());
  const json = JSON.stringify({ items, labels });
  writeFileSync(`${outputFile}`, json);
};

void processDemoData();
