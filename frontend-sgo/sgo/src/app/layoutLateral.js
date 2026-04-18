"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LayoutLateral() {
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

  return (
    <div className="d-flex flex-column p-3 sidebar">
      <h4 className="sidebar-title mb-4 d-flex align-items-center gap-2">
        <Icon src="/icons/logo.png" />
        S.G Obras
      </h4>

      <Link href="/cronogramas" className={itemClass("/cronogramas")}>
        <Icon src="/icons/cronograma.png" />
        Cronogramas
      </Link>

      <button
        className="btn text-start text-white d-flex align-items-center gap-2"
        onClick={() => setSubmenuAberto(!submenuAberto)}
      >
        <Icon src="/icons/gerenciar.png" />
        Gerenciar ▼
      </button>

      {submenuAberto && (
        <div className="sidebar-submenu">
          <Link href="/usuarios" className={itemClass("/usuarios")}>
            <Icon src="/icons/usuarios.png" />
            Usuários
          </Link>

          <Link href="/obras" className={itemClass("/obras")}>
            <Icon src="/icons/obras.png" />
            Obras
          </Link>

          <Link href="/recursos" className={itemClass("/recursos")}>
            <Icon src="/icons/recursos.png" />
            Recursos
          </Link>
        </div>
      )}

      <Link href="/orcamentos" className={itemClass("/orcamentos")}>
        <Icon src="/icons/orcamentos.png" />
        Orçamentos
      </Link>

      <Link href="/relatorios" className={itemClass("/relatorios")}>
        <Icon src="/icons/financeiro.png" />
        Financeiro
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
          <div>
            <div>Larissa Oliveira</div>
            <small>Administrador</small>
          </div>
        </div>
      </div>
    </div>
  );
}