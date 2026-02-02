import React, { useState, useEffect } from "react";
import styled from "styled-components";

  const Contacts =({ contacts = [], currentUser, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  // Eliminamos el estado de imagen separado para simplificar, usaremos currentUser directamente si queremos
  
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.name);
    };
  }, [currentUser, setCurrentUserName]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // --- SOLUCIÓN: RETORNO TEMPRANO ---
  // Si currentUserName o currentUser no existen, devolvemos null aquí mismo.
  // Esto evita tener que poner llaves gigantes en el return de abajo.
  if (!currentUserName || !currentUser) {
    return null; 
  }

  // Si el código llega aquí, es porque TODO existe. Pintamos sin miedo.
  return (
    <Container>
      <div className="brand">
        <h3>SupportLive</h3>
      </div>
      
      <div className="contacts">
        {/* Mapeamos la lista de contactos */}
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${index === currentSelected ? "selected" : ""}`}
              key={index}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${contact.firstName}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{contact.name} {contact.lastName}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="current-user">
        <div className="avatar">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${currentUserName}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{`${currentUserName}`}</h2>
        </div>
      </div>
    </Container>
  );
}

// Los estilos se mantienen igual (Black & Gold)
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  border-right: 1px solid #ffd70050;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: #ffd700;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
    .contact {
      background-color: #ffffff20;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #c0c0c0;
        }
      }
    }
    .selected {
      background-color: #ffd700;
      .username {
        h3 {
          color: black;
          font-weight: bold;
        }
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-top: 1px solid #ffd70050;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts