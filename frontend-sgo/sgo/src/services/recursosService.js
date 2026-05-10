import { request } from "./api";

const BASE = "/apis/recursos";

// 🔹 GET - listar todos
export function listarRecursos() {
  return request(`${BASE}/engenheiro`);
}

// 🔹 GET - buscar por ID
export function buscarRecursoPorId(id) {
  return request(`${BASE}/id/engenheiro?id=${id}`);
}

// 🔹 GET - buscar por descrição
export function buscarRecursosPorDescricao(descricao) {
  return request(`${BASE}/descricao/engenheiro?descricao=${descricao}`);
}

// 🔹 POST - criar recurso
export function criarRecurso(data) {
  return request(`${BASE}/engenheiro`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 PUT - atualizar recurso
export function atualizarRecurso(data) {
  return request(`${BASE}/engenheiro`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 🔹 DELETE - deletar recurso
export function deletarRecurso(id) {
  return request(`${BASE}/engenheiro?id=${id}`, {
    method: "DELETE",
  });
}