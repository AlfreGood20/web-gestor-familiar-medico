import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon, ArrowRightIcon, AtSymbolIcon, CalendarDaysIcon,
  EyeIcon, EyeSlashIcon, HeartIcon, LockClosedIcon, MapPinIcon,
  PhoneIcon, UserIcon,
} from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import toast from 'react-hot-toast';
import { postRegistro } from '../services/authService';

const initialRegistrationData = {
  nombre: '', apellidoPaterno: '', apellidoMaterno: '', fechaNacimiento: '',
  sexo: '', correo: '', telefono: '', contrasena: '',
  familia: { nombre: '', direccion: '' },
};

function RegisterPage() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState(initialRegistrationData);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const normalizedValue = name === 'telefono'
      ? value.replace(/\D/g, '').slice(0, 20)
      : value;

    if (name.startsWith('familia.')) {
      const field = name.split('.')[1];
      setRegistrationData((current) => ({ ...current, familia: { ...current.familia, [field]: normalizedValue } }));
    } else {
      setRegistrationData((current) => ({ ...current, [name]: normalizedValue }));
    }
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (registrationData.fechaNacimiento > '2016-12-31') {
      toast.error('La fecha de nacimiento debe ser de 2016 o anterior.');
      return;
    }
    
    try{
      await toast.promise(postRegistro(registrationData), {
        loading: 'Validando datos...',
        success: '¡Registro exitoso!',
        error: 'Ocurrió un error',
      });
      navigate('/', { replace: true });
    }catch(error){
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <AuthLayout wide>
      <Link className="mb-7 inline-flex items-center gap-1.5 text-xs font-bold text-[#126f7b] hover:underline" to="/">
        <ArrowLeftIcon className="size-4" aria-hidden="true" /> Volver al inicio de sesión
      </Link>
      <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.13em] text-[#15919a]">Crea tu cuenta</span>
      <h2 className="text-4xl font-bold tracking-tight text-[#19304a]">Registro familiar</h2>
      <p className="mb-8 mt-2.5 leading-6 text-slate-500">Registra tus datos y los de tu familia para comenzar.</p>

      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Nombre" id="nombre" icon={<UserIcon />} value={registrationData.nombre} onChange={handleChange} placeholder="Tu nombre" />
          <Field label="Apellido paterno" id="apellidoPaterno" value={registrationData.apellidoPaterno} onChange={handleChange} placeholder="Apellido paterno" />
          <Field label="Apellido materno" id="apellidoMaterno" value={registrationData.apellidoMaterno} onChange={handleChange} placeholder="Apellido materno" />
          <Field label="Fecha de nacimiento" id="fechaNacimiento" type="date" icon={<CalendarDaysIcon />} value={registrationData.fechaNacimiento} onChange={handleChange} max="2016-12-31" />
          <div>
            <label className="label px-0 pb-1.5" htmlFor="sexo"><span className="label-text font-bold text-[#29425d]">Sexo</span></label>
            <select className="select select-bordered mb-4 w-full bg-white focus:outline-[#15919a]" id="sexo" name="sexo" value={registrationData.sexo} onChange={handleChange} required>
              <option value="">Selecciona una opción</option><option value="MASCULINO">Masculino</option><option value="FEMENINO">Femenino</option>
            </select>
          </div>
          <Field label="Teléfono" id="telefono" type="tel" icon={<PhoneIcon />} value={registrationData.telefono} onChange={handleChange} placeholder="55 1234 5678" maxLength="20" inputMode="numeric" />
        </div>
        <Field label="Correo electrónico" id="correo" type="email" icon={<AtSymbolIcon />} value={registrationData.correo} onChange={handleChange} placeholder="tu@correo.com" />
        <Field label="Contraseña" id="contrasena" type={showPassword ? 'text' : 'password'} icon={<LockClosedIcon />} value={registrationData.contrasena} onChange={handleChange} placeholder="Mínimo 6 caracteres" minLength="6" togglePassword showPassword={showPassword} setShowPassword={setShowPassword} />

        <div className="my-4 flex items-center gap-2 rounded-xl bg-[#eaf8f5] p-3">
          <HeartIcon className="size-5 shrink-0 text-[#15919a]" aria-hidden="true" />
          <div><h3 className="text-sm font-bold text-[#126f7b]">Información de tu familia</h3><p className="text-xs text-[#62838a]">Estos datos ayudan a organizar tu grupo familiar.</p></div>
        </div>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Nombre de la familia" id="familia.nombre" value={registrationData.familia.nombre} onChange={handleChange} placeholder="Familia García" />
          <Field label="Dirección" id="familia.direccion" icon={<MapPinIcon />} value={registrationData.familia.direccion} onChange={handleChange} placeholder="Dirección familiar" />
        </div>
        <button className="btn mt-3 w-full border-0 bg-[#126f7b] text-white shadow-lg shadow-[#126f7b]/20 hover:bg-[#0b5d69]" type="submit">Crear mi cuenta <ArrowRightIcon className="size-5" aria-hidden="true" /></button>
      </form>
      {message && <p className="alert mt-3 border-0 bg-[#e0f5ef] p-3 text-xs text-[#176b67]" role="status">{message}</p>}
    </AuthLayout>
  );
}

function Field({ label, id, icon, type = 'text', value, onChange, placeholder, minLength, max, maxLength, inputMode, togglePassword, showPassword, setShowPassword }) {
  return (
    <div>
      <label className="label px-0 pb-1.5" htmlFor={id}><span className="label-text font-bold text-[#29425d]">{label}</span></label>
      <label className="input input-bordered mb-4 flex w-full items-center gap-2 bg-white focus-within:outline-[#15919a]">
        {icon && <span className="text-[#15919a] [&>svg]:size-5"><span aria-hidden="true">{icon}</span></span>}
        <input id={id} name={id} type={type} className="grow" value={value} onChange={onChange} placeholder={placeholder} minLength={minLength} max={max} maxLength={maxLength} inputMode={inputMode} required />
        {togglePassword && <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-[#126f7b] hover:underline" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword}>
          {showPassword ? <EyeSlashIcon className="size-4" aria-hidden="true" /> : <EyeIcon className="size-4" aria-hidden="true" />}{showPassword ? 'Ocultar' : 'Ver'}
        </button>}
      </label>
    </div>
  );
}

export default RegisterPage;
