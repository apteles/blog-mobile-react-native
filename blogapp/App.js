import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Provider as BlogProvider} from './src/context/BlogContext';
import IndexScreen from './src/screen/indexScreen';
import ShowScreen from './src/screen/showScreen';
import CreateScreen from './src/screen/createScreen';
import EditScreen from './src/screen/editScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Blogs',
    },
  },
);
const App = createAppContainer(navigator);

export default function() {
  return (
    <BlogProvider>
      <App />
    </BlogProvider>
  );
}
