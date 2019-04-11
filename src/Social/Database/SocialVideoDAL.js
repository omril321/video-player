import FirebaseDatabaseWrapper from "./FirebaseDatabaseWrapper";

class SocialVideoDAL {


    constructor(videoId) {
        this._viewsReference = FirebaseDatabaseWrapper.ref(`${videoId}/viewsCounter`);
    }

    addViewsListener = (callback) => {
        this._viewsReference.on('value', (newVal) => {
            const val = newVal.val();
            console.log("GOT NEW VAL! ", val);
            callback(val);
        })
    };

    //TODO: how do we detect when the connection to DB is ok? (meaning, when can we remove the "spinner" for the social part?)
    increaseViewCounter = () =>
        this._viewsReference.transaction(previousViewsCounter => {
            //when not initiated - null
            return previousViewsCounter ? previousViewsCounter + 1 : 1;
        });

    //TODO: probably remove this
    // onInitialStateRecieved = (callback) => this._viewsReference.once('value', callback)
}

export default SocialVideoDAL;