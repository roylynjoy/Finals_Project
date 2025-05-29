import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase';

const useAdminInfo = (baseURL) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        try {
          const res = await fetch(`${baseURL}/user?email=${user.email}`);
          const data = await res.json();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
        } catch (err) {
          console.error("Failed to fetch admin info:", err);
        }
      }
    });

    return () => unsubscribe();
  }, [baseURL]);

  return { firstName, lastName };
};

export default useAdminInfo;
