import React, { useContext } from "react";
import styles from "../styles/Style";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import ListElement from "../components/ListElement";
import StudentListContext from "../context/StudentListContext";

export default function CourseListScreen({ navigation }) {
  const { studentList } = useContext(StudentListContext);

  return (
    <SafeAreaView
      style={([styles.container], { justifyContent: "flex-start" })}
    >
      <View>
        <FlatList
          data={studentList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={elementStyles.container}
                onPress={() => {
                  navigation.navigate("CourseDetail", {
                    lecture_name: item.lecture_name,
                  });
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../images/coding.png")}
                    style={elementStyles.image}
                  />
                  <View style={{ paddingLeft: 18 }}>
                    <Text style={styles.boldText}>{item.lecture_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.lecture_name}
        />
      </View>
    </SafeAreaView>
  );
}

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
