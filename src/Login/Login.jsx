import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";


const Login = () => {
    const axiosPublic = UseAxiosPublic();
    const location = useLocation();
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const from = location.state?.from?.pathname || "/";

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const result = await signInUser(email, password);
            toast.success("Signed In");
            e.target.reset();
            // navigate(location?.state?.from || '/');
            navigate(from, {replace:true});

        } catch (error) {
            setError("Invalid Credentials");
            toast.error("Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            toast.success("Signed In");
            setUser(result.user);
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data);
            })
            navigate(from, {replace:true});
        } catch (error) {
            setError("Failed to sign in with Google");
            toast.error("Please check your credential or try again later");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignOut = async () => {
        setLoading(true);
        setError("");
        try {
            await signOut(auth);
            toast.warning("Signed Out");
            setUser(null);
        } catch (error) {
            setError("Failed to sign out");
            toast.error("Failed to sign out");
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="max-w-[600px] mx-auto  p-5 shadow-lg rounded-lg bg-white py-16 mb-12">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="flex justify-center mb-6">


            </div>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                <h1 className="text-white text-2xl font-bold ml-2">MedicoDirec<span className="text-4xl">+</span></h1>

                    <label className="block dark:text-gray-300">Enter Your Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Type here" 
                        className="w-full p-2 mt-1 border rounded" 
                        required 
                    />
                </div>
                <div>
                    <label className="block dark:text-gray-300">Enter Your Password:</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Type here" 
                            className="w-full p-2 mt-1 border rounded" 
                            required 
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-2"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <h2 className="text-sm ">Or, Sign In With:</h2>
                <button 
                    onClick={handleGoogleSignIn} 
                    className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
                    disabled={loading}
                >
                    <img 
                        className="inline w-6 h-6 mr-2" 
                        src="https://i.ibb.co/CQFy59y/google.png" 
                        alt="Google icon" 
                    />
                    {loading ? "Signing in..." : "Google"}
                </button>
                {user && (
                    <div className="mt-4">
                        <h3 className="">User: {user.displayName}</h3>
                        <button 
                            onClick={handleGoogleSignOut} 
                            className="mt-2 p-2 bg-white text-white rounded"
                            disabled={loading}
                        >
                            {loading ? "Signing out..." : "Sign Out"}
                        </button>
                    </div>
                )}
                <hr className="my-4" />
                <Link to="/signup">
                    <button className="w-full bg-green-500 text-white p-2 rounded">Create New Account</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
