import React from 'react';

function Hero() {
    return (
        <>
            <div className="hero-sections">
                <div className="hero_section_women">
                    <h1 className="hero_text_main">Welcome to Yingle</h1>
                    <div className="hero_info_women">
                        <h2 className="hero_text_title_1">For The Girls...</h2>
                        <h3 className="hero_text_description">We carefully review and approve select women who apply for our platform. 
                            This helps us maintain a community of high-quality members, 
                            ensuring our users meet genuine and authentic candidates.</h3>
                    </div>
                </div>
                <div className="hero_section_man">
                    <div className="hero_info_man">
                        <h2 className="hero_text_title_2">Men Pay to Play...</h2>
                        <h3 className="hero_text_description">We've implemented a system where men who demonstrate exceptional economic security are invited to join our exclusive community. 
                            <br />With our female members being carefully approved for their exceptional qualities, 
                            we aim to match them with partners who share above-average economic standing, ensuring a mutually rewarding dating experience.</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero