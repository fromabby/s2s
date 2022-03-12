import React from 'react'

const Blog = props => {

  return (
    <div className="card-block px-2" >
      <a href="#" style={{ textDecoration: 'none' }}>
        <div id="featured_subpost1">
          <img id="recent_img1" src="/bg.png" />
          <h1 id="recent_title1" >“Winner sa Life” with Winnie Cordero on DZMM TeleRadyo</h1>
          <p id="recent_date_author1">By Qjiel Mariano | March 20, 2021</p>
          <p id="recent_summary1">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
          <a className="btn read-btn1" href="#" >Read More</a>
        </div>
      </a>
    </div>
  )
}

export default Blog