import { AppRegistry } from 'react-native';
import TodoApp from './app/TodoApp';

console.ignoredYellowBox = ['Remote debugger'];

AppRegistry.registerComponent('rnTodo', () => TodoApp);
