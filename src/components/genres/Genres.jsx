import React, { useEffect } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';


const Genres = ({data}) => {
    const {genres}=useSelector((state)=>state.home);
    // useEffect(()=>{
    //     console.log(genres)
    // },[])
    return (
       <div className="GenresSection">
        {
            data?.map((g)=>{
                return(
                    <div className="genresItem" key={g}>
                        {genres[g]?.name}
                    </div>
                )
            })
        }
       </div>
    );
}

export default Genres;
