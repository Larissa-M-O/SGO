"use client";

import { useEffect, useState } from "react";
import {
  listarObras,
  buscarObrasPorStatus,
  buscarObrasPorCliente,
} from "@/services/obrasService";
import "@/assets/css/style.css";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function ObrasPage() {
  const { user } = useParams();
  const [obras, setObras] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [status, setStatus] = useState("");
  const [cliente, setCliente] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const router = useRouter();

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
      const response = await listarObras();
      setObras(response.data);

      if (response.data.length === 0) {
        setMensagemErro("Nenhuma obra encontrada.");
      } else {
        setMensagemErro("");
      }
    } catch (e) {
      console.error("Erro ao listar obras", e);
      setObras([]);
      setMensagemErro("Erro ao carregar obras.");
    }
  };

  const aplicarFiltro = async () => {
    try {
      let response;

      if (tipoFiltro === "status" && status !== "") {
        response = await buscarObrasPorStatus(Number(status));
      } else if (tipoFiltro === "cliente" && cliente !== "") {
        response = await buscarObrasPorCliente(Number(cliente));
      } else {
        return carregarObras();
      }

      setObras(response.data);

      if (response.data.length === 0) {
        setMensagemErro("Nenhum resultado encontrado.");
      } else {
        setMensagemErro("");
      }
    } catch (e) {
      console.error("Erro ao filtrar", e);

      const msg = e.response?.data?.mensagem;

      if (msg) {
        setMensagemErro(msg);
      } else {
        setMensagemErro("Erro ao filtrar dados.");
      }

      setObras([]);
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
          <select
            value={tipoFiltro}
            onChange={(e) => {
              setTipoFiltro(e.target.value);
              setStatus("");
              setCliente("");
            }}
          >
            <option value="">Selecione</option>
            <option value="status">Status</option>
            <option value="cliente">Cliente</option>
          </select>

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

          {tipoFiltro === "cliente" && (
            <input
              type="text"
              placeholder="ID do cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="filtro-cliente"
            />
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
                    router.push(`/administrador/${user}/financeiro/registro-visualizar/${obra.idObra}`)
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