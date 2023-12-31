import React, { useEffect, useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyloadimg/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    useEffect(()=>{
        console.log(data?.map((d)=>{d.key}))
    },[])

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data && data?.map((g)=>{
                            return (
                            <div className="videoItem"
                                onClick={()=>{setShow(true);
                                setVideoId(g.key)}}
                                key={g.id}
                                >
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${g.key}/mqdefault.jpg`}/>
                                <PlayIcon/>
                                </div>
                                
                            </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;