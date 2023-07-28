import React from "react";
import Container from "../components/Container";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <Container>
      <div className="pt-28 ">
        <p className="py-2 text-lg font-bold">Register</p>
        <RegisterForm />
      </div>
    </Container>
  );
};

export default page;
