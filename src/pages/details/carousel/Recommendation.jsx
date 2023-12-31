import React, { useEffect, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTab/SwitchTabs';
import Carousel from "../../../components/carousel/Carousel"

const Recommendation = ({ mediaType,id}) => {
    
    

    const {data,loading}=useFetch(`/${mediaType}/${id}/recommendations`)
    
   
    

    return (
        <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">
                Recommendations
            </span>
            {/* <SwitchTabs data={["Movie","TV"]} onTabChange={onTabChange}/> */}
        </ContentWrapper>
    <Carousel data={data?.results} loading={loading} />
    </div>
    );
}

export default Recommendation;
