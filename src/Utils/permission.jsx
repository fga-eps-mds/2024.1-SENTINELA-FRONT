// src/hooks/usePermissions.js

import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/auth";
import { getRoleById } from "../Services/RoleService/roleService";

export const checkModule = (permissions, module) => {
  const modulePermissions = permissions.find(
    (permission) => permission.module === module
  );

  return modulePermissions ? modulePermissions.access.length > 0 : false;
};

export const checkAction = (permissions, module, action) => {
  const modulePermissions = permissions.find(
    (permission) => permission.module === module
  );
  return modulePermissions && modulePermissions.access.includes(action);
};

export const usePermissions = () => {
  const { user } = useContext(AuthContext);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchRolePermissions = async () => {
      if (user?.role) {
        try {
          const role = await getRoleById(user.role);
          setPermissions(role?.permissions || []);
        } catch (error) {
          console.error("Erro ao buscar permissões do papel:", error);
          setPermissions([]);
        }
      }
    };

    fetchRolePermissions();
  }, [user]);

  return permissions;
};
