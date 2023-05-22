import { GlobalStyles } from "./styles/global";
import TypingBox from "./Components/TypingBox";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {

  const {theme} = useTheme();

  return (

  <ThemeProvider theme={theme}>
    <ToastContainer />
    <GlobalStyles />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user' element={<UserPage />} />
    </Routes>
  </ThemeProvider>
  );
}

export default App;
