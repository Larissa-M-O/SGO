import { request } from "./api";

const BASE = "/auth";

export async function login(usuario, senha) {
  return request(`${BASE}/login?usuario=${usuario}&senha=${senha}`);
}