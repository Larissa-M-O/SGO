import { request } from "./api";

const BASE = "/auth";

export async function login(usuario, senha) {
  return request(`${BASE}/login?usuario=${usuario}&senha=${senha}`);
}

export function cadastroPessoaFisica(data) {
  return request(`${BASE}/fisica`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 🔹 POST - criar jurídica
export function cadastroPessoaJuridica(data) {
  return request(`${BASE}/juridica`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}