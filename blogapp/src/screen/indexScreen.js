import React, {useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';

export default function IndexScreen({navigation}) {
  const {state: blogPosts, removePost, getBlogPost} = useContext(Context);

  useEffect(() => {
    getBlogPost();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPost();
    });

    // this function simulate the life cicle WillDidUnmount
    return () => {
      listener.remove();
    };
  }, []); //eslint-disable-line 

  return (
    <View>
      <FlatList
        data={blogPosts}
        keyExtractor={post => String(post.title)}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Show', {id: item.id})}>
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => removePost(item.id)}>
                <Icon name="trash-can-outline" size={22} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Icon name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
  },
});
