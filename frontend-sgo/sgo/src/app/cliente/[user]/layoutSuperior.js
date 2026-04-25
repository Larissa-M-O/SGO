"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { buscarUsuarioId } from "@/services/usuariosService.js"

export default function LayoutSuperior() {
  const pathname = usePathname();
  const { user } = useParams();
  
  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    email: "",
    nivel: 0,
    identificacao: "",
  });

  const titulos = {
    "/usuarios": "Gerenciamento de Usuários",
    "/obras": "Gerenciamento de Obras",
    "/recursos": "Gerenciamento de Recursos",
    "/cronogramas": "Cronogramas",
    "/orcamentos": "Orçamentos",
    "/relatorios": "Relatórios",
  };

  const tituloAtual = titulos[pathname] || "SGO";

  useEffect(() => {
    async function carregar() {
      try {
        const response = await buscarUsuarioId(user);
        const usuar = response.data;

        setUsuario({
          id: usuar.id,
          nome: usuar.nome,
          email: usuar.email,
          nivel: usuar.nivel,
          identificacao: usuar.identificacao,
        });
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    }

    if (user) carregar();
  }, [user]);

  return (
    <nav className="d-flex justify-content-between align-items-center px-4 py-3 topbar">
      <span>
        Olá, {usuario.nome} bem-vinda(o) de volta! |{" "}
      </span>

      <button className="btn topbar-button">
        {tituloAtual}
      </button>
    </nav>
  );
}