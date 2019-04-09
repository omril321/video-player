import {getTimeAsText} from "./VideoDurationIndicatorService";

describe('getTimeAsText', () => {

    const testGetTimeAsText = (input, expected) => {
        const result = getTimeAsText(input);

        expect(result).toEqual(expected);
    };

    it('should return 00:00 when 0 is given', () => {
        testGetTimeAsText(0, '00:00');
    });

    it('should return 00:01 when 1 is given', () => {
        testGetTimeAsText(1, '00:01');
    });

    it('should return 00:01 when 1.5 is given', () => {
        testGetTimeAsText(1.5, '00:01');
    });

    it('should return 01:00:00 when 3600 is given', () => {
        testGetTimeAsText(3600, '01:00:00');
    });

    it('should return 01:01:06 when 3666 is given', () => {
        testGetTimeAsText(3666, '01:01:06');
    });

    it('should return 00:00 when null is given', () => {
        //This is a surprising behaviour of this function, however this is an edge case I did not wish to solve for now.
        testGetTimeAsText(null, '00:00');
    });

    it('should throw an error when NaN is given', () => {
        expect(() => getTimeAsText(NaN)).toThrow();
    });

    it('should throw an error when undefined is given', () => {
        expect(() => getTimeAsText(undefined)).toThrow()
    });

});