import {
  getIsFullscreen,
  exitFullscreen,
  enterFullscreen,
  toggleFullscreen,
  addEventListener
} from '../FullscreenService';

function cleanUp(obj, key) {
  if (!obj.hasOwnProperty(key)) {
    return;
  }
  // Reset global objects to default
  delete obj[key];
}

describe('FullscreenService', () => {
  let spy = null;
  let documentObjectCopy = global.document;

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });
  describe('getIsFullscreen', () => {
    it('Should return a false if no browser detected', () => {
      const test = getIsFullscreen();
      expect(test).toEqual(false);
    });

    it('Should return a true if browser is in fullscreen mode', () => {
      // Modifying the global object
      global.window.fullScreen = true;
      const test = getIsFullscreen();
      expect(test).toEqual(true);
      // Reseting the global object back to default
      global.window.fullScreen = false;
    });

    it('Should return a true if browser is in fullscreen mode in Chrome', () => {
      // Modifying the global object
      global.document.fullScreen = true;
      const test = getIsFullscreen();
      expect(test).toEqual(true);
      // Reseting the global object back to default
      delete global.document.fullScreen;
    });

    it('Should return a true if browser is in fullscreen mode in Firefox', () => {
      // Modifying the global object
      global.document.mozFullScreen = true;
      const test = getIsFullscreen();
      expect(test).toEqual(true);
      // Reseting the global object back to default
      delete global.document.mozFullScreen;
    });

    it('Should return a true if browser is in fullscreen mode in webkit', () => {
      // Modifying the global object
      global.document.webkitIsFullScreen = true;
      const test = getIsFullscreen();
      expect(test).toEqual(true);
      // Reseting the global object back to default
      delete global.document.webkitIsFullScreen;
    });
  });

  describe('exitFullscreen', () => {
    it('Should throw an error if no browser detected', () => {
      // eslint-disable-next-line max-nested-callbacks
      expect(() => exitFullscreen()).toThrow('Unable to exit fullscreen');
    });

    it('Should exit fullscreen mode when exitFullscreen called in Chrome', () => {
      // Modifying the global object
      global.document.exitFullscreen = jest.fn();
      spy = jest.spyOn(global.document, 'exitFullscreen');
      // Exit fullscreen mode
      exitFullscreen();
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      delete global.document.exitFullscreen;
    });

    it('Should exit fullscreen mode when exitFullscreen called in Edge', () => {
      // Modifying the global object
      global.document.msExitFullscreen = jest.fn();
      spy = jest.spyOn(global.document, 'msExitFullscreen');
      // Exit fullscreen mode
      exitFullscreen();
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      delete global.document.msExitFullscreen;
    });

    it('Should exit fullscreen mode when exitFullscreen called in Firefox', () => {
      // Modifying the global object
      global.document.mozCancelFullScreen = jest.fn();
      spy = jest.spyOn(global.document, 'mozCancelFullScreen');
      // Exit fullscreen mode
      exitFullscreen();
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      delete global.document.mozCancelFullScreen;
    });

    it('Should exit fullscreen mode when exitFullscreen called in Webkit', () => {
      // Modifying the global object
      global.document.webkitExitFullscreen = jest.fn();
      spy = jest.spyOn(global.document, 'webkitExitFullscreen');
      // Exit fullscreen mode
      exitFullscreen();
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      delete global.document.webkitExitFullscreen;
    });
  });

  describe('enterFullscreen', () => {
    it('Should throw an error if no browser detected', () => {
      // eslint-disable-next-line max-nested-callbacks
      expect(() => enterFullscreen(documentObjectCopy)).toThrow('Unable to enter fullscreen');
    });

    it('Should enter fullscreen mode when enterFullscreen called in Chrome', () => {
      documentObjectCopy.requestFullscreen = jest.fn();
      spy = jest.spyOn(documentObjectCopy, 'requestFullscreen');
      // Enter fullscreen mode
      enterFullscreen(documentObjectCopy);
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      cleanUp(documentObjectCopy, 'requestFullscreen');
    });

    it('Should enter fullscreen mode when enterFullscreen called in Edge', () => {
      documentObjectCopy.msRequestFullscreen = jest.fn();
      spy = jest.spyOn(documentObjectCopy, 'msRequestFullscreen');
      // Enter fullscreen mode
      enterFullscreen(documentObjectCopy);
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      cleanUp(documentObjectCopy, 'msRequestFullscreen');
    });

    it('Should enter fullscreen mode when enterFullscreen called in Firefox', () => {
      documentObjectCopy.mozRequestFullScreen = jest.fn();
      spy = jest.spyOn(documentObjectCopy, 'mozRequestFullScreen');
      // Enter fullscreen mode
      enterFullscreen(documentObjectCopy);
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      cleanUp(documentObjectCopy, 'mozRequestFullScreen');
    });

    it('Should enter fullscreen mode when enterFullscreen called in Webkit', () => {
      documentObjectCopy.webkitRequestFullscreen = jest.fn();
      spy = jest.spyOn(documentObjectCopy, 'webkitRequestFullscreen');
      // Enter fullscreen mode
      enterFullscreen(documentObjectCopy);
      expect(spy).toHaveBeenCalled();
      // Reset global objects to default
      cleanUp(documentObjectCopy, 'webkitRequestFullscreen');
    });
  });

  describe('toggleFullscreen', () => {
    it('Should exit fullscreen mode', () => {
      global.document.exitFullscreen = jest.fn();
      global.window.fullScreen = true;
      spy = jest.spyOn(global.document, 'exitFullscreen');

      // Enter fullscreen mode
      toggleFullscreen(documentObjectCopy);
      expect(spy).toHaveBeenCalled();

      // Reset global objects to default
      global.window.fullScreen = false;
      cleanUp(global.document, 'exitFullscreen');
    });

    it('Should enter fullscreen mode', () => {
      global.window.fullScreen = false;
      documentObjectCopy.requestFullscreen = jest.fn();
      spy = jest.spyOn(documentObjectCopy, 'requestFullscreen');

      // Enter fullscreen mode
      enterFullscreen(documentObjectCopy);
      expect(spy).toHaveBeenCalled();

      // Reset global objects to default
      global.window.fullScreen = false;
      cleanUp(documentObjectCopy, 'requestFullscreen');
    });
  });

  describe('addEventListener', () => {
    const listOfDOMEvents = [
      ['fullscreenchange'],
      ['MSFullscreenChange'],
      ['mozfullscreenchange'],
      ['webkitfullscreenchange']
    ];
    let callbackFn = jest.fn();

    beforeEach(() => {
      callbackFn.mockClear();
    });

    it('Should throw an error if callback function not passed in', () => {
      // eslint-disable-next-line max-nested-callbacks
      expect(() => addEventListener(global.document)).toThrow();
    });

    it('Should add addEventListener to element for all browsers type', () => {
      // eslint-disable-next-line max-nested-callbacks
      documentObjectCopy.addEventListener = jest.fn((eventName, cb) => cb(eventName));
      spy = jest.spyOn(documentObjectCopy, 'addEventListener');
      addEventListener(documentObjectCopy, callbackFn);
      expect(spy).toHaveBeenCalled();
      // Making sure all of the proper DOM fullscreen events are passed by
      // in to the addEventListener function
      expect(callbackFn.mock.calls).toEqual(listOfDOMEvents);
    });

    it('Should add removeEventListener to element for all browsers type', () => {
      // eslint-disable-next-line max-nested-callbacks
      documentObjectCopy.removeEventListener = jest.fn((eventName, cb) => cb(eventName));
      spy = jest.spyOn(documentObjectCopy, 'removeEventListener');
      const result = addEventListener(documentObjectCopy, callbackFn);
      // Resets the array since it already has the event names added
      // from the addEventListener function above
      callbackFn.mockClear();
      result.remove();
      expect(spy).toHaveBeenCalled();
      // Making sure all of the proper DOM fullscreen events are passed by
      // in to the removeEventListener function
      expect(callbackFn.mock.calls).toEqual(listOfDOMEvents);
    });
  });
});
