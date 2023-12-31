import React from 'react'
import './style.scss';
import ContentWrapper from '../contentwrapper/ContentWrapper';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <ContentWrapper>
        <div className="options">
          <ul>
            <li>About</li>
            <li>Service</li>
            <li>License</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, at. Illum fugit fugiat blanditiis at officiis, esse reprehenderit voluptate asperiores, tempora magnam id quo sequi quia similique ab neque modi, corporis ea quis. Ipsa quasi quis repellat facere voluptates tempore nesciunt porro consequuntur aliquam quisquam eveniet quod aut, earum sed.
        </div>
        <div className="icons">
          <span className="icon">
            <FaFacebook/>
          </span>
          <span className="icon">
            <FaInstagram/>
          </span>
          <span className="icon">
            <FaLinkedin/>
          </span>
          <span className="icon">
            <FaTwitter/>
          </span>
        </div>

      </ContentWrapper>
    </footer>
  )
}

export default Footer