import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CandidateDashboard from "./pages/Candidate/CandidateDashboard";
import JobPosts from "./pages/Candidate/JobPosts";
import CandidateInterviews from "./pages/Candidate/CandidateInterviews";
import InterviewerDashboard from './pages/Interviewer/InterviewerDashboard';
import AddInterview from './pages/Interviewer/AddInterview';
import ViewInterviews from './pages/Interviewer/ViewInterviews';
import UpdateInterview from './pages/Interviewer/UpdateInterview';
import './App.css';
import InterviewerFeedback from './pages/Interviewer/InterviewerFeedback';
import CandidateFeedback from './pages/Candidate/CandidateFeedback';
import CandidateProfile from './pages/Candidate/CandidateProfile';
import InterviewerProfile from './pages/Interviewer/InterviewerProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
          <Route path="/candidate/jobs" element={<JobPosts />} />
          <Route path="/candidate/interviews" element={<CandidateInterviews />} />
          <Route path="/candidate/feedback" element={<CandidateFeedback />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />


          <Route path="/dashboard/interviewer" element={<InterviewerDashboard />} />
          <Route path="/interviewer/add" element={<AddInterview />} />
          <Route path="/interviewer/view" element={<ViewInterviews />} />
          <Route path="/interviewer/update" element={<UpdateInterview />} />
          <Route path="/interviewer/feedback" element={<InterviewerFeedback />} />
          <Route path="/interviewer/profile" element={<InterviewerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;