"use client"
import { useState } from "react";
import { criarRecurso } from "@/services/recursosService";
import StatusToast from "@/app/Componentes/StatusToast";
import { useRouter } from "next/navigation";


export default function CadastrarRecurso() {
  const [toast, setToast] = useState({
    status: null,
    message: "",
  });

  const [form, setForm] = useState({
    descricao: "",
    tipo: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
    
      const payload = {
        idRecurso: 0,
        descricao: form.descricao,
        tipo: form.tipo
      };

      await criarRecurso(payload);

      setToast({
        status: 200,
        message: "Recurso cadastrado com sucesso!",
      });

      setTimeout(() => {
        router.push("/recursos");
      }, 3000);
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || "Erro ao cadastrar recurso";
      const statusErro = Number(error.response?.data?.status) || 500;

      setToast({
        status: statusErro,
        message: mensagemErro,
      });
      console.error("Erro ao cadastrar:", mensagemErro);
    }
  };

  return (
    <div className="container-obra">
    <StatusToast
        status={toast.status}
        message={toast.message}
        onClose={() => setToast({ status: null, message: "" })}
      />
      <div className="card-obra">

        <div className="campo">
          <label>Nome:</label>
          <input
            type="text"
            name="descricao"
            placeholder="Nome do recurso"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
        <label>Tipo:</label>
        <select name="tipo" onChange={handleChange}>
            <option value="">Escolha tipo</option>
            <option value="MATERIAL">
                MATERIAL
            </option>
            <option value="MÃO DE OBRA">
                MÃO DE OBRA
            </option>
        </select>
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