# react-test

## React and React-Native

An app that interactively narrows-down valid menu items based on previous selections. React app built with [React](https://reactjs.org/). React Native app built with [React-Native](https://reactnative.dev/) and [Expo](https://expo.io/).

## Backend 

Backend application that matches words from client requests and provides the appropriate response based on an existing context table.

[Typescript](https://www.typescriptlang.org/) is installed in all projects for type safety and code standards.

### Goals
 - [X] Satisfy Test Instructions for React
 - [X] Satisfy Test Instructions for React-Native
 - [X] Satisfy Test Instructions for Backend

### Project Structure

The `react-app` is bootstrapped with `create-react-app`. The `rn-app` was bootstrapped using `expo`. The `backend` server is a single script using `restify`.

Important Files are described below:

#### React
 - `src/App.tsx` is the main entry point. 
 - `src/components/MenuSelection.tsx` is the component where the radio button validation logic is done
 - `src/components/RadioButton.tsx` is the individual component used for the radio button
 - `src/types/components.ts` typescript declaration file
 - `src/services/data.ts` abstraction for data fetching 

#### React Native
 - `App.tsx` is the main entry point. 
 - `components/MenuSelection/index.tsx` is the component where the radio button validation logic is done
 - `components/MenuItem/index.tsx` is the individual component used for the radio button
 - `types/components.ts` typescript declaration file
 - `services/data.ts` abstraction for data fetching 

#### Backend
 - `index.ts` contains all the logic and server setup. 
## Usage
1.  Navigate to specific directory for testing with `cd <project>`, then run `npm install` to install essential node modules
2. Then run `npm start` to boot up development servers
#### For react native
3. Install `Expo Go` on a mobile phone.
4. When `npm start` is executed, a QR code is displayed
5. Open `Expo Go` and scan the QR code.

> Mobile phone and API server computer has to be in the same network.