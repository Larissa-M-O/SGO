import { request } from "./api";

const BASE = "/apis/obras";

// 🔹 GET - listar todas
export function listarObras() {
  return request(BASE);
}

// 🔹 GET - buscar por ID
export function buscarObraPorId(id) {
  return request(`${BASE}/id?id=${id}`);
}

// 🔹 GET - buscar por status
export function buscarObrasPorStatus(status) {
  return request(`${BASE}/status?status=${status}`);
}

// 🔹 GET - buscar por cliente
export function buscarObrasPorCliente(cliente) {
  return request(`${BASE}/cliente?cliente=${cliente}`);
}

export function buscarObrasPorResponsavel(responsavel) {
  return request(`${BASE}/responsavel?responsavel=${responsavel}`);
}

// 🔹 POST - criar obra
export function criarObra(data) {
  return request(BASE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 PUT - atualizar obra
export function atualizarObra(data) {
  return request(BASE, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 🔹 DELETE - deletar obra
export function deletarObra(id) {
  return request(`${BASE}?id=${id}`, {
    method: "DELETE",
  });
}