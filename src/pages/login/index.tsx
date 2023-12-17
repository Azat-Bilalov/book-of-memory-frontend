import React from "react";
import { LoginForm } from "@/features/auth/login-form";

const LoginPage: React.FC = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1>Вход</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
