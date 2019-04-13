import Video from "./Video";
import React from "react";
import {mount} from "enzyme";

describe('Video', () => {
    beforeEach(() => {

        //"polyfill" for jsdom, which does not support <video/> elements
        window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
        window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

        //a bit hacky, but does the trick
        window.HTMLMediaElement.prototype.play = jest.fn();
        window.HTMLMediaElement.prototype.pause = jest.fn();
    });

    it('should start a video playback on mount when isVideoPlaying is true', () => {
        mount(<Video isVideoPlaying={true} onVideoPlaybackUpdate={jest.fn()} onVideoLoaded={jest.fn()} onVideoEnded={jest.fn()}/>);

        expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    it('should pause the video playback on mount when isVideoPlaying is false', () => {
        mount(<Video isVideoPlaying={false} onVideoPlaybackUpdate={jest.fn()} onVideoLoaded={jest.fn()} onVideoEnded={jest.fn()}/>);

        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    it('should pause the video when isVideoPlaying turns from true to false', () => {
        const underTest = mount(<Video isVideoPlaying={true} onVideoPlaybackUpdate={jest.fn()} onVideoLoaded={jest.fn()} onVideoEnded={jest.fn()}/>);
        expect(window.HTMLMediaElement.prototype.pause).not.toHaveBeenCalled();

        underTest.setProps({isVideoPlaying: false});

        expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    it('should play the video when isVideoPlaying turns from false to true', () => {
        const underTest = mount(<Video isVideoPlaying={false} onVideoPlaybackUpdate={jest.fn()} onVideoLoaded={jest.fn()} onVideoEnded={jest.fn()}/>);
        expect(window.HTMLMediaElement.prototype.play).not.toHaveBeenCalled();

        underTest.setProps({isVideoPlaying: true});

        expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    it('should call the onVideoLoaded function with video duration when the video has loaded', () => {
        const onVideoLoaded = jest.fn();
        const underTest = mount(<Video isVideoPlaying={false} onVideoPlaybackUpdate={jest.fn()} onVideoLoaded={onVideoLoaded} onVideoEnded={jest.fn()}/>);
        const videoElementOnLoadedData = underTest.find('video').prop('onLoadedData');

        videoElementOnLoadedData({currentTarget: {duration: 10000}});

        expect(onVideoLoaded).toHaveBeenCalledWith({duration: 10000});
    });

    it('should call the onVideoEnded function when the video has ended', () => {
        const onVideoEnded = jest.fn();
        const underTest = mount(<Video isVideoPlaying={false} onVideoPlaybackUpdate={jest.fn()} onVideoLoaded={jest.fn()} onVideoEnded={onVideoEnded}/>);
        const videoElementOnVideoEnded = underTest.find('video').prop('onEnded');

        videoElementOnVideoEnded();

        expect(onVideoEnded).toHaveBeenCalled();
    });

    it('should call the onVideoPlaybackUpdate function with video duration when the video has updated playback', () => {
        const onVideoPlaybackUpdate = jest.fn();
        const underTest = mount(<Video isVideoPlaying={false} onVideoPlaybackUpdate={onVideoPlaybackUpdate} onVideoLoaded={jest.fn()} onVideoEnded={jest.fn()}/>);
        const videoElementOnVideoPlaybackUpdate = underTest.find('video').prop('onTimeUpdate');

        videoElementOnVideoPlaybackUpdate({currentTarget: {currentTime: 555}});

        expect(onVideoPlaybackUpdate).toHaveBeenCalledWith({currentTime: 555});
    });
});