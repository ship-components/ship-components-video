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
Please refer to [Docs]('/docs');
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
