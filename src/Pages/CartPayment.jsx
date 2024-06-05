
import Swal from "sweetalert2";
import UseCart from "../Hooks/UseCart";
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const AdminCart = () => {
    const [cart, refetch]= UseCart();
    const totalPrice = cart.reduce((total,item) => total+item.price,0)

    const axiosSecure = useAxiosSecure();
    const handleDelete = id =>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
           
            axiosSecure.delete(`/carts/${id}`)
            .then(res=>{
                if(res.data.deletedCount>0)
                    {
                        refetch();
                           Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
              });

                    }

            })
            }
          });
          
        



    }
    return (
        <div className="pt-24 grid lg:grid-cols-4 md-grid-cols-4 grid-cols-1 mb-16 gap-8 ml-4">
           

            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800 col-span-3  bg-blue-100  rounded-lg h-fit">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col className="w-24" />
			</colgroup>
			<thead className="dark:bg-blue-500 text-white">
				<tr className="text-left">
                    <th className="p-3">Serial</th>
					<th className="p-3">Invoice #</th>
					<th className="p-3">Client</th>
					<th className="p-3">Issued</th>
					{/* <th className="p-3">Due</th> */}
					<th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-center">Action</th>

					<th className="p-3 text-center">Status</th>
				</tr>
			</thead>
			<tbody>
                {
                    cart.map((item,index)=>
                        <tr key={item._id}className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
					<td>{index +1}</td>
                    <td className="p-3">
						<p>{item._id}</p>
					</td>
					<td className="p-3">
						<p>{item.email}</p>
					</td>
					<td className="p-3">
						<p>{item.purchaseDate}
</p>
						<p className="dark:text-gray-600">Friday</p>
					</td>
					{/* <td className="p-3">
						<p>01 Feb 2022</p>
						<p className="dark:text-gray-600">Tuesday</p>
					</td> */}
					<td className="p-3 text-right">
						<p>{item.price}</p>
					</td>
                    <td className="p-3 flex justify-center">
						<button onClick={()=>handleDelete(item._id)}><FaTrash/></button>
					</td>
					<td className="p-3 ">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-blue-500 dark:text-gray-50 flex justify-center">
							<span>Pending</span>
						</span>
					</td>
				</tr>



                    )
                }
				
				
			</tbody>
		</table>
	</div>
</div>

<div className="flex flex-col px-8 float-right bg-blue-100 p-8 mr-4 rounded-lg h-fit">
<h2 className="mb-4 text-2xl font-semibold leading-tight">Payment</h2>

                <h2>Items: {cart.length}</h2>
                <h2>Total Price:{totalPrice}</h2>
                <button type='button' className="bg-green-500 rounded-lg py-2 mt-2 text-white">Pay</button>
            </div>

            
        </div>
    );
};

export default AdminCart;