import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import  { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function Logout() {
  const navigate = useNavigate();
  const { setFlag } = useContext(LoginContext);

  async function logoutClear() {
    const uid = localStorage.getItem("firebaseUID");
    const token = localStorage.getItem("firebaseTOKEN");

    if (uid && token) {
      // remove localStorage data
      localStorage.removeItem("firebaseUID");
      localStorage.removeItem("firebaseTOKEN");

      // find and delete token document
      const q = query(
        collection(db, "user_token"),
        where("uid", "==", uid),
        where("token", "==", token)
      );

      const querySnapshot = await getDocs(q);

      for (const docItem of querySnapshot.docs) {
        await deleteDoc(docItem.ref);
      }

      // update login state
      setFlag(0);
    }

    navigate("/login");
  }

  useEffect(() => {
    logoutClear();
  }, []); // run once

  return <div>Logging out...</div>;
}

export default Logout;
