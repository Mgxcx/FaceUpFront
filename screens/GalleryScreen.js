import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { Card, Badge } from "react-native-elements";
import { connect } from "react-redux";

function GalleryScreen({ avatarToDisplay }) {
  return (
    <ScrollView style={styles.scrollview} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Margaux's Gallery </Text>
      {avatarToDisplay.map((avatar, i) => (
        <Card containerStyle={styles.card} key={i}>
          <Image source={{ uri: avatar.url }} style={styles.image} />
          <Badge value={avatar.gender} status="success" />
          <Badge value={avatar.age} status="success" />
          {avatar.glassesexist && <Badge value={avatar.glasses} status="success" />}
          {avatar.beardexist && <Badge value={avatar.facialhair} status="success" />}
          <Badge value={avatar.smile} status="success" />
          <Badge value={avatar.haircolor} status="success" />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 27,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  card: {
    padding: 0,
    paddingBottom: 10,
    width: "90%",
  },
});

function mapStateToProps(state) {
  return { avatarToDisplay: state.avatar };
}

export default connect(mapStateToProps, null)(GalleryScreen);
