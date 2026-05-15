"use client"

import { useEffect, useState } from "react";
import { listarClientes, listarResposaveis  } from "@/services/usuariosService";
import { criarObra } from "@/services/obrasService";
import StatusToast from "@/app/Componentes/StatusToast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import Select from "react-select";

export default function CadastrarObra() {
  const { user } = useParams();
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const router = useRouter();
  
  const [clientes, setClientes] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);

  const [buscaCliente, setBuscaCliente] = useState("");
  const [buscaResponsavel, setBuscaResponsavel] = useState("");

  const [form, setForm] = useState({
    cliente: "",
    responsavel: "",
    descricao: "",
    rua: "",
    numero: "",
    bairro: ""
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const endereco = `Rua ${form.rua}, N ${form.numero}, ${form.bairro}`;

      const payload = {
        idObra: 0,
        descricao: form.descricao,
        endereco: endereco,
        status: 0,
        cliente: Number(form.cliente),
        responsavel: Number(form.responsavel)
      };

      await criarObra(payload);

      setToast({
        status: 200,
        message: "Obra cadastrada com sucesso!",
      });

      setTimeout(() => {
        router.push(`/administrador/${user}/obras`);
      }, 3000);
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || "Erro ao cadastrar obra";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao cadastrar:", mensagemErro);
    }
  };

  const clientesOptions = clientes.map((u) => ({
    value: u.id,
    label: u.nome
  }));

  const responsaveisOptions = responsaveis.map((u) => ({
    value: u.id,
    label: u.nome
  }));

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
            <Select
              options={clientesOptions}
              placeholder="Escolha cliente"
              isSearchable
              onChange={(selected) =>
                setForm({ ...form, cliente: selected.value })
              }
            />
          </div>

          <div className="campo">
            <label>Responsável técnico:</label>
            <Select
              options={responsaveisOptions}
              placeholder="Escolha responsável"
              isSearchable
              onChange={(selected) =>
                setForm({ ...form, responsavel: selected.value })
              }
            />
          </div>
        </div>

        <div className="campo">
          <label>Projeto:</label>
          <input
            type="text"
            name="descricao"
            placeholder="Nome do projeto"
            onChange={handleChange}
          />
        </div>

        <div className="linha-dupla">
          <div className="campo">
            <label>Rua:</label>
            <input
              type="text"
              name="rua"
              placeholder="Rua..."
              onChange={handleChange}
            />
          </div>

          <div className="campo">
            <label>Número:</label>
            <input
              type="text"
              name="numero"
              placeholder="Nº 000"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="campo">
          <label>Bairro:</label>
          <input
            type="text"
            name="bairro"
            placeholder="Jardim..."
            onChange={handleChange}
          />
        </div>

        <div className="acoes centro">
          <button className="btn-cadastrar" onClick={handleSubmit}>
            Cadastrar
          </button>
        </div>

      </div>
    </div>
  );
}