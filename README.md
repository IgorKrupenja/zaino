<!-- Todo add icon here? -->

<h1 align="center">️🎒 Zaino</h1>
<h3 align="center">
  Hiking and mountaineering equipment app for the meticulous adventurer.
</h3>

<!-- todo which links? -->

<h4 align="center">
  <a href="https://zaino.cc">Live demo</a> ᐧ <a href="https://github.com/igor-krupenja/zaino/issues">Issues</a> ᐧ <a href="https://github.com/igor-krupenja/zaino/blob/master/CHANGELOG.md">Changelog</a>
</h4>

<div align="center">Built with Typescript, React and Firebase.</div>

<br />

<div align="center">🚨 This was my early first-year university project so some things could have been done better. It is no longer maintained but <a href="https://zaino.cc">live demo</a> is up. Running the app is also possible after completing <a href="#setup">setup</a>.</div>

<br />

<!-- todo new screen -->

![Screenshot](screenshot.png)

## Contents <!-- omit from toc -->

- [Setup](#setup)
- [Deployment](#deployment)
- [Running locally](#running-locally)
- [Code structure](#code-structure)
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
5. In Firebase console, create _Web_ apps for the two projects you created. Refer to this [article](https://support.google.com/firebase/answer/9326094) for additional information.
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

- Most of the images used in the [live demo](#live-demo) were purchased from [GraphicRiver](https://graphicriver.net/) and [Freepik](https://www.freepik.com/) and cannot be made part of this repo due to copyright restrictions. To get images in the app, you can add your own to `packages/web-app/src/images/copyrighted` directory with the following structure:

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

- Privacy policy content used in the [live demo](#live-demo) is not part of the repo. You can add your own to `packages/web-app/src/components/pages/PrivacyPolicyPage/PrivacyPolicyContent.tsx`. Otherwise, a placeholder will be shown.

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

Doing this will also enable periodic Firestore backups and seed it with demo data.

## Running locally

1. Make sure you did everything in [Setup](#setup) and [Deployment](#deployment) above.
2. Go to `packages/web-app`, run `npm start` and open [localhost:4200](http://localhost:4200). This will _run against a deployed **development** Firebase project_.

## Code structure

<!-- TODO ONLY this section needs update -->
<!-- todo clean and shorten -->
<!-- todo mention workspaces -->

The project code is split into several [packages](packages). Each package is a separate [yarn workspace](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) to facilitate easier imports, e.g. `import { Labels, Colors } from '@zaino/shared'`. This is the reason why yarn was chosen over npm for this project as npm's workspace support is [only in beta at the moment](https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major).

In the future, this structure can be used to accomodate additional sub-projects (like a landing page or a React Native app) as separate packages. At the moment, the packages are are:

### [shared](packages/shared)

A small (for the time being) amount of shared code (types). It also includes the demo data used in the app. The original in the CSV format is in [input-data.csv](packages/shared/src/demo-data/input-data.csv). It has been processed with a node script [processDemoData.ts](packages/shared/src/demo-data/processDemoData.ts), which can be modified and re-run with `yarn run process-demo-data`. Output data is in JSON format ([output-data.json](packages/shared/src/demo-data/output-data.json)) and is used by a Firebase function, see [below](####demo-data-and-firebase-functions).

### [cloud-functions](packages/web-app)

A couple of Firebase cloud functions including the function that populates Firestore with the demo data.

### [web-app](packages/web-app)

Main web app, code structure highlights:

- [src/components/](packages/web-app/src/components) App components and pages, along with per-component styles. Styles are mostly in SCSS and follow the BEM convention.
  - `Controls` Various reusable controls and form elements.
  - `Dashboard` Dashboard page components.
  - `Header` App header, including demo data loader.
  - `Icons` Several commonly re-used icons with applied styles.
  - `ItemModal` New/edit item modal components.
  - `LabelBadge` Fancy label badge components used throughout Dashboard and Labels pages.
  - `Labels` Labels page components.
  - `Misc` Various smaller components used throughout the app.
  - `Pages` App pages and temporary mobile placeholder.
  - `Selects` Core select component and re-useable and actual selects that use it. Note that the code is ugly here and needs refactoring, see [#346](https://github.com/igor-krupenja/zaino/issues/346).
  - `Wrappers` Various wrapper components used purely to align and style child components.
- [src/constants/](packages/web-app/src/constants) Built-in label colors and categories, will be moved to Firestore when customisation of these is implemented.
- [src/firebase/](packages/web-app/src/firebase) Firebase initialisation and a couple of functions to work with Firestore data.
- [src/routes/](packages/web-app/src/routes) React Router config and routes.
- [src/state/](packages/web-app/src/state) State management with Redux.
- [src/styles/](packages/web-app/src/styles) Style variables and settings that apply to the whole app.

## Technologies

- Typescript
- React, React Router, Redux
- Some React UI components: [React Select](https://react-select.com/home), [react-modal](https://github.com/reactjs/react-modal), [react-tiny-popover](https://github.com/alexkatz/react-tiny-popover)
- SCSS (no frameworks)
- npm workspaces
- Cloud Firestore, Firebase Authentication, Firebase Functions, Google Cloud Storage, Firebase Hosting

## Functionality

- **Log-in with Google account**. Fast and secure log in with your Google account.
- **Data storage with Firestore**. Your data is safely stored in a Cloud Firestore database both with live demo and if you self-host Zaino.
- **Robust search and filtering**. Easily filter and sort your items by name, category, label, weight, etc.
- **Efficient packing for your next adventure**. Pack list offers a convenient overview of the items you want to take with you, including weight.
- **Flexible label system**. Organise your items in any way you want with custom labels.
- **Demo data**. Want to try the app without entering your own data first? Click Load under Demo data in header to populate your inventory with a comprehensive set of sample items. These can be easily removed later.
- **Self-hosting support**. Concerned about privacy and want to completely self-host your data? This is possible and I have provided a detailed guide in the [Setup](#setup) section below.

## Possible improvements

<!-- todo clean up -->

### 0.4.0

- Add custom categories.
- Add infinite scroll pagination.

### 0.3.0

- Improve inventory and pack management UX.
- Add support for multiple packs.

### 0.2.1

- Add unit tests for functionality that is ready.
- Improve code structure and maintainability.
- Streamlined and fully automated the deployment process.

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
