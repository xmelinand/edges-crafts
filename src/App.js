import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from  "react-bootstrap"

import { Home } from './pages/home';
import { About } from './pages/about';
import Shop from './pages/shop';

import NavBar from './components/NavBar'
import WebFont from 'webfontloader';
import AddItems from './pages/addItems';
import Contact from './pages/contact';

import cart from './reducers/cart';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({cart}));

function App() {
  useEffect(() => {
		WebFont.load({
		  google: {
			families: ['Fjalla One']
		  }
		});
	   }, []);
  return (
    <Provider store={store}>
    <NavBar/>
    <Container fluid className='ps-0 pe-0'>
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/shop" element={<Shop/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/add-items" element={<AddItems/>}/>
    </Routes>
    </Container>
    </Provider>
  );
}

export default App;
