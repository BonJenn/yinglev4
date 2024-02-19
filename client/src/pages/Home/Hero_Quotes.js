import React from "react";
import styles from "./Hero_Quotes.module.css"; // Import the CSS module

const Hero_Quotes = () => {
    return (
        <div className={styles.hero_quotes}>
            <div className={styles.quote_1}>
                <h1>Finally, an app where success meets beauty. It's unmatched.</h1>
                <h3>Christian, M, 32</h3>
            </div>
            <div className={styles.quote_2}>
                <h1>Beauty valued and standards met. This is the real deal.</h1>
                <h3>Anastasia, F, 24</h3>

            </div>
           
        
        </div>
    );
};

export default Hero_Quotes