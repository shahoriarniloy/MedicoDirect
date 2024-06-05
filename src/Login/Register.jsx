import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Register = () => {
    const axiosPublic = UseAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const { updateUserProfile } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const url = e.target.url.value;
        const password = e.target.password.value;

        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;

        if (password.length < 6) {
            setRegisterError('Password must be at least 6 characters long');
            return;
        }

        if (!uppercaseRegex.test(password)) {
            setRegisterError('Password must contain an uppercase letter');
            return;
        }

        if (!lowercaseRegex.test(password)) {
            setRegisterError('Password must contain a lowercase letter');
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateUserProfile(name, url);

            const userInfo={
                name:name,
                email: email,

            }
            axiosPublic.post('users',userInfo)
            .then(res=>{
                if(res.data.insertedId)
                    {
console.log('user added to database');                    }
            })

            // const user = { email, name };
            // fetch('http://localhost:5000/user', {
            //     method: 'POST',
            //     headers: { 'content-type': 'application/json' },
            //     body: JSON.stringify(user)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.insertedId) {
            //             console.log('User added to Database');
            //         }
            //     });

            navigate(location?.state ? location.state : '/');
            toast.success("Registered successfully");
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg p-8 w-1/2 py-24 px-16 roboto-regular">
            <h1 className="text-6xl text-blue-500 font-bold mb-6 text-center">MedicoDirect</h1>

                <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
                <form onSubmit={handleRegister} className="space-y-4 text-xl px-36">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name:</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter your name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL:</span>
                        </label>
                        <input type="text" name="url" placeholder="Enter your photo URL" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" className="input input-bordered w-full pr-12" required />
                            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {registerError && <p className="text-red-500 text-center">{registerError}</p>}
                    <div className="form-control mt-6 flex justify-center">
                        {/* <button type="" className="btn btn-primary w-full">Create Account</button> */}
                        <button type="submit" className="px-8 w-1/2 py-3 font-semibold rounded bg-blue-500  text-white">Create Account</button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-400 text-xl">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
