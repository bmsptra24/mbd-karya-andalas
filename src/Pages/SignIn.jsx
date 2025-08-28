import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { signIn } from '../Store/Firebase';
import { auth } from '../Store/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeePassword, setIsSeePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  // Use a custom message box instead of alert()
  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000); // Hide after 3 seconds
  };

  const handleLogin = async () => {
    if (password === '') {
      showErrorMessage('Password tidak boleh kosong!');
      return;
    }
    await signIn(email, password);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 bg-gray-900 bg-opacity-70">
      {/* Background with a subtle gradient and pattern */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400"></div>

      {/* Glassy card container */}
      <div className="relative z-10 w-full max-w-md p-8 overflow-hidden transition-all duration-300 transform bg-white border border-white rounded-3xl backdrop-blur-xl bg-opacity-10 shadow-2xl hover:shadow-3xl">
        <div className="flex flex-col items-center justify-center p-2 mb-6">
          <p className="text-3xl font-bold text-gray-800">Masuk</p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col space-y-4">
          <input
            type="email"
            className="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-transparent rounded-lg outline-none bg-white/20 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative flex items-center w-full">
            <input
              type={isSeePassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-12 text-gray-800 transition-all duration-200 border border-transparent rounded-lg outline-none bg-white/20 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <button
                className="absolute right-2 p-2 text-gray-800 transition-all duration-200 rounded-full hover:bg-white/20"
                onClick={() => setIsSeePassword((prev) => !prev)}
              >
                {isSeePassword ? <VscEye /> : <VscEyeClosed />}
              </button>
            )}
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="px-4 py-2 text-sm text-center text-red-100 bg-red-500 rounded-lg bg-opacity-20 backdrop-blur-sm">
              {errorMessage}
            </div>
          )}

          <button
            className="w-full py-3 mt-4 text-lg font-semibold text-gray-800 transition-all duration-300 rounded-lg shadow-lg bg-white/20 hover:bg-white/30"
            onClick={handleLogin}
          >
            Masuk
          </button>
        </div>

        {/* Signup link */}
        <div className="flex items-center justify-center mt-6 text-sm">
          <p className="text-gray-800">{"Belum punya akun?"}</p>
          <button
            className="ml-2 font-semibold text-gray-800 transition-all duration-200 hover:text-gray-500"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
