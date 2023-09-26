import React from "react";
import Container from "../components/Container";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <div className="pt-28">
      <Container>
        <p className="py-2 text-lg font-bold">Register</p>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default page;
