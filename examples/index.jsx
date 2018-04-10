/**
 * Example
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import CheckBox from 'ship-components-checkbox';
import TextInput from 'ship-components-textinput';
import icon from 'ship-components-icon';
import css from './index.css';

import {
  // Core Video Components
  DashVideo,
  VideoPlayerContainer,
  VideoPlayerActions,
  // Video controls Component
  FullscreenButton,
  PlaybackRate,
  PlayButton,
  PreviousButton,
  NextButton,
  PlayIcon,
  LoadingIcon,
  ProgressBar,
  VideoPlayerControls,
  VolumeButton,
  CurrentVideoTime
} from '../src/root';

export default class Examples extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: false,
      loop: false,
      videoSrc: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
      autoHide: false,
      controlsVisible: true,
      showPrevious: false,
      showNext: false,
      showPlaybackRate: false,
      enableKeyboardShortcuts: false
    };

    this.handleChangeAutoPlay = this.handleChange.bind(this, 'autoPlay');
    this.handleChangeLoop = this.handleChange.bind(this, 'loop');
    this.handleChangeAutoHide = this.handleChange.bind(this, 'autoHide');
    this.handleChangeControlsVisible = this.handleChange.bind(this, 'controlsVisible');
    this.handleChangeVideoSource = this.handleChange.bind(this, 'videoSrc', { useEventValue: true });
    this.handleChangeShowPrevious = this.handleChange.bind(this, 'showPrevious');
    this.handleChangeShowNext = this.handleChange.bind(this, 'showNext');
    this.handleChangeShowPlaybackRate = this.handleChange.bind(this, 'showPlaybackRate');
    this.handleChangeEnableKeyboardShortcuts = this.handleChangeEnableKeyboardShortcuts.bind(this);
  }

  handleChange(field, options = {}, event) {
    const { useEventValue } = options;
    this.setState({
      [field]: useEventValue ? event.target.value : !this.state[field]
    });
  }

  handleChangeEnableKeyboardShortcuts() {
    VideoPlayerActions.updateOptions({
      keyboardShortcuts: !this.state.enableKeyboardShortcuts
    });
    this.handleChange('enableKeyboardShortcuts');
  }

  render() { // eslint-disable-line complexity
    return (
      <div>
        <h1>{'Sample React Video Component'}</h1>
        <div className={classNames(css['page--wrapper'])}>
          <div className={classNames(css['video--wrapper'])}>
            <VideoPlayerContainer>
              <LoadingIcon visible />
              <PlayIcon playable={this.state.playIcon} />
              <DashVideo
                src={this.state.videoSrc}
                frameRate={30}
                setLogToBrowserConsole={false}
                autoPlay={this.state.autoPlay}
                loop={this.state.loop}
                onPlay={() => console.log('onPlay function fired')}
                onEnded={() => console.log('onEnded function fired')}
                onPause={() => console.log('onPause function fired')}
                onClick={() => console.log('onClick function fired')}
                onCanPlay={() => console.log('onCanPlay function fired')}
                onLoadedMetadata={() => console.log('onLoadedMetadata function fired')}
              />
              <VideoPlayerControls
                autoHide={this.state.autoHide}
                visible={this.state.controlsVisible}
              >
                {this.state.showPrevious ?
                  <PreviousButton onClick={() => console.log('PreviousButton onClick function fired')} />
                  : null
                }
                <PlayButton />
                {this.state.showNext ?
                  <NextButton onClick={() => console.log('NextButton onClick function fired')} />
                  : null
                }
                <ProgressBar />
                <CurrentVideoTime />
                <VolumeButton />
                <PlaybackRate visible={this.state.showPlaybackRate} />
                <FullscreenButton isFullscreen={false} />
              </VideoPlayerControls>
            </VideoPlayerContainer>
          </div>
          <div className={css['options--wrapper']}>
            <h2 className={css['video--options']}>Video</h2>
            <TextInput
              label={'Video Source'}
              value={this.state.videoSrc}
              onChange={this.handleChangeVideoSource}
            />
            <h2 className={css['controls--options']}>Control Options</h2>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.enableKeyboardShortcuts}
                onChange={this.handleChangeEnableKeyboardShortcuts}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Enable Keyboard Shortcuts'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.controlsVisible}
                onChange={this.handleChangeControlsVisible}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Show Video controls'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.autoPlay}
                onChange={this.handleChangeAutoPlay}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Autoplay'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.loop}
                onChange={this.handleChangeLoop}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Loop'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.autoHide}
                onChange={this.handleChangeAutoHide}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Auto Hide Video controls'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.showPrevious}
                onChange={this.handleChangeShowPrevious}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Show Previous Button'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.showNext}
                onChange={this.handleChangeShowNext}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Show Next Button'}
              />
            </div>
            <div className={css.row}>
              <CheckBox
                readOnly
                selected={this.state.showPlaybackRate}
                onChange={this.handleChangeShowPlaybackRate}
                outlineIconClass={icon.check_box_outline_blank}
                selectedIconClass={icon.check_box}
              />
              <TextInput
                disabled
                label={'Show Playback Rate'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
