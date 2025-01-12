import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

const HeroSection = () => {
  return (
    <div className="mx-16 py-24 h-screen flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row items-center">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800 md:text-6xl">
            Your Trusted Online <span className="text-green-600">Medicine Store</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Order your medicines online with ease. Enjoy fast delivery, reliable service, and a wide range of products—all at your fingertips.
          </p>
          <a href="/medicine/index"><button className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition">
            Shop Now
          </button></a>
          
        </div>

        {/* Icon */}
        <div className="md:w-1/2 flex justify-center items-center">
          <FontAwesomeIcon
            icon={faPills}
            className="text-green-500 animate-glow"
            style={{ width: '60%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
