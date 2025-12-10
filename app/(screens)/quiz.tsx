import React from "react";
import { StyleSheet, Text, View } from "react-native";

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Quiz screen</Text>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
