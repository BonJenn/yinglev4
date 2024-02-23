import React from "react";
import styles from "./Home_Images.module.css"; // Ensure you have the correct path
import homeImage1 from '../../images/yingle_home_image2.jpeg'; // Adjust the path as necessary
import homeImage2 from '../../images/yingle_home_image3.jpeg'; // Adjust the path as necessary

const Home_Images = ({ imageToShow }) => {
    return (
        <div className={styles['homeImages']}>
            {imageToShow === 'image1' && (
                <div className={styles.homeImage1}>
                    <img src={homeImage1} alt="home_images_1" />
                </div>
            )}
            {imageToShow === 'image2' && (
                <div className={styles.homeImage2}>
                    <img src={homeImage2} alt="home_images_2" />
                </div>
            )}
        </div>
    );
};

export default Home_Images;

