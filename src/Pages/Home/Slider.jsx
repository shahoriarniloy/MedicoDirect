import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MedicineSlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className='bg-blue-300 py-16'>
        
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      deviceType="desktop"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      <div>
        <img src="https://i.ibb.co/qMrMnts/A-Cof.png" alt="Medicine 1" />
        <h3>Medicine 1</h3>
        <p className='mb-4'>Description of Medicine 1</p>
      </div>
      <div>
        <img src="https://i.ibb.co/6bZwbn9/A-Fenac-50-1.png" alt="Medicine 2" />
        <h3>Medicine 2</h3>
        <p className='mb-4'>Description of Medicine 2</p>
      </div>
      <div>
        <img src="https://i.ibb.co/5BBgd96/A-Fenac-Plus.png" alt="Medicine 3" />
        <h3>Medicine 3</h3>
        <p className='mb-4'>Description of Medicine 3</p>
      </div>
    </Carousel>
    </div>
  );
};

export default MedicineSlider;
