"use client";

import "@/assets/css/orcamento.css";

import { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "next/navigation";

import { buscarObraPorId } from "@/services/obrasService";
import { listarRecursos } from "@/services/recursosService";

export default function OrcamentoPage() {

    const { id } = useParams();

    const [obra, setObra] = useState(null);
    const [recursos, setRecursos] = useState([]);

    const [recursoSelecionado, setRecursoSelecionado] = useState(null);
    const [custo, setCusto] = useState("");

    const [margemLucro, setMargemLucro] = useState(10);

    const [itens, setItens] = useState([]);

    useEffect(() => {
        carregarObra();
        carregarRecursos();
    }, []);

    async function carregarObra() {
        try {
            const response = await buscarObraPorId(id);
            setObra(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function carregarRecursos() {
        try {
            const response = await listarRecursos();
            setRecursos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const recursosOptions = recursos.map((r) => ({
        value: r.id,
        label: r.descricao,
        tipo: r.tipo
    }));

    function adicionarRecurso() {

        if (!recursoSelecionado || !custo) return;

        const novoItem = {
            id: recursoSelecionado.value,
            descricao: recursoSelecionado.label,
            tipo: recursoSelecionado.tipo,
            custo: Number(custo)
        };

        setItens([...itens, novoItem]);

        setRecursoSelecionado(null);
        setCusto("");
    }

    function removerItem(index) {
        const novaLista = [...itens];
        novaLista.splice(index, 1);

        setItens(novaLista);
    }

    const subtotal = itens.reduce((acc, item) => {
        return acc + item.custo;
    }, 0);

    const totalFinal =
        subtotal + (subtotal * Number(margemLucro || 0)) / 100;

    return (
        <div className="container-orcamento">

            <div className="card-topo">

                <div className="campo-select">
                    <label>Recurso</label>

                    <Select
                        options={recursosOptions}
                        placeholder="Selecione o recurso"
                        isSearchable
                        value={recursoSelecionado}
                        onChange={setRecursoSelecionado}
                    />
                </div>

                <div className="campo-custo">
                    <label>Custo</label>

                    <input
                        type="number"
                        placeholder="R$ 0.00"
                        value={custo}
                        onChange={(e) => setCusto(e.target.value)}
                    />
                </div>

                <button
                    className="btn-adicionar"
                    onClick={adicionarRecurso}
                >
                    + Adicionar
                </button>

                <div className="campo-lucro">
                    <label>Margem de lucro (%)</label>

                    <input
                        type="number"
                        value={margemLucro}
                        onChange={(e) =>
                            setMargemLucro(e.target.value)
                        }
                    />
                </div>

            </div>

            <div className="lista-recursos">

                {itens.map((item, index) => (

                    <div className="item-recurso" key={index}>

                        <span>{item.descricao}</span>

                        <span>{item.tipo}</span>

                        <span>
                            R$ {item.custo.toFixed(2)}
                        </span>

                        <button
                            className="btn-remover"
                            onClick={() => removerItem(index)}
                        >
                            Remover
                        </button>

                    </div>

                ))}

            </div>

            <div className="rodape-orcamento">

                <div className="info-obra">

                    <div className="linha-info">
                        <strong>Projeto</strong>

                        <span>
                            {obra?.descricao}
                        </span>
                    </div>

                    <div className="linha-info">
                        <strong>Cliente</strong>

                        <span>
                            {obra?.cliente?.nome}
                        </span>
                    </div>

                </div>

                <div className="card-final">

                    <h2>Orçamento Final</h2>

                    <div className="valor-final">
                        R$ {totalFinal.toFixed(2)}
                    </div>

                    <button className="btn-confirmar">
                        Confirmar
                    </button>

                </div>

            </div>

        </div>
    );
}