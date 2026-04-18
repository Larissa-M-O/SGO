"use client";
import { usePathname } from "next/navigation";

export default function LayoutSuperior() {
  const pathname = usePathname();

  const titulos = {
    "/usuarios": "Gerenciamento de Usuários",
    "/obras": "Gerenciamento de Obras",
    "/recursos": "Gerenciamento de Recursos",
    "/cronogramas": "Cronogramas",
    "/orcamentos": "Orçamentos",
    "/relatorios": "Relatórios",
  };

  const tituloAtual = titulos[pathname] || "SGO";

  return (
    <nav className="d-flex justify-content-between align-items-center px-4 py-3 topbar">
      <span>
        Olá, Larissa bem-vinda(o) de volta! |{" "}
      </span>

      <button className="btn topbar-button">
        {tituloAtual}
      </button>
    </nav>
  );
}