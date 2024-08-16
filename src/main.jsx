import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import RandomUser from './pages/RandomUser.jsx'
import RandomJokes from './pages/RandomJokes.jsx'
import CatsListing from './pages/CatsListing.jsx'
import Root from './Root.jsx'
import NoMatch from './components/NoMatch.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<RandomUser />} />
      <Route path="random-user" element={<RandomUser />} />
      <Route path="random-jokes" element={<RandomJokes />} />
      <Route path="cats-listings" element={<CatsListing />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
