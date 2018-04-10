module.exports = {
  MediaPlayer: function() { // eslint-disable-line func-names
    const initialize = jest.fn();
    const setInitialBitrateFor = jest.fn();
    const setFastSwitchEnabled = jest.fn();
    const clearDefaultUTCTimingSources = jest.fn();
    const addUTCTimingSource = jest.fn();
    const getDebug = jest.fn().mockReturnValue({
      setLogToBrowserConsole: jest.fn()
    });
    const play = jest.fn();
    const pause = jest.fn();
    const setMute = jest.fn();
    const setPlaybackRate = jest.fn();
    const reset = jest.fn();
    const seek = jest.fn();
    const setAutoPlay = jest.fn();
    const on = jest.fn();
    const isReady = jest.fn().mockReturnValue(true);

    this._spies = {
      initialize,
      setInitialBitrateFor,
      setFastSwitchEnabled,
      clearDefaultUTCTimingSources,
      addUTCTimingSource,
      getDebug,
      play,
      pause,
      setMute,
      setPlaybackRate,
      reset,
      seek,
      setAutoPlay,
      on,
      isReady
    };

    this.create = jest.fn().mockReturnValue({
      ...this._spies
    });
  }
};

module.exports.MediaPlayer.events = {
  'STREAM_INITIALIZED': 'streamInitialized',
  'PERIOD_SWITCH_COMPLETED': 'periodSwitchCompleted'
};
