import FirebaseDatabaseWrapper from "./FirebaseDatabaseWrapper";

class SocialVideoDAL {


    constructor(videoId) {
        //defining a ref for each video COULD be
        this._statsReference = FirebaseDatabaseWrapper.ref(`videos/${videoId}/`);
    }

    addStatsListener = (callback) => {
        this._statsReference.on('value', (newVal) => callback(newVal.val()));
    };

    //TODO: wrap this up nicely for each metric, while setting the initial stats properly
    increaseViewCounter = () =>
        this._statsReference.child('viewsCounter').transaction(previousValue => {
                return (previousValue || 0) + 1;
            },
            undefined,
            false /*do not apply locally, so the user will not see a "1 view" state*/);

}

export default SocialVideoDAL;