import { useState } from 'react';
import {
  BellAlertIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  HeartIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import MemberCard from '../components/dashboard/MemberCard';
import MemberDetails from '../components/dashboard/MemberDetails';
import SummaryCard from '../components/dashboard/SummaryCard';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

const dashboardExample = {
  familia: { nombre: 'Familia García' },
  integrantes: [
    {
      id: 1,
      nombre: 'Ana García López',
      parentesco: 'Titular',
      edad: 38,
      tipoSangre: 'O POSITIVO',
      fechaNacimiento: '12 de marzo de 1988',
      telefono: '55 1234 5678',
      estado: 'Sin pendientes',
      alertas: 0,
    },
    {
      id: 2,
      nombre: 'Carlos García López',
      parentesco: 'Hijo',
      edad: 12,
      tipoSangre: 'A POSITIVO',
      fechaNacimiento: '8 de julio de 2013',
      telefono: '',
      estado: 'Consulta próxima',
      alertas: 1,
    },
    {
      id: 3,
      nombre: 'Sofía García López',
      parentesco: 'Hija',
      edad: 8,
      tipoSangre: 'SIN DEFINIR',
      fechaNacimiento: '21 de noviembre de 2017',
      telefono: '',
      estado: 'Sin pendientes',
      alertas: 0,
    },
  ],
  resumen: {
    integrantes: 3,
    consultas: 2,
    medicamentos: 5,
    alertas: 1,
  },
};

function DashboardPage() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  // API DEL DASHBOARD:
  // Sustituye dashboardExample por:
  // const data = await getDashboardData();
  // La respuesta debe alimentar resumen, familia e integrantes.
  const dashboard = dashboardExample;

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] lg:pl-72">
      <DashboardSidebar familyName={dashboard.familia.nombre} onLogout={handleLogout} />
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#15919a]">Panel principal</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#19304a]">
              Hola, {dashboard.familia.nombre}
            </h1>
            <p className="mt-2 text-slate-500">Aquí tienes un resumen del cuidado de tu familia.</p>
          </div>
          <button type="button" className="btn border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]">
            <PlusIcon className="size-5" aria-hidden="true" /> Agregar integrante
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumen familiar">
          <SummaryCard icon={<HeartIcon className="size-6" />} label="Integrantes" value={dashboard.resumen.integrantes} description="Personas en tu familia" />
          <SummaryCard icon={<CalendarDaysIcon className="size-6" />} label="Consultas" value={dashboard.resumen.consultas} description="Próximas o pendientes" tone="blue" />
          <SummaryCard icon={<CubeIcon className="size-6" />} label="Medicamentos" value={dashboard.resumen.medicamentos} description="Registrados actualmente" tone="orange" />
          <SummaryCard icon={<BellAlertIcon className="size-6" />} label="Alertas" value={dashboard.resumen.alertas} description="Requieren tu atención" tone="red" />
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#19304a]">Integrantes de la familia</h2>
              <p className="mt-1 text-sm text-slate-500">Selecciona una persona para consultar sus datos.</p>
            </div>
            <ClipboardDocumentListIcon className="size-7 text-[#15919a]" aria-hidden="true" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {dashboard.integrantes.map((member) => (
              <MemberCard key={member.id} member={member} onSelect={setSelectedMember} />
            ))}
          </div>
        </section>
      </div>
      <MemberDetails member={selectedMember} onClose={() => setSelectedMember(null)} />
    </main>
  );
}

export default DashboardPage;
