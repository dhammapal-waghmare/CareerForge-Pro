import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import CoverLetterBuilder from "./pages/CoverLetterBuilder";
import CoverLetterPreview from "./pages/CoverLetterPreview";
import Login from "./pages/Login";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import {Toaster} from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }

        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        <Route path="cover-letter" element={<CoverLetterBuilder />} />
        <Route path="cover-letter/:coverLetterId" element={<CoverLetterBuilder />} />
        <Route path="cover-letter-preview/:coverLetterId" element={<CoverLetterPreview />} />
      </Route>
      <Route path="view/:resumeId" element={<Preview />} />
    </Routes>
    </>
  );
};

export default App;
