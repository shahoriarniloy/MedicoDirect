import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const UseUser = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isUser = false, isLoading, error } = useQuery({
        queryKey: [user?.email, 'isUser'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (!user?.email) return false;
            const res = await axiosSecure.get(`/user/user/${user.email}`);
            return res.data.user || false;  
        }
    });

    if (error) {
        console.error('Error fetching user status:', error);
    }

    return [isUser, isLoading, error];
};

export default UseUser;
