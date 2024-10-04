var url = `http://localhost:3000/`;
// var url = `http://18.188.137.21:3000/`

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

  signUp: url + `register`,
  signIn: url + `login`,
  forgotPassword: url + `forgot_password`,
  resetPassword: url + `reset_password/token`,
  createNote: url + `create/note`,
  userNotes: url + `notes`,
  updateNote: url + `update/note`,

  
  delete: url + `notes/trash`,
  userLabels: url + `getLabels`,

  deleteLabels: url + 'delete/labels',
  renameLabels: url + `rename/labels`,

  updateNoteLabel: url + `update/note/labels`,
  

  //not updated
  userProfile: url + `userProfile`,
  updateFbToken: url + `notificationToken`,
  updateIndex: url + `updateIndex`,

  addLabels: url + `addLabels`,


};