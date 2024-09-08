import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import AuthContext from "../Context/auth";
import { getRoleById } from "../Services/RoleService/roleService";
import { usePermissions } from "./permission";

// Mock da função getRoleById
vi.mock("../Services/RoleService/roleService", () => ({
  getRoleById: vi.fn(),
}));

describe("usePermissions Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return permissions from context", async () => {
    // Mock do AuthContext
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: { role: "123" } }}>
        {children}
      </AuthContext.Provider>
    );

    const mockPermissions = [
      { module: "users", access: ["read", "write"] },
      { module: "roles", access: ["read"] },
    ];

    getRoleById.mockResolvedValue({ permissions: mockPermissions });

    const { result } = renderHook(() => usePermissions(), { wrapper });

    // Use waitFor to wait for the state updates
    await waitFor(() => {
      expect(result.current).toEqual(mockPermissions);
    });

    expect(getRoleById).toHaveBeenCalledWith("123");
  });

  it("should handle errors when fetching permissions", async () => {
    // Mock do AuthContext
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: { role: "123" } }}>
        {children}
      </AuthContext.Provider>
    );

    getRoleById.mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() => usePermissions(), { wrapper });

    // Use waitFor to wait for the state updates
    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });

  it("should return empty permissions if no user role", async () => {
    // Mock do AuthContext
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: {} }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => usePermissions(), { wrapper });

    // Assert directly since there's no async code to wait for
    expect(result.current).toEqual([]);
  });
});
