<h1 align="center">️<img src="packages/web-app/src/images/logo.svg" height="26px" /> Zaino</h1>
<h3 align="center">
  Hiking and mountaineering equipment app for the meticulous adventurer.
</h3>

<div align="center">🚨 This was my early first-year university project so some things could have been done better. 😉 It is <strong>no longer maintained</strong> but <a href="https://zaino.cc">live demo</a> is up. Running the app and self-hosting it is also possible after completing <a href="#setup">setup</a>.</div>

<h4 align="center">
  <a href="https://zaino.cc">Live demo</a> ᐧ <a href="#setup">Setup</a> ᐧ <a href="https://github.com/igor-krupenja/zaino/blob/master/CHANGELOG.md">Changelog</a>
</h4>

<div align="center">Built with Typescript, React and Firebase.</div>

<!-- todo new screen -->

![Screenshot](screenshot.webp)

## Contents <!-- omit from toc -->

- [Setup](#setup)
- [Deployment](#deployment)
- [Running locally](#running-locally)
- [Project structure](#project-structure)
- [Technologies](#technologies)
- [Functionality](#functionality)
- [Possible improvements](#possible-improvements)
- [Changelog](#changelog)
- [Acknowledgements](#acknowledgements)

## Setup

Before starting, make sure that you have Node 16 installed — or use something like [nvm](https://github.com/nvm-sh/nvm).

### Common

1. [Install Google's Cloud SDK](https://cloud.google.com/sdk/docs/install) and run `gcloud auth login` to log in.
2. Run `npm install -g firebase-tools` to install Firebase CLI globally and run `firebase login` to log in.
3. Run `npm install` in the _root_ directory of the cloned/forked repo.
4. Go to [Firebase console](https://console.firebase.google.com/u/0/) and create two projects, one for **development** environment and one for **production** environment.
5. In Firebase console, create _Web_ apps for the two projects you just made. Refer to this [article](https://support.google.com/firebase/answer/9326094) for additional information.
6. In Firebase console, open Project Settings and note the Project IDs for the projects you created.
7. Create a `.firebaserc` file in the _root_ of this repo and add the Project IDs there. Example with dummy values below:

```json
{
  "projects": {
    "development": "zaino-dev-3ea56",
    "production": "zaino-prod-236c2"
  }
}
```

### Web app

1. Go to Firebase console and open Project Settings for your projects.
2. Scroll down to Your Apps section and locate the code snippet with `firebaseConfig`.
3. Go to `packages/web-app` and create `.env.development` and `.env.production` files with the variables from `firebaseConfig`. Example with correct format and dummy values below:

```shell
REACT_APP_FIREBASE_API_KEY="AIzaSkR_FfdseFcsE3fgg7pdjjjof6jhDSA-dTM"
REACT_APP_FIREBASE_AUTH_DOMAIN="zaino-dev-3ea56.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE_URL="https://zaino-dev-3ea56.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID="zaino-dev-3ea56"
REACT_APP_FIREBASE_STORAGE_BUCKET="zaino-dev-3ea56.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="550657824795"
REACT_APP_FIREBASE_APP_ID="1:550657824795:web:29da52b66934c3ea494f74"
REACT_APP_FIREBASE_MEASUREMENT_ID="G-EWJOIOADSK"
```

#### Caveats ⚠️

- Most of the images used in the [live demo](https://zaino.cc) were purchased from [GraphicRiver](https://zaino.cc) and [Freepik](https://www.freepik.com/) and cannot be made part of this repo due to copyright restrictions. To get images in the app, you can add your own to `packages/web-app/src/images/copyrighted` directory with the following structure:

```shell
├── categories
│   ├── backpack.svg
│   ├── boots.svg
│   ├── compass.svg
│   ├── gloves.svg
│   ├── gps.svg
│   ├── hat.svg
│   ├── hook.svg
│   ├── jacket.svg
│   ├── knife.svg
│   ├── pickaxe.svg
│   ├── poles.svg
│   ├── shorts.svg
│   ├── socks.svg
│   ├── stove.svg
│   └── tent.svg
└── mountain.svg <--- loader image
```

- Privacy policy content used in the [live demo](https://zaino.cc) is not part of the repo. You can add your own to `packages/web-app/src/components/pages/PrivacyPolicyPage/PrivacyPolicyContent.tsx`. Otherwise, it shows a placeholder.

### Firebase

1. Create a Firestore database in Firebase console for your projects, a detailed guide is available [here](https://firebase.google.com/docs/firestore/quickstart#create).
2. Go to `packages/firebase` and create `.env.development` and `.env.production` files with the variables for your Project IDs. Example with dummy values below:

```shell
FB_PROJECT_ID="zaino-dev-3ea56"
```

Note: You can change additional settings like regions and Cloud Storage bucket name in [the `.env` file](packages/firebase/.env).

## Deployment

1. Make sure you did everything in [Setup](#setup) above.
2. Go to `packages/web-app` and run `npm run deploy` to deploy **production** or `npm run deploy-dev` to deploy **development**.
3. Go to `packages/firebase` and run `npm run deploy` to deploy **production** or `npm run deploy-dev` to deploy **development**.

Doing this will also enable periodic Firestore backups and seed the database with demo data, see [firebase](#firebase-1) below.

## Running locally

1. Make sure you did everything in [Setup](#setup) and [Deployment](#deployment) above.
2. Go to `packages/web-app`, run `npm start` and open [localhost:4200](http://localhost:4200). This will _run against a deployed **development** Firebase project_.

## Project structure

The project is a monorepo. I suggest to open the root folder in editor. It has some root-level config, including [shared VSCode settings](.vscode).

Code is split into several [packages](packages). Each package is a separate [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces). These are:

### [shared](packages/shared)

A bit of shared code (types).

### [firebase](packages/firebase)

- A config file with Firestore rules: [firestore.rules](packages/firebase/firestore.rules).
- A [cloud function](packages/firebase/src/database/functions/addSeedData.ts) that seeds the Firestore with demo data from JSON, [seed-data.json](packages/firebase/src/seed-data/seed-data.json). The original [was provided to me by Dmitri](#acknowledgements) as an Excel file. Kudos!
- Another [function](packages/firebase/src/database/functions/backupDb.ts) for periodic DB backups.

### [web-app](packages/web-app)

- [src/components/](packages/web-app/src/components) App components and [pages](packages/web-app/src/components/pages), along with per-component styles. Styles are in SCSS and follow the BEM convention.
- [src/firebase/](packages/web-app/src/firebase) Firebase initialisation and a couple of util functions to work with Firestore data.
- [src/routes/](packages/web-app/src/routes) React Router config and routes.
- [src/state/](packages/web-app/src/state) State management with Redux.
- [src/styles/](packages/web-app/src/styles) Style variables and settings that apply to the whole app.
- [config](packages/web-app/config) and [scripts](packages/web-app/scripts) have some JS files, mostly for Webpack, build and dev server. These is because the app started as a Create React App but was then [ejected](https://create-react-app.dev/docs/available-scripts/#npm-run-eject).

## Technologies

- Typescript
- React, React Router, Redux
- Some React UI components: [React Select](https://react-select.com/home), [react-modal](https://github.com/reactjs/react-modal), [react-tiny-popover](https://github.com/alexkatz/react-tiny-popover)
- SCSS (no frameworks)
- npm workspaces
- Cloud Firestore, Firebase Authentication, Firebase Functions, Google Cloud Storage, Firebase Hosting

## Functionality

- **Log-in with Google account**. Fast and secure log in with your Google account.
- **Data storage with Firestore**. Your data is safely stored in a Cloud Firestore database both with [live demo](https://zaino.cc) and if you self-host Zaino.
- **Robust search and filtering**. Easily filter and sort your items by name, category, label, weight, etc.
- **Efficient packing for your next adventure**. Pack list offers a convenient overview of the items you want to take with you, including weight.
- **Flexible label system**. Organise your items in any way you want with custom labels.
- **Demo data**. Want to try the app without entering your own data first? Click Load under Demo data in header to populate your inventory with a comprehensive set of sample items. These can be easily removed later.
- **Self-hosting support**. Concerned about privacy and want to completely self-host your data? This is possible and I have provided a detailed guide in the [Setup](#setup) section below.

## Possible improvements

Most of the code was written as a summer project after my first year in uni. So there are quite a few areas for possible improvement:

- The app needs tests.
- Custom categories would make a nice feature.
- There is no infinite scroll.
- State management with Redux is a bit convoluted and could be simpler.
- The overall inventory and pack management UX could be better.
- There is no support for mobile screens, narrower than 600px.
- Add support for multiple packs.
- Improve accesibility

## Changelog

### 0.1.1 (4th November 2020)

- Added privacy and cookie policy.
- Fixed usability issue with accidentally closing New item modal on clicking category or labels.
- Fixed incorrect input being occasionally focused when clicking on a label in Edit label form.
- Fixed minor styling issues with New label form.
- Made text selection color less bright.
- Updated README with a better screenshot.

[See full changelog](CHANGELOG.md).

## Acknowledgements

- Dmitri Shastin for his ideas and sharing his inventory data with me.
- All the people proving me with feedback.
