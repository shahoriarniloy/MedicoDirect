import { useContext } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { AuthContext } from '../providers/AuthProvider';

const PublicRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();




   
    

    if (user) {

        if (location.state && location.state.pathname) {
            navigate(location.state.pathname);
        } else {

            navigate('/');
        }     

    }

    return children;
};

PublicRoutes.propTypes = {
    children: PropTypes.node.isRequired
};

export default PublicRoutes;
