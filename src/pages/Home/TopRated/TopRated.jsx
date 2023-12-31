import React, { useEffect, useState } from 'react'
import '../style.scss';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTab/SwitchTabs';
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {

  const [tabname,setTabName]=useState("movie");

  const {data,loading}=useFetch(`/${tabname}/top_rated`);

  
  const onTabChange=(tab,index)=>{
    setTabName(tab==="Movies"?"movie":"tv");
  }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">
                Top Rated
            </span>
            <SwitchTabs data={["Movies","TV"]} onTabChange={onTabChange}/>
        </ContentWrapper>
    <Carousel data={data?.results} loading={loading} tabname={tabname}/>
    </div>
  )
}

export default TopRated