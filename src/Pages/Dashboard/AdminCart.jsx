
import UseCart from "../../Hooks/UseCart";
import { FaTrash } from 'react-icons/fa';

const AdminCart = () => {
    const [cart]= UseCart();
    const totalPrice = cart.reduce((total,item) => total+item.price,0)

    return (
        <div>
            <div className="flex justify-between">
                <h2>Items: {cart.length}</h2>
                <h2>Total Price:{totalPrice}</h2>
            </div>

            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
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
			<thead className="dark:bg-gray-300">
				<tr className="text-left">
					<th className="p-3">Invoice #</th>
					<th className="p-3">Client</th>
					<th className="p-3">Issued</th>
					{/* <th className="p-3">Due</th> */}
					<th className="p-3 text-right">Amount</th>
					<th className="p-3 text-right">Action</th>
					<th className="p-3">Status</th>
				</tr>
			</thead>
			<tbody>
                {
                    cart.map(item=>
                        <tr key={item._id}className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
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
                    <td className="p-3 text-right">
						<FaTrash/>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
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


            
        </div>
    );
};

export default AdminCart;