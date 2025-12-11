import useStore from "@hooks/useStore";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const { questions } = useStore();
  console.log(questions);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Text>Home screen</Text>
      <Link href={"/quiz"}>quiz</Link>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "Merriweather-Regular",
    fontWeight: "400",
  },
});
