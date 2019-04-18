// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var url = `http://localhost:5000/`;
export const environment = {
  production: false,
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
  userProfile: url + `userProfile`,
  // signUp: "http://18.220.138.139:5000/registerService",
  // signIn: "http://18.220.138.139:5000/loginService",
  // forgotPassword: "http://18.220.138.139:5000/forgotPswService",
  // resetPassword: "http://18.220.138.139:5000/resetService/token",
  // createNote: "http://18.220.138.139:5000/createNote",
  // userNotes: "http://18.220.138.139:5000/userNotes",
  // archive: "http://18.220.138.139:5000/archiveNote",
  // trash: "http://18.220.138.139:5000/trashNote",
  // delete: "http://18.220.138.139:5000/deleteService",
  // color: "http://18.220.138.139:5000/colorService"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
