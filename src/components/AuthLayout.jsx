import {
  CheckIcon,
  HeartIcon,
  PlusIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
      <span className="grid size-9 place-items-center rounded-xl bg-[#b8f0df] text-[#0b6673]">
        <PlusIcon className="size-5" aria-hidden="true" />
      </span>
      <span>MiSalud Familiar</span>
    </div>
  );
}

function AuthLayout({ children, wide = false }) {
  return (
    <main className="grid min-h-screen bg-[#f4f7fb] lg:h-screen lg:grid-cols-[minmax(360px,0.9fr)_minmax(460px,1.1fr)]">
      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-[#167d83] to-[#0b4f68] p-12 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:px-[clamp(36px,6vw,96px)]">
        <div className="relative z-10"><Brand /></div>
        <div className="relative z-10 max-w-[480px]">
          <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.13em] text-[#b8f0df]">
            Cuidado que conecta
          </span>
          <h1 className="max-w-[500px] text-5xl font-bold leading-tight tracking-[-0.06em]">
            Tu familia, su salud, siempre cerca.
          </h1>
          <p className="mt-6 max-w-[425px] text-base leading-7 text-[#d3f3ef]">
            Organiza citas, tratamientos y expedientes médicos en un solo lugar,
            con la tranquilidad de tener todo bajo control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-[#d3f3ef]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2.5">
              <HeartIcon className="size-4" aria-hidden="true" /> Seguimiento familiar
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2.5">
              <CheckIcon className="size-4" aria-hidden="true" /> Información segura
            </span>
          </div>
        </div>
        <div className="absolute -bottom-52 -right-44 size-[520px] rounded-full border border-white/15" />
        <div className="absolute -bottom-32 right-24 size-[260px] rounded-full border border-white/15" />
      </section>

      <section className={`min-h-screen overflow-y-auto p-6 sm:p-8 ${wide ? '' : 'lg:grid lg:place-items-center'}`}>
        <div className={`mx-auto w-full py-2 sm:py-4 ${wide ? 'max-w-2xl' : 'max-w-md'}`}>
          <div className="mb-14 lg:hidden"><Brand /></div>
          {children}
          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <ShieldCheckIcon className="size-4 text-[#15919a]" aria-hidden="true" />
            Tus datos se mantienen protegidos y privados.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
