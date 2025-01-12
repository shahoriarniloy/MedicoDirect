import React from 'react';
import Carousel from 'react-multi-carousel';
import 'swiper/css';
import 'react-multi-carousel/lib/styles.css';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Categories from './Categories';

const MedicineSlider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: meds = [], refetch } = useQuery({
    queryKey: ['meds'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/medicines');
        // console.log(res.data);
        return res.data;
      } catch (error) {
        console.error('Error fetching medicines:', error);
        return [];
      }
    }
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 500 },
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
    <div className=''>
      <h1 className='text-center text-4xl text-green-600 font-bold'>Top Selling Medicines</h1>
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 rounded-md flex-wrap">
  {/* Left Section */}
  <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col justify-center text-center md:text-left">
    <h1 className="text-2xl  font-bold text-green-800 mb-4">
      Explore Our Top Selling Medicines
    </h1>
    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
      Discover the most trusted medicines handpicked by our experts. From everyday essentials to specialized treatments, we've got everything you need to stay healthy.
    </p>
  </div>

  {/* Right Section (Carousel) */}
  <div className="w-full md:w-2/3  rounded-md p-6 flex items-center">
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
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType="desktop"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {meds.map(
        (medicine, index) =>
          medicine.advertise === "yes" && (
            <div
              key={index}
              className="flex flex-col justify-between bg-white p-6 rounded-xl min-h-[350px] w-60 transition-transform transform hover:scale-105 "
            >
              {/* Medicine Name */}
              <h3 className="text-lg text-center text-green-700 font-semibold mb-2 line-clamp-2">
                {medicine.itemName}
              </h3>

              {/* Medicine Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={medicine.image}
                  alt={`Medicine ${index + 1}`}
                  className="h-32 w-32 object-contain"
                />
              </div>

              {/* Info Section */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg px-4 py-2 w-full mt-4 flex-grow">
                <h6 className="text-sm text-center text-white font-medium line-clamp-1">
                  {medicine.itemGenericName}
                </h6>
                <p className="text-xs text-center text-white mt-1 line-clamp-2">
                  {medicine.shortDescription}
                </p>
                <div className="flex justify-between text-xs text-white mt-2">
                  <p className="font-light line-clamp-1">{medicine.company}</p>
                  <p className="font-light">Price: {medicine.price}</p>
                </div>
              </div>
            </div>
          )
      )}
    </Carousel>
  </div>
</div>




      <Categories />

      <h1 className='text-black mt-12 text-3xl font-bold mb-8 ml-2 text-center'>Discounted Products</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {meds.map((medicine, index) => (
          medicine.discountPercentage > 0 && (
            <SwiperSlide key={index}>
              <div className='flex flex-col justify-center bg-white shadow-green-900 border-green-900 p-8 mt-8 rounded-xl '>
                <h3 className='lg:text-2xl md:text-2xl text-lg text-center text-green-900 font-bold mb-4 h-24'>{medicine.itemName}</h3>
                <div className='flex justify-center'>
                  <img src={medicine.image} style={{ height: '200px', width:'auto' }} alt={`Medicine ${index + 1}`} />
                </div>
                <p className='float-right text-red-500 px-4 bg-yellow-100 rounded-lg  w-fit text-sm mr-2 font-bold'>{medicine.discountPercentage}% Discount</p>

                <div className='bg-green-900 rounded-lg lg:px-12 md:px-12 mt-4 lg:flex lg:flex-col md:flex md:flex-col hidden'>
                  <h6 className='lg:text-lg md:text-lg text-xs text-center text-white mt-4'>{medicine.itemGenericName}</h6>
                  <p className='mb-4 text-center text-white text-sm'>{medicine.shortDescription}</p>
                  <div className='flex justify-between px-4'>
                    <p className='mb-4 text-center text-white text-sm'>{medicine.company}</p>
                    <p className='mb-4 text-center text-white text-sm'>Price: {medicine.price}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        ))}
      </Swiper>
    </div>
  );
};

export default MedicineSlider;
