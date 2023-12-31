import React, { useEffect, useState } from 'react';
import './style.scss';
import useFetch from '../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import Img from '../../../components/lazyloadimg/Img';
import { useSelector } from 'react-redux';
import PosterFallBack from '../../../assets/no-poster.png'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import dayjs from 'dayjs';
import CircleRating from '../../../components/circleRating/CircleRating';
import { PlayIcon } from '../PlayBtn';
import Genres from '../../../components/genres/Genres';
import VideoPopup from '../../../components/videoPopup/VideoPopup';


const BannerDetails = ({ crew, video }) => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector((state) => state.home);
    const [ show, setShow ] = useState(false);
    const [ videoId, setVideoId ] = useState(null);

    const _genres = data?.genres?.map((g) => g.id)

    const minutesToHours = (min) => {
        const hr = Math.floor(min / 60);
        const rem = min % 60;
        return `${hr}h.${rem}min`;
    }

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((w) => w.job === "Screenplay" || w.job === "Story" || w.job === "Writer")

    
    const trailer=video?.filter((g)=>g.name == "Official Trailer")
    useEffect(() => {

        if (trailer && Array.isArray(trailer) && trailer.length > 0) {
            // Access trailer[0] safely here
            console.log(trailer[0].key)
        } else {
            console.log('Trailer is undefined, null, or an empty array.');
        }
        
        // setShow(true)
    }, [])

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url?.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className="posterImg" src={url?.backdrop + data?.poster_path} />
                                        ) : (
                                            <Img src={PosterFallBack} className="posterImg" />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data?.name || data.title}(${dayjs(data?.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="row">

                                            <CircleRating rating={data?.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={() => { setShow(true); setVideoId(trailer[0].key)}}>
                                                <PlayIcon />
                                                <span className='text'> Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data?.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data?.status &&
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:
                                                    </span>
                                                    <span className="text">
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            }
                                            <div className="infoItem">
                                                <span className="text bold">Release Date:</span>
                                                <span className="text">
                                                    {data?.release_date || data?.last_air_date ? (
                                                        dayjs(data?.release_date || data?.last_air_date).format("MMM DD, YYYY")
                                                    ) : (
                                                        "Date Not Available"
                                                    )}
                                                </span>
                                            </div>
                                            <div className="infoItem">
                                                <span className="text bold">Run Time:</span>
                                                <span className="text">
                                                    {data?.runtime ? (
                                                        minutesToHours(data?.runtime)
                                                    ) : (
                                                        data?.number_of_episodes ? (
                                                            data?.number_of_episodes + "Ep"
                                                        ) : (
                                                            "Not Available"
                                                        )
                                                    )


                                                    }
                                                </span>
                                            </div>


                                        </div>

                                        {director.length > 0 && <div className="info">
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Director:
                                                </span>
                                                <span className="text">
                                                    {
                                                        director?.map((g) => g.name + " ").join(",")
                                                    }
                                                </span>
                                            </div>
                                        </div>}
                                        {writer.length > 0 && <div className="info">
                                            <div className="infoItem">
                                                <span className="text bold">
                                                    Writer:
                                                </span>
                                                <span className="text">
                                                    {
                                                        writer?.map((g) => g.name).join(",")
                                                    }
                                                </span>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </ContentWrapper>

                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />

                        </React.Fragment>
                    )}

                </>

            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>

            )}

        </div>
    );
}

export default BannerDetails;
