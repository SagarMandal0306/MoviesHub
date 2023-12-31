import React, { useState } from 'react'
import './style.scss'

const SwitchTabs = ({ data ,onTabChange}) => {
    const [activeStatus, setactiveStatus] = useState(0)
    const [left, setLeft] = useState(0)

    const activeLink=(tab,index)=>{
        setLeft(index*50)
        setactiveStatus(index)
        onTabChange(tab,index)
        // console.log(tab,index)
    }

    return (
        <div className='swicthTabSection'>
            <div className="tabsItem" >
                {data.map((tab, index) => (
                    <span key={index}
                        className={`${activeStatus === index ? "active" : ""}`}
                        onClick={() => activeLink(tab, index)}>
                        {tab}
                        
                    </span>
                ))}
                <div className="activeback" style={{left:left+"%"}}></div>
            </div>

        </div>
    )
}

export default SwitchTabs