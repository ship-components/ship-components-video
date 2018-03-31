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

Here is the list of utilities you can use.

* [Collections](#collections)
  * [keys](#keys)
* [Utils](#utils)
  * [objectSize](#objectsize)

## Usage

### ES6 (Recommended)
The component is written using ES6 therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
<!-- import everything -->
import * as Utility from 'ship-components-video';

<!-- import specific library -->
import {Strings, Sort, Utils, Collections} from 'ship-components-video';

<!-- import specific method from a library -->
import {capitalize, titleCase, toUnderscoreCase, generateRandomString} from 'ship-components-video'.Strings;
```

## Docs
### Collections
```js
const {Collections} = require('ship-components-video');
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
