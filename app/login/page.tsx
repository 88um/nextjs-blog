import getCurrentUser from "@/actions/current-user";
import AuthForm from "@/components/forms/AuthForm";
import NotFound from "../not-found";

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = async ({}) => {
  const user = await getCurrentUser();
  if (user){
    return <NotFound/>
  }
  return (
    <div className="container mx-auto lg:px-20 p-4">
        <AuthForm/>
    </div>
  );
};

export default LoginPage;