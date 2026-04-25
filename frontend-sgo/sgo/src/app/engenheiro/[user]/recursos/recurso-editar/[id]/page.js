"use client"

import { useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { atualizarRecurso, buscarRecursoPorId } from "@/services/recursosService";
import StatusToast from "@/app/Componentes/StatusToast";


export default function CadastrarRecurso() {
    const [toast, setToast] = useState({
        status: null,
        message: "",
    });

    const{ user } = useParams();
    const { id } = useParams();
    const [form, setForm] = useState({
    descricao: "",
    tipo: ""
    });

    const router = useRouter();

    useEffect(() => {
        async function carregarDados() {
          try {
            const recurso = (await buscarRecursoPorId(id)).data;
    
            setForm({
                descricao: recurso.descricao,
                tipo: recurso.tipo
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


        const payload = {
        idRecurso: Number(id),
        descricao: form.descricao,
        tipo: form.tipo
        };

        await atualizarRecurso(payload);

        setToast({
            status: 200,
            message: "Recurso atualizado com sucesso!",
        });

        setTimeout(() => {
            router.push(`/engenheiro/${user}/recursos`);
        }, 3000);
    } catch (error) {
        const mensagemErro = error.response?.data?.mensagem || "Erro ao atualizar recurso";
        const statusErro = Number(error.response?.data?.status) || 500;

        setToast({
            status: statusErro,
            message: mensagemErro,
        });
        console.error("Erro ao atualizar:", mensagemErro);
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
            value={form.descricao}
            placeholder="Nome do recurso"
            onChange={handleChange}
            />
        </div>

        <div className="campo">
        <label>Tipo:</label>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
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
            Salvar
            </button>
        </div>

        </div>
    </div>
    );
}