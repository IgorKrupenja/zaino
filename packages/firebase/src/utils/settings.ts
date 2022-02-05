import * as functions from 'firebase-functions';

type Settings = { functions: { region: string }; backups: { bucket: string } };

export const settings = functions.config().settings as Settings;
