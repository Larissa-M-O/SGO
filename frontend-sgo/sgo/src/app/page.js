"use client";
import { useRouter } from "next/navigation";
import "@/assets/css/style.css";

export default function Home() {
  const router = useRouter();

  return (
    <>
    <h1>Olá mundo</h1>
    <button
      onClick={() => router.push(`/administrador/${1}`)}
      className="btn-novo-usuario"
    >
      Adiministrador
    </button>
    <button
      onClick={() => router.push(`/engenheiro/${7}`)}
      className="btn-novo-usuario"
    >
      Engenheiro
    </button>
    <button
      onClick={() => router.push(`/cliente/${16}`)}
      className="btn-novo-usuario"
    >
      Cliente
    </button>
    </>
  );
}
