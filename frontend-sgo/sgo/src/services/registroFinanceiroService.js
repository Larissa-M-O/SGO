import { request } from "./api";

const BASE = "/apis/registro";

// 🔹 GET - listar todos os registros
export function listarRegistros() {
  return request(`${BASE}/admin`);
}

// 🔹 GET - buscar registros por obra
export function buscarRegistrosPorObra(idObra) {
  return request(`${BASE}/obra/admin?idObra=${idObra}`);
}

// 🔹 GET - buscar registro por ID
export function buscarRegistroPorId(id) {
  return request(`${BASE}/id/admin?id=${id}`);
}

// 🔹 POST - criar registros
export function criarRegistros(data) {
  return request(`${BASE}/admin`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 DELETE - deletar registro
export function deletarRegistro(id) {
  return request(`${BASE}/id/admin?id=${id}`, {
    method: "DELETE",
  });
}