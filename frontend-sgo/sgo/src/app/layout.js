"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/statusToast.module.css";

import LayoutLateral from "./layoutLateral";
import LayoutSuperior from "./layoutSuperior";
import LayoutRodape from "./layoutRodape";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [menuAtivo, setMenuAtivo] = useState("Usuários");

  return (
    <html lang="pt-br">
      <body>
        <div className="d-flex layout-container">
          
          <LayoutLateral 
            menuAtivo={menuAtivo} 
            setMenuAtivo={setMenuAtivo} 
          />

          <div className="flex-grow-1 d-flex flex-column">
            <LayoutSuperior menuAtivo={menuAtivo} />

            <main className="p-4 flex-grow-1">
              {children}
            </main>

            <LayoutRodape />
          </div>

        </div>
      </body>
    </html>
  );
}