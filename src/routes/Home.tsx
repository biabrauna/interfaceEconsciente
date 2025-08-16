import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sideone from '@/components/Sideone';
import './style.css';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sideone />
      <Footer />
    </div>
  );
};

export default Home;