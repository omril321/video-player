import {formatTimeAsText, formatAsNumberString} from "./formatters";

describe('formatters', () => {
    describe('formatTimeAsText', () => {

        const testGetTimeAsText = (input, expected) => {
            const result = formatTimeAsText(input);

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
            expect(() => formatTimeAsText(NaN)).toThrow();
        });

        it('should throw an error when undefined is given', () => {
            expect(() => formatTimeAsText(undefined)).toThrow()
        });

    });

    describe('formatAsNumberString', () => {

        const testFormatAsNumberString = (input, expected) => {
            const result = formatAsNumberString(input);

            expect(result).toEqual(expected);
        };


        it('should format 0 as 0', () => {
            testFormatAsNumberString(0, "0");
        });

        it('should format 0.1 as 0', () => {
            testFormatAsNumberString(0.1, "0");
        });

        it('should format 1.1 as 1', () => {
            testFormatAsNumberString(1.1, "1");
        });

        it('should format 1.9 as 2', () => {
            testFormatAsNumberString(1.9, "2");
        });

        it('should format 1000 as 1,000', () => {
            testFormatAsNumberString(1000, "1,000");
        });

        it('should format 123456789 as 123,456,789', () => {
            testFormatAsNumberString(123456789, "123,456,789");
        });

        it('should return NaN when undefined is given', () => {
            testFormatAsNumberString(undefined, "NaN");
        });

        it('should return NaN when NaN is given', () => {
            testFormatAsNumberString(NaN, "NaN");
        });

        it('should return 0 when null is given', () => {
            //surprising behaviour, however this is an edge case I do not wish to cover in this project
            testFormatAsNumberString(null, "0");
        });
    });
});