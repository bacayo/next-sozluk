import Container from "../components/Container";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  return (
    <div className="pt-28">
      <Container>
        <p className="py-2 font-bold">Login</p>
        <LoginForm />
        {/* </div> */}
      </Container>
    </div>
  );
};

export default LoginPage;
