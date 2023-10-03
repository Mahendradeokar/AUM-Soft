import { ThemeToggle } from "@/components/Theme";
import LoginForm from "@/components/auth/LoginForm";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Singup = () => {
  return (
    <Container className="flex justify-center items-center h-screen">
      <div className="fixed top-5 right-5">
        <ThemeToggle />
      </div>
      <Card className="min-w-[30rem]">
        <CardHeader>
          <CardTitle className="text-center">Singup</CardTitle>
        </CardHeader>
        <LoginForm />
      </Card>
    </Container>
  );
};

export default Singup;
