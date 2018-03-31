import invariant from 'invariant';

export function getIsFullscreen() {
  // Depending on user's browser type, one of these might return undefined
  const test = window.fullScreen || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  // in case one of the bools checks above returns undefined
  // return false instead of returning undefined
  return Boolean(test);
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else {
    throw new Error('Unable to exit fullscreen');
  }
}

export function enterFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else {
    throw new Error('Unable to enter fullscreen');
  }
}

export function toggleFullscreen(el) {
  const isFullscreen = getIsFullscreen();
  if (isFullscreen) {
    exitFullscreen();
  } else {
    enterFullscreen(el);
  }
}

export function addEventListener(el, fn) {
  invariant(
    typeof fn === 'function',
    'fn is not a function'
  );
  // Listen
  el.addEventListener('fullscreenchange', fn);
  document.addEventListener('MSFullscreenChange', fn);
  document.addEventListener('mozfullscreenchange', fn);
  el.addEventListener('webkitfullscreenchange', fn);
  // Cleanup
  return {
    remove: () => {
      el.removeEventListener('fullscreenchange', fn);
      document.removeEventListener('MSFullscreenChange', fn);
      document.removeEventListener('mozfullscreenchange', fn);
      el.removeEventListener('webkitfullscreenchange', fn);
    }
  };
}
