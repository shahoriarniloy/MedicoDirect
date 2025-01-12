import AboutUs from "./AboutUs.jsx";
import FAQSection from "./FAQSection.jsx";
import HeroSection from "./Hero.jsx";
import Slider from "./Slider.jsx";
import { Helmet } from "react-helmet";


const Home = () => {
    return (
        <div className="lg:mx-16 md:mx-16 mx-2">
            <Helmet><title>Home</title></Helmet>
            <HeroSection/>
            <Slider></Slider>
            <AboutUs></AboutUs>
            <FAQSection></FAQSection>
            
        </div>
    );
};

export default Home;