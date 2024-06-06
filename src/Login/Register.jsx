import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = UseAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const { updateUserProfile } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        const { name, email, password, image } = data;
        const file = image[0];

        try {
            const formData = new FormData();
            formData.append('image', file);

            const imageRes = await axiosPublic.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imageUrl = imageRes.data.data.url;

            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name, photoURL: imageUrl });

            await updateUserProfile(name, imageUrl);

            const userInfo = { name, email, photoURL: imageUrl };
            await axiosPublic.post('users', userInfo);

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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xl px-36">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name:</span>
                        </label>
                        <input 
                            type="text" 
                            {...register("name", { required: "Name is required" })} 
                            placeholder="Enter your name" 
                            className="input input-bordered w-full" 
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input 
                            type="email" 
                            {...register("email", { required: "Email is required" })} 
                            placeholder="Enter your email" 
                            className="input input-bordered w-full" 
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo:</span>
                        </label>
                        <input 
                            type="file" 
                            {...register("image", { required: "Image is required" })} 
                            className="input input-bordered w-full" 
                        />
                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                    validate: {
                                        hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain an uppercase letter",
                                        hasLowerCase: value => /[a-z]/.test(value) || "Password must contain a lowercase letter"
                                    }
                                })} 
                                placeholder="Enter your password" 
                                className="input input-bordered w-full pr-12" 
                            />
                            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    {registerError && <p className="text-red-500 text-center">{registerError}</p>}
                    <div className="form-control mt-6 flex justify-center">
                        <button type="submit" className="px-8 w-1/2 py-3 font-semibold rounded bg-blue-500 text-white">Create Account</button>
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
