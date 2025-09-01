
import {  useNavigate } from "react-router";
import { useEffect } from "react";


export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/profile", { replace: true });
  }, [navigate]);
  return null;
}
