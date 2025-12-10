import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
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
    fontFamily: "Merriweather",
    fontWeight: "400",
  },
});
