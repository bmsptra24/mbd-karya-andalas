import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { BreakTime } from './Components/BreakTime'
const Help = lazy(() => import('./Pages/Help'))
// const LandingPage = lazy(() => import('./Pages/LandingPage'))
const SignIn = lazy(() => import('./Pages/SignIn'))
const SignUp = lazy(() => import('./Pages/SignUp'))
const Home = lazy(() => import('./Pages/Home'))

function App() {
  return (
    <div className="absolute inset-0">
      <Suspense
        fallback={
          <div className="flex h-full justify-center items-center">
            <div className="animate-spin" role="status">
              <span className="hidden"></span>
            </div>
          </div>
        }
      >
        <BreakTime />
        <Routes>
          <Route path="*" element={<SignIn />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Suspense>
    </div>
  )
}
export default App
