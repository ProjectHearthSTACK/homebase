import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import OnboardingAuth from './screens/OnboardingAuth'
import LoadingScreen from './screens/LoadingScreen'
import Welcome from './screens/Welcome'
import OnboardingName from './screens/OnboardingName'
import OnboardingSituation from './screens/OnboardingSituation'
import OnboardingGoal from './screens/OnboardingGoal'
import Dashboard from './screens/Dashboard'
import Modules from './screens/Modules'
import Resources from './screens/Resources'
import Community from './screens/Community'
import ModuleLesson from './screens/ModuleLesson'
import Profile from './screens/Profile'
import EditProfile from './screens/settings/EditProfile'
import NotificationSettings from './screens/settings/NotificationSettings'
import AboutHomeBase from './screens/settings/AboutHomeBase'
import BottomNav from './components/BottomNav'
import './App.css'

const NAV_ROUTES = ['/dashboard', '/modules', '/community', '/resources', '/profile']

function Layout() {
  const location = useLocation()
  const showNav = NAV_ROUTES.some(r => location.pathname.startsWith(r))

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                               element={<LoadingScreen />} />
          <Route path="/onboarding/auth"                element={<OnboardingAuth />} />
          <Route path="/welcome"                        element={<Welcome />} />
          <Route path="/onboarding/name"                element={<OnboardingName />} />
          <Route path="/onboarding/situation"           element={<OnboardingSituation />} />
          <Route path="/onboarding/goal"                element={<OnboardingGoal />} />
          <Route path="/dashboard"                      element={<Dashboard />} />
          <Route path="/modules"                        element={<Modules />} />
          <Route path="/community"                      element={<Community />} />
          <Route path="/resources"                      element={<Resources />} />
          <Route path="/lesson/:moduleId/:lessonNumber" element={<ModuleLesson />} />
          <Route path="/profile"                        element={<Profile />} />
          <Route path="/settings/profile"               element={<EditProfile />} />
          <Route path="/settings/notifications"         element={<NotificationSettings />} />
          <Route path="/settings/about"                 element={<AboutHomeBase />} />
          <Route path="*"                               element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
      {showNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
