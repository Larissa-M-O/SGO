"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { login } from "@/services/loginService";

import "@/assets/css/login.css";

export default function Login() {

  const router = useRouter();

  const [usuario, setUsuario] = useState("");

  const [senha, setSenha] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response =
        await login(usuario, senha);

      const token = response.data.token;

      // salva token
      localStorage.setItem("token", token);

      // decodifica token
      const decoded = jwtDecode(token);

      console.log(decoded);

      // pega nivel
      const nivel = decoded.nivel;

      // redireciona conforme nível
      if(nivel === 1){
        router.push(`/administrador/${decoded.id}`);
      }
      else if(nivel === 2){
        router.push(`/engenheiro/${decoded.id}`);
      }
      else if(nivel === 3){
        router.push(`/cliente/${decoded.id}`);
      
      }

    } catch(error) {

      console.log(error);

      alert("Usuário ou senha inválidos");
    }
  }

  return (

    <div className="login-container">

      <div className="login-card">

        <div className="logo-area">

          <h1>SGO</h1>

          <p>Sistema Gerenciador de Obras</p>

        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="input-group">

            <label>Usuário</label>

            <input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
            />
          </div>

          <div className="input-group">

            <label>Senha</label>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Entrar
          </button>

          <div className="register-link">
            <a href="/cadastro">Criar cadastro</a>
          </div>

        </form>

      </div>

    </div>
  );
}