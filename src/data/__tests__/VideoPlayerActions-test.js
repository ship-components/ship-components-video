import VideoDispatcher from '../VideoDispatcher';
import VideoPlayerActions from '../VideoPlayerActions';
import VideoPlayerConstants from '../VideoPlayerConstants';

import { MockVideoBuffer } from './Video-test';

const noOp = () => {};

describe('VideoPlayerActions', () => {
  let spy;

  let mockVideo;
  let mockDashPlayer;

  beforeEach(() => {
    mockVideo = {
      currentTime: 0,
      paused: false,
      ended: false,
      readyState: 0,
      muted: false,
      autoplay: false,
      loop: false,
      seekable: false,
      playbackRate: 1,
      currentSrc: '//video.mp4',
      error: null,
      networkState: 0,
      buffered: new MockVideoBuffer()
    };

    mockDashPlayer = {
      getVolume: jest.fn(),
      duration: jest.fn(),
      getMetricsFor: jest.fn(),
      getDashMetrics: jest.fn(),
      isReady: jest.fn(),
      getBufferLength: jest.fn()
    };
  });

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
    VideoPlayerActions.removeAllListeners();
  });

  it('should call dispatch when you call updateState', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    mockVideo.currentTime = 5;
    VideoPlayerActions.updateState(mockVideo);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.updateState,
      video: mockVideo
    });
  });

  it('should call dispatch when you call update', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    const body = {
      isPlaying: false
    };
    VideoPlayerActions.update(body);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.update,
      body
    });
  });

  it('should call dispatch when you call updateDashState', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    VideoPlayerActions.updateDashState(mockVideo, mockDashPlayer);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.updateState,
      video: mockVideo,
      dashPlayer: mockDashPlayer
    });
  });

  it('should provide an remove method from addChangeListener', () => {
    spy = jest.spyOn(VideoPlayerActions, 'removeListener');
    const name = 'test';
    const fn = () => {};
    const listener = VideoPlayerActions.addChangeListener(name, fn);
    listener.remove();
    expect(spy).toHaveBeenCalledWith(name, fn);
  });

  it('should call dispatch when you call streamInitialized', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    VideoPlayerActions.streamInitialized();
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.streamInitialized
    });
  });

  it('should call dispatch when you call reset', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    VideoPlayerActions.reset();
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.reset
    });
  });

  it('should call dispatch when you call periodSwitch', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    const toStreamInfo = {
      test: true
    };
    const mockEvent = {
      toStreamInfo
    };
    VideoPlayerActions.periodSwitch(mockEvent);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.periodSwitch,
      streamInfo: mockEvent.toStreamInfo
    });
  });

  it('should call dispatch when you call updateQualityIndex', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoDispatcher, 'dispatch').mockImplementation(noOp);
    const bitrate = 1000;
    VideoPlayerActions.updateQualityIndex(bitrate);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalledWith({
      type: VideoPlayerConstants.updateQualityIndex,
      bitrate
    });
  });

  it('should call playbackRate when resetPlaybackRate is called', () => {
    spy = jest.spyOn(VideoPlayerActions, 'playbackRate');
    VideoPlayerActions.resetPlaybackRate();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call playbackRate when increasePlaybackRate is called', () => {
    spy = jest.spyOn(VideoPlayerActions, 'playbackRate');
    VideoPlayerActions.increasePlaybackRate();
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should call playbackRate when decreasePlaybackRate is called', () => {
    spy = jest.spyOn(VideoPlayerActions, 'playbackRate');
    VideoPlayerActions.decreasePlaybackRate();
    expect(spy).toHaveBeenCalledWith(0.5);
  });

  it('should emit when playbackRate is called', () => {
    spy = jest.spyOn(VideoPlayerActions, 'emit');
    VideoPlayerActions.playbackRate(1);
    expect(spy).toHaveBeenCalledWith('playbackRate', 1);
  });
});
