import Immutable from 'immutable';
import { getBufferedSections } from '../getVideoState';

import { MockVideoBuffer } from '../../components/video/__tests__/Video-test';

describe('getBufferedSections', () => {
  it('test', () => {
    const result = getBufferedSections({
      duration: 10,
      buffered: new MockVideoBuffer([{
        start: 0,
        end: 1
      }])
    });
    const record = result.first();
    expect(record).toBeInstanceOf(Immutable.Record);
    expect(result).toBeInstanceOf(Immutable.List);
    expect(record.key).toBe('0-1');
    expect(record.start).toBe(0);
    expect(record.end).toBe(10);
  });
});
