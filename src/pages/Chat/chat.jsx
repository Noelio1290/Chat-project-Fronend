import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../utils/APIRoutes.js";
import Contacts from "../../components/Contacts/contacts.jsx"

function Chat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]); //lista de amigos
  const [currentChat, setCurrentChat] = useState(undefined); //con quien hablo
  const [isLoaded, setIsLoaded] = useState(false); //???


  // 1. SEGURIDAD: Si no hay usuario en localStorage, al Login.
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser( JSON.parse(localStorage.getItem("chat-app-user")) );
        setIsLoaded(true)
      }
    };
    checkUser();
  }, [navigate]);

  // 2. Cargar mis contacto
  useEffect(() => {
    const getContacts = async () => {
      if (currentUser && currentUser._id) {
        //llamo a la api pasando mi ID para que excluya de la lista
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
        console.log(data)
        setContacts(data.data)
      }
    };
    getContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  };



  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />

        {/* Panel Derecho: Lógica de visualización */}
        {isLoaded && currentChat === undefined ? (
          // Si NO has seleccionado a nadie:
          <div className="welcome">
             <h1>Hola, <span>{currentUser?.name}</span>!</h1>
             <h3>Selecciona un chat para comenzar a escribir.</h3>
          </div>
        ) : (
          // Si SÍ has seleccionado a alguien:
          <div className="chat-area">
             {currentChat && (
                <div className="header-placeholder">
                    <h2>Chat con <span style={{color: "#ffd700"}}>{currentChat.name}</span></h2>
                </div>
             )}
          </div>
        )}
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
  background-color: #0d0d0d;
  
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #000000;
    display: grid;
    grid-template-columns: 25% 75%;
    border: 1px solid #ffd700;
    box-shadow: 0 0 20px #ffd70020;
    border-radius: 10px;
    
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    span {
      color: #ffd700;
    }
  }

  .chat-area {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c0c0c0;
  }
`;

export default Chat;