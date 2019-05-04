// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var url = `http://localhost:5000/`;
// var url = `http://18.188.137.21:5000/`

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAJ92gF2p7sSs6C_iYp6rWC4SJB_hRgojI",
    authDomain: "fundoo-client.firebaseapp.com",
    databaseURL: "https://fundoo-client.firebaseio.com",
    projectId: "fundoo-client",
    storageBucket: "fundoo-client.appspot.com",
    messagingSenderId: "922374463864"
  },

  signUp: url + `registerService`,
  signIn: url + `loginService`,
  forgotPassword: url + `forgotPswService`,
  resetPassword: url + `resetService/token`,
  createNote: url + `createNote`,
  userNotes: url + `userNotes`,
  archive: url + `archiveNote`,
  trash: url + `trashNote`,
  delete: url + `deleteService`,
  color: url + `colorService`,
  updateNote: url + `updateNote`,
  reminder: url + `reminderService`,
  userProfile: url + `userProfile`,
  updateFbToken: url + `notificationToken`,
  userLabels: url + `getLabels`,
  deleteLabels: url + 'deleteLabels',
  addLabels: url + `addLabels`
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
