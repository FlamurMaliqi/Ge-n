import React from 'react';
import '../styles/header.css';

function Header() {
    return (
        <section id="header-wrapper" className="margin-bottom-0">
            <div id="header" className="max-width-1800px">
                <div id="uvp">
                    <h1>Finden Sie die besten Streaming-Pakete für Ihre Lieblingsmannschaften</h1>
                    <h2>Streaming Package Comparison – Vergleichen Sie Angebote für Bundesliga und Champions League</h2>
                    <h3>Wählen Sie Ihr Team und finden Sie die optimalen Streaming-Pakete, um jedes Spiel live zu verfolgen. 
                        Berechnen Sie die beste Kombination von Paketen, um Kosten zu sparen und alle Spiele zu sehen.</h3>
                </div>
                <img 
                    src="/images/FootballImage.png" 
                    alt="Football illustration" 
                    className="header-image"
                />
            </div>
        </section>
    );
}

export default Header;
