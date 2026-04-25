"use client";

import { useEffect, useState } from "react";
import { buscarPorNome, listarUsuarios } from "@/services/usuariosService.js";
import UsuarioCard from "./componentes/UsuarioCard.js";
import { useRouter } from "next/navigation";
import "@/assets/css/style.css";
import { useParams } from "next/navigation";

export default function Usuarios() {
  const { user } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (busca.trim() === "") {
      listarUsuarios().then((res) => setUsuarios(res.data || res));
    } else {
      buscarPorNome(busca)
        .then((res) => setUsuarios(res.data || res))
        .catch(() => setUsuarios([]));
    }
  }, [busca]);

  useEffect(() => {
    listarUsuarios().then((res) => setUsuarios(res.data || res));
  }, []);

  return (
    <div className="usuarios-container">

      {/* BUSCA + BOTÃO */}
      <div className="usuarios-header">
        <input
          type="text"
          placeholder="Procure por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input-busca"
        />

        <button
          onClick={() => router.push(`/administrador/${user}/usuarios/usuario-cadastrar`)}
          className="btn-novo-usuario"
        >
          + Novo Usuário
        </button>
      </div>

      {/* LISTA */}
      <div className="usuarios-lista">
        {usuarios.map((u) => (
          <UsuarioCard key={u.id} usuario={u} />
        ))}
      </div>
    </div>
  );
}
