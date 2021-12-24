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

  // const [newStudents, setNewStudents] = useState([
  //   { studentName: "KUvid Selin Öztürk 60160", deviceId: "12345" },
  // ]);

  const [newStudents, setNewStudents] = useState([]);

  const [registeredStudents, setRegisteredStudents] = useState([]);

  const [courseName, setCourseName] = useState("Comp101");

  useEffect(() => {
    arrangeStudentNames();
  }, []);

  async function addNewStudent(studentName, deviceId) {
    return new Promise((resolve, reject) => {
      /*setNewStudents((prev) =>
        _.uniqBy(
          [...prev, { studentName: studentName, deviceId: deviceId }],
          "studentName"
        )
      );*/

      // bu kısım test edilmedi
      const myArray = studentName.split(" ");
      const id = myArray.pop();
      myArray.reverse();
      myArray.pop(); // pop KU
      myArray.reverse();
      var name = myArray.join(" ");

      setRegisteredStudents((prev) =>
        _.uniqBy(
          [
            ...prev,
            {
              student_name: name,
              student_id: id,
            },
          ],
          "student_id"
        )
      );
      resolve();
    });
  }

  const getRegisteredStudents = () => {
    return registeredStudents;
  };

  // bu fonksiyon şu an sadece test amaçlı burda
  const arrangeStudentNames = async () => {
    for (var i = 0; i < newStudents.length; i++) {
      const myArray = newStudents[i].studentName.split(" ");
      const student_id = myArray.pop();
      //const familyName = myArray.pop();
      //console.log(student_id);
      //console.log(familyName);
      myArray.reverse();
      myArray.pop(); // pop KUvid
      myArray.reverse();
      //console.log(myArray);
      var student_name = myArray.join(" ");
      //console.log(student_name);
      var student = {
        student_name: student_name,
        student_id: student_id,
      };
      setRegisteredStudents((prev) => [...registeredStudents, student]);
      //await setStudentList((prev) => [...studentList, student]);
      console.log(student);
    }
  };

  // BU KOD INSTRUCTOR TARAFINDA ÇALIŞACAK, STUDENT LIST CONTEXT GİBİ BİR ŞEY GEREKEBİLİR
  const sendStudentList = async (tempStudentList) => {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/kuvid_take_attendance",
        {
          operation: "create",
          payload: {
            TableName: "attendance",
            Item: {
              lecture_name: `${courseName}`,
              lecture_time: "2021-12-23T12:35:00",
              instructor_id: parseInt(`${idNumber}`),
              instructor_name: `${name} ${familyName}`,
              instructor_email: `${email}`,
              students: tempStudentList,
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
        registeredStudents,
        getRegisteredStudents,
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
