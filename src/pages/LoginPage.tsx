import { useState } from 'react';
import { authStore } from '../stores/authStore';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
const LoginPage = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (authStore.isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    setErrorMsg('Введите корректный email, только латинские буквы');
    return;
  }

  const success = await authStore.login(email, password);
  if (!success) {
    setErrorMsg('Неверный логин или пароль');
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Вход</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => {
            const value = e.target.value;
  // eslint-disable-next-line no-control-regex
            if (/^[\x00-\x7F]*$/.test(value)) { // ASCII only
            setEmail(value);}
            }}
          className="w-full border p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-3"
        />
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Войти
        </button>
      </div>
    </div>
  );
});

export default LoginPage;
