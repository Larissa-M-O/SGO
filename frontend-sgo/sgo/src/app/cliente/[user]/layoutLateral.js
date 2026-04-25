"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarUsuarioId } from "@/services/usuariosService.js"

export default function LayoutLateral() {
  const { user } = useParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    id: "",
    nome: "",
    email: "",
    nivel: 0,
    identificacao: "",
  });

  const pathname = usePathname();
  const [submenuAberto, setSubmenuAberto] = useState(true);

  const isActive = (path) => pathname === path;

  const itemClass = (path) =>
    `d-flex align-items-center gap-2 btn text-start w-100 mb-2 sidebar-item ${
      isActive(path) ? "active" : ""
    }`;

  const Icon = ({ src }) => (
    <img src={src} width={20} height={20} alt="icon" />
  );

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
    <div className="d-flex flex-column p-3 sidebar">
      <h4 className="sidebar-title mb-4 d-flex align-items-center gap-2">
        <Icon src="/icons/logo.png" />
        S.G Obras
      </h4>

      <Link href={`/cliente/${usuario.id}/cronogramas`} className={itemClass("/cronogramas")}>
        <Icon src="/icons/cronograma.png" />
        Cronogramas
      </Link>

      <Link href={`/cliente/${usuario.id}/obras`} className={itemClass("/obras")}>
        <Icon src="/icons/obras.png" />
        Obras
      </Link>

      <Link href={`/cliente/${usuario.id}/orcamentos`} className={itemClass("/orcamentos")}>
        <Icon src="/icons/orcamentos.png" />
        Orçamentos
      </Link>

      <div className="mt-auto text-white">
        <hr />
        <div className="d-flex align-items-center gap-2">
          <img
            src="/icons/user.png"
            width={35}
            height={35}
            className="user-avatar"
            alt="user"
          />
          <div onClick={() => router.push(`/cliente/${usuario.id}/usuarios/usuario-visualizar`)}>
            <div>{usuario.nome}</div>
            <small>Cliente</small>
          </div>
        </div>
      </div>
    </div>
  );
}