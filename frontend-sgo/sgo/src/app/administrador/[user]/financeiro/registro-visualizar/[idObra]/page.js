'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {buscarObraPorId} from "@/services/obrasService";

import {buscarRegistrosPorObra} from "@/services/registroFinanceiroService";

import "@/assets/css/VisualizarRegistroFinanceiro.css";

function VisualizarRegistroFinanceiro() {

  const { user } = useParams();
  const { idObra } = useParams();

  const [obra, setObra] = useState(null);
  const [registros, setRegistros] = useState([]);

  const router = useRouter();

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {

      const obraResponse = await buscarObraPorId(idObra);
      setObra(obraResponse.data);

      const registrosResponse = await buscarRegistrosPorObra(idObra);
      setRegistros(registrosResponse.data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="visualizar-registro-container">

      <div className="topo-container">
        <button className="btn-adicionar" 
        onClick={() =>
          router.push(`/administrador/${user}/financeiro/registro-criar/${obra.idObra}`)
        }>
          Adicionar
        </button>
      </div>

      {obra && (
        <div className="obra-card">

          <div className="obra-info">
            <h2>{obra.descricao}</h2>

            <p>
              Cliente: {obra.cliente?.nome}
            </p>
          </div>

          <button className="btn-relatorio">
            Gerar Relatório
          </button>

        </div>
      )}

      <div className="lista-registros">
        {registros.length > 0 ? (
            registros.map((registro) => (
            <div
                key={registro.idRegistro}
                className="registro-card"
            >

                <div className="registro-esquerda">

                <div className="registro-topo">
                    <h3>{registro.tipo}</h3>

                    <span className="registro-data">
                    {registro.data}
                    </span>
                </div>

                {registro.descricao && (
                    <p className="registro-descricao">
                    {registro.descricao}
                    </p>
                )}

                </div>

                <strong
                    className={
                        registro.tipo === "Entrada"
                        ? "registro-valor entrada"
                        : "registro-valor saida"
                    }
                    >
                    R$ {registro.valor}
                </strong>

            </div>
            ))
        ) : (
            <p>Nenhum registro encontrado.</p>
        )}

        </div>

    </div>
  );
}

export default VisualizarRegistroFinanceiro;