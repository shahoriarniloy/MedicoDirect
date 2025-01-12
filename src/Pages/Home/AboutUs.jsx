import { Link } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";

const AboutUs = () => {
    const { user } = UseAuth(); 

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center text-lg">
        <h1 className="text-green-600 text-4xl font-bold mb-8 ml-2 text-center ">           <span className="text-black text-2xl font-bold ml-2 text-center">About Medico<span className="text-3xl text-green-600">Direct</span></span>
        </h1>
        <p className="text-gray-600 mb-4">
        MedicoDirect is your trusted online pharmacy, committed to providing high-quality medicines and healthcare products at affordable prices.
      </p>
      <p className="text-gray-600 mb-4">
        We believe in making healthcare accessible and convenient for everyone. Our team is dedicated to ensuring you receive genuine products and exceptional service every time you shop with us.
      </p>
      <p className="text-gray-600 mb-4">
        Join us today and experience the convenience of shopping for your healthcare needs online.
      </p>
        {
             !user && 
             <Link to="/login"><button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Join Us</button></Link>
            
        }
    </div>
  );
};

export default AboutUs;
