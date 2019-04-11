// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signUp: "http://localhost:5000/registerService",
  signIn: "http://localhost:5000/loginService",
  forgotPassword: "http://localhost:5000/forgotPswService",
  resetPassword: "http://localhost:5000/resetService/token",
  createNote: "http://localhost:5000/createNote",
  userNotes: "http://localhost:5000/userNotes",
  archive: "http://localhost:5000/archiveNote",
  trash: "http://localhost:5000/trashNote",
  delete: "http://localhost:5000/deleteService",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
