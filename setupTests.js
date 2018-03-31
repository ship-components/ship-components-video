import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import VideoPlayerActions from './src/data/VideoPlayerActions';

// Setup enzyme
Enzyme.configure({ adapter: new Adapter() });

// Disable max listeners for tests
VideoPlayerActions.setMaxListeners(0);
