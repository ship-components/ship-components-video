import queryParams from './QueryString';
import ms from 'ms';

class VideoTimeService {

  constructor() {
    this.seconds2String = this.seconds2String.bind(this);
    this.string2Seconds = this.string2Seconds.bind(this);
  }

  /**
   * @param float time        float value in seconds (eg: 10.342)
   * @param float frameRate   optional; will add current frame
   * @return                 string with format "mm:ss[:ff]"
   */
  seconds2String(time, frameRate = 30) { // eslint-disable-line complexity
    if (isNaN(time)) {
      return void 0;
    }
    // Sometimes time is negative but less than a frame causing
    // this flag to get triggered but for the zero time stamp to
    // show. So we're just going to trim off those digits we don't need
    const negative = time.toFixed(3) < 0;
    time = Math.abs(time);
    const totalSeconds = Math.floor(time);
    const leftOverMillis = time % 1;
    const hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let seconds = totalSeconds % 60;
    let frames = Math.round(frameRate * leftOverMillis);
    if (frames >= Math.round(frameRate)) {
      frames = 0;
      // todo: run an algorithm for this. don't do brute force field checking, that's painful.
      seconds++;
      if (seconds >= 60) {
        minutes ++;
      }
    }
    // Padding
    frames = frames < 10 ? '0' + frames : frames;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${negative ? '(-' : ''}${hours}:${minutes}:${seconds}:${frames}${negative ? ')' : ''}`;
  }

  /**
   * Conversion method from string to float
   * @type {String}  timeString, a string with format "hours:minutes:seconds:frames"
   * @return {float}  time in seconds
   */
  string2Seconds(timeString, frameRate = 30) {
    let timeBits = timeString.split(':').reverse();
    let frames = parseInt(timeBits[0], 10) || 0;
    let seconds = parseInt(timeBits[1], 10) || 0;
    let minutes = parseInt(timeBits[2], 10) || 0;
    let hours = parseInt(timeBits[3], 10) || 0;
    return (hours * 3600) + (minutes * 60) + seconds + (frames / (frameRate));
  }

  /**
   * Look for query params that indicate a starting time
   * @return {int}  milliseconds
   */
  getStartTime(params = queryParams, frameRate = 30) { // eslint-disable-line complexity
    // look for parameters ["t", "cid"]
    if (params.hasOwnProperty('t') && params.t.toString().length > 0) {
      // Parse strings like 1.2212s or 1h or 2m
      const time = this.validateTimeString(params.t);
      if (!isNaN(time)) {
        return time;
      }

      // get timestamp from t param
      const timeCode = this.validateTimeCode(params.t);
      if (timeCode) {
        return this.string2Seconds(timeCode, frameRate) * 1000;
      }
    }

    return 0;
  }

  /**
     * Takes a string like 1s and converts to ms
     * @param   {String}  time  A string if a format like 1.21s
     */
  validateTimeString(time) {
    return Math.floor(ms(time));
  }

  /**
   * Checks to see if a string fits a timecode and return it if successful
   * @param {String} time "hh:mm:ss:ff"
   */
  validateTimeCode(time, defaultValue = undefined) {
    if (typeof time !== 'string') {
      return defaultValue;
    }

    // pad or truncate string
    let chunks = time.split(':');
    let timeValues = ['00', '00', '00', '00'];
    if (chunks.length === 0) {
      return defaultValue;
    }

    for (let i = 1; i <= 4 && i <= chunks.length; i++) {
      timeValues[4 - i] = chunks[chunks.length - i];
    }


    for (let i = 0; i < timeValues.length; i++) {
      if (!/^[0-9]+$/.test(timeValues[i])) {
        return defaultValue;
      }
    }

    return timeValues.join(':');
  }
}


/**
 * return a simplified string representation of `time`
 * @param  {int} time   millis
 * @return {string}
 */
function basicTime(time) {
  let totalSeconds = Math.floor(time / 1000);
  let hours = Math.floor(totalSeconds / (60 * 60));
  let minutes = Math.floor(totalSeconds / 60) % 60;
  let seconds = totalSeconds % 60;

  hours = hours > 0 ? hours + ':' : '';
  if (minutes === 0) {
    minutes = hours === '' ? '0' : '00';
  }
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${hours}${minutes}:${seconds}`;
}

const instance = new VideoTimeService();
export default instance;
export {basicTime};
