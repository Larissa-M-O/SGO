"use client"

import { useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { listarClientes, listarResposaveis  } from "@/services/usuariosService";
import { buscarObraPorId, atualizarObra } from "@/services/obrasService";
import StatusToast from "@/app/Componentes/StatusToast";

export default function EditarObra() {
  const { user } = useParams();
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    cliente: "",
    responsavel: "",
    descricao: "",
    rua: "",
    numero: "",
    bairro: "",
    status: ""
  });

  const [clientes, setClientes] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const data = await listarClientes();
        setClientes(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    carregarClientes();
  }, []);

  useEffect(() => {
    async function carregarResponsaveis() {
      try {
        const data = await listarResposaveis();
        setResponsaveis(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    carregarResponsaveis();
  }, []);

  useEffect(() => {
    async function carregarDados() {
      try {
        const obra = (await buscarObraPorId(id)).data;
        console.log(obra.data);

        // 🔹 separa endereço
        let rua = "";
        let numero = "";
        let bairro = "";

        if (obra.endereco) {
          const partes = obra.endereco.split(",");
          rua = partes[0]?.trim() || "";
          numero = partes[1]?.replace("N", "").trim() || "";
          bairro = partes[2]?.trim() || "";
        }

        setForm({
          cliente: obra.cliente?.id,
          responsavel: obra.responsavel?.id,
          descricao: obra.descricao,
          rua,
          numero,
          bairro,
          status: obra.status
        });

      } catch (err) {
        console.error(err);
      }
    }

    carregarDados();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const endereco = `${form.rua}, N ${form.numero}, ${form.bairro}`;

      const payload = {
        idObra: Number(id),
        descricao: form.descricao,
        endereco: endereco,
        status: Number(form.status), 
        cliente: Number(form.cliente),
        responsavel: Number(form.responsavel)
      };

      await atualizarObra(payload);

      setToast({
        status: 200,
        message: "Obra atualizada com sucesso!",
      });

      setTimeout(() => {
        router.push(`/administrador/${user}/obras`);
      }, 3000);

    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || "Erro ao atualizar obra";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao atualizar:", mensagemErro);
    }
  };

  if (!form.cliente) return <p>Carregando...</p>;

  return (
    <div className="container-obra">
      <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      <div className="card-obra">

        <div className="linha-dupla">
          <div className="campo">
            <label>Cliente:</label>
            <input
              type="text"
              value={
                clientes.find(u => u.id === form.cliente)?.nome || ""
              }
              disabled
            />
          </div>

          <div className="campo">
            <label>Responsável técnico:</label>
            <select
              name="responsavel"
              value={form.responsavel}
              onChange={handleChange}
            >
              <option value="">Escolha responsável</option>
              {responsaveis.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="campo">
          <label>Projeto:</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="linha-dupla">
          <div className="campo">
            <label>Endereço:</label>
            <input
              type="text"
              name="rua"
              value={form.rua}
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label>Número:</label>
            <input
              type="text"
              name="numero"
              value={form.numero}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="linha-dupla">
        <div className="campo">
          <label>Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Status:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value={0}>Não iniciado</option>
            <option value={1}>Em andamento</option>
            <option value={2}>Concluído</option>
            <option value={3}>Encerrado</option>
          </select>
        </div>
      </div>

        <div className="acoes centro">
          <button className="btn-cadastrar" onClick={handleSubmit}>
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}