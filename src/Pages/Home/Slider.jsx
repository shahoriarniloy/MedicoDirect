import React from 'react';
import Carousel from 'react-multi-carousel';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Categories from './Categories';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';
import { toast } from 'react-toastify';
import UseCart from '../../Hooks/UseCart';

const MedicineSlider = () => {
  const [,  refetch]= UseCart(); 

  const axiosSecure = useAxiosSecure();
  const { data: meds = [] } = useQuery({
    queryKey: ['meds'],
    queryFn: async () => {
      const res = await axiosSecure.get('/medicines');
      return res.data;
    }
  });

  const responsive = {
    desktop: { breakpoint: { max: 2000, min: 500 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

    const navigate = useNavigate();
    const { user } = UseAuth();

  

  const handleAddToCart = (medicine) => {
      if (user && user.email) {
        const {
          itemName,itemGenericName,shortDescription, category,company,massUnit,perUnitPrice,discountPercentage,sellerEmail,sellerName,image,price, _id
        } = medicine;
  
        const cartItem = {
          menuId: _id,
          email: user.email,
          itemName,itemGenericName,shortDescription, category,company,massUnit,perUnitPrice,discountPercentage,sellerEmail,sellerName,image,price
        };
  
        axiosSecure.post('/carts', cartItem)
          .then(res => {
            // console.log(res.data);
            if (res.data && res.data.result1.insertedId) {
              toast.success('Added to Cart');
              refetch();
            } else {
              toast.error('Failed to add to cart');
            }
          })
          .catch(error => {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart');
          });
      } else {
        Swal.fire({
          title: "Log In First",
          text: "You must be logged in to shop from us. Do you want to log in now?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Log In"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', { state: { from: location } });
          }
        });
      }
    };
  return (
    <div className='z-0 '>
      <h1 className='text-center text-4xl text-green-600 font-bold z-0'>Top Selling Medicines</h1>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6  py-8 rounded-md z-0">
        <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0 z-0">
          <h1 className="text-2xl font-bold text-black mb-4 z-0 text-center">Explore Our Top Selling Medicines</h1>
          <p className="text-gray-700 text-lg leading-relaxed text-center z-0">Discover the most trusted medicines handpicked by our experts. From everyday essentials to specialized treatments, we've got everything you need to stay healthy.</p>
        </div>
        <div className="w-full lg:w-2/3 md:w-2/3 py-6 z-0 ">
        <Carousel
  swipeable
  draggable
  showDots
  responsive={responsive}
  infinite
  autoPlay
  autoPlaySpeed={2000}
  keyBoardControl
  customTransition="transform 300ms ease-in-out"
  transitionDuration={300}
  containerClass="carousel-container z-0"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style z-0"
  itemClass="carousel-item-padding-40-px z-0"
  
>
  {meds
    .filter((medicine) => medicine.advertise === "yes")
    .map((medicine, index) => (
      <div
        key={index}
        className="relative bg-white p-6 rounded-xl min-h-[350px] w-64 hover:scale-105 z-0"
        style={{ height: "400px", width:"99%", }} 
      >
        <h3 className="text-lg text-center text-green-700 font-semibold mb-2 z-0">
          {medicine.itemName}
        </h3>
        <div
          className="flex justify-center mb-4 z-0"
          style={{ height: "130px" }} 
        >
          <img
            src={medicine.image}
            alt={`Medicine ${index + 1}`}
            className="h-full w-auto object-contain z-0"
          />
        </div>
        <div
          className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg px-4 py-2 mt-4 z-0 flex flex-col justify-between"
          style={{ height: "130px" }} 
        >
          <h6 className="text-sm text-center text-white font-medium z-0">
            {medicine.itemGenericName}
          </h6>
          <p className="text-xs text-center text-white mt-1 z-0">
            {medicine.shortDescription}
          </p>
          <div className="flex justify-between items-center text-xs text-white mt-2 z-0">
            <p>{medicine.company}</p>
            <p>Price: {medicine.price}</p>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(medicine)}
          className="absolute bottom-4 right-4 bg-green-600 text-white rounded-full p-2 hover:bg-green-700 shadow-lg z-10 h-12 w-12"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    ))}
</Carousel>


        </div>
      </div>

      <h1 className="text-4xl text-green-600 font-bold mt-12 mb-8 text-center z-0">Discounted Products</h1>

      <div className="flex flex-col md:flex-row justify-between  py-8 z-0 items-center">
        <div className="w-full md:w-2/3 py-6 z-0">
        <Carousel
  swipeable
  draggable
  showDots
  responsive={responsive}
  infinite
  autoPlay
  autoPlaySpeed={2000}
  keyBoardControl
  customTransition="transform 300ms ease-in-out"
  transitionDuration={300}
  containerClass="carousel-container z-0"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style z-0"
  itemClass="carousel-item-padding-40-px z-0"
  data-aos="fade-in"
>
  {meds
    .filter((medicine) => medicine.discountPercentage > 0)
    .map((medicine, index) => (
      <div
        key={index}
        className="relative bg-white py-12 px-2 rounded-xl min-h-[350px] w-64 hover:shadow-xl z-0 "
        style={{ height: "450px", width:"99%", }} 
      >
        <h3 className="text-lg text-center text-green-700 font-semibold mb-2 z-0">
          {medicine.itemName}
        </h3>
        <div
          className="flex justify-center mb-4 z-0"
          style={{ height: "130px" }} 
        >
          <img
            src={medicine.image}
            alt={`Medicine ${index + 1}`}
            className="h-full w-auto object-contain z-0"
          />
        </div>
        {medicine.discountPercentage > 0 && (
          <p className="absolute top-4 left-4 text-red-500 px-4 bg-yellow-100 rounded-lg w-fit text-sm font-bold z-10 ">
            {medicine.discountPercentage}% Discount
          </p>
        )}
        <div
          className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg px-4 py-6 mt-4 z-0 flex flex-col justify-between "
          style={{ height: "150px" }} 
        >
          <h6 className="text-m text-center text-white font-medium z-0 ">
            {medicine.itemGenericName}
          </h6>
          <p className="text-sm text-center text-white mt-1 z-0">
            {medicine.shortDescription}
          </p>
          <div className="flex justify-between items-center text-xs text-white mt-2 z-0">
            <p>{medicine.company}</p>
            <p>Price: {medicine.price}</p>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(medicine)}
          className="absolute bottom-2 right-2 bg-green-600 text-white rounded-full p-2 hover:bg-green-700 shadow-lg z-10 h-12 w-12"
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    ))}
</Carousel>

        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0 px-6 z-0">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center z-0">Discover the Best Deals on Discounted Products</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center z-0">
          Enjoy incredible discounts on your favorite medicines! Find the best deals on essential healthcare products. Don’t miss out—shop now and save big on top-quality medicines!
          </p>
        </div>
      </div>

      <Categories />
    </div>
  );
};

export default MedicineSlider;
