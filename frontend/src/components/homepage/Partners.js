import React from "react";
import "./css/Partners.css";
import Metadata from '../layout/Metadata'

const Partners = () => {
    return (
        <div
            class="bg_image content-container"
            style={{
                backgroundImage: `url(/images/bg.png)`,
                backgroundSize: "cover",
            }}
        >
            <Metadata title={`Partners`} />
            <div className="container-register">
                <div id="register">
                    <h1 style={{ fontSize: "3.5vw" }} className="text-center">
                        Be one of us!
                    </h1>
                    <div className="flex-container">
                        <div className="partner">
                            <a href="#">
                                <img src="/images/PART.png" alt="Partnership" style={{ width: "100%" }} />
                            </a>
                        </div>
                        <div className="partner">
                            <a href="#">
                                <img src="/images/VOL.png" alt="Volunteer" style={{ width: "100%" }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Partners