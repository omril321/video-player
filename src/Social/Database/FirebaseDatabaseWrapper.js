import firebase from "firebase/app";
import "firebase/database";

const config = {
    apiKey: "AIzaSyAlrBt-1bHJvZo-S0-Y8g5zwwzvXQnJvQg",
    authDomain: "video-player-stats.firebaseapp.com",
    databaseURL: "https://video-player-stats.firebaseio.com",
    projectId: "video-player-stats",
    storageBucket: "video-player-stats.appspot.com",
    messagingSenderId: "142352081374"
};

firebase.initializeApp(config);

export default firebase.database();