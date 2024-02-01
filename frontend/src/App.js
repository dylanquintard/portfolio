import './styles/App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Comp from './pages/Comp';
import Works from './pages/Works';
import Contact from './pages/Contact'
import LoginForm from './pages/Login';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import AddWork from './pages/AddWork';
import Work from './pages/Work';
import AddComp from './pages/AddComp';
import EditWork from './pages/EditWork';
import ErrorBoundary from './components/CrashErrorHandler';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
    <ErrorBoundary>
      <BrowserRouter basename="/">
      <Header />
      <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/comp' element={<Comp />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/works' element={<Works />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/works/:id' element={<Work />} component={Work} />
        <Route path='/addwork' element={<AddWork />} />
        <Route path='/addcomp' element={<AddComp />} />
        <Route path='/editwork/:id' element={<EditWork />} />
        <Route path='*' element={<Error />} />
      </Routes>
      </main>
      <Footer />
      </BrowserRouter>
    </ErrorBoundary>
    </div>
  );
}

export default App;