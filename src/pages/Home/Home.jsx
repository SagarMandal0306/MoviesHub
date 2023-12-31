import React from 'react'
import './style.scss';
import HeroBanner from './HeroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/popular'
import TopRated from './TopRated/TopRated';
const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular/>
      <TopRated/>
      
    </>
  )
}

export default Home