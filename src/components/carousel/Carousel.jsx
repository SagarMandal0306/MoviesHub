import React, { useRef } from 'react'
import './style.scss'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ContentWrapper from '../contentwrapper/ContentWrapper';
import Img from '../lazyloadimg/Img';
import PosterFallBack from '../../assets/no-poster.png'
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const Carousel = ({ data, loading ,tabname}) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home)
    const Navigate = useNavigate()


    const navigation = (dir) => {
        const container=carouselContainer.current;
        
        const scrollAmount=
        dir==="left"?container.scrollLeft-(container.offsetWidth+20):
        container.scrollLeft+(container.offsetWidth+20);

        container.scrollTo({
            left:scrollAmount,
            behavior:"smooth"
        })
    }

    const skitem=()=>{
        return(
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
        )
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                <FaArrowAltCircleLeft
                    className='carouselLeftNav arrow'
                    onClick={() => navigation("left")}
                />
                <FaArrowAltCircleRight
                    className='carouselRighttNav arrow'
                    onClick={() => navigation("right")}
                />

                {!loading?(
                    <div className='carouselItems' ref={carouselContainer}>
                        {data?.map((item)=>{
                            const posterurl=item.poster_path?url.poster+item.poster_path:PosterFallBack;
                            return(
                                <div className="carouselItem" key={item.id} onClick={()=>{
                                    Navigate(`/${item.media_type || tabname}/${item.id}`)
                                }}>
                                    <div className="posterBlock">
                                    <Img src={posterurl}/>
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                    <Genres data={item.genre_ids.slice(0,2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <div className="title">
                                            {item.title || item.name}
                                        </div>
                                        <div className="date">
                                            {dayjs(item.release_date).format("MMM DD,YYYY")}
                                        </div>
                                    </div>
                                </div>
                        )
                        })}
                    </div>
                ):(
                    <div className="loadingSkeleton">
                        {skitem()}
                        {skitem()}
                        {skitem()}
                        {skitem()}
                        {skitem()}
                        
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel