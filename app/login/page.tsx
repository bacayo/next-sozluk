import Container from "../components/Container";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  return (
    <Container>
      <p className="py-2 font-bold">Login</p>
      <LoginForm />
      {/* </div> */}
    </Container>
  );
};

export default LoginPage;
