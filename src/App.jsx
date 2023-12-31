import { useState, useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
// import './App.css'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/Home/Home'
import Search from './pages/searchResult/Search'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/pageNotFound'

import { BrowserRouter, Route, Routes } from 'react-router-dom'




function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);


  useEffect(() => {
    genraCll();
    apiTesting();
  }, []);

  const genraCll = async () => {
    const promises = []
    const endpoint = ["tv", "movie"]
    let genras = []

    endpoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    console.log(data)
    data.map(({ genres }) => {
      return genres.map((item) => { genras[item.id] = item })
    })
     dispatch(getGenres(genras));

  };

  const apiTesting = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url));
    })
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
