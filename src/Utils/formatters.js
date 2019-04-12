const formatTimeAsText = (timeInSecs) => {
    const tempDate = new Date(1000 * timeInSecs).toISOString();

    const hoursStr = tempDate.substr(11, 2);
    const minsAndSecs = tempDate.substr(14, 5);
    const shorterThanAnHour = hoursStr === "00";

    return shorterThanAnHour ? minsAndSecs : `${hoursStr}:${minsAndSecs}`;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const formatAsNumberString = (number) => numberFormatter.format(number);


export {
    formatTimeAsText,
    formatAsNumberString
};