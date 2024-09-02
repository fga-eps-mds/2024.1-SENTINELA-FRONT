// src/hooks/usePermissions.test.js

import { describe, it, expect, beforeEach, vi } from "vitest";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/auth";
import { getRoleById } from "../Services/RoleService/roleService";

// Funções que serão testadas
export const checkModule = (permissions, module) => {
  return permissions.some((permission) => permission.module === module);
};

export const checkAction = (permissions, module, action) => {
  return (
    checkModule(permissions, module) &&
    permissions.some(
      (permission) =>
        permission.module === module && permission.access.includes(action)
    )
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

// Mock da função getRoleById
vi.mock("../Services/RoleService/roleService", () => ({
  getRoleById: vi.fn(),
}));

describe("Permission Utilities and usePermissions Hook", () => {
  const mockPermissions = [
    { module: "users", access: ["read", "write"] },
    { module: "roles", access: ["read"] },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Testando checkModule e checkAction
  describe("Permission Utilities", () => {
    it("should check if a module is present in permissions", () => {
      expect(checkModule(mockPermissions, "users")).toBe(true);
      expect(checkModule(mockPermissions, "unknown")).toBe(false);
    });

    it("should check if an action is allowed on a module", () => {
      expect(checkAction(mockPermissions, "users", "write")).toBe(true);
      expect(checkAction(mockPermissions, "users", "delete")).toBe(false);
      expect(checkAction(mockPermissions, "roles", "read")).toBe(true);
      expect(checkAction(mockPermissions, "roles", "write")).toBe(false);
      expect(checkAction(mockPermissions, "unknown", "read")).toBe(false);
    });
  });
});
