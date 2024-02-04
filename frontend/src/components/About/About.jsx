import { Paper } from "@mui/material";
import "./About.css"
import Footer from "../Footer/Footer";

function About() {
    return (
        <>
            <div className="about-container">

                <div className="about-details">
                    <div className="about-page-img"></div>
                    <div className="about-overview">
                        <h2>Revolutionizing Healthcare with Connectivity and Intelligence</h2>
                        <p>MedLink is not just an application. <br /> It is a healthcare ecosystem that prioritizes convenience,
                            efficiency, and accuracy. Our platform empowers both doctors and patients by offering a comprehensive
                            solution to medical record management, personalized health insights, and proactive disease prediction.</p>
                    </div>
                    <div className="about-features">
                        <h2>Key Features:</h2>
                        <div>
                            <div className="about-feature">
                                <h4>Medical History Management:</h4>
                                <ol>
                                    <li>
                                        Patients and doctors can effortlessly access medical history, including diagnoses, prescriptions,
                                        and other crucial information.
                                    </li>
                                    <li>
                                        Only doctors are allowed to add prescription for any user.
                                    </li>
                                </ol>
                            </div>
                            <div className="about-feature">
                                <h4>User-Friendly Registration:</h4>
                                <ol>
                                    <li>
                                        Doctors can only register using their unique medical IDs, ensuring that only qualified professionals access the platform.
                                    </li>
                                    <li>
                                        Patients can only register using their Aadhar cards, promoting a secure and verified user base.
                                    </li>
                                </ol>
                            </div>
                            <div className="about-feature">
                                <h4>Intelligent Disease Predictor:</h4>
                                <ol>
                                    <li>
                                        Experience the future of healthcare with our <strong>AI Assist</strong>, a powerful machine learning model that predicts diseases based on simple user responses.
                                    </li>
                                    <li>
                                        Accessible without registration, this feature provides quick insights into potential health concerns, guiding users to take proactive measures for their well-being.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 style={{fontSize:"2.5rem", marginTop:"6rem", fontWeight:"500", lineHeight:"50px"}}>Meet the Team</h1>
                <div className="about-cards">
                    <Paper elevation={3} className="about-card">
                        <div className="about-img">
                            <img src="https://raw.githubusercontent.com/Aryan6400/Logo-Assets/main/IMG_9984-min.JPG" target="__blank" rel="noopener noreferrer" />
                        </div>
                        <div className="about-name">Aryan Singh</div>
                        <div className="about-position">Software Developer</div>
                        <div className="about-institute">Indian Institute of Technology Kharagpur</div>
                        <p className="about-links">
                            <a href="https://www.linkedin.com/in/aryan-singh-103179233/">Contact</a>
                        </p>
                    </Paper>

                    <Paper elevation={3} className="about-card">
                        <div className="about-img">
                            <img src="https://raw.githubusercontent.com/Aryan6400/Logo-Assets/main/IMG_9984-min.JPG" target="_blank" rel="noopener noreferrer" />
                        </div>
                        <div className="about-name">Utpal Raj</div>
                        <div className="about-position">AI and Software Developer</div>
                        <div className="about-institute">Indian Institute of Technology Kharagpur</div>
                        <p className="about-links">
                            <a href="https://www.linkedin.com/in/utpal-raj-401498222/">Contact</a>
                        </p>
                    </Paper>

                    <Paper elevation={3} className="about-card">
                        <div className="about-img">
                            <img src="https://github.com/Aryan6400/Logo-Assets/blob/main/surya-min.jpg?raw=true" target="_blank" rel="noopener noreferrer" />
                        </div>
                        <div className="about-name">Suryanarayan Majhi</div>
                        <div className="about-position">AI and Software Developer</div>
                        <div className="about-institute">Indian Institute of Technology Kharagpur</div>
                        <p className="about-links">
                            <a href="https://www.linkedin.com/in/suryanarayan-majhi-053457228/">Contact</a>
                        </p>
                    </Paper>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About;