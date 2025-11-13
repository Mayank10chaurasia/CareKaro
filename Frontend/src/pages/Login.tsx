import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import useTimer from "@/hooks/useTimer";
import { useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import googleIcon from "../assets/google.png";
import { useAuthContext } from "../contexts/AuthContext";
export default function Login() {
  const {
    user,
    signinWithGoogle,
    signInWithPhone,
    sendOTP,
    otpSent,
    verifyRecaptcha,
  } = useAuthContext();
  const { minutes, seconds, isRunning, timer, reset } = useTimer(30);
  const [loadingPhone, setLoadingPhone] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    verifyRecaptcha();
  }, [verifyRecaptcha]);
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
  if (user) return <Spinner />;
  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    await signinWithGoogle();
    setLoadingGoogle(false);
  };
  const handleChange = (phone: string | undefined) => {
    console.log(phone);
    setPhone(phone || "");
  };

  const handleValidation = () => {
    if (!phone) {
      toast.error("Please enter a phone number");
      return false;
    } else if (!isValidPhoneNumber(phone)) {
      toast.error("Invalid phone number format");
      return false;
    } else {
      toast.success("Valid phone number ");
      return true;
    }
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    if (sendingOtp) return;
    try {
      setSendingOtp(true);
      await sendOTP(phone);
      reset();
      toast.success("OTP sent!");
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handlePhoneSignin = async (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Invalid OTP");
      return;
    }
    setLoadingPhone(true);
    await signInWithPhone(otp);
    setLoadingPhone(false);
    setOtp("");
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor="phn">Enter a phone number</Label>
                  </div>
                  <Button
                    variant="link"
                    onClick={handleSendOtp}
                    id="send-otp-button"
                    disabled={
                      loadingPhone || loadingGoogle || timer > 0 || sendingOtp
                    }
                    className="p-0 h-1"
                  >
                    {sendingOtp
                      ? "Sending..."
                      : timer > 0
                      ? `Resend in ${seconds}s`
                      : "Send OTP"}
                  </Button>
                </div>
                <PhoneInput
                  disabled={loadingPhone || loadingGoogle}
                  defaultCountry="IN"
                  onChange={handleChange}
                  value={phone}
                  id="phone-input"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Enter OTP</Label>
                </div>
                <InputOTP
                  maxLength={6}
                  disabled={!otpSent}
                  onChange={(value) => {
                    console.log(value);
                    setOtp(value);
                  }}
                  value={otp}
                >
                  <InputOTPGroup className="w-full justify-center">
                    <InputOTPSlot index={0} className="w-full" />
                    <InputOTPSlot index={1} className="w-full" />
                    <InputOTPSlot index={2} className="w-full" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="w-full justify-center">
                    <InputOTPSlot index={3} className="w-full" />
                    <InputOTPSlot index={4} className="w-full" />
                    <InputOTPSlot index={5} className="w-full" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            id="sign-in-button"
            className="w-full cursor-pointer"
            disabled={!otpSent || loadingGoogle || loadingPhone}
            onClick={handlePhoneSignin}
          >
            {loadingPhone && <Spinner />}
            {loadingPhone ? "Signing in..." : "Sign in"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loadingPhone || loadingGoogle}
          >
            {loadingGoogle && <Spinner />}
            <img src={googleIcon} alt="" height={16} width={16} />
            {loadingGoogle ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
