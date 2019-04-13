import SocialWrapper from "./SocialWrapper";
import SocialVideoDAL from "./Database/SocialVideoDAL";
import {shallow} from "enzyme";
import React from "react";
import Social from "./Social";

jest.mock("./Database/SocialVideoDAL");

describe('SocialWrapper', () => {

    let mockedDal;

    const METRICS_WITH_NULL_VALUES = {
        viewsCounter: null,
        thumbsUpCounter: null,
        thumbsDownCounter: null,
    };

    beforeEach(() => {
        mockedDal = {
            addStatsListener: jest.fn(),
            increaseVideoMetric: jest.fn(),
        };

        SocialVideoDAL.mockImplementation(() => mockedDal);
    });

    it('should construct a DAL with injected videoId', () => {
        shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);

        expect(SocialVideoDAL).toHaveBeenCalledWith('videoId');
    });

    it('should display a loader if not connected to social DB', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);

        expect(socialWrapper.text()).toBe('Connecting social network...');
    });

    it('should not display the social content if not connected to social DB', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);

        expect(socialWrapper).not.toContain(Social);
    });

    it('should not increase the view metric if isVideoLoaded did not turn from false to true', () => {
        shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);

        expect(mockedDal.increaseVideoMetric).not.toHaveBeenCalled();
    });

    it('should increase view metric when isVideoLoaded turns from false to true', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);

        socialWrapper.setProps({isVideoLoaded: true});

        expect(mockedDal.increaseVideoMetric).toHaveBeenCalledWith('viewsCounter');
    });

    it('should add a stats listener for current video', () => {
        shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);

        expect(mockedDal.addStatsListener).toHaveBeenCalledWith(expect.any(Function))
    });

    it('should render a Social component with updated props when new video stats are received', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);
        const callbackForStats = mockedDal.addStatsListener.mock.calls[0][0];
        const newStats = {
            viewsCounter: 3,
            thumbsUpCounter: 6,
            thumbsDownCounter: 19,
        };

        callbackForStats(newStats);

        const socialElement = socialWrapper.find(Social);
        expect(socialElement.prop('viewsCounter')).toBe(3);
        expect(socialElement.prop('thumbsUpCounter')).toBe(6);
        expect(socialElement.prop('thumbsDownCounter')).toBe(19);
    });

    it('should render a Social with default metric values of 0 when receiving new video stats which are null', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);
        const callbackForStats = mockedDal.addStatsListener.mock.calls[0][0];

        callbackForStats(METRICS_WITH_NULL_VALUES);

        const socialElement = socialWrapper.find(Social);
        expect(socialElement.prop('viewsCounter')).toBe(0);
        expect(socialElement.prop('thumbsUpCounter')).toBe(0);
        expect(socialElement.prop('thumbsDownCounter')).toBe(0);
    });

    it('should render a Social component which increases thumbsUp metric on click', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);
        const callbackForStats = mockedDal.addStatsListener.mock.calls[0][0];
        callbackForStats(METRICS_WITH_NULL_VALUES); //required to get Social rendered
        const socialElement = socialWrapper.find(Social);

        socialElement.prop('onThumbsUpClick')();

        expect(mockedDal.increaseVideoMetric).toHaveBeenCalledWith('thumbsUpCounter');
    });

    it('should render a Social component which increases thumbsDown metric on click', () => {
        const socialWrapper = shallow(<SocialWrapper videoId={'videoId'} isVideoLoaded={false}/>);
        const callbackForStats = mockedDal.addStatsListener.mock.calls[0][0];
        callbackForStats(METRICS_WITH_NULL_VALUES); //required to get Social rendered
        const socialElement = socialWrapper.find(Social);

        socialElement.prop('onThumbsDownClick')();

        expect(mockedDal.increaseVideoMetric).toHaveBeenCalledWith('thumbsDownCounter');
    });
});