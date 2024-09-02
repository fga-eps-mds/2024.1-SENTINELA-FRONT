// src/hooks/usePermissions.js

import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/auth";
import { getRoleById } from "../Services/RoleService/roleService";

export const checkModule = (permissions, module) => {
  return permissions.some((permission) => permission.module === module);
};

export const checkAction = (permissions, module, action) => {
  return (
    checkModule(permissions, module) &&
    permissions.some((permission) => permission.access.includes(action))
  );
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
