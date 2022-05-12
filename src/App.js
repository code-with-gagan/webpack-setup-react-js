import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import loadable from 'react-loadable';

const loadingComponent = () => {
  return (<>
    <div>Loading...</div>
  </>)
}

const Home = loadable({
  loader: () => import(/* webpackChunkName: 'Home' */'./Home'),
  loading: loadingComponent
})

const About = loadable({
  loader: () => import(/* webpackChunkName: 'About' */'./About'),
  loading: loadingComponent
})

const Contact = loadable({
  loader: () => import(/* webpackChunkName: 'Contact' */'./Contact'),
  loading: loadingComponent
})

const App = () => {
  return (<>
    <BrowserRouter>
      <div style={{ display: "flex", justifyContent: "space-between" }} className="container">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about"> About</Link>
        </div>
        <div>
          <Link to="/contact"> Contact</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </>)
}

export default App