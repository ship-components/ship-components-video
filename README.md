# ship-components-video

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) set of utilities. Exports a commonjs module that can be used with [webpack](http://webpack.github.io/). Source is in ES6 and an ES5 version is available using [Babel](https://babeljs.io/).

[![npm](https://img.shields.io/npm/v/ship-components-video.svg)](https://www.npmjs.com/package/ship-components-video)
[![Build Status](http://img.shields.io/travis/ship-components/ship-components-video/master.svg?style=flat)](https://travis-ci.org/ship-components/ship-components-video)
[![Coverage](http://img.shields.io/coveralls/ship-components/ship-components-video.svg?style=flat)](https://coveralls.io/github/ship-components/ship-components-video)
[![devDependencies](https://img.shields.io/david/dev/ship-components/ship-components-video.svg?style=flat)](https://david-dm.org/ship-components/ship-components-video?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/ship-components/ship-components-video.svg)](https://greenkeeper.io/)

## Docs & Help

* [Usage](#usage)
* [Development](#development)
* [Webpack Configuration](#webpack-configuration)
* [Tests](#tests)
* [History](#history)

Here is the list of components & methods you can use.

* [Core Video Component](#corevideocomponent)
  * [DashVideo](#dashvideo)
  * [VideoPlayerContainer](#videoplayercontainer)
* [Video Controlls Component](#videocontrollscomponent)
  * [MuteButton](#mutebutton)
  * [FullscreenButton](#fullscreenbutton)
  * [PlaybackRate](#playbackrate)
  * [PlayButton](#playbutton)
  * [PreviousButton](#previousbutton)
  * [NextButton](#nextbutton)
  * [PlayIcon](#playicon)
  * [LoadingIcon](#loadingicon)
  * [ProgressBar](#progressbar)
  * [VideoPlayerControls](#videoplayercontrols)
  * [VolumeButton](#volumebutton)
  * [CurrentVideoTime](#currentvideotime)
* [Data](#data)
  * [VideoPlayerActions](#videoplayeractions)
  * [VideoPlayerStore](#videoplayerstore)
  * [VideoPlayerTimeStore](#videoplayertimeStore)
  * [VideoDispatcher](#videodispatcher)
  * [VideoPlayerConstants](#videoplayerconstants)
* [Config](#cofig)
  * [PlaybackRateOptions](#playbackrateoptions)

## Usage

### ES6 (Recommended)
The component is written using ES6 therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
<!-- import everything -->
import * from 'ship-components-video';

<!-- import specific component -->
import {
  VideoPlayerContainer,
  PlayButton,
  VolumeButton,
  VideoPlayerActions,
  VideoPlayerStore,
  VideoDispatcher
  } from 'ship-components-video';
```

## Docs
### Core Video Components
#### DashVideo (Required)
```js
/**
 * Dash Adaptive Video Player
 * @required
 * @see http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html
 */
const { DashVideo } = require('ship-components-video');
Or
import { DashVideo } from 'ship-components-video';
```

#### VideoPlayerContainer (Required)
```js
/**
 * Video player wrapper / container
 * @required
 */
import { VideoPlayerContainer } from 'ship-components-video';
```

### Video Controlls Components
#### MuteButton
```js
/**
 * Mute / Volume button without volume adjusting
 * @optional
 */
import { MuteButton } from 'ship-components-video';
```
#### FullscreenButton
```js
/**
 * Fullscreen button
 * @optional
 */
import { FullscreenButton } from 'ship-components-video';
```
#### PlaybackRate
```js
/**
 * Playback rate button
 * @optional
 */
import { PlaybackRate } from 'ship-components-video';
```
#### PlayButton
```js
/**
 * Play button
 * @optional
 */
import { PlayButton } from 'ship-components-video';
```
#### PreviousButton
```js
/**
 * Previous button
 * @optional
 */
import { PreviousButton } from 'ship-components-video';
```
#### NextButton
```js
/**
 * Next button
 * @optional
 */
import { NextButton } from 'ship-components-video';
```
#### PlayIcon
```js
/**
 * Play icon overlay
 * @optional
 */
import { PlayIcon } from 'ship-components-video';
```
#### LoadingIcon
```js
/**
 * LoadingIcon
 * @optional
 */
import { LoadingIcon } from 'ship-components-video';
```
#### ProgressBar
```js
/**
 * ProgressBar
 * @optional
 */
import { ProgressBar } from 'ship-components-video';
```
#### VideoPlayerControls
```js
/**
 * VideoPlayerControls
 * @required
 */
import { VideoPlayerControls } from 'ship-components-video';
```
#### VolumeButton
```js
/**
 * Volume button with ability to volume up and down
 * @optional
 */
import { VolumeButton } from 'ship-components-video';
```
#### CurrentVideoTime
```js
/**
 * Shows the video current time
 * @optional
 */
import { CurrentVideoTime } from 'ship-components-video';
```
### Data
#### VideoPlayerActions (Required)
```js
/**
 * Actions
 * @required
 */
import { VideoPlayerActions } from 'ship-components-video';
```
#### VideoPlayerStore (Required)
```js
/**
 * player store
 * @required
 */
import { VideoPlayerStore } from 'ship-components-video';
```
#### VideoPlayerTimeStore (Required)
```js
/**
 * player time store
 * @required
 */
import { VideoPlayerTimeStore } from 'ship-components-video';
```
#### VideoDispatcher (Required)
```js
/**
 * Dispatcher
 * @required
 */
import { VideoDispatcher } from 'ship-components-video';
```
#### VideoPlayerConstants (Required)
```js
/**
 * Constants
 * @required
 */
import { VideoPlayerConstants } from 'ship-components-video';
```
## Config
#### PlaybackRateOptions
```js
/**
 * playback rate config options
 * @optional
 */
import { PlaybackRateOptions } from 'ship-components-video';
```


## Development
More examples can be found in the `examples/` folder. A development server can be run with:

```shell
$ git clone https://github.com/ship-components/ship-components-video.git
$ npm install
$ npm start
```

### Webpack Configuration
This module is designed to be used with webpack but requires a few loaders if you are pulling the source into another project.

```shell
$ npm install webpack babel-loader --save-dev
```

Below are is a sample of how to setup the loaders:

```js
/**
 * Relevant Webpack Configuration
 */
{
  [...]
  module: {
    rules: [
      // Setup support for ES6
      {
        test: /\.(js|es6)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  [...]
}
```

## Tests
1. `npm install`
2. `npm test`
3. `npm run watch:test`

## History
* 0.1.0 - Initial

## License
The MIT License (MIT)

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
