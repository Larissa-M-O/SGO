"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarUsuarioId, atualizarPessoaFisica, atualizarPessoaJuridica,} from "@/services/usuariosService";
import StatusToast from "@/app/Componentes/StatusToast";

import "@/assets/css/style.css";

export default function UsuarioEditar() {
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    nome: "",
    email: "",
    nivel: 3,
    identificacao: "",
  });

  useEffect(() => {
    async function carregar() {
      try {
        const response = await buscarUsuarioId(id);
        const user = response.data;

        setForm({
          id: user.id,
          nome: user.nome,
          email: user.email,
          nivel: user.nivel,
          identificacao: user.identificacao,
        });
      } catch (error) {
        console.error("Erro ao buscar:", error);
      }
    }

    if (id) carregar();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    id: Number(form.id),
    nome: form.nome,
    email: form.email,
    nivel: Number(form.nivel),
    identificacao: form.identificacao,
  };

  console.log("Payload enviado1:", payload);

  try {
    const documento = form.identificacao.replace(/\D/g, "");
    const isCNPJ = documento.length > 11;

    if (isCNPJ) {
      await atualizarPessoaJuridica(payload);
    } else {
      await atualizarPessoaFisica(payload);
    }

    setToast({
      status: 200,
      message: "Usuário atualizado com sucesso!",
    });

    setTimeout(() => {
      router.push(`/usuarios/usuario-visualizar/${form.id}`);
    }, 3000);
  } catch (error) {
    const mensagemErro = error.response?.data?.mensagem || "Erro ao editar usuário";
    const statusErro = Number(error.response?.data?.status) || 500;

    setToast({
      status: statusErro,
      message: mensagemErro,
    });
    console.error("Erro ao editar:", mensagemErro);
  }
}

  return (
    <div className="container-form">
      <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      <form className="card-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Nome do usuário:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />
        </div>

        <hr />

        <div className="form-group">
          <label>Nível:</label>
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

        <hr />

        {/* 🔹 Documento só leitura */}
        <div className="form-group">
          <label>Documento de identificação:</label>
          <input
            type="text"
            value={form.identificacao}
            disabled
          />
        </div>

        <hr />

        <div className="linha">
          <div style={{ width: "60%" }}>
            <label>Email:</label>
            <br></br>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="area-botao">
            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}