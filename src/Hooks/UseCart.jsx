import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './UseAxiosSecure';

const UseCart = () => {
    const axiosSecure = useAxiosSecure();
    const {data:cart=[]}=useQuery({
        queryKey:['cart'],
        queryFn: async()=>
            {
                const res = await axiosSecure.get('/carts')
                return res.data;
            }
    })
    return [cart]
    
};

export default UseCart;