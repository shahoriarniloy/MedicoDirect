import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseAuth from "../Hooks/UseAuth";

const AdminRoutes = (children) => {
    const [isAdmin, isAdminLoading] = UseAdmin();
    const [user, loading] =UseAuth();
    const location = useLocation();


   if(loading||isAdminLoading){
    return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>;
}
if(user && isAdmin){
    return children;
}
return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default AdminRoutes;