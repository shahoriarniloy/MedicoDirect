import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';
import useAuth from './UseAuth'

const UseCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch , data:cart=[]}=useQuery({
        queryKey:['cart', user?.emanil],
        queryFn: async()=>
            {
                const res = await axiosSecure.get(`/carts?email=${user.email}`)
                return res.data;
            }
    })
    return [cart, refetch]
    
};

export default UseCart;