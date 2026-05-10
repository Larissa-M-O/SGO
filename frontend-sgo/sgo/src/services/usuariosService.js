import { request } from "./api";

const BASE = "/apis/usuarios";

// 🔹 GET - listar
export function listarUsuarios() {
  return request(`${BASE}/admin`);
}

export function listarClientes() {
  return request(`${BASE}/nivel/admin?nivel=${3}`);
}

export function listarResposaveis() {
  return request(`${BASE}/nivel/admin?nivel=${2}`);
}

// 🔹 GET - buscar por nome
export function buscarPorNome(nome) {
  return request(`${BASE}/nome/admin?nome=${nome}`);
}

// 🔹 POST - criar física
export function criarPessoaFisica(data) {
  return request(`${BASE}/fisica/cliente`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 POST - criar jurídica
export function criarPessoaJuridica(data) {
  return request(`${BASE}/juridica/admin`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 PUT - atualizar física
export function atualizarPessoaFisica(data) {
  return request(`${BASE}/fisica/cliente`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 🔹 PUT - atualizar jurídica
export function atualizarPessoaJuridica(data) {
  return request(`${BASE}/juridica/cliente`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// 🔹 DELETE
export function deletarPessoa(id) {
  return request(`${BASE}/admin?id=${id}`, {
    method: "DELETE",
  });
}

export function buscarUsuarioId(id) {
  return request(`${BASE}/id/cliente?id=${id}`);
}