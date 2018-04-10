import {getIsPlaying} from '../getVideoState';

describe('getIsPlaying', () => {
  [
    {
      label: 'should return false when the currentTime is 0',
      expected: false,
      video: {
        currentTime: 0,
        paused: false,
        ended: false,
        readyState: 4
      }
    },
    {
      label: 'should return false when paused is false',
      expected: false,
      video: {
        currentTime: 1,
        paused: true,
        ended: false,
        readyState: 4
      }
    },
    {
      label: 'should return false when ended is true',
      expected: false,
      video: {
        currentTime: 1,
        paused: false,
        ended: true,
        readyState: 4
      }
    },
    {
      label: 'should return false when readyState is less than 2',
      expected: false,
      video: {
        currentTime: 1,
        paused: false,
        ended: true,
        readyState: 2
      }
    },
    {
      label: 'should return true when the video is playing',
      expected: true,
      video: {
        currentTime: 1,
        paused: false,
        ended: false,
        readyState: 4
      }
    }
  ].forEach((test) => {
    it(test.label, () => {
      const result = getIsPlaying(test.video);
      expect(result).toBe(test.expected);
    });
  });
});
