import { useState } from 'react'
import Nav from '../components/Nav'




const Onboarding = () => {


    const handleSubmit = () => {
        console.log('submitted')
    }

    const handleChange = () => {
        console.log('change')
    }



    return (
        <>
            <Nav
                minimal={true}  
                setShowModal={() => {}}
                showModal={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={""}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />

                        
                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={""}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                        
                            <label htmlFor="man_gender_identity">Man</label>
                                <input
                                    id="man-gender-indentity"
                                    type="radio"
                                    name="gender_indentity"
                                    value={"man"}
                                    onChange={handleChange}
                                    checked={false}
                                />

                            
                            <label htmlFor="man_gender_identity">Woman</label>
                                <input
                                    id="woman-gender-indentity"
                                    type="radio"
                                    name="gender_indentity"
                                    value={"woman"}
                                    onChange={handleChange}
                                    checked={false}
                                />

                        </div>
                            

                        <label>Show Me</label>
                        <div className="multiple-input-container">
                            
                            <label htmlFor="man_gender_interest">Man</label>
                            <input
                                id="man-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value={"man"}
                                onChange={handleChange}
                                checked={false}
                            />
                        

                        
                            <label htmlFor="woman_gender_interest">Woman</label>
                            <input
                                id="woman-gender-indentity"
                                type="radio"
                                name="gender_interest"
                                value={"woman"}
                                onChange={handleChange}
                                checked={false}
                            />

                        </div>

                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like long walks..."
                            value={""}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                        
                    </section>

                    <section>
                    
                        <label htmlFor="about">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />

                        <div className="photo-container">


                        </div>
                   

                    </section>

                </form>
           
            </div>
        </>
    )
}
export default Onboarding