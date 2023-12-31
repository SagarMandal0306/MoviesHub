import React from 'react'
import './style.scss';
import { useState,useEffect } from 'react';
import { ImSearch } from "react-icons/im";
import {  SlMenu } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
import { useNavigate ,useLocation} from 'react-router-dom';
import ContentWrapper from '../contentwrapper/ContentWrapper';
// import Img from '../lazyloadimg/Img';
import logo from '../../assets/movix-logo.svg'



function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const navScrollHandeler=()=>{
    if(window.scrollY>200){
      if(window.scrollY>lastScrollY){
        setShow("hide")
      }
      else{
        setShow("black")
      }
      setLastScrollY(window.scrollY);

    }else{
      setShow("top")
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll",navScrollHandeler);
    return ()=> window.removeEventListener("scroll",navScrollHandeler);
  },[lastScrollY])

  const menuHandler=()=>{
    setMobileMenu(true)
    setShow("black")
    setShowSearch(false)
  }

  const searchHandler=()=>{
    setShowSearch(true);
    setMobileMenu(false);
    setShow("top")
  }

  const searchQueryHandler=(e)=>{
    if(e.key==='Enter' && query.length>0){
       navigate(`/search/${query}`)
    }
  }

  const navigateHandler=(type)=>{
    navigate(`/explore/${type}`)
    setMobileMenu(false)
  }


  return (
    <>
    <header className={`${mobileMenu?"mobileView":""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={()=>navigate("/")}/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigateHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={()=>navigateHandler("tv")}>TV Show</li>
          <li className="menuItem">
          <ImSearch onClick={searchHandler}/>
          </li>
        </ul>

        <div className="mobileItems">
        <ImSearch onClick={searchHandler}/>
        {mobileMenu?(<RxCross1 onClick={()=>{setMobileMenu(false);setShow("top")}}/>):(<SlMenu onClick={menuHandler}/>)}
        </div>
      </ContentWrapper>

      {showSearch ?<div className="seachBox">
        <ContentWrapper>
        <input type="text" placeholder='Search For a Movie or a TV Show....'
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                />
                <RxCross1 onClick={()=>setShowSearch(false)}/>
        </ContentWrapper>
      </div>:""}
      
    </header>
    </>
  )
}

export default Header