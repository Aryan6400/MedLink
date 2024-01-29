import { Paper } from "@mui/material";
import "./About.css"

function About() {
    return (
        <div className="about-container">
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
                        <a href="https://www.linkedin.com/in/aryan-singh-103179233/">Contact</a>
                    </p>
                </Paper>

                <Paper elevation={3} className="about-card">
                    <div className="about-img">
                        <img src="https://raw.githubusercontent.com/Aryan6400/Logo-Assets/main/IMG_9984-min.JPG" target="_blank" rel="noopener noreferrer" />
                    </div>
                    <div className="about-name">Suryanarayan Majhi</div>
                    <div className="about-position">AI and Software Developer</div>
                    <div className="about-institute">Indian Institute of Technology Kharagpur</div>
                    <p className="about-links">
                        <a href="https://www.linkedin.com/in/aryan-singh-103179233/">Contact</a>
                    </p>
                </Paper>
            </div>
        </div>
    )
}

export default About;