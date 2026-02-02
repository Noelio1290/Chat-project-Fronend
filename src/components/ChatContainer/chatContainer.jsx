import React from "react";
import styled from "styled-components";
import ChatInput from "../ChatInput/chatInput.jsx";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChatContainer = ({ currentChat }) => {
  const navigate = useNavigate();
  // Función temporal para cerrar sesión
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Función que recibirá el mensaje del Input
  const handleSendMsg = async (msg) => {
    // Aquí conectaremos con el Backend pronto
    alert(`Mensaje enviado: ${msg}`); 
  };

  if(!currentChat) {
    return (
      <Container>
        <h3 style={{ color: "white" }}>Cargando chat...</h3>
      </Container>
    )
  }

  return (
    <Container>
      {/* Encabezado del Chat */}
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${currentChat.name}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.name} {currentChat.lastName}</h3>
          </div>
        </div>
        <div className="logout">
            <IoLogOutOutline onClick={handleLogout} />
        </div>
      </div>

      {/* Área de Mensajes (Vacia por ahora) */}
      <div className="chat-messages">
        {/* Aquí aparecerán los mensajes */}
      </div>

      {/* Input de Texto */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%; /* Header - Mensajes - Input */
  gap: 0.1rem;
  overflow: hidden;
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    border-bottom: 1px solid #ffd70050; 
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .logout {
        svg {
            font-size: 1.5rem;
            color: #c0c0c0;
            cursor: pointer;
            &:hover {
                color: #ffd700;
            }
        }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    color: white;
    /* Scrollbar */
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;

export default ChatContainer;
