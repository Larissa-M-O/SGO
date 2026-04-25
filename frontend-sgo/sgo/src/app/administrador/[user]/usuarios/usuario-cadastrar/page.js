"use client";

import { useState } from "react";
import {
  criarPessoaFisica,
  criarPessoaJuridica,
} from "@/services/usuariosService";
import "@/assets/css/style.css";
import StatusToast from "@/app/Componentes/StatusToast";
import { useParams } from "next/navigation";

export default function CadastrarUsuario() {
  const { user } = useParams();
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const [form, setForm] = useState({
    nome: "",
    email: "",
    nivel: 1,
    identificacao: "",
  });

  const [tipoDocumento, setTipoDocumento] = useState("CPF");

  const formatarDocumento = (valor) => {
    const numeros = valor.replace(/\D/g, "");

    if (tipoDocumento === "CPF") {
      return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return numeros
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "identificacao") {
      const formatado = formatarDocumento(value);
      setForm({ ...form, identificacao: formatado });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: 0,
      nome: form.nome,
      email: form.email,
      nivel: Number(form.nivel),
      identificacao: form.identificacao,
    };

    try {
      let response;

      if (tipoDocumento === "CPF") {
        response = await criarPessoaFisica(payload);
      } else {
        response = await criarPessoaJuridica(payload);
      }

      setToast({
        status: Number(response?.status) || 200,
        message: "Usuário cadastrado com sucesso!",
      });

      setForm({
        nome: "",
        email: "",
        nivel: 1,
        identificacao: "",
      });

    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || "Erro ao cadastrar usuário";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao cadastrar:", mensagemErro);
    }
  };

  return (
    <div className="container-form">
      <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      <div className="card-form">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label><strong>Nome do usuário:</strong></label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome"
              required
            />
          </div>

          <div className="form-group">
            <label><strong>Nível:</strong></label>
            <select
              name="nivel"
              value={form.nivel}
              onChange={handleChange}
            >
              <option value={1}>Administrador</option>
              <option value={2}>Engenheiro</option>
              <option value={3}>Cliente</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><strong>Tipo de documento:</strong></label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
              >
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <strong>{tipoDocumento === "CPF" ? "CPF:" : "CNPJ:"}</strong>
              </label>
              <input
                type="text"
                name="identificacao"
                value={form.identificacao}
                onChange={handleChange}
                placeholder={
                  tipoDocumento === "CPF"
                    ? "000.000.000-00"
                    : "00.000.000/0000-00"
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Cadastrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}