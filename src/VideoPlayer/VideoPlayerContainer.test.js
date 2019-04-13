import VideoPlayerContainer from "./VideoPlayerContainer";
import React from "react";
import {shallow} from "enzyme";
import Video from "./Video";
import VideoOverlay from "./VideoOverlay/VideoOverlay";

describe('VideoPlayerContainer', () => {
    it('should render a Video element which is played by default', () => {
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={jest.fn()}/>);

        const videoElem = underTest.find(Video);

        expect(videoElem.prop('isVideoPlaying')).toBe(true);
    });

    it('should render VideoOverlay with expected initial state', () => {
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={jest.fn()}/>);

        const videoOverlayElem = underTest.find(VideoOverlay);

        expect(videoOverlayElem.props()).toMatchObject({
            isVideoPlaying: true,
            isVideoLoaded: false,
            currentTime: 0,
            duration: NaN,
        });
    });
    
    it('should call the onVideoLoaded callback when Video element has loaded', () => {
        const onVideoLoaded = jest.fn();
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={onVideoLoaded}/>);

        underTest.find(Video).prop('onVideoLoaded')({duration: 100});

        expect(onVideoLoaded).toHaveBeenCalled();
    });

    it('should update VideoOverlay element\'s properties when Video element has loaded ', () => {
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={jest.fn()}/>);

        underTest.find(Video).prop('onVideoLoaded')({duration: 100});

        expect(underTest.find(VideoOverlay).prop('duration')).toBe(100);
    });

    it('should update Video element playback when VideoOverlay is toggling playback multiple times', () => {
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={jest.fn()}/>);
        const togglePlayback = underTest.find(VideoOverlay).prop('onPlaybackToggle');
        const validateVideoPlaying = (expectedPlayback) => expect(underTest.find(Video).prop('isVideoPlaying')).toBe(expectedPlayback);

        validateVideoPlaying(true);
        togglePlayback();
        validateVideoPlaying(false);
        togglePlayback();
        validateVideoPlaying(true);
    });

    it('should update VideoOverlay currentTime when Video element is updating the playback details', () => {
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={jest.fn()}/>);

        underTest.find(Video).prop('onVideoPlaybackUpdate')({currentTime: 100});

        expect(underTest.find(VideoOverlay).prop('currentTime')).toBe(100);
    });

    it('should update Video element playback status when the video has ended', () => {
        const underTest = shallow(<VideoPlayerContainer onVideoLoaded={jest.fn()}/>);

        underTest.find(Video).prop('onVideoEnded')();

        expect(underTest.find(Video).prop('isVideoPlaying')).toBe(false);
    });
});