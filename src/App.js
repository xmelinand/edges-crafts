import { Routes, Route } from 'react-router-dom';
import { Container } from  "react-bootstrap"
import { Home } from './pages/home';
import { About } from './pages/about';
import { Shop } from './pages/shop';
import Nav from './components/Nav'
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import AddItems from './pages/addItems';

function App() {
  useEffect(() => {
		WebFont.load({
		  google: {
			families: ['Fjalla One']
		  }
		});
	   }, []);
  return (
    <>
    <Nav/>
    <Container fluid className='ps-0 pe-0'>
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/shop" element={<Shop/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/add-items" element={<AddItems/>}/>
    </Routes>
    </Container>
    </>
  );
}

export default App;
