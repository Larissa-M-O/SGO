"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function UsuarioCard({ usuario }) {
  const { user } = useParams();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #737373",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div>
          <strong>{usuario.id}</strong> | {usuario.nome}
        </div>
      </div>

      <Link
        href={`/administrador/${user}/usuarios/usuario-visualizar/${usuario.id}`}
        style={{
          backgroundColor: "#ff751f",
          color: "white",
          padding: "8px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          display: "inline-block"
        }}
      >
        Visualizar
      </Link>
    </div>
  );
}