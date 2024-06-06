import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const UseAdmin = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return false;  
            const res = await axiosSecure.get(`/user/admin/${user.email}`);
            // console.log(res.data);
            return res.data.admin;
        },
        enabled: !!user?.email, 
    });

    if (error) {
        console.error('Error fetching admin status:', error);
    }

    return [isAdmin, isAdminLoading];
};

export default UseAdmin;
