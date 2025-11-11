import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Icon } from '../ui/Icon';

export const Team: React.FC = () => {
  const team = siteConfig.team;
  if (!team) return null;
  
  // Separar staff por categoría
  const socios = team.staff.filter(m => 
    m.role.toLowerCase().includes('socio') || 
    m.role.toLowerCase().includes('fundador')
  );
  
  const asociados = team.staff.filter(m => 
    m.role.toLowerCase().includes('asociado') || 
    m.role.toLowerCase().includes('asociada')
  );
  
  const resto = team.staff.filter(m => 
    !m.role.toLowerCase().includes('socio') && 
    !m.role.toLowerCase().includes('fundador') &&
    !m.role.toLowerCase().includes('asociado') &&
    !m.role.toLowerCase().includes('asociada')
  );
  
  const renderStaffCard = (m: typeof team.staff[0], isSocio: boolean = false) => (
    <article key={m.name} className={`rounded-xl p-4 shadow-card w-full h-full flex flex-col gap-2 ${
      isSocio 
        ? 'bg-primary dark:bg-primary text-white' 
        : 'bg-white dark:bg-[#1F2C33]'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full grid place-items-center font-semibold flex-shrink-0 overflow-hidden ${
          isSocio 
            ? 'bg-white text-primary ring-2 ring-white' 
            : 'bg-accent2 text-primary'
        }`}>
          {m.image ? (
            <img src={m.image} alt={m.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            m.name.split(' ').map(n=>n[0]).slice(0,2).join('')
          )}
        </div>
        <div className='flex flex-col gap-1 '>
          <h4 className="font-montserrat text-md font-semibold">{m.name}</h4>
          <p className={`text-[12px] ${isSocio ? 'text-white/80' : 'text-textLight'}`}>{m.role}</p>


        </div>
      </div>
<div className='flex flex-col items-start justify-start gap-2'>
                      {m.area && <div className={` text-sm ${isSocio ? 'text-white/70 font-semibold' : 'text-textLight'} font-semibold`}>Área: {m.area}</div>}
      {m.titles && m.titles.length>0 && (
  <ul className={` text-xs list-disc list-inside flex-grow ${isSocio ? 'text-white/80' : 'text-textLight'}`}>
          {m.titles.map((t)=> <li key={t}>{t}</li>)}
        </ul>
      )}

</div>
                <div className="flex items-center justify-end gap-3">
        <a href={`mailto:${m.email}`} className={`inline-flex items-center gap-1 ${
          isSocio 
            ? 'text-white hover:text-white/80' 
            : 'text-secondary hover:text-primary'
        }`}>
          <Icon name="email" size={18} context={isSocio ? 'footer' : 'default'} /> 
        </a>
        {m.linkedin && (
          <a href={m.linkedin} className={`inline-flex items-center justify-center gap-1 ${
            isSocio 
              ? 'text-white hover:text-white/80' 
              : 'text-secondary hover:text-primary'
          }`}>
            <Icon name="linkedin" size={18} context={isSocio ? 'footer' : 'default'} /> 
          </a>
        )}
      </div>
    </article>
  );
  
  return (
    <section id="team" className="section">
      <div className="container">
           <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          <div className="md:col-span-3">
            <div className="mt-6 flex flex-col items-start gap-5">
                           <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">
       Un staff especializado 
            </span>
              <h3 className=" font-montserrat text-3xl md:text-4xl font-semibold text-start">Nuestro equipo</h3>
              <ul className="mt-3 space-y-2 text-text flex flex-col items-start gap-2">
                {team.intro.why.map((w)=> (
                  <li key={w} className="flex gap-2 text-justify">{w}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Socios y Fundadores */}
          {socios.length > 0 && (
            <div className="md:col-span-3 pt-5">
              <div className="flex justify-center gap-6 flex-wrap">
                {socios.map(m => <div key={m.name} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ">{renderStaffCard(m, true)}</div>)}
              </div>
            </div>
          )}
          
          {/* Asociados */}
          {asociados.length > 0 && (
            <div className="md:col-span-3">
    <div className="flex justify-center gap-6 flex-wrap">
      {asociados.map(m => <div key={m.name} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ">{renderStaffCard(m)}</div>)}
              </div>
            </div>
          )}
          
          {/* Resto del personal */}
          {resto.length > 0 && (
            <div className="md:col-span-3">
     <div className="flex justify-center gap-6 flex-wrap">
       {resto.map(m => <div key={m.name} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ">{renderStaffCard(m)}</div>)}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};
