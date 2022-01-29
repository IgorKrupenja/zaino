import * as functions from 'firebase-functions';

type Settings = { functionsRegion: string };

const settings = functions.config().settings as Settings;

export default settings;
