import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import toast from 'react-hot-toast';
import {postLogin} from '../services/authService'

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ correo: '', contrasena: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  // CONSUMO DE LA API
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await toast.promise(postLogin(credentials), {
        loading: 'Comprobando credenciales...',
        success: '¡Login exitoso, Bienvenido!',
        error: 'Credenciales incorrectas',
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <AuthLayout>
      <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.13em] text-[#15919a]">Bienvenido de vuelta</span>
      <h2 className="text-4xl font-bold tracking-tight text-[#19304a]">Inicia sesión</h2>
      <p className="mb-8 mt-2.5 leading-6 text-slate-500">Ingresa tus datos para continuar con el cuidado de tu familia.</p>
      <form onSubmit={handleSubmit} className="space-y-1">
        <label className="label px-0 pb-1.5" htmlFor="email"><span className="label-text font-bold text-[#29425d]">Correo electrónico</span></label>
        <label className="input input-bordered flex w-full items-center gap-2 bg-white focus-within:outline-[#15919a]">
          <AtSymbolIcon className="size-5 shrink-0 text-[#15919a]" aria-hidden="true" />
          <input id="correo" name="correo" type="email" className="grow" value={credentials.correo} onChange={handleChange} placeholder="tu@correo.com" autoComplete="email" required />
        </label>

        <div className="flex items-center justify-between pt-2">
          <label className="label px-0 pb-1.5" htmlFor="password"><span className="label-text font-bold text-[#29425d]">Contraseña</span></label>
          <button type="button" className="mb-1.5 text-xs font-bold text-[#15919a] hover:underline">¿Olvidaste tu contraseña?</button>
        </div>
        <label className="input input-bordered flex w-full items-center gap-2 bg-white focus-within:outline-[#15919a]">
          <LockClosedIcon className="size-5 shrink-0 text-[#15919a]" aria-hidden="true" />
          <input id="contrasena" name="contrasena" type={showPassword ? 'text' : 'password'} className="grow" value={credentials.contrasena} onChange={handleChange} placeholder="Ingresa tu contraseña" autoComplete="current-password" minLength="6" required />
          <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-[#126f7b] hover:underline" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword}>
            {showPassword ? <EyeSlashIcon className="size-4" aria-hidden="true" /> : <EyeIcon className="size-4" aria-hidden="true" />}
            {showPassword ? 'Ocultar' : 'Ver'}
          </button>
        </label>

        <label className="label mt-2 cursor-pointer justify-start gap-2 px-0">
          <input type="checkbox" className="checkbox checkbox-sm [--chkbg:#15919a] [--chkfg:white]" />
          <span className="label-text text-xs text-slate-500">Recordarme en este dispositivo</span>
        </label>
        <button className="btn mt-3 w-full border-0 bg-[#126f7b] text-white shadow-lg shadow-[#126f7b]/20 hover:bg-[#0b5d69]" type="submit">
          Entrar a mi cuenta <ArrowRightIcon className="size-5" aria-hidden="true" />
        </button>
      </form>
      <div className="divider my-6 text-xs text-slate-400">¿Aún no tienes una cuenta?</div>
      <Link className="btn btn-outline h-11 w-full border-[#b8d8d7] text-[#126f7b] hover:border-[#126f7b] hover:bg-[#eaf8f5]" to="/registrarme">Registrarme gratis</Link>
    </AuthLayout>
  );
}

export default LoginPage;
