import { useEffect, useState } from 'react';
import React from 'react'
import './style.scss';

import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentwrapper/ContentWrapper';
import noResults from '../../assets/no-results.png';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import MovieCard from '../../components/MovieCard/MovieCard';

const Search = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageno, setPageNo] = useState(1);
  const { query } = useParams();
  useEffect(() => {
    fetchInitialData();
    setPageNo(1)
    // console.log(data?.results)
  }, [query])

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageno}`).then((res) => {
      setData(res);
      setLoading(false);
      setPageNo((prev) => prev + 1);
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageno}`).then((res) => {
      if (data?.results) {
        setData(
          {
            ...data, results: [...data?.results, ...res.results]
          }
        );
 
      } else {
        setData(res)
      }

      setPageNo((prev) => prev + 1);
    })
  }

  return (
    <div className='searchResultsPage'>
      {loading && 
      <Spinner initial={true}/>
      
      }
      <ContentWrapper>
      {data?.results?.length >0 ? (
        
          <>
          <div className="pageTitle">
            {`Search ${data?.results == 1 ? "Result":"Results"} for "${query}"`}
            <InfiniteScroll
              className='content'
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageno <= data.total_pages}
              loader={<Spinner/>}

            >
              {data?.results?.map((item,index)=>{
                if(item.media_type=== "Person") return;
                return(
                <MovieCard key={index} data={item} fromSearch={true}/>
                )
              })}
            </InfiniteScroll>
          </div>
          </>
        
      ):(
        <div className='resultNotFound'>
          Sorry !,Results not found !
        </div>
      )}
      </ContentWrapper>
    </div>
  )
}

export default Search