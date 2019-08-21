import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

export default function CreateScreen({navigation}) {
  const {addPost} = useContext(Context);

  return (
    <BlogPostForm
      onSubmit={({title, content}) => {
        addPost({title, content}, () => navigation.navigate('Index'));
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    margin: 5,
    padding: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});
