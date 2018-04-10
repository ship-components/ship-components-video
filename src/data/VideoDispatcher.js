/**
 * This is a dispatcher specifically for the Video
 * component. Events are constantly dispatched using
 * this dispatcher because we need to track the
 * currentTime on the video element. Instead of spaming
 * all stores with these events only the specific stores
 * that care about these events listen to this.
 */

import { Dispatcher } from 'flux';

// Create Dispatcher
const dispatcher = new Dispatcher();

dispatcher.dispatch = dispatcher.dispatch.bind(dispatcher);

export const dispatch = dispatcher.dispatch;

export default dispatcher;
