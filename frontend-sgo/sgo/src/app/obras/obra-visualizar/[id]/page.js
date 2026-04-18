"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarObraPorId, deletarObra } from "@/services/obrasService";
import StatusToast from "@/app/Componentes/StatusToast";
import "@/assets/css/style.css";

export default function VisualizarObra() {
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

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

  const handleDelete = async () => {
    if (!window.confirm("Deseja realmente remover esta obra?")) return;

    try{
      await deletarObra(id);
      setToast({
        status: 201,
        message: "Obra removido com sucesso!",
      });

      setTimeout(() => {
        router.push("/obras");
      }, 3000);
    }catch(error){
      const mensagemErro = error.response?.data?.mensagem || "Erro ao remover obra";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao remover:", mensagemErro);
    }
  };

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
          <button className="btn-remover" onClick={handleDelete}>
            Remover
          </button>

          <button
            className="btn-alterar"
            onClick={() => router.push(`/obras/obra-editar/${obra.idObra}`)}
          >
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}