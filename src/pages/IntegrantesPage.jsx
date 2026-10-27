import { useEffect, useState } from 'react';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import MemberForm from '../components/integrantes/MemberForm';
import MemberDetailModal from '../components/integrantes/MemberDetailModal';
import MemberCard from '../components/integrantes/MemberCard';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { emptyMember } from '../components/integrantes/memberOptions';
import {
  createIntegrante, deleteIntegrante, getIntegranteById, getIntegrantes, updateIntegrante,
  addAlergiaToIntegrante, getAlergias,
} from '../services/memberService';

function IntegrantesPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState(emptyMember);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [allergySubmitting, setAllergySubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  const loadMembers = async () => {
    try {
      return await getIntegrantes();
    } catch (error) {
      toast.error('No se pudieron cargar los integrantes.');
      console.error('Error al cargar integrantes:', error);
      return null;
    }
  };

  useEffect(() => {
    let cancelled = false;
    getIntegrantes().then((result) => {
      if (!cancelled) setMembers(result);
    }).catch((error) => {
      if (!cancelled) {
        toast.error('No se pudieron cargar los integrantes.');
        console.error('Error al cargar integrantes:', error);
      }
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    getAlergias().then(setAllergies).catch((error) => {
      toast.error('No se pudo cargar el catálogo de alergias.');
      console.error('Error al cargar alergias:', error);
    });
  }, []);

  const openDetail = async (id) => {
    setDetailLoading(true);
    setSelected({});
    try {
      // CONSUMO DE API: GET /integrantes/{idIntegrante}.
      setSelected(await getIntegranteById(id));
    } catch (error) {
      setSelected(null);
      toast.error('No se pudo cargar el detalle.');
      console.error('Error al cargar detalle:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        // CONSUMO DE API: PUT /integrantes/{idIntegrante}.
        await updateIntegrante(formData.id, formData);
        toast.success('Integrante actualizado.');
      } else {
        // CONSUMO DE API: POST /integrantes.
        await createIntegrante(formData);
        toast.success('Integrante creado.');
      }
      setFormVisible(false);
      setEditing(false);
      const updatedMembers = await loadMembers();
      if (updatedMembers) setMembers(updatedMembers);
    } catch (error) {
      toast.error('No se pudo guardar el integrante.');
      console.error('Error al guardar integrante:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const requestDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    setDeleteSubmitting(true);
    try {
      // CONSUMO DE API: DELETE /integrantes/{idIntegrante}, responde 204.
      await deleteIntegrante(deleteId);
      toast.success('Integrante eliminado.');
      setSelected(null);
      setDeleteId(null);
      const updatedMembers = await loadMembers();
      if (updatedMembers) setMembers(updatedMembers);
    } catch (error) {
      toast.error('No se pudo eliminar el integrante.');
      console.error('Error al eliminar integrante:', error);
    } finally {
      setDeleteSubmitting(false);
    }
  };

  const handleAddAllergy = async (data) => {
    if (selected?.id === undefined || selected?.id === null) return;
    setAllergySubmitting(true);
    try {
      // CONSUMO DE API: POST /integrantes/{idIntegrante}/alergias.
      await addAlergiaToIntegrante(selected.id, data);
      const refreshedMember = await getIntegranteById(selected.id);
      setSelected(refreshedMember);
      toast.success('Alergia agregada al integrante.');
    } catch (error) {
      toast.error('No se pudo agregar la alergia.');
      console.error('Error al agregar alergia:', error);
    } finally {
      setAllergySubmitting(false);
    }
  };

  const openCreate = () => {
    setFormData(emptyMember);
    setEditing(false);
    setFormVisible(true);
  };

  const openEdit = (member) => {
    setSelected(null);
    setFormData({
      nombre: member.nombre,
      apellidoPaterno: member.apellidoPaterno ?? '',
      apellidoMaterno: member.apellidoMaterno ?? '',
      fechaNacimiento: member.fechaNacimiento,
      sexo: member.sexo,
      tipoSangre: member.tipoSangre,
      parentesco: member.parentesco,
      id: member.id,
    });
    setEditing(true);
    setFormVisible(true);
  };

  return <main className="min-h-screen bg-[#f4f7fb] lg:pl-72">
    <DashboardSidebar familyName="Familia García" onLogout={() => navigate('/', { replace: true })} />
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-[#15919a]">Familia</p><h1 className="mt-1 flex items-center gap-2 text-3xl font-bold text-[#19304a]"><UserGroupIcon className="size-8 text-[#15919a]" /> Integrantes</h1><p className="mt-2 text-slate-500">Administra las personas que forman parte de tu familia.</p></div><button onClick={openCreate} className="btn border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]"><PlusIcon className="size-5" /> Agregar integrante</button></div>
      {formVisible && <div className="mb-6"><MemberForm value={formData} editing={editing} submitting={submitting} onChange={(event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))} onSubmit={handleSubmit} onCancel={() => setFormVisible(false)} /></div>}
      {loading ? <div className="flex justify-center py-16"><span className="loading loading-spinner loading-lg text-[#15919a]" /></div> : members.length === 0 ? <div className="card bg-white"><div className="card-body items-center py-16 text-center"><UserGroupIcon className="size-12 text-slate-300" /><h2 className="text-lg font-bold">No hay integrantes</h2><p className="text-sm text-slate-500">Agrega el primer integrante de tu familia.</p></div></div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{members.map((member) => <MemberCard key={member.id} member={member} onOpen={openDetail} />)}</div>}
    </div>
    <MemberDetailModal
      member={selected}
      loading={detailLoading}
      allergies={allergies}
      allergySubmitting={allergySubmitting}
      onAddAllergy={handleAddAllergy}
      onClose={() => setSelected(null)}
      onEdit={openEdit}
      onDelete={requestDelete}
    />
    <ConfirmDialog
      open={deleteId !== null}
      title="Eliminar integrante"
      message="¿Seguro que deseas eliminar este integrante? Esta acción no se puede deshacer."
      confirmLabel="Eliminar"
      loading={deleteSubmitting}
      onConfirm={handleDelete}
      onCancel={() => setDeleteId(null)}
    />
  </main>;
}

export default IntegrantesPage;
