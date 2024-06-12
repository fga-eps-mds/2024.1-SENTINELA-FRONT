import React, { useContext } from 'react';
import AuthContext from '../Context/auth';
import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const Routes = () => {
    const { signed } = useContext(AuthContext);

    console.log("signed: " + signed)

    return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;