import React from 'react'

const Blog = () => {
    return (
        <div className="recent_card">
            <img id="recent_img" src="/images/featured_sub_image.png" />
            <div id="recent_text">
                <h1 id="recent_title">
                    “Winner sa Life” with Winnie Cordero on DZMM TeleRadyo
                </h1>
                <p id="recent_date_author">
                    By Qjiel Mariano | March 20, 2021
                </p>
                <p id="recent_summary">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <a className="btn read-btn" href="content.html">
                    Read More
                </a>
            </div>
        </div>
    )
}

export default Blog