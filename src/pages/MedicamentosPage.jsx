import { useEffect, useState } from 'react';
import { BeakerIcon, ChevronLeftIcon, ChevronRightIcon, CubeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import MedicationCard from '../components/medicamentos/MedicationCard';
import MedicationDetailsModal from '../components/medicamentos/MedicationDetailsModal';
import MedicationFilters from '../components/medicamentos/MedicationFilters';
import { getMedicamentoById, getMedicamentos } from '../services/medicationService';
import { useNavigate } from 'react-router-dom';

const initialFilters = {
  nombreComercial: '',
  sustanciaActiva: '',
  formaFarmaceutica: '',
  viaAdministracion: '',
  activo: true,
  page: 0,
  size: 15,
};

async function requestMedications(currentFilters) {
  const response = await getMedicamentos(currentFilters);
  return {
    medications: response.content ?? [],
    pageInfo: {
      number: response.page?.number ?? currentFilters.page,
      totalPages: response.page?.totalPages ?? 0,
      totalElements: response.page?.totalElements ?? 0,
    },
  };
}

function MedicamentosPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);
  const [queryFilters, setQueryFilters] = useState(initialFilters);
  const [medications, setMedications] = useState([]);
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const filtersChanged = Object.keys(filters).some((key) => filters[key] !== queryFilters[key]);
    if (!filtersChanged) return undefined;

    const timer = setTimeout(() => {
      setQueryFilters({ ...filters, page: 0 });
    }, 350);
    return () => clearTimeout(timer);
  }, [filters, queryFilters]);

  useEffect(() => {
    let cancelled = false;

    async function loadPage() {
      setLoading(true);
      try {
        const result = await requestMedications(queryFilters);
        if (!cancelled) {
          setMedications(result.medications);
          setPageInfo(result.pageInfo);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error('No se pudieron cargar los medicamentos.');
          console.error('Error al cargar medicamentos:', error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [queryFilters]);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setQueryFilters({ ...filters, page: 0 });
  };

  const handleClear = () => {
    setFilters(initialFilters);
    setQueryFilters(initialFilters);
  };

  const handleSelect = async (id) => {
    setDetailLoading(true);
    setSelectedMedication({});
    try {
      const medication = await getMedicamentoById(id);
      setSelectedMedication(medication);
    } catch (error) {
      setSelectedMedication(null);
      toast.error('No se pudo cargar el detalle del medicamento.');
      console.error('Error al cargar detalle:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleLogout = () => navigate('/', { replace: true });
  const currentPage = pageInfo.number + 1;

  return (
    <main className="min-h-screen bg-[#f4f7fb] lg:pl-72">
      <DashboardSidebar familyName="Familia García" onLogout={handleLogout} />
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#15919a]">Catálogo</p>
            <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold tracking-tight text-[#19304a]">
              <CubeIcon className="size-8 text-[#15919a]" aria-hidden="true" /> Medicamentos
            </h1>
            <p className="mt-2 text-slate-500">Consulta los medicamentos disponibles para registrar tratamientos familiares.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
            <BeakerIcon className="size-5 text-[#15919a]" aria-hidden="true" />
            {pageInfo.totalElements} registrados
          </div>
        </div>

        <MedicationFilters filters={filters} onChange={handleFilterChange} onSubmit={handleSearch} onClear={handleClear} />

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-16"><span className="loading loading-spinner loading-lg text-[#15919a]" /></div>
          ) : medications.length === 0 ? (
            <div className="card border border-dashed border-slate-300 bg-white"><div className="card-body items-center py-16 text-center"><CubeIcon className="size-12 text-slate-300" /><h2 className="mt-3 text-lg font-bold text-[#19304a]">No hay medicamentos</h2><p className="text-sm text-slate-500">Prueba con otros filtros de búsqueda.</p></div></div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {medications.map((medication) => <MedicationCard key={medication.id ?? medication.idMedicamento} medication={medication} onSelect={handleSelect} />)}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                <p className="text-sm text-slate-500">Página {currentPage} de {Math.max(pageInfo.totalPages, 1)}</p>
                <div className="join">
                  <button type="button" className="btn btn-sm join-item" disabled={pageInfo.number === 0} onClick={() => setQueryFilters((current) => ({ ...current, page: current.page - 1 }))}><ChevronLeftIcon className="size-4" /></button>
                  <button type="button" className="btn btn-sm join-item" disabled={currentPage >= pageInfo.totalPages} onClick={() => setQueryFilters((current) => ({ ...current, page: current.page + 1 }))}><ChevronRightIcon className="size-4" /></button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <MedicationDetailsModal medication={selectedMedication} loading={detailLoading} onClose={() => setSelectedMedication(null)} />
    </main>
  );
}

export default MedicamentosPage;
