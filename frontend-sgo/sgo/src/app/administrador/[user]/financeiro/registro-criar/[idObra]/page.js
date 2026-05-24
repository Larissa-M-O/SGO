"use client";

import "@/assets/css/orcamento.css";

import { useEffect, useState } from "react";
import Select from "react-select";
import { useParams, useRouter } from "next/navigation";

import { buscarObraPorId } from "@/services/obrasService";
import { criarRegistros } from "@/services/registroFinanceiroService";

import StatusToast from "@/app/Componentes/StatusToast";

export default function RegistroFinanceiroPage() {

    const { idObra, user } = useParams();

    const router = useRouter();

    const [toast, setToast] = useState({
        status: null,
        message: ""
    });

    const [obra, setObra] = useState(null);

    const [tipoSelecionado, setTipoSelecionado] = useState(null);

    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");

    const [erroData, setErroData] = useState(false);

    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        carregarObra();
    }, []);

    async function carregarObra() {

        try {

            const response = await buscarObraPorId(idObra);

            setObra(response.data);

        } catch (error) {

            console.error(error);

            setToast({
                status: 500,
                message: "Erro ao carregar obra"
            });
        }
    }

    const tipoOptions = [
        {
            value: "Entrada",
            label: "Entrada"
        },
        {
            value: "Saida",
            label: "Saída"
        }
    ];

    function validarData(dataSelecionada) {

        const hoje = new Date();

        hoje.setHours(0, 0, 0, 0);

        const dataInput = new Date(dataSelecionada);

        return dataInput <= hoje;
    }

    function handleDataChange(e) {

        const valorData = e.target.value;

        setData(valorData);

        if (!valorData) {
            setErroData(false);
            return;
        }

        setErroData(!validarData(valorData));
    }

    function adicionarRegistro() {

        if (
            !tipoSelecionado ||
            !valor ||
            !data
        ) {

            setToast({
                status: 400,
                message: "Preencha os campos obrigatórios"
            });

            return;
        }

        if (erroData) {
            return;
        }

        const novoRegistro = {
            tipo: tipoSelecionado.value,
            valor: Number(valor),
            data: data,
            descricao: descricao || null,
            obra: {
                idObra: Number(idObra)
            }
        };

        setRegistros([...registros, novoRegistro]);

        setTipoSelecionado(null);
        setValor("");
        setDescricao("");
        setData("");

        setErroData(false);

        
    }

    function removerRegistro(index) {

        const novaLista = [...registros];

        novaLista.splice(index, 1);

        setRegistros(novaLista);
    }

    async function salvarRegistros() {

        if (registros.length === 0) {

            setToast({
                status: 400,
                message: "Adicione pelo menos um registro"
            });

            return;
        }

        try {

            await criarRegistros(registros);

            setToast({
                status: 200,
                message: "Registros salvos com sucesso"
            });

            setTimeout(() => {

                router.push(
                    `/administrador/${user}/financeiro/registro-visualizar/${idObra}`
                );

            }, 2500);

        } catch (error) {

            const mensagemErro =
                error.response?.data?.mensagem ||
                "Erro ao salvar registros";

            const statusErro =
                Number(error.response?.data?.status) || 500;

            setToast({
                status: statusErro,
                message: mensagemErro
            });

            console.error(error);
        }
    }

    const totalAtual = registros.reduce((acc, registro) => {

        if (registro.tipo === "Entrada") {
            return acc + registro.valor;
        }

        return acc - registro.valor;

    }, 0);

    return (

        <div className="container-orcamento">

            <StatusToast
                status={toast.status}
                message={toast.message}
                onClose={() =>
                    setToast({
                        status: null,
                        message: ""
                    })
                }
            />

            <div className="card-topo">

                <div className="campo-select">

                    <label>Tipo</label>

                    <Select
                        options={tipoOptions}
                        placeholder="Selecione o tipo"
                        isSearchable={false}
                        value={tipoSelecionado}
                        onChange={setTipoSelecionado}
                    />

                </div>

                <div className="campo-custo">

                    <label>Valor</label>

                    <input
                        type="number"
                        placeholder="R$ 0.00"
                        value={valor}
                        onChange={(e) =>
                            setValor(e.target.value)
                        }
                    />

                </div>

                <div className="campo-data-registro">

                    <label>Data</label>

                    <input
                        type="date"
                        value={data}
                        onChange={handleDataChange}
                    />

                    {

                        erroData && (

                            <small className="erro-data-registro">
                                Não é permitido datas futuras
                            </small>

                        )

                    }

                </div>

                <div className="campo-select">

                    <label>Descrição</label>

                    <input
                        type="text"
                        maxLength={60}
                        placeholder="Descrição opcional"
                        value={descricao}
                        onChange={(e) =>
                            setDescricao(e.target.value)
                        }
                    />

                </div>

                <button
                    className="btn-adicionar"
                    onClick={adicionarRegistro}
                    disabled={erroData}
                    style={{
                        opacity: erroData ? 0.6 : 1,
                        cursor:
                            erroData
                                ? "not-allowed"
                                : "pointer"
                    }}
                >
                    + Adicionar
                </button>

            </div>

            <div className="lista-recursos">

                {registros.map((registro, index) => (

                    <div
                        className="item-recurso"
                        key={index}
                    >

                        <span>
                            {registro.tipo}
                        </span>

                        <span>
                            {registro.data}
                        </span>

                        <span>
                            {registro.descricao || "-"}
                        </span>

                        <span
                            style={{
                                color:
                                    registro.tipo === "Entrada"
                                        ? "green"
                                        : "red",

                                fontWeight: "bold"
                            }}
                        >
                            R$ {registro.valor.toFixed(2)}
                        </span>

                        <button
                            className="btn-remover"
                            onClick={() =>
                                removerRegistro(index)
                            }
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

                    <h2>Total Atual</h2>

                    <div
                        className="valor-final"
                        style={{
                            color:
                                totalAtual >= 0
                                    ? "green"
                                    : "red"
                        }}
                    >
                        R$ {totalAtual.toFixed(2)}
                    </div>

                    <button
                        className="btn-confirmar"
                        onClick={salvarRegistros}
                    >
                        Salvar Registros
                    </button>

                </div>

            </div>

        </div>
    );
}