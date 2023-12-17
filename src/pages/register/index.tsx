import React from "react";
import { RegisterForm } from "@/features/auth/register-form";

const RegisterPage: React.FC = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1>Регистрация</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
