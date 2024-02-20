import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div style={{display:"flex", gap:"10px"}} >
        <Link to="/sportSetting" > Sport Setting Page </Link>
        <Link to={"/matchSetting"} > Match Setting Page </Link>
        <Link to={"/globalSetting"} > Global Setting Page </Link>
        <Link to={"/announcement"} >Announcement Page</Link>
        <Link to={"/announcementUpdate"} >AnnouncementUpdate Page</Link>

    </div>
  )
}
