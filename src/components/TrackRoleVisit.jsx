import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase";

const TrackRoleVisit = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email && ["/PM", "/CD", "/UIUX", "/SQA"].includes(location.pathname)) {
        const key = `recentRole_${user.email}`;
        localStorage.setItem(key, location.pathname);
      }
    });

    return () => unsubscribe();
  }, [location.pathname]);

  return children;
};

export default TrackRoleVisit;
