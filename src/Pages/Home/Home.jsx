import AboutUs from "./AboutUs.jsx";
import FAQSection from "./FAQSection.jsx";
import Slider from "./Slider.jsx";

const Home = () => {
    return (
        <div className="lg:mx-16 md:mx-16 mx-2">
            <Slider></Slider>
            <AboutUs></AboutUs>
            <FAQSection></FAQSection>
            
        </div>
    );
};

export default Home;