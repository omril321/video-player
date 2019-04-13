import {shallow} from "enzyme";
import VideoProgressBar from "./VideoProgressBar";
import React from "react";

describe('VideoProgressBar', () => {
    const getInnerProgressBarElementStyle = (container) => container.find(".video-progress-bar__inner").get(0).props.style;

    it('should set flexGrow to 0.1 when duration is 10 when currentTime is 1', () => {
        const underTest = shallow(<VideoProgressBar currentTime={1} duration={10}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0.1);
    });

    it('should set flexGrow to 3 when duration is 10 when currentTime is 30', () => {
        //should not happen, but we should check that no error is thrown
        const underTest = shallow(<VideoProgressBar currentTime={30} duration={10}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(3);
    });

    it('should set flexGrow to 0.1 when duration is 10 when currentTime is 1', () => {
        const underTest = shallow(<VideoProgressBar currentTime={1} duration={10}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0.1);
    });

    it('should set flexGrow to 0 when duration is 10 when currentTime is 0', () => {
        const underTest = shallow(<VideoProgressBar currentTime={0} duration={10}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0);
    });

    it('should set flexGrow to 0 when duration is 0 when currentTime is 0', () => {
        const underTest = shallow(<VideoProgressBar currentTime={0} duration={0}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0);
    });

    it('should set flexGrow to 0 when duration is 0 when currentTime is 10', () => {
        const underTest = shallow(<VideoProgressBar currentTime={10} duration={0}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0);
    });

    it('should set flexGrow to 0 when duration is Nan when currentTime is 10', () => {
        const underTest = shallow(<VideoProgressBar currentTime={10} duration={NaN}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0);
    });

    it('should set flexGrow to 0 when duration is 0 when currentTime is undefined', () => {
        const underTest = shallow(<VideoProgressBar currentTime={undefined} duration={0}/>);

        const style = getInnerProgressBarElementStyle(underTest);

        expect(style.flexGrow).toBe(0);
    });
});