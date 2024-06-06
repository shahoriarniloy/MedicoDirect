import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const UseSeller = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isSeller = false, isLoading, error } = useQuery({
        queryKey: [user?.email, 'isSeller'],
        queryFn: async () => {
            if (!user?.email) return false;  
            const res = await axiosSecure.get(`/user/seller/${user.email}`);
            // console.log(res.data);
            return res.data.seller;
        },
        enabled: !!user?.email, 
    });

    if (error) {
        console.error('Error fetching seller status:', error);
    }

    return [isSeller, isLoading];
};

export default UseSeller;
