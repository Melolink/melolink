
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}
const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={onSwitchToSignup}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
