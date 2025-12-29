import React from 'react';
import Navbar from '@/components/Navbar';
import Sideone from '@/components/Sideone';
import Footer from '@/components/Footer';
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