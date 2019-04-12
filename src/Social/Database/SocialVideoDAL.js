import FirebaseDatabaseWrapper from "./FirebaseDatabaseWrapper";
import VideoStatsKeys from "./VideoStatsKeys";

class SocialVideoDAL {


    constructor(videoId) {
        this._statsReference = FirebaseDatabaseWrapper.ref(`videos/${videoId}/`);
    }

    addStatsListener = (callback) => {
        this._statsReference.on('value', (newVal) => callback(newVal.val()));
    };

    increaseVideoMetric = (metricKey) => {
        if (!SocialVideoDAL._isVideoMetricValid(metricKey)) {
            //silently fail - do nothing
            return;
        }

        this._statsReference.child(metricKey).transaction(previousValue => {
                return (previousValue || 0) + 1;
            },
            undefined,
            false /*do not apply locally, so the user will not see a "1 view" state when there's actually more than 1 view*/);
    };

    //will no work on IE and some mobile phones
    static _isVideoMetricValid = (metricKey) => Object.values(VideoStatsKeys).includes(metricKey)
}

export default SocialVideoDAL;