import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
export default function EditScreen({navigation}) {
  const {state, editPost} = useContext(Context);
  const id = navigation.getParam('id');
  const blogPost = state.find(post => post.id === id);

  return (
    <>
      <BlogPostForm
        onSubmit={({title, content}) =>
          editPost({id, title, content}, () => navigation.pop())
        }
        initialValues={{title: blogPost.title, content: blogPost.content}}
      />
    </>
  );
}

const styles = StyleSheet.create({});
