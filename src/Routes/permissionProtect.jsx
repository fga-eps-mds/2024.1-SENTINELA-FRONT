import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/auth";
import PropTypes from "prop-types";
import { checkAction } from "../Utils/permission";
import { Navigate } from "react-router-dom";
import { getRoleById } from "../Services/RoleService/roleService";

const PermissionProtect = ({ element, moduleName, actions }) => {
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
    // Exibe um carregando enquanto as permissões estão sendo buscadas
    return <div>Loading...</div>;
  }

  // Verifica se o usuário possui pelo menos uma das ações necessárias
  const hasPermission = actions.some((action) =>
    checkAction(userPermissions, moduleName, action)
  );

  if (hasPermission) {
    return element;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

PermissionProtect.propTypes = {
  element: PropTypes.element.isRequired,
  moduleName: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired, // Alterado para um array de strings
};

export default PermissionProtect;
