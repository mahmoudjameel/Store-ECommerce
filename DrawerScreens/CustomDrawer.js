import React from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#f7d081" }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: 80,
            width: 80,
            marginLeft: 90,
            marginTop: 40,
            marginBottom: 10,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "white",
          }}
        />

        <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "bold" }}>
          Store
        </Text>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 16,
            marginTop: 8,
            paddingBottom: 10,
          }}
        >
          Store@brandmail.com
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingBottom: 5,
            paddingTop: 5,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
