import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { updateData } from '../Store/Database';
import validator from 'validator';
import { auth } from '../Store/Firebase';
import { Configuration } from '../../Configuration';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSeePassword, setIsSeePassword] = useState(false);
  const [isSeeConfirmPassword, setIsSeeConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const auth = getAuth();
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        .then(async () => {
          console.log('User created!');
          await updateData(
            ['users/' + user.uid + '/'],
            Configuration.templateNewUser,
          );
        })
        .catch((error) => {
          console.log(error);
          showErrorMessage('Terjadi kesalahan saat memperbarui profil!');
        });

        await sendEmailVerification(auth.currentUser)
        .then(() => {
          showErrorMessage('Email verifikasi telah dikirim. Cek email Anda sekarang!');
        });

        auth.signOut();
        navigate('/help');
      })
      .catch((error) => {
        const errorCode = error.code;
        showErrorMessage(errorCode);
      });
  };

  const handleSignUp = () => {
    if (!validator.isEmpty(name, { ignore_whitespace: true })) {
      if (validator.isEmail(email)) {
        if (password === confirmPassword) {
          createUser();
        } else {
          showErrorMessage('Cek kembali password Anda!');
        }
      } else {
        showErrorMessage('Email/password salah!');
      }
    } else {
      showErrorMessage('Nama tidak boleh kosong!');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 bg-gray-900 bg-opacity-70">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400"></div>

      <div className="relative z-10 w-full max-w-md p-8 overflow-hidden transition-all duration-300 transform bg-white border border-white rounded-3xl backdrop-blur-xl bg-opacity-10 shadow-2xl hover:shadow-3xl">
        <div className="flex flex-col items-center justify-center p-2 mb-6">
          <p className="text-3xl font-bold text-gray-800">Daftar</p>
        </div>

        {errorMessage && (
          <div className="px-4 py-2 mb-4 text-sm text-center text-red-100 bg-red-500 rounded-lg bg-opacity-20 backdrop-blur-sm">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-transparent rounded-lg outline-none bg-white/20 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <div className="relative flex items-center w-full">
            <input
              type={isSeeConfirmPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 pr-12 text-gray-800 transition-all duration-200 border border-transparent rounded-lg outline-none bg-white/20 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && (
              <button
                className="absolute right-2 p-2 text-gray-800 transition-all duration-200 rounded-full hover:bg-white/20"
                onClick={() => setIsSeeConfirmPassword((prev) => !prev)}
              >
                {isSeeConfirmPassword ? <VscEye /> : <VscEyeClosed />}
              </button>
            )}
          </div>
        </div>

        <button
          className="w-full py-3 mt-4 text-lg font-semibold text-black transition-all duration-300 rounded-lg shadow-lg bg-white/20 hover:bg-white/30"
          onClick={handleSignUp}
        >
          Daftar
        </button>

        <div className="flex items-center justify-center mt-6 text-sm">
          <p className="text-gray-800">{'Saya sudah punya akun!'}</p>
          <button
            className="ml-2 font-semibold text-gray-800 transition-all duration-200 hover:text-gray-500"
            onClick={() => navigate('/signin')}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
