
class TimeConverter {

    digitToTime(digit) {
        let time = [];

        if (digit >= 3600) {
            let hours = Math.floor(digit / 3600);
            digit = digit - hours * 3600;
            time.push(hours);
        }

        if (digit >= 60) {
            let minutes = Math.floor(digit / 60);
            digit = digit - minutes * 60;
            time.push(minutes);
        }

        if (digit >= 0) {
            digit = digit.toFixed(2);
            time.push(digit);
        }

        return time.join(':');

    }

    TimeToDigit(time) {

        let timeArr = time.split(':').reverse();
        let digit = 0;

        if (timeArr[0]) {
            digit = digit + parseFloat(timeArr[0]);
        }

        if (timeArr[1]) {
            digit = digit + parseInt(timeArr[1]) * 60;
        }

        if (timeArr[2]) {
            digit = digit + parseInt(timeArr[2]) * 3600;
        }

        return digit;
    }
}

module.exports = new TimeConverter();