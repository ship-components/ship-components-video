import Immutable, {Record} from 'immutable';

/**
 * Immutable Record to keep track of buffered sections
 */
export const BufferRecord = new Record({
  key: undefined,
  start: 0,
  end: 0
});

/**
 * Determine if the video is currently playing or not
 * @param {Node} video
 */
export function getIsPlaying(video) {
  return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
}

/**
 * Convert video.buffered into something more React friendly
 * @param {Node} video
 */
export function getBufferedSections(video) {
  let bufferedSections = new Immutable.List();
  // There are actually multiple buffered sections. So we gather them append
  // generate something we can map later
  for (let i = 0; i < video.buffered.length; i++) {
    bufferedSections = bufferedSections.push(new BufferRecord({
      /**
       * Start doesn't "change" so we use it to track when a bar changes
       * @type  {String}
       */
      key: `${video.buffered.start(i)}-${video.buffered.end(i)}`,
      /**
       * Starting percent position
       * @type  {Number}
       */
      start: Math.floor((video.buffered.start(i) / video.duration) * 10000) / 100,
      /**
       * Ending percent position
       * @type  {Number}
       */
      end: Math.ceil((video.buffered.end(i) / video.duration) * 10000) / 100
    }));
  }
  return bufferedSections;
}
