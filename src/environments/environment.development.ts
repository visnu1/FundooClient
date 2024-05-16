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
  addLabels: url + `addLabels`,
  patchLabels: url + `patchLabels`,
  chipLabels: url + `chipLabels`,
  renameLabels: url + `renameLabels`,
  updateIndex: url + `updateIndex`
};