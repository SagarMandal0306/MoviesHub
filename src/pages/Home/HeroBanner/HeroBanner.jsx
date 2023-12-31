import React, { useEffect, useState } from 'react'
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyloadimg/Img';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';

const HeroBanner = () => {
    const [background,setBackground]=useState("");
    const [query,setQuery]=useState("");
    const navigate=useNavigate();
    const {url}=useSelector((state)=>state.home);
    const {data,loading}=useFetch("/movie/upcoming");

    useEffect(()=>{
        
        const bg=url.poster+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
        
    },[url])


    const searchQueryHandler=(e)=>{
        if(e.key==='Enter' && query.length>0){
           navigate(`/search/${query}`)
        }
    }

  return (
    <>
    <div className="herobanner">
    {!loading &&  <div className="backdrop-img">
            <Img src={background.toString()}/>
        </div>}
        <div className="opacity-layer"></div>

        <ContentWrapper>
       
            <div className="herobannerContent">
                <span className="title">Welcome.</span>
                <span className="sub-title">Millions of movies,TV and people to disover .Explore Now</span>
                <div className="searchArea">
                <input type="text" placeholder='Search For a Movie or a TV Show....'
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                />
                <button onClick={()=>{query.length>0?navigate(`/search/${query}`):""} }>Search</button>
                </div>
            </div>
        
        
        </ContentWrapper>
    </div>
    
    </>
  )
}

export default HeroBanner