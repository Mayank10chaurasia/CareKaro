import { Spinner } from "@/components/ui/spinner.tsx";
import {
  signOut as firebaseSignOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { auth, googleAuthProvider } from "../services/firebase.ts";
const AuthContext = createContext(null);
export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  async function verifyRecaptcha() {
    if (!window.recaptchaVerifier) {
      console.log("verify recap");
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-verifier",
        {
          size: "invisible",
          callback: async (response) => {
            toast.success("reCAPTCHA verified!");
          },
          "expired-callback": () => {
            toast.error("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  }
  async function sendOTP(phoneNumber) {
    try {
      setOtpSent(false);
      verifyRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      console.log(confirmationResult);
      setOtpSent(true);
      toast.success("OTP sent");
      window.confirmationResult = confirmationResult;
    } catch (error) {
      console.log(error.message);
      console.log(error.code);

      //sms not sent
      setOtpSent(false);
      toast.error(error.code);
      throw new Error(error.code);
    }
  }
  async function signInWithPhone(code: string) {
    setOtpSent(false);
    const confirmResult = window.confirmationResult;
    try {
      const userCredential = await confirmResult.confirm(code);
      toast.success("Sign in succcessful");
    } catch (error) {
      setOtpSent(true);
      toast.error("Incorrect OTP");
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Firebase auth state changed:", user);
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      console.log("✅ Logged in user:", user);
      setUser(user);
      toast.success("Sign in successfull");
      // You can access user.displayName, user.email, user.photoURL
    } catch (error) {
      toast.error("Sign in failed");

      setUser(null);
      console.error("❌ Login error:", error);
    }
  };
  async function signOut() {
    try {
      await firebaseSignOut(auth);
      console.log("🚪 User signed out");
      setUser(null);
      toast.success("Signed out");
    } catch (error) {
      toast.error("Error signing out");
      console.error("❌ Sign-out error:", error);
    }
  }
  const value = {
    user,
    signinWithGoogle,
    setUser,
    signOut,
    signInWithPhone,
    sendOTP,
    otpSent,
    setOtpSent,
    verifyRecaptcha,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center gap-4 h-screen">
          <Spinner />
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
