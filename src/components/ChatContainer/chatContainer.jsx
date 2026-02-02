import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "../ChatInput/chatInput.jsx";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { sendMessageRoute, getAllMessageRoute } from "../../utils/APIRoutes.js";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Aquí guardamos los mensajes
  const scrollRef = useRef(); // Para el autoscroll

  // 1. CARGAR MENSAJES: Cada vez que cambiamos de chat, traemos el historial
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchMessages();
  }, [currentChat]);

  // 2. ENVIAR MENSAJE
  const handleSendMsg = async (msg) => {
    // A) Enviar al Backend
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    // B) Actualizar la vista inmediatamente (sin recargar)
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // 3. LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 4. AUTO-SCROLL: Cada vez que llega un mensaje, bajamos la vista
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Blindaje por si no ha cargado el chat
  if (!currentChat) return null;

  return (
    <Container>
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

      <div className="chat-messages">
        {/* Mapeamos los mensajes */}
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
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
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    /* ESTILOS BLACK & GOLD PARA MENSAJES */
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #ffd700; /* Dorado */
        color: black; /* Texto Negro */
        border-bottom-right-radius: 0.2rem; /* Efecto burbuja */
        font-weight: 500;
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #333333; /* Gris Oscuro */
        color: white; /* Texto Blanco */
        border-bottom-left-radius: 0.2rem;
      }
    }
  }
`;
