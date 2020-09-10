<!-- todo later also include logo -->

<!-- # Slogan

Hiking, mountaineering and ultra running inventory management app for the meticulous adventurer

Hiking, mountaineering and ultra running equipment management app for the meticulous adventurer

or drop ultra running?

Hiking and mountaineering inventory management app for the meticulous adventurer

Hiking and mountaineering equipment management app for the meticulous adventurer

Hiking and mountaineering equipment app for the meticulous adventurer

Hiking, mountaineering and ultrarunning equipment app for the meticulous adventurer -->

<!-- Todo at least a screenshot here, maybe gif -->
<!-- todo or mb 2 screens -->

<!-- todo maybe centered Zaino text for now first line -->
<!-- todo then line -->
<!-- todo then project description -->
<!-- todo maybe live demo link -->

<!-- todo insp https://github.com/thelounge/thelounge#readme -->

## Overview

<!-- todo mention not working on mobiles yet -->
<!-- todo add WIP notice, maybe tie with mobile -->
<!-- todo mention that features below are implemented SO FAR -->

- **Log-in with Google account**.

<!-- todo mention SECURE login  -->

- **Data storage with Firestore**.
- **Efficient packing for your next adventure**.
- **Robust search and filtering**.
- **Flexible label system**.
- **Demo data**.
- **Self-hosting support**.

<!-- todo in self hosting refer to development section below -->

<!-- todo mention privacy in self-hosting -->

<!-- todo add descriptions -->

### Technologies used

- Typescript
- React, React Router, Redux
- Some React UI components: [React Select](https://react-select.com/home), [react-modal](https://github.com/reactjs/react-modal), [react-tiny-popover](https://github.com/alexkatz/react-tiny-popover)
- SCSS (no frameworks)
- Yarn workspaces
- Webpack
- Firestore, Firebase Authentication, Firebase Functions, Google Cloud Storage, Firebase Hosting

## Live Demo

A fully-functional live demo is available at [zaino.krupenja.net](https://zaino.krupenja.net). It uses a separate production Firebase project so your data is safe from me breaking something in development. 😅

Already have some document or spreadsheet with your hiking/climbing/running gear and want to try the app with your own data? Get in touch with with me at [igor.krupenja@gmail.com](mailto:igor.krupenja@gmail.com) and I will try to get a way to import your data into the app.

## Roadmap

### 0.2.0

- **Create a mobile-friendly app version**. Yeah, I know, not having a mobile version sucks. Work in progress. 🏃‍♂️
- Learn more about unit testing React and create unit tests.
- Create a proper app logo.

## Changelog

### 0.1.0

<!-- todo add date -->

- Initial release 🚀
- **Known issue**: Constant 3-4% CPU usage when idle [#247](https://github.com/krupenja/zaino/issues/247)

[See full changelog](CHANGELOG.md).

## Development

### Contributing

Feel free to report any bugs and submit feature requests in the [Issues section](https://github.com/krupenja/zaino/issues). PRs are also welcome — if you require any assistance, give me a shout at [igor.krupenja@gmail.com](mailto:igor.krupenja@gmail.com).

### Code structure

For clarity, the project code is split into several [packages](packages). Each package is a separate [yarn workspace](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) to facilitate easier imports, e.g. `import { Labels, Colors } from '@zaino/shared'`. This is the reason why yarn was chosen over npm for this project as npm's workspace support is [only in beta at the moment](https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major).

In the future, this structure can be used to accomodate additional sub-projects (like a landing page or a React Native app) as separate packages. At the moment, the packages are are:

#### [shared](packages/shared)

A small (for the time being) amount of shared code like types and constants. It also includes the demo data used in the app. The original in the CSV format is in [input-data.csv](packages/shared/src/demo-data/input-data.csv). It has been processed with a node script [processDemoData.ts](packages/shared/src/demo-data/processDemoData.ts), which can be modified and re-run with `yarn run process-demo-data`. Output data is in JSON format ([output-data.json](packages/shared/src/demo-data/output-data.json)) and is used by a Firebase function, see [below](####demo-data-and-firebase-functions).

#### [cloud-functions](packages/web-app)

A couple of Firebase cloud functions including the function that populates Firestore with the demo data.

#### [web-app](packages/web-app)

Main web app with the following code structure:

<!-- todo add web app structure when finalised -->

<!-- todo SCSS mention BEM naming convention -->

- `src/components/`
- `src/state`

### Setup

This section outlines how to setup a development environment to develop Zaino. This involves quite a few steps, mostly to configure Firebase functionality.

Please note that the development setup has only been tested on macOS and Ubuntu Linux. If you encounter any problems on Windows, please [file an issue](https://github.com/krupenja/zaino/issues/new).

#### Preparation

1. Install current Node LTS or [use nvm](https://github.com/nvm-sh/nvm).
2. Install Yarn.
3. Clone the repo with `git clone https://github.com/krupenja/zaino.git` or [fork it](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).
4. In the root of your cloned repo folder, run `yarn install`.

#### Firestore

<!-- todo mention git ignore for obvious reasons -->

Zaino is a serverless app that uses Firestore as a database. To use Firestore, you need to create a Firebase project and add its configuration to the repo:

1. Go to [Firebase console](https://console.firebase.google.com/u/0/) and create a new project.
2. In Firebase console for your newly-created project, click on the cogwheel, choose Project Settings, scroll down to Your apps and click Add app. Refer to this [article](https://support.google.com/firebase/answer/9326094) for additional information.
3. Choose **Web** app and follow the app setup workflow. On the last screen you will see some JS code. The key part here is the web app's Firebase configuration, similar to the dummy data below:

```js
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyD_GYhIIBfdFHvUDFpuIHQdSK7nio-dLM',
  authDomain: 'zaino-12345.firebaseapp.com',
  databaseURL: 'https://zaino-12345.firebaseio.com',
  projectId: 'zaino-12345',
  storageBucket: 'zaino-12345.appspot.com',
  messagingSenderId: '55797789077',
  appId: '1:570956282077:web:07ebe6d7e2b2ef01494f74',
  measurementId: 'G-P4N3TPO1XY',
};
```

4. In the root of the repository, create a file named `.env.development` and populate it with your Firebase configuration data from the previous step according to a template shown below. Make sure that you use the same variable names (`FIREBASE_API_KEY` etc.), this is important.

```env
FIREBASE_API_KEY="AIzaSyD_GYhIIBfdFHvUDFpuIHQdSK7nio-dLM"
FIREBASE_AUTH_DOMAIN="zaino-12345.firebaseapp.com"
FIREBASE_DATABASE_URL="https://zaino-12345.firebaseio.com"
FIREBASE_PROJECT_ID="zaino-12345"
FIREBASE_STORAGE_BUCKET="zaino-12345.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="55797789077"
FIREBASE_APP_ID="1:570956282077:web:07ebe6d7e2b2ef01494f74"
FIREBASE_MEASUREMENT_ID="G-P4N3TPO1XY"
```

5. In the root of the repository, create a file named `.firebaserc` with the following content but replacing `zaino-12345` with your actual Firebase project name:

```json
{
  "projects": {
    "dev": "zaino-12345"
  }
}
```

6. Create a Firestore database in Firebase console for your project, a detailed guide is available [here](https://firebase.google.com/docs/firestore/quickstart).
7. Run `yarn run deploy-rules-dev` to deploy Firestore security rules.

#### Images and Google Cloud Storage

Due to licensing restrictions (see [below](#license)), the images I use i the [live demo](#live-demo) of the app are not part of the repository and are hosted separately on Google Cloud Storage. If you run the app as is, it will display no images and show a bunch of 404 errors in console. Possible solutions:

- Host your own images in Google Cloud Storage. To do so, you will need to the following line to your `.env.development`, replacing the URL with the actual Google Cloud Storage URL for your project: `GCP_STORAGE_URL="https://storage.googleapis.com/zaino-12345.appspot.com"`. You would also need to add the images to a storage bucket for your Firebase project, the file structure I use is given below. The app will then pick up the images automatically.

```shell
├── categories
│   ├── backpack.svg
│   ├── boots.svg
│   ├── compass.svg
│   ├── gloves.svg
│   ├── gps.svg
│   ├── hat.svg
│   ├── hook.svg
│   ├── jacket.svg
│   ├── knife.svg
│   ├── pickaxe.svg
│   ├── poles.svg
│   ├── shorts.svg
│   ├── socks.svg
│   ├── stove.svg
│   └── tent.svg
└── mountain.svg <--- page loading indicator image
```

- Alternatively, you can just disable the images in [CategoryImage.tsx](packages/web-app/src/components/common/CategoryImage.tsx) and [index.html](packages/web-app/src/index.html)
- Another option would be to add your own image assets and import then with `file-loader` for Webpack. In addition to [CategoryImage.tsx](packages/web-app/src/components/common/CategoryImage.tsx) and [index.html](packages/web-app/src/index.html), check out [Categories.ts](packages/web-app/src/constants/Categories.ts) as well.

#### Demo data and Firebase functions

<!-- todo add notice that not necessary if do not use demo data and backup -->

Unfortunately, Firestore apparently does not a have a meaningful way to import data, so to add the demo data to the app, I created a Firebase cloud function [addDemoDataDb.ts](packages/cloud-functions/src/addDemoDataDb.ts). There are extra steps necessary to use Firebase functions:

1. Install Firebase CLI globally with `yarn global add firebase-tools`.
2. Run `firebase login` and log in with your Google account. If you are getting the "command not found" error, make sure that [yarn is in your PATH](https://classic.yarnpkg.com/en/docs/install/).
3. Firebase functions are run by default in the `us-central1` region and _not_ the region of your Firebase project. To remedy this, add the following line to your `.env.development`: `FIREBASE_FUNCTIONS_REGION="europe-west1"`, replacing `europe-west1` with the region you prefer (likely the same region you set when creating a Firebase project).
4. Deploy functions to Firebase by running `yarn run deploy-fn-dev` in repo root directory.
5. [Install](https://cloud.google.com/sdk/install) Google Cloud SDK.
6. Run `gcloud login` and log in with your Google account.
7. Run `gcloud config set project PROJECT_ID`, replacing `PROJECT_ID` with your actual Firebase project ID.
8. Finally, run `gcloud pubsub topics create 'add-demo-data-db' && gcloud pubsub topics publish 'add-demo-data-db' --message 'dummy'`. This will create a Google Cloud Pub/Sub topic the [addDemoDataDb.ts](packages/cloud-functions/src/addDemoDataDb.ts) function is subscribed to and (securely) trigger the function.

Note that this will also deploy the [backupDb.ts](packages/cloud-functions/src/backupDb.ts) function which saves a backup of Firestore data very 24 hours to `GCP_STORAGE_URL` bucket you specify in your `.env.development` file. This can be disabled by simply removing the relevant export [here](packages/cloud-functions/src/index.ts).

#### Start development server

Woo-hoo, after so many steps we are now ready to start development! You can can run Webpack development server locally with `yarn start` in project root and access it at [http://localhost:8080/](http://localhost:8080/). Development server supports Hot Module Replacement for SCSS and React components (the latter with [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)).

If you use VSCode as your editor, `yarn start` will actually run when you open the project in VSCode. If you do not like this behaviour, tasks can be edited or disabled in [tasks.json](.vscode/tasks.json).

#### Deployment and Firebase Hosting

Zaino comes pre-configured to support deployment to Firebase hosting. Zaino web app deployment uses a separate `.env` file called `.env.production`. You can either create a new Firebase project and use its configuration values in `.env.production`, or, for a quick check, just copy over the contents of `.env.development` to `.env.production` to use the same project in production mode as well. Additionally, you have to modify the `.firebaserc` to add the id of the project you want to use in production to the `prod key`:

```json
{
  "projects": {
    "dev": "zaino-12345",
    "prod": "zaino-prod-12345"
  }
}
```

If you opt to use the same Firebase project in production you already use for development, you only have to run `yarn deploy` in the project root. This will build a production Webpack bundle and push it to Firebase hosting. Your self-hosted Zaino instance can then be accessed online at the URL shown at the end of `yarn deploy` output.

If you opt to use a separate Firebase project in production, there are some additional steps necessary to add the demo data to the app:

1. Run `yarn run deploy-fn`.
2. Run `gcloud config set project PROJECT_ID`, replacing `PROJECT_ID` with your actual Firebase _production_ project ID.
3. Run `gcloud pubsub topics create 'add-demo-data-db' && gcloud pubsub topics publish 'add-demo-data-db' --message 'dummy'`.

## Acknowledgements

<!-- todo Add Dima for data -->

- Patrick Gillespie for his [Text to ASCII Art Generator](http://patorjk.com/software/taag/).
- The development community for writing all those blog posts and Stack Overflow answers.

<!-- todo material icons -->

## License

Zaino is licensed under the [MIT license](LICENSE). However, this does not apply to the images I use in the [live demo](#live-demo). I have purchased these images (from [GraphicRiver](https://graphicriver.net/) and [Freepik](https://www.freepik.com/)) but obviously do not hold copyright for them and cannot include them in this repository.
