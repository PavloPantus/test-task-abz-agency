import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/header/header';
import { Banner } from './components/Banner/Banner';
import { AboutMe } from './components/about-me-section/about-me-section';
import Users from './components/Users/index';
import Register from './components/Register-seciton/index';
import { Footer } from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Banner />
      <main>
        <AboutMe />
      </main>
      <Users />
      <Register />
      <Footer />
    </Provider>
  );
}

export default App;
