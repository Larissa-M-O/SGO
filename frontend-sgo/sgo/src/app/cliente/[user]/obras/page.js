"use client";

import { useEffect, useState } from "react";
import {
  buscarObrasPorCliente
} from "@/services/obrasService";
import "@/assets/css/style.css";
import { useParams, useRouter} from "next/navigation";

export default function ObrasPage() {
  const [obras, setObras] = useState([]);
  const [todasObras, setTodasObras] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("status");
  const [status, setStatus] = useState("");
  const [cliente, setCliente] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const router = useRouter();
  const{ user } = useParams();

  useEffect(() => {
    carregarObras();
  }, []);

  // 🔥 debounce automático
  useEffect(() => {
    const delay = setTimeout(() => {
      aplicarFiltro();
    }, 400);

    return () => clearTimeout(delay);
  }, [status, cliente]);

  const carregarObras = async () => {
    try {
      const response = await buscarObrasPorCliente(user);
      setObras(response.data);
      setTodasObras(response.data);

      if (response.data.length === 0) {
        setMensagemErro("Nenhuma obra encontrada.");
      } else {
        setMensagemErro("");
      }
    } catch (e) {
      setMensagemErro(e.response?.data?.mensagem);
      setObras([]);
      console.error("Erro ao listar obras", e);
    }
  };

  const aplicarFiltro = async () => {
    let obrasFiltro = [];

    if (tipoFiltro === "status" && status !== "") {
      todasObras.forEach(element => {
        if(element.status == Number(status)){
          obrasFiltro.push(element);
        }
      });

    } else if (tipoFiltro === "cliente" && cliente !== "") {
      todasObras.forEach (element => {
          if(element.cliente?.id == Number(cliente)){
            obrasFiltro.push(element);
          }
      });
    } else {
      return carregarObras();
    }

    setObras(obrasFiltro);

    if (obrasFiltro.length === 0) {
      setMensagemErro("Nenhum resultado encontrado.");
      setObras([]);
    } else {
      setMensagemErro("");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return "status-nao-iniciado";
      case 1:
        return "status-andamento";
      case 2:
        return "status-concluido";
      case 3:
        return "status-encerrado";
      default:
        return "";
    }
  };

  const traduzirStatus = (status) => {
    switch (status) {
      case 0:
        return "Não iniciado";
      case 1:
        return "Em andamento";
      case 2:
        return "Concluído";
      case 3:
        return "Encerrado";
      default:
        return "-";
    }
  };

  return (
    <div className="container-obras">

      {/* FILTROS */}
      <div className="filtros">
        <span>Filtros</span>

        <div className="filtros-inputs">

          {tipoFiltro === "status" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="filtro-status"
            >
              <option value="">Escolher status</option>
              <option value={0}>Não iniciado</option>
              <option value={1}>Andamento</option>
              <option value={2}>Concluído</option>
              <option value={3}>Encerrado</option>
            </select>
          )}
        </div>
      </div>

      <br />

      {/* CABEÇALHO */}
      <div className="card-header card-obras">
        <h2>Projetos</h2>
      </div>

      {/* COLUNAS */}
      <div className="tabela-header">
        <div>Cliente</div>
        <div>Projeto</div>
        <div>Status</div>
        <div>Ações</div>
      </div>

      <div className="card-obras">

        {/* 🔥 LISTA OU MENSAGEM */}
        {mensagemErro ? (
          <div className="mensagem-vazia">
            {mensagemErro}
          </div>
        ) : (
          obras.map((obra) => (
            <div className="tabela-linha" key={obra.idObra}>
              <div>{obra.cliente?.nome}</div>
              <div>{obra.descricao}</div>

              <div>
                <span className={`status ${getStatusClass(obra.status)}`}>
                  {traduzirStatus(obra.status)}
                </span>
              </div>

              <div>
                <button
                  className="btn-visualizar"
                  onClick={() =>
                    router.push(`/engenheiro/${user}/obras/obra-visualizar/${obra.idObra}`)
                  }
                >
                  Visualizar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}