import dotenv from 'dotenv';

export default () => {
  dotenv.config({ path: `../../.env.${process.env.NODE_ENV as string}` });

  return `$gcp-storage-url: '${process.env.GCP_STORAGE_URL as string}';` + '$red: red;';
};
