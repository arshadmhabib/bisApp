import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

import BIS from './src/app';

AppRegistry.registerComponent('bisApp', () => BIS);
