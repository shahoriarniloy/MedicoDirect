import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <Slider {...settings} className="p-12 bg-blue-200">
      <div>
        <img
          src="https://i.ibb.co/5BBgd96/A-Fenac-Plus.png"
          alt=""
          className="w-full h-auto bg-blue-200"
        />
      </div>
      <div>
        <img
          src="https://i.ibb.co/6bZwbn9/A-Fenac-50-1.png"
          alt=""
          className="w-full h-auto bg-blue-200"
        />
      </div>
      <div>
        <img
          src="https://i.ibb.co/qMrMnts/A-Cof.png"
          alt=""
          className="w-full h-auto bg-blue-200"
        />
      </div>
    </Slider>
  );
};

export default MySlider;
