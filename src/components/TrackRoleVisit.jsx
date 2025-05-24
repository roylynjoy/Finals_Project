import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const validPaths = ["/PM", "/CD", "/UIUX", "/SQA"];

function TrackRoleVisit({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (validPaths.includes(location.pathname)) {
      localStorage.setItem("recentRole", location.pathname);
    }
  }, [location]);

  return children;
}

export default TrackRoleVisit;
