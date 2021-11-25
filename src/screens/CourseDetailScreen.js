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
  InteractionManager,
} from "react-native";
import { Icon } from "react-native-elements";
import ListElement from "../components/ListElement";
import StudentListContext from "../context/StudentListContext";

export default function CourseDetailScreen({ route }) {
  const { studentList } = useContext(StudentListContext);
  const { lecture_name } = route.params;
  var tempStudents = studentList.find(
    (item) => item.lecture_name === lecture_name
  ).students;
  //console.log(typeof parseInt(`${1}`));
  var courseStudents = [];

  for (var i = 0; i < tempStudents.length; i++) {
    if (typeof tempStudents[i] === "string") {
      courseStudents = [...courseStudents, JSON.parse(tempStudents[i])];
    } else {
      courseStudents = [...courseStudents, tempStudents[i]];
    }
  }

  //console.log(courseStudents);

  return (
    <SafeAreaView
      style={([styles.container], { justifyContent: "flex-start" })}
    >
      <View>
        <FlatList
          data={courseStudents}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={elementStyles.container}>
                <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                  <View style={{ paddingLeft: 18 }}>
                    <Text style={styles.boldText}>{item.student_name}</Text>
                  </View>
                  <View style={{ paddingLeft: 18 }}>
                    <Text style={styles.boldText}>{item.student_id}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.student_id}
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
