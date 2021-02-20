import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Button, Overlay } from "react-native-elements";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

function SnapScreen({ saveAvatarSnap }) {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getPermissionsForCamera = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermissionCamera(status === "granted");
    };

    getPermissionsForCamera();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermissionCamera && isFocused ? (
        <MyCamera saveAvatar={saveAvatarSnap} />
      ) : (
        <Text>No Permission granted !</Text>
      )}
    </View>
  );
}

function MyCamera({ saveAvatar }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  let camera = useRef(null);

  const snap = async () => {
    if (camera) {
      toggleOverlay();
      let photo = await camera.takePictureAsync({
        quality: 0.7,
      });
      var data = new FormData();

      data.append("avatar", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "avatar.jpeg",
      });

      const result = await fetch("http://192.168.1.17:3000/upload", {
        method: "POST",
        body: data,
      });
      const jsonresult = await result.json();
      if (jsonresult.result) {
        setOverlayVisible(false);
        console.log(jsonresult);
        saveAvatar(jsonresult);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.container} type={type} flashMode={flash} ref={(ref) => (camera = ref)}>
        <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
          <Text>Loading...</Text>
        </Overlay>
        <View style={styles.containertouchableopacity}>
          <TouchableOpacity
            style={styles.touchableopacity1}
            onPress={() => {
              setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
            }}
          >
            <Ionicons name="ios-reverse-camera" size={24} color="white" />
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableopacity2}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}
          >
            <FontAwesome name="flash" size={24} color="white" />
            <Text style={styles.text}>Flash</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title="Snap"
            titleStyle={styles.textbutton}
            icon={<FontAwesome name="save" size={24} color="white" />}
            onPress={() => {
              snap();
            }}
            buttonStyle={styles.sendbutton}
          />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containertouchableopacity: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "flex-end",
    paddingLeft: 20,
    paddingBottom: 20,
  },
  touchableopacity1: {
    alignItems: "center",
    paddingRight: 20,
  },
  touchableopacity2: {
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  textbutton: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  sendbutton: {
    backgroundColor: "#009788",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveAvatarSnap: function (avatar) {
      dispatch({ type: "saveAvatar", avatar });
    },
  };
}

export default connect(null, mapDispatchToProps)(SnapScreen);
