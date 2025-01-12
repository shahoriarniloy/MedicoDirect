import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from "react-hook-form";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    const { name, photoURL } = data;
    updateUserProfile(name, photoURL)
      .then(() => {
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        toast.error("Error updating profile: " + error.message);
      });
  };

  return (
    <div className="max-w-[1400px] mx-auto h-3/4 pt-24 mb-8">
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <h1 className="text-center text-4xl font-tittle text-green-900 lg:mb-8">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Name: </span>
          </label>
          <input type="text" id="name" {...register("name")} defaultValue={user.displayName || ""} className="input input-bordered" />
        </div>
        <div className="form-control">
          <label htmlFor="photoURL" className="label">
            <span className="label-text">Picture URL: </span>
          </label>
          <input type="text" id="photoURL" {...register("photoURL")} defaultValue={user.photoURL || ""} className="input input-bordered" />
        </div>
        <button className="btn bg-green-900 rounded-lg text-white px-4 py-2" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
