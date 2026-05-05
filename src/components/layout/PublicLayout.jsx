import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: 72 }}>{children}</main>
    <Footer />
  </>
);

export default PublicLayout;
