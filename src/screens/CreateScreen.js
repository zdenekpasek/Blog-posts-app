import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);
  return (
    <View>
      <BlogPostForm
        labels={{ titleLabel: "Enter title:", contentLabel: "Enter content:" }}
        onSubmit={(title, content) => {
          addBlogPost(title, content, () => {
            navigation.navigate("Index");
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
