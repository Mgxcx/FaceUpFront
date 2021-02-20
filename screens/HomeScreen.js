import React, { useState, useEffect } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [pseudo, setPseudo] = useState(null);

  return (
    <ImageBackground source={require("../assets/home.jpg")} style={styles.image}>
      <View style={styles.container}>
        <Input
          placeholder="Write your name"
          placeholderTextColor="#84817a"
          style={styles.input}
          leftIcon={<FontAwesome name="user" size={24} color="#009788" />}
          onChangeText={(val) => setPseudo(val)}
          value={pseudo}
        />
        <Button
          title="Go to Gallery"
          titleStyle={styles.textbutton}
          onPress={() => {
            navigation.navigate("PagesTab");
          }}
          buttonStyle={styles.sendbutton}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 60,
  },
  input: {
    color: "#009788",
    fontWeight: "bold",
    fontSize: 18,
  },
  textbutton: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  sendbutton: {
    backgroundColor: "#009788",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
