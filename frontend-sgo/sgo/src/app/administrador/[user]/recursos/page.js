"use client";

import { useEffect, useState } from "react";
import {
  listarRecursos,
  deletarRecurso,
  buscarRecursosPorDescricao,
} from "@/services/recursosService";
import { useRouter } from "next/navigation";
import StatusToast from "@/app/Componentes/StatusToast";
import { useParams } from "next/navigation";

import "@/assets/css/style.css";

export default function Recursos() {
  const { user } = useParams();
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const router = useRouter();
  const [recursos, setRecursos] = useState([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  // 🔹 Carrega todos
  async function carregarRecursos() {
    const data = await listarRecursos();
    setRecursos(data.data);
  }

  // 🔹 Busca com delay (debounce)
  useEffect(() => {
  const delay = setTimeout(async () => {
    try {
        setErro(""); // limpa erro antes de buscar

        if (busca.trim() === "") {
            const data = await listarRecursos();
            setRecursos(data.data);
        } else {
            const data = await buscarRecursosPorDescricao(busca);
            setRecursos(data.data);
        }

        } catch (error) {
        console.log(error);

        const mensagem =
            error.response?.data?.mensagem || "Erro ao buscar recursos";

        setErro(mensagem);
        setRecursos([]); // limpa lista
        }
    }, 300);

    return () => clearTimeout(delay);
    }, [busca]);

  useEffect(() => {
    carregarRecursos();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    
    try {
      await deletarRecurso(id);
      setToast({
        status: 201,
        message: "Recurso removido com sucesso!",
      });

      carregarRecursos();
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || "Erro ao remover recurso";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao remover:", mensagemErro);
    }
  }

  return (
    <div className="container-recursos">
      <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      
      {/* TOPO */}
      <div className="topo-recursos">
        <input
          type="text"
          placeholder="Procure por Descrição"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input-busca"
        />

        <button className="btn-novo" onClick={() => router.push(`/administrador/${user}/recursos/recurso-cadastrar`)}>+ Novo Recurso</button>
      </div>

      {/* HEADER */}
      <div className="header-lista">
        <span>ID</span>
        <span>|</span>
        <span>DESCRIÇÃO</span>
        <span>|</span>
        <span>TIPO</span>
        <span></span>
      </div>

      {/* LISTA */}
      {recursos.map((r) => (
        <div key={r.idRecurso} className="card-recurso">
          
          <div className="info">
            <span className="id">{r.idRecurso}</span>
            <span className="descricao">{r.descricao}</span>
            <span className="tipo">{r.tipo}</span>
          </div>

          <div className="acoes">
            <button className="btn-editar" onClick={() => router.push(`/administrador/${user}/recursos/recurso-editar/${r.idRecurso}`)}>Alterar</button>
            <button
              className="btn-remover"
              onClick={() => handleDelete(r.idRecurso)}
            >
              Remover
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}