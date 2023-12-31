import React, { useEffect } from 'react'
import './style.scss';
import BannerDetails from './BannerDetails/BannerDetails';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Cast from "./Cast/Cast"
import VideosSection from './VideosSection/VideosSection';
import Recommendation from './carousel/Recommendation';
import Similar from './carousel/Similar';


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/credits`)
  const { data:video, loading:videoLoading } = useFetch(`/${mediaType}/${id}/videos`)
  
  
  return (
    <div> 
      {!loading || !videoLoading?(
        <>
          <BannerDetails crew={data?.crew} video={video?.results}/>
          <Cast data={data?.cast} />
          <VideosSection data={video?.results} loading={videoLoading}/>
          <Recommendation mediaType={mediaType} id={id}/>
          <Similar mediaType={mediaType} id={id}/>
        </>
      ):(
        ""
      )}
       
    </div>

    // <div>Details</div>
  )
}

export default Details