import LandingPage from "./components/landingPage/landingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageComponent from "./components/Authorization/Authorization";
import WebCodeCompiler from "./components/codeCompilers/webCodeCompiler/webCodeCompiler";
import OopsBasics from "./components/learnings/oops/basics";
import JavaCodeCompiler from "./components/codeCompilers/javaCodeCompiler/javaCodeCompiler";
import KnowledgeTest from "./components/knowledgeTest/pageLayout/knowledgeTest";
import { EmailProvider } from "./context/UserContext";
import Register from "./components/Authorization/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Authorization/Login/Login";


import Userinteraction from "./components/learnings/userinteraction/userinteraction";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend"
import LearnToCode from "./components/learnings/learnToCode/LearnToCode";
import InitialCodePractice from "./components/learnings/userinteraction/InitialCodePractice";
import DoubtSolverDashboard from "./components/doubtSolverDashboard/DoubtSolverDashbaord";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import QuestionUi from "./components/learnings/questions/QuestionUi";
import CourseVideoPlayer from "./components/VideoPlayer/CourseVideoPlayer";
import VideoPlayerUi from "./components/VideoPlayer/VideoPlayerUi";
import PremiumUi from "./components/premiumContent/PremiumUi";
import PremiumSuccess from "./components/premiumContent/PremiumSuccess";
import AllPayments from "./components/premiumContent/AllPayments";
import NotFound from "./components/NotFound/NotFound";
import CompilerOnDashboard from "./components/Dashboard/compilerOnDashboard/CompilerOnDashboard";
function App() {
  return (
    <>
    <DndProvider  backend={HTML5Backend}>
      <BrowserRouter>
        <EmailProvider>
          <Routes>
            {/* HomePage */}
            <Route path="/" element={<LandingPage />} />
            {/* Authenciation */}
            <Route
              path="/login"
              element={
                <LoginPageComponent title={"Login"} bottomTitle={"Signup"} />
              }
            />

            <Route
              path="/signup"
              element={
                <LoginPageComponent title={"Signup"} bottomTitle={"Login"} />
              }
            />

            {/* Authrization */}

            <Route path="/login-user" element={<Login />} />

            <Route path="/register-user" element={<Register />} />
            {/* Dashboard */}
            <Route path="/dashboard-user/*" element={<Dashboard />} />
            <Route path="/dashboard-admin/*" element={<AdminDashboard />} />
            <Route path="/dashboard-doubt-solver/*" element={<DoubtSolverDashboard />} />
            <Route path="/java-coder-dashboard/:pStatement" element={<CompilerOnDashboard />} />
            {/* Features */}
            <Route path="/learn-oops-in-java" element={<OopsBasics />} />
            <Route path="/doulingo-test" element={<QuestionUi  />} /> 
            <Route path="/learn-hello-world" element={<VideoPlayerUi />} />
           <Route path="/learning-options" element={<KnowledgeTest />} />
            <Route path="/get-more-in-less" element={<PremiumUi />} />
            <Route path="/payment-success" element={<PremiumSuccess />} />
           
            <Route path='/learn-with-interaction' element={<Userinteraction />} />
            <Route path='/learn-to-code' element={<LearnToCode />} />
            <Route path='/learn-to-code-practice' element={<InitialCodePractice />} />
           
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EmailProvider>
      </BrowserRouter>
      </DndProvider>
    </>
  );
}

export default App;
