import { APISuppliers, APIUsers } from "./BaseService";

export async function userLogin(email, password) {
  try {
    const response = await APIUsers.post("login", {
      email,
      password,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
/*
export const createSupplierForm = async (supplierData) => {
  try {
    const response = await APISuppliers.post("/supplier", {
      nome: supplierData.nome,
      tipoPessoa: supplierData.tipoPessoa,
      cpf: supplierData.cpf,
      statusFornecedor: supplierData.statusFornecedor,
      naturezaTransacao: supplierData.naturezaTransacao,
      email: supplierData.email,
      nomeContato: supplierData.nomeContato,
      celular: supplierData.celular,
      telefone: supplierData.telefone,
      cep: supplierData.cep,
      cidade: supplierData.cidadei,
      uf_endereco: supplierData.uf_endereco,
      logradouro: supplierData.logradouro,
      complemento: supplierData.complemento,
      nomeBanco: supplierData.nomeBanco,
      agencia: supplierData.agencia,
      numeroBanco: supplierData.numeroBanco,
      dv: supplierData.dv,
      chavePix: supplierData.chavePix
    });
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
  }
};

export const getSupplierForm = async () => {
  try {
    const token = localStorage.getItem("@App:token");
    if (!token) {
      throw new Error("No token found");
    }
    console.log("Token being used:", token); // Log para depuração
    const response = await APISuppliers.get("/supplier", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);
  }
};

export const getSupplierFormById = async (id) => {
  try {
    const response = await APISuppliers.get(`/listsupplier/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar fornecedor com ID ${id}:`, error);
  }
};

export const updateSupplierFormById = async (id, supplierData) => {
  try {
    const response = await APISuppliers.patch(`/supplier/patch/${id}`, supplierData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar fornecedor com ID ${id}:`, error);
  }
};

export const deleteSupplierFormById = async (id) => {
  try {
    const response = await APISuppliers.delete(`/supplier/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar fornecedor com ID ${id}:`, error);
  }
};
*/