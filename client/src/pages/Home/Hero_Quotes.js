import React, { useEffect, useRef } from "react";
import styles from "./Hero_Quotes.module.css"; // Import the CSS module

const Hero_Quotes = () => {
    const quote1Ref = useRef(null);
    const quote2Ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.fadeIn);
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the element is in view
        );

        if (quote1Ref.current) {
            observer.observe(quote1Ref.current);
        }
        if (quote2Ref.current) {
            observer.observe(quote2Ref.current);
        }

        return () => {
            if (quote1Ref.current) {
                observer.unobserve(quote1Ref.current);
            }
            if (quote2Ref.current) {
                observer.unobserve(quote2Ref.current);
            }
        };
    }, []);

    return (
        <div className={styles.hero_quotes}>
            <div ref={quote1Ref} className={`${styles.quote_1}`}>
                <h1>"Finally, an app where success meets beauty. It's unmatched."</h1>
                <h3>Christian, M, 32</h3>
                <h4>Los Angeles</h4>
            </div>
            <div ref={quote2Ref} className={`${styles.quote_2}`}>
                <h1>"Beauty valued and standards met. This is the real deal."</h1>
                <h3>Anastasia, F, 24</h3>
                <h4>Los Angeles</h4>
            </div>
        </div>
    );
};

export default Hero_Quotes;
