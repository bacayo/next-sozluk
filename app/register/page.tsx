import React from "react";
import Container from "../components/Container";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <Container>
      <p className="py-2 text-lg font-bold">Register</p>
      <RegisterForm />
    </Container>
  );
};

export default page;
