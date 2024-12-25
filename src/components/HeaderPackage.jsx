import React from 'react';
import '../css/header.css';
import HeaderImage from "../images/HeaderImage.png"

function Header() {
    return (
        <section id="header-wrapper" className="margin-bottom-0">
            <div id="header" className="max-width-1800px">
                <div id="uvp">
                    <h1>CHECK24 GenDev Streaming Package Comparison Challenge</h1>
                    <h3>
                        Das sind die besten Kombiniationen.
                    </h3>
                </div>
                <img id="header-image"
                     src={HeaderImage}
                     alt="Minimalist UI illustration of a school class happily boarding a white german public transport bus in a German city in a flat illustration style on a white background with bright Color scheme, dribbble, flat vector."/>
            </div>
        </section>
    );
}

export default Header;
