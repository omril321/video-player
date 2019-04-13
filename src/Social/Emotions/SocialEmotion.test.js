import SocialEmotion from "./SocialEmotion";
import {shallow} from "enzyme";
import React from "react";

describe('SocialEmotion', () => {
    it('should inject the click callback to the button', () => {
        const onButtonClick = jest.fn();
        const underTest = shallow(<SocialEmotion onButtonClick={onButtonClick} currentValue={123456789} buttonContent={<div/>}/>);

        underTest.find('button').simulate('click');

        expect(onButtonClick).toHaveBeenCalledTimes(1);
    });

    it('should format the current value as number string', () => {
        const underTest = shallow(<SocialEmotion onButtonClick={jest.fn()} currentValue={123456789} buttonContent={<div/>}/>);

        const formattedValue = underTest.find('.social-emotion__value-text').text();

        expect(formattedValue).toBe('123,456,789');
    });
});