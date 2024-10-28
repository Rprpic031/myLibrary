import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import './App.css'
import NavBarEdunova from './components/NavBarEdunova';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import KnjigePregled from './pages/knjige/KnjigePregled';
import KnjigeDodaj from './pages/knjige/KnjigeDodaj';
import KnjigeIzmjena from './pages/knjige/KnjigeIzmjena';


function App() {

  return (
    <>
    <Container>
      <NavBarEdunova />
      <Routes>
        <Route path={RouteNames.HOME} element={<KnjigePregled/>} />

        {/* <Route path={RouteNames.KNJIGA_PREGLED} element={<KnjigePregled/>}/> */}
        <Route path={RouteNames.SMJER_NOVI} element={<KnjigeDodaj/>}/>
        <Route path={RouteNames.SMJER_PROMJENA} element={<KnjigeIzmjena/>}/>

      </Routes>
      <hr/>
      &copy; Edunova
    </Container>
    
    </>
  )
}

export default App
