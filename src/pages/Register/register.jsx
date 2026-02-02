import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  
  // Estado para guardar los datos del formulario
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    maternalLastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Configuración de las alertas visuales
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Validaciones antes de enviar al servidor
  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.", toastOptions);
      return false;
    } else if (name.length < 2) {
      toast.error("El nombre debe tener al menos 2 caracteres.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("El correo es obligatorio.", toastOptions);
      return false;
    }
    return true;
  };

  // Envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { name, lastName, maternalLastName, email, password } = values;
      
      // Llamada a la API (Backend)
      const { data } = await axios.post(registerRoute, {
        name,
        lastName,
        maternalLastName,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // Guardamos el usuario en el navegador
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/"); // Redirigimos al chat
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>SupportLive</h1>
          </div>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Apellido Paterno"
            name="lastName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Apellido Materno"
            name="maternalLastName"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Crear Usuario</button>
          <span>
            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

// Estilos CSS dentro de JS (Styled Components)
const FormContainer = styled.div`
  height: 97vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  .form {
    display: flex;

  }
  .brand {
    display: flex;
    align-items: center;
    color: white;
    text-transform: uppercase;
    justify-content: center;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 85vh;
    flex-direction: column;
    gap: 1rem;
    background-color: #4f4f4fb2;
    border-radius: 20px;
    input {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      size: 15px;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 80%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;