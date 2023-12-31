import React, { useEffect, useState } from 'react'
import '../style.scss';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTab/SwitchTabs';
import useFetch from '../../../Hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

  const [tabname,setTabName]=useState("day");

  const {data,loading}=useFetch(`/trending/all/${tabname}`);

  
  const onTabChange=(tab,index)=>{
    setTabName(tab==="Day"?"day":"week");
    
  }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">
                Tranding
            </span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
    <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending