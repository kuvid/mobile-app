import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { dummyStudentData } from "../dummies/dummyStudentData";

const StudentListContext = React.createContext();

export const StudentListProvider = ({ children }) => {
  const { idToken, email, name, familyName, idNumber } =
    useContext(AuthContext);
  const [studentList, setStudentList] = useState([]);

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
              lecture_name: "comp439",
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
      value={{ studentList, sendStudentList, getStudentList }}
    >
      {children}
    </StudentListContext.Provider>
  );
};

export default StudentListContext;
