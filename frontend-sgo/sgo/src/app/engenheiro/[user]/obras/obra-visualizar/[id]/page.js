"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarObraPorId } from "@/services/obrasService";
import StatusToast from "@/app/Componentes/StatusToast";
import "@/assets/css/style.css";

export default function VisualizarObra() {
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const {user} = useParams();
  const { id } = useParams();
  const [obra, setObra] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarObraPorId(id);
        setObra(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    carregar();
  }, [id]);

  if (!obra) return <p>Carregando...</p>;

  return (
    <div className="container-obra">
      <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      <div className="card-obra">
        
        <div className="campo">
          <strong>Cliente:</strong>
          <p>{obra.cliente.nome}</p>
        </div>

        <div className="campo">
          <strong>Projeto:</strong>
          <p>{obra.descricao}</p>
        </div>

        <div className="campo">
          <strong>Endereço:</strong>
          <p>{obra.endereco}</p>
        </div>

        <div className="linha-dupla">
          <div className="campo">
            <strong>Status:</strong>
            <p>{traduzirStatus(obra.status)}</p>
          </div>

          <div className="campo">
            <strong>Responsável técnico:</strong>
            <p>{obra.responsavel.nome}</p>
          </div>
        </div>

        <div className="acoes">
          <button
            className="btn-alterar"
            onClick={() => router.push(`/engenheiro/${user}/obras/obra-editar/${obra.idObra}`)}
          >
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}