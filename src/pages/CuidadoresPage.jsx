import { useEffect, useState } from 'react';
import { PlusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import CaregiverCard from '../components/cuidadores/CaregiverCard';
import CaregiverForm from '../components/cuidadores/CaregiverForm';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import {
  createCuidador, deleteCuidador, getCuidadores, updateCuidadorEstado,
} from '../services/caregiverService';

const emptyCaregiver = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correo: '',
  telefono: '',
  contrasena: '',
};

function CuidadoresPage() {
  const navigate = useNavigate();
  const [caregivers, setCaregivers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState(emptyCaregiver);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadCaregivers = async () => {
    try {
      setCaregivers(await getCuidadores());
    } catch (error) {
      toast.error('No se pudieron cargar los cuidadores.');
      console.error('Error al cargar cuidadores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    getCuidadores().then((result) => {
      if (!cancelled) setCaregivers(result);
    }).catch((error) => {
      if (!cancelled) {
        toast.error('No se pudieron cargar los cuidadores.');
        console.error('Error al cargar cuidadores:', error);
      }
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createCuidador(formData);
      toast.success('Cuidador creado.');
      setFormVisible(false);
      setFormData(emptyCaregiver);
      await loadCaregivers();
    } catch (error) {
      toast.error('No se pudo crear el cuidador.');
      console.error('Error al crear cuidador:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const askStatusChange = (caregiver) => {
    const nextStatus = caregiver.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    setConfirmation({
      type: 'status',
      id: caregiver.id,
      nextStatus,
      title: nextStatus === 'ACTIVO' ? 'Activar cuidador' : 'Inactivar cuidador',
      message: `¿Seguro que deseas ${nextStatus === 'ACTIVO' ? 'activar' : 'poner como inactivo'} a ${caregiver.nombre}?`,
      confirmLabel: nextStatus === 'ACTIVO' ? 'Activar' : 'Poner inactivo',
      loadingLabel: nextStatus === 'ACTIVO' ? 'Activando...' : 'Actualizando...',
    });
  };

  const askDelete = (id) => {
    setConfirmation({
      type: 'delete',
      id,
      title: 'Eliminar cuidador',
      message: '¿Seguro que deseas eliminar este cuidador? Esta acción no se puede deshacer.',
      confirmLabel: 'Eliminar',
      loadingLabel: 'Eliminando...',
    });
  };

  const handleConfirm = async () => {
    if (!confirmation) return;
    setActionLoading(true);
    try {
      if (confirmation.type === 'status') {
        // CONSUMO DE API: PATCH /usuarios/cuidadores/{idCuidador}/estado.
        await updateCuidadorEstado(confirmation.id, confirmation.nextStatus);
        toast.success('Estado del cuidador actualizado.');
      } else {
        // CONSUMO DE API: DELETE /usuarios/cuidadores/{idCuidador}.
        await deleteCuidador(confirmation.id);
        toast.success('Cuidador eliminado.');
      }
      setConfirmation(null);
      await loadCaregivers();
    } catch (error) {
      toast.error(confirmation.type === 'status'
        ? 'No se pudo actualizar el estado.'
        : 'No se pudo eliminar el cuidador.');
      console.error('Error en acción de cuidador:', error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7fb] lg:pl-72">
      <DashboardSidebar familyName="Familia García" onLogout={() => navigate('/', { replace: true })} />
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#15919a]">Configuración</p>
            <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold text-[#19304a]">
              <ShieldCheckIcon className="size-8 text-[#15919a]" /> Cuidadores
            </h1>
            <p className="mt-2 text-slate-500">Administra quién puede ayudarte a cuidar la salud familiar.</p>
          </div>
          <button onClick={() => { setFormData(emptyCaregiver); setFormVisible(true); }} className="btn border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]">
            <PlusIcon className="size-5" /> Agregar cuidador
          </button>
        </div>
        {formVisible && (
          <div className="mb-6">
            <CaregiverForm
              value={formData}
              submitting={submitting}
              onChange={(event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))}
              onSubmit={handleSubmit}
              onCancel={() => setFormVisible(false)}
            />
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-16"><span className="loading loading-spinner loading-lg text-[#15919a]" /></div>
        ) : caregivers.length === 0 ? (
          <div className="card bg-white"><div className="card-body items-center py-16 text-center">
            <ShieldCheckIcon className="size-12 text-slate-300" />
            <h2 className="text-lg font-bold">No hay cuidadores registrados</h2>
            <p className="text-sm text-slate-500">Agrega una persona de confianza para comenzar.</p>
          </div></div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {caregivers.map((caregiver) => (
              <CaregiverCard key={caregiver.id} caregiver={caregiver} onToggleStatus={askStatusChange} onDelete={askDelete} />
            ))}
          </div>
        )}
      </div>
      <ConfirmDialog
        open={confirmation !== null}
        title={confirmation?.title}
        message={confirmation?.message}
        confirmLabel={confirmation?.confirmLabel}
        loadingLabel={confirmation?.loadingLabel}
        loading={actionLoading}
        onConfirm={handleConfirm}
        onCancel={() => !actionLoading && setConfirmation(null)}
      />
    </main>
  );
}

export default CuidadoresPage;
