import React from 'react'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TrackUserOrder from '../components/orders/TrackUserOrder';

const TrackOrderPage = () => {
  return (
    <div>
        <Header />
        <TrackUserOrder />
        <Footer />
    </div>
  )
}

export default TrackOrderPage