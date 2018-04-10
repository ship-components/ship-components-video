# ship-components-video
A React video component using HTML5 and [DashJS](https://github.com/Dash-Industry-Forum/dash.js/wiki).

[![npm](https://img.shields.io/npm/v/ship-components-video.svg)](https://www.npmjs.com/package/ship-components-video)
[![Build Status](http://img.shields.io/travis/ship-components/ship-components-video/master.svg?style=flat)](https://travis-ci.org/ship-components/ship-components-video)
[![Coverage](http://img.shields.io/coveralls/ship-components/ship-components-video.svg?style=flat)](https://coveralls.io/github/ship-components/ship-components-video)
[![devDependencies](https://img.shields.io/david/dev/ship-components/ship-components-video.svg?style=flat)](https://david-dm.org/ship-components/ship-components-video?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/ship-components/ship-components-video.svg)](https://greenkeeper.io/)

## Docs & Help

* [Usage](#usage)
* [Docs](docs/index.html)
* [Development](#development)
* [Tests](#tests)
* [History](#history)

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
Please refer to [Docs]('./docs/index.html');

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

Copyright (c) 2018

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
