import { request } from "./api";

const BASE = "/apis/obras";

// 🔹 GET - listar todas
export function listarObras() {
  return request(`${BASE}/admin`);
}

// 🔹 GET - buscar por ID
export function buscarObraPorId(id) {
  return request(`${BASE}/id/cliente?id=${id}`);
}

// 🔹 GET - buscar por status
export function buscarObrasPorStatus(status) {
  return request(`${BASE}/status/engenheiro?status=${status}`);
}

// 🔹 GET - buscar por cliente
export function buscarObrasPorCliente(cliente) {
  return request(`${BASE}/cliente/cliente?cliente=${cliente}`);
}

export function buscarObrasPorResponsavel(responsavel) {
  return request(`${BASE}/responsavel/engenheiro?responsavel=${responsavel}`);
}

// 🔹 POST - criar obra
export function criarObra(data) {
  return request(`${BASE}/admin`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 PUT - atualizar obra
export function atualizarObra(data) {
  return request(`${BASE}/engenheiro`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 🔹 DELETE - deletar obra
export function deletarObra(id) {
  return request(`${BASE}/admin?id=${id}`, {
    method: "DELETE",
  });
}