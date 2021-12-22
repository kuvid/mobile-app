import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { dummyStudentData } from "../dummies/dummyStudentData";

const StudentListContext = React.createContext();

var _ = require("lodash");

export const StudentListProvider = ({ children }) => {
  const { idToken, email, name, familyName, idNumber } =
    useContext(AuthContext);

  const [studentList, setStudentList] = useState([]);

  const [newStudents, setNewStudents] = useState([
    "KUvid Selin Nur Öztürk 60160",
  ]);

  const [courseName, setCourseName] = useState("comp130");

  useEffect(() => {
    arrangeStudentNames();
  }, []);

  async function addNewStudent(studentName, deviceId) {
    return new Promise((resolve, reject) => {
      //here our function should be implemented

      // The `_.property` iteratee shorthand.
      //_.uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], "x");
      // => [{ 'x': 1 }, { 'x': 2 }]
      //console.log(studentName + deviceId);
      setNewStudents((prev) =>
        _.uniqBy(
          [...prev, { studentName: studentName, deviceId: deviceId }],
          "studentName"
        )
      );
      console.log(studentName);
      /*if (!newStudents.includes(studentName)) {
        console.log("newStudents'a eklicem");
        setNewStudents((prev) => [...prev, studentName]);
        console.log("student added to newStudents");
      }*/
      resolve();
    });
  }

  const arrangeStudentNames = async () => {
    for (var i = 0; i < newStudents.length; i++) {
      const myArray = newStudents[i].split(" ");
      const student_id = myArray.pop();
      //const familyName = myArray.pop();
      console.log(student_id);
      //console.log(familyName);
      myArray.reverse();
      myArray.pop(); // pop KUvid
      myArray.reverse();
      console.log(myArray);
      var student_name = myArray.join(" ");
      console.log(student_name);
      var student = {
        student_name: student_name,
        student_id: student_id,
      };
      //await setStudentList((prev) => [...studentList, student]);
      //console.log(studentList);
    }
  };

  // BU KOD INSTRUCTOR TARAFINDA ÇALIŞACAK, STUDENT LIST CONTEXT GİBİ BİR ŞEY GEREKEBİLİR
  const sendStudentList = async () => {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/kuvid_take_attendance",
        {
          operation: "create",
          payload: {
            TableName: "attendance",
            Item: {
              lecture_name: `${courseName}`,
              timestamp: "2021-11-26T12:35:00",
              instructor_id: parseInt(`${idNumber}`),
              instructor_name: `${name} ${familyName}`,
              instructor_email: `${email}`,
              students: dummyStudentData,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => console.log("Attendance data sent!"))
      .catch((error) => {
        console.log(error);
      })
      .then(() => getStudentList());
  };

  //BU KOD INSTRUCTOR TARAFINDA ÇALIŞACAK
  const getStudentList = async () => {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/kuvid_get_students_list",
        {
          instructor_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //console.log(response.data.body);
        var tempResponse = eval(response.data.body);
        setStudentList(tempResponse);
        //console.log(studentList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StudentListContext.Provider
      value={{
        courseName,
        studentList,
        newStudents,
        sendStudentList,
        getStudentList,
        addNewStudent,
      }}
    >
      {children}
    </StudentListContext.Provider>
  );
};

export default StudentListContext;
