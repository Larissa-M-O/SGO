"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { buscarUsuarioId, deletarPessoa } from "@/services/usuariosService";
import StatusToast from "@/app/Componentes/StatusToast";
import "@/assets/css/style.css";

export default function UsuarioVisualizar() {
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const router = useRouter();

  const { id } = useParams();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await buscarUsuarioId(id);
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    if (id) carregarUsuario();
  }, [id]);

  function traduzirNivel(nivel) {
    switch (nivel) {
      case 1:
        return "Administrador";
      case 2:
        return "Engenheiro";
      case 3:
        return "Cliente";
      default:
        return "Desconhecido";
    }
  }

  async function handleExcluir() {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deletarPessoa(id);
      setToast({
        status: 201,
        message: "Usuário removido com sucesso!",
      });

      setTimeout(() => {
        router.push("/usuarios");
      }, 3000);
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || "Erro ao remover usuário";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao remover:", mensagemErro);
    }
  }

  function handleEditar() {
  router.push(`/usuarios/usuario-editar/${id}`);
}

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div className="container-visualizar">
      <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      <div className="card-usuario">
        
        <div className="linha">
          <div>
            <span>Código de usuário:</span>
            <h2>{usuario.id}</h2>
          </div>

          <div>
            <span>Nome do usuário:</span>
            <p>{usuario.nome}</p>
          </div>
        </div>

        <hr />

        <div className="linha">
          <div>
            <span>Email:</span>
            <p>{usuario.email}</p>
          </div>

          <div>
            <span>Documento de identificação:</span>
            <p>{usuario.identificacao}</p>
          </div>
        </div>

        <hr />

        <div className="linha">
          <div>
            <span>Nível:</span>
            <p>{traduzirNivel(usuario.nivel)}</p>
          </div>
        </div>

        <hr />

        <div className="botoes">
          <button className="btn-remover" onClick={handleExcluir}>
            Remover
          </button>

          <button className="btn-editar" onClick={handleEditar}>
            Alterar
          </button>
        </div>

      </div>
    </div>
  );
}