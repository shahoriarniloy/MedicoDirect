import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';


const HeroSection = () => {
  const textAnimationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 1000 },
  });

  const arrowAnimationProps = useSpring({
    from: { transform: 'translateX(-100%)', opacity: 1 },
    to: { transform: 'translateX(0%)', opacity: 1 },
    config: { duration: 700 },
  });

  return (
    <div className=" lg:py-24 md:py-20 sm:py-12 py-8 h-screen flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row items-center">
        <div className="text-left  md:w-1/2 space-y-6">
          <h1 className="lg:text-6xl text-4xl font-extrabold text-gray-800 sm:text-2xl md:text-6xl ">
            <animated.span style={textAnimationProps}>
              Medico
              <span className="lg:text-6xl md:text-6xl sm:text-2xl text-4xl text-green-600 relative inline-block">
                Direct
                <animated.div 
                  style={{ 
                    ...arrowAnimationProps, 
                    position: 'absolute', 
                    top: '-35px', 
                    left: '90px', 
                    width: '100%', 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}
                >
                  <span style={{ width: '100%', textAlign: 'center', color: 'green' }}>➜</span>
                </animated.div>
              </span>
            </animated.span>, Your Trusted Online <span className="text-green-600">Medicine Store</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Order your medicines online with ease. Enjoy fast delivery, reliable service, and a wide range of products—all at your fingertips.
          </p>
          <a href="/medicine/index">
            <button className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition mt-4">
              Shop Now
            </button>
          </a>
        </div>
        <div className="w-1/2 h-[200px] flex justify-center items-center lg:p-32" >
          {/* <FontAwesomeIcon
            icon={faPills}
            className="text-green-500 animate-glow"
            style={{ width: '60%', height: '100%' }}
          /> */}
          {/* <img src="https://i.ibb.co.com/7pkX83S/high-angle-pill-foils-plastic-containers.png" alt="" /> */}
          
          <img src="https://i.ibb.co.com/59xzp7j/rb-30608.png" alt="" height="100" />
          {/* <img src="https://i.ibb.co.com/g9bzb6Z/bunch-medical-capsules-marble-table.png" alt="" height="100" /> */}
          </div>
      </div>
    </div>
  );
};

export default HeroSection;
