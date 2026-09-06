import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name);
    navigate("/claims");
  };

  return (
    <div className="grid max-w-sm gap-1.5">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
      <Label htmlFor="name" className="text-foreground">Your name</Label>
      <Input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Juan dela Cruz"
      />
      <Button
        onClick={handleLogin}
        disabled={name === ""}
        className="mt-3 justify-self-start"
      >
        Log In
      </Button>
    </div>
  );
}

export default LoginPage;