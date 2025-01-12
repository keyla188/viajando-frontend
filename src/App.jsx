
import './App.css'
import Footer from './components/footer/footer'
import Header from './components/header/header'
import AppRouter from './routes/app.router'
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <div>
        <Header />
      </div>
      <div className='main-container'>
      <AppRouter></AppRouter>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App
