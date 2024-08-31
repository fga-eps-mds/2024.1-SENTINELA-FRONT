import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/auth";
import { checkAction } from "../Utils/permission";
import { Navigate } from "react-router-dom";
import { getRoleById } from "../Services/RoleService/roleService";

const PermissionProtect = ({ element, moduleName, action }) => {
    const { user } = useContext(AuthContext);
    const [userPermissions, setUserPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRolePermissions = async () => {
            if (user?.role) {
                try {
                    const role = await getRoleById(user.role);
                    setUserPermissions(role?.permissions || []);
                } catch (error) {
                    console.error("Failed to fetch role permissions:", error);
                    setUserPermissions([]);
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchRolePermissions();
    }, [user]);

    if (loading) {
        // Optionally render a loading spinner or a placeholder while permissions are being fetched
        return <div>Loading...</div>;
    }

    const hasPermission = checkAction(userPermissions, moduleName, action);

    if (hasPermission) {
        return element;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

export default PermissionProtect;
