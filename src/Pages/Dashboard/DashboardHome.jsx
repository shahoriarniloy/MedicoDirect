import UseAdmin from '../../Hooks/UseAdmin';
import UseSeller from '../../Hooks/UseSeller';
import UseUser from '../../Hooks/UseUser';
import AdminHome from './AdminHome';
import SellerHome from './SellerHome';
import UserHome from './UserHome';

const DashboardHome = () => {
    const [ isAdmin ] = UseAdmin();
    const [ isSeller] = UseSeller();
    const [ isUser] = UseUser();

    return (
        <div>
            {isAdmin && (
                        <>
                            <AdminHome></AdminHome>
                        </>
                    )}

            {isSeller && (
                                    <>
                                        <SellerHome></SellerHome>
                                    </>
                                )}
            {isUser && (
                                    <>
                                        <UserHome></UserHome>
                                    </>
                                )}
                        
                    </div>
    );
};

export default DashboardHome;