import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import googleIcon from "../assets/google.png";
import { useAuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { user, signinWithGoogle } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
  if (user) return <Spinner />;
  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signinWithGoogle();
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center h-[100vh] p-4 ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your number below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Phone number</Label>
                <Input
                  id="email"
                  type="tel"
                  placeholder="XXXXXXXXXX"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Enter OTP</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            id="sign-in-button"
            className="w-full"
            disabled={loading}
          >
            Sign in
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading && <Spinner />}
            <img src={googleIcon} alt="" height={16} width={16} />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
