import TimeService from '../VideoTimeService';

describe('TimeService', () => {
  it('should be an object', () => {
    expect(typeof TimeService).toBe('object');
  });

  describe('string2Seconds', () => {
    it('should convert a time string to seconds', () => {
      [
        {
          value: '0:00:14:01',
          frameRate: 30,
          expected: 14.03
        },
        {
          value: '0:00:14:01',
          frameRate: 60,
          expected: 14.016
        },
        {
          value: '0:01:30:15',
          frameRate: 30,
          expected: 90.5
        },
        {
          value: '30:15',
          frameRate: 30,
          expected: 30.5
        },
        {
          value: '15',
          frameRate: 30,
          expected: 0.5
        },
        {
          value: '1:1:0:0',
          frameRate: 30,
          expected: 3660
        }
      ].forEach((test) => { // eslint-disable-line max-nested-callbacks
        expect(TimeService.string2Seconds(test.value, test.frameRate)).toBeCloseTo(test.expected);
      });
    });
  });

  describe('seconds2String', () => {
    it('should convert seconds to a string', () => {
      [
        {
          value: 14.03,
          frameRate: 30,
          expected: '0:00:14:01'
        },
        {
          value: 14.016,
          frameRate: 60,
          expected: '0:00:14:01'
        },
        {
          value: 90.5,
          frameRate: 30,
          expected: '0:01:30:15'
        },
        {
          value: 30.5,
          frameRate: 30,
          expected: '0:00:30:15'
        },
        {
          value: 0.5,
          frameRate: 30,
          expected: '0:00:00:15'
        },
        {
          value: 3660,
          frameRate: 30,
          expected: '1:01:00:00'
        }
      ].forEach((test) => { // eslint-disable-line max-nested-callbacks
        expect(TimeService.seconds2String(test.value, test.frameRate)).toBe(test.expected);
      });
    });
  });

  describe('getStartTime', () => {
    it('should parse the query string and return a number in milliseconds', () => {
      [
        {
          value: '0:00:14:00',
          frameRate: 29.97,
          expected: 14000
        },
        {
          value: '0:00:14:01',
          frameRate: 29.97,
          expected: 14033.366
        },
        {
          value: '0:01:00:01',
          frameRate: 60,
          expected: 60016.6666
        },
        {
          value: '0:01',
          frameRate: 60,
          expected: 16.6666
        },
        {
          value: '1000',
          expected: 1000
        },
        {
          value: '1.5s',
          frameRate: 60,
          expected: 1500
        },
        {
          value: '5m',
          frameRate: 60,
          expected: 300000
        }
      ].forEach((test) => { // eslint-disable-line max-nested-callbacks
        expect(TimeService.getStartTime({
          t: test.value
        }, test.frameRate)).toBeCloseTo(test.expected);
      });
    });
  });

});
