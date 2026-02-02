import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  // 1. SEGURIDAD: Si no hay usuario en localStorage, al Login.
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser( JSON.parse(localStorage.getItem("chat-app-user")).name  );
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <Container>
      <div className="container">
        {/* Aquí irán nuestros componentes pronto (Lista de Contactos y Caja de Chat) */}
        <div className="placeholder-content">
          <h1 className="welcome-text">
            Bienvenido, <span>{currentUser}</span>
          </h1>
          <p>Selecciona un chat para comenzar</p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0d0d0d; /* Negro Profundo (Fondo de pantalla) */
  
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #000000; /* Negro Puro (La caja del chat) */
    display: grid;
    grid-template-columns: 25% 75%; /* Espacio para barra lateral y chat */
    
    /* EL TOQUE DE ORO Y PLATA */
    border: 1px solid #ffd700; /* Borde Dorado Fino */
    box-shadow: 0 0 20px #ffd70020; /* Resplandor dorado suave */
    border-radius: 10px;
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  /* Esto es temporal para que veas algo bonito ahora */
  .placeholder-content {
    grid-column: 1 / span 2; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #c0c0c0; /* Texto Plateado */
    
    .welcome-text {
      font-size: 2rem;
      span {
        color: #ffd700; /* Nombre en Dorado */
        text-transform: capitalize;
      }
    }
  }
`;

export default Chat;