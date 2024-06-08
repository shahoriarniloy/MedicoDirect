import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center text-lg">
        <h1 className="text-blue-900 text-3xl font-bold mb-8 ml-2 text-center "><span className="text-black">About </span>Medico<span className="text-4xl text-yellow-600">Direct</span></h1>
        <p className="text-gray-600 mb-4">
        MedicoDirect is your trusted online pharmacy, committed to providing high-quality medicines and healthcare products at affordable prices.
      </p>
      <p className="text-gray-600 mb-4">
        We believe in making healthcare accessible and convenient for everyone. Our team is dedicated to ensuring you receive genuine products and exceptional service every time you shop with us.
      </p>
      <p className="text-gray-600 mb-4">
        Join us today and experience the convenience of shopping for your healthcare needs online.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        <Link to="/login">Join Us</Link>
      </button>
    </div>
  );
};

export default AboutUs;
