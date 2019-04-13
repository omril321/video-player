import * as FirebaseDatabaseWrapperModule from "./FirebaseDatabaseWrapper";
import SocialVideoDAL from "./SocialVideoDAL";
import VideoStatsKeys from "./VideoStatsKeys";

describe('SocialVideoDAL', () => {

    let mockedStatsReference, childFn, childTransaction;

    beforeEach(() => {
        childTransaction = jest.fn();
        childFn = jest.fn().mockReturnValue({transaction: childTransaction});

        mockedStatsReference = {
            on: jest.fn(),
            child: childFn
        };
        jest.spyOn(FirebaseDatabaseWrapperModule, 'getDatabaseRef').mockReturnValueOnce(mockedStatsReference);
    });

    afterEach(jest.resetAllMocks);

   it('should initiate a database ref to expected video when constructed', () => {
       new SocialVideoDAL('videoId');

       expect(FirebaseDatabaseWrapperModule.getDatabaseRef).toHaveBeenCalledWith('videos/videoId/');
   });

   describe('addStatsListener', () => {

       it('should set a DB value listener', () => {
           const underTest = new SocialVideoDAL('videoId');

           underTest.addStatsListener(jest.fn());

           expect(mockedStatsReference.on).toHaveBeenLastCalledWith('value', expect.any(Function));
       });

       it('should call the provided callback on a new non-null value', () => {
           const underTest = new SocialVideoDAL('videoId');
           const injectedCallback = jest.fn().mockName('injectedCallback');

           underTest.addStatsListener(injectedCallback);
           const injectedDbValueListener = mockedStatsReference.on.mock.calls[0][1];
           injectedDbValueListener({val: () => "hi"});

           expect(injectedCallback).toHaveBeenLastCalledWith("hi");
       });

       it('should NOT call the provided callback on a new null value', () => {
           const underTest = new SocialVideoDAL('videoId');
           const injectedCallback = jest.fn().mockName('injectedCallback');

           underTest.addStatsListener(injectedCallback);
           const injectedDbValueListener = mockedStatsReference.on.mock.calls[0][1];
           injectedDbValueListener({val: () => null});

           expect(injectedCallback).not.toHaveBeenCalled();
       });
   });

   describe('increaseVideoMetric', () => {
       it('call the expected child, and set a transaction with expected arguments', () => {
           const underTest = new SocialVideoDAL('videoId');

           underTest.increaseVideoMetric(VideoStatsKeys.THUMBS_DOWN);

           expect(childFn).toHaveBeenCalledWith(VideoStatsKeys.THUMBS_DOWN);
           expect(childTransaction).toHaveBeenCalledWith(expect.any(Function), undefined, false);
       });

       it('should not increase the metric when the provided metric is not a valid key', () => {
           const underTest = new SocialVideoDAL('videoId');

           underTest.increaseVideoMetric('not_a_metric');

           expect(childFn).not.toHaveBeenCalled();
       });

       it('should increase an existing metric when the provided metric name is a valid key', () => {
           const underTest = new SocialVideoDAL('videoId');
           underTest.increaseVideoMetric(VideoStatsKeys.THUMBS_DOWN);
           const transactionToMake = childTransaction.mock.calls[0][0];

           const transactionResult = transactionToMake(123);

           expect(transactionResult).toBe(124);
       });

       it('should set a non-existing metric to 1 when the provided metric name is a valid key', () => {
           const underTest = new SocialVideoDAL('videoId');
           underTest.increaseVideoMetric(VideoStatsKeys.THUMBS_DOWN);
           const transactionToMake = childTransaction.mock.calls[0][0];

           const transactionResult = transactionToMake(0);

           expect(transactionResult).toBe(1);
       });

       it('should set a metric with value 0 to 1 when the provided metric name is a valid key', () => {
           const underTest = new SocialVideoDAL('videoId');
           underTest.increaseVideoMetric(VideoStatsKeys.THUMBS_DOWN);
           const transactionToMake = childTransaction.mock.calls[0][0];

           const transactionResult = transactionToMake(null);

           expect(transactionResult).toBe(1);
       });
   })
});