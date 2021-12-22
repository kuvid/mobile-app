import React, { useContext } from "react";
import styles from "../styles/Style";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import dummyNotifications from "../dummies/dummyNotifications";
import NotificationContext from "../context/NotificationContext";

const NotificationRow = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={elementStyles.container}>
        <View>
          <Text style={styles.regularText}>{item.date}</Text>
          <Text style={[styles.boldText, { marginTop: "1%" }]}>
            {item.title}
          </Text>
          <View style={{ alignItems: "baseline", marginTop: "5%" }}>
            <Text style={styles.regularText}>{item.details}</Text>
          </View>
        </View>
        <View>
          <Icon
            iconStyle={{ color: "#EF4836" }}
            size={10}
            name="circle"
            type="material-community"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const elementStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#F2F2F2",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
});

export default function NotificationScreen() {
  const { notifications } = useContext(NotificationContext);
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => {
            return <NotificationRow item={item} />;
          }}
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
