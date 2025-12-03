import React from 'react';
import { useSiteConfig } from '../../config/site.config';
import { Icon } from '../ui/Icon';
import { getTeamMemberPhoto } from '../../lib/sanity/imageHelper';

export const Team: React.FC = () => {
  const siteConfig = useSiteConfig();
  const team = siteConfig.team;
  if (!team) return null;

  // Categorización sofisticada del equipo
  const fundadores = team.staff.filter(
    (m) => m.role.toLowerCase().includes('fundador') || m.role.toLowerCase().includes('fundadora')
  );

  // Liderazgo con colores específicos asignados
  const liderazgo = team.staff.filter((m) => {
    const role = m.role.toLowerCase();
    const name = m.name.toLowerCase();
    return (
      (role.includes('resp') && !role.includes('fundador')) ||
      (role.includes('asociad') && name.includes('vizgarra')) ||
      (role.includes('socia') && name.includes('lobo'))
    );
  });

  // Auxiliares
  // Auxiliares y resto del equipo
  const auxiliares = team.staff.filter(
    (m) => !fundadores.includes(m) && !liderazgo.includes(m) && m.role.toLowerCase() !== 'pasante'
  );

  // Pasantes
  const pasantes = team.staff.filter((m) => m.role.toLowerCase() === 'pasante');

  // Determine if member is leadership (shows email)
  const isLeadership = (role: string) => {
    const r = role.toLowerCase();
    return (
      r.includes('socio') ||
      r.includes('fundador') ||
      r.includes('resp') ||
      r.includes('asociado') ||
      r.includes('asociada')
    );
  };

  const renderStaffCard = (
    m: (typeof team.staff)[0],
    cardType: 'fundador' | 'liderazgo' | 'staff' = 'staff',
    customColor?: string
  ) => {
    const isFundador = cardType === 'fundador';
    const isLiderazgo = cardType === 'liderazgo';
    const imageSize = isFundador ? 'w-20 h-20' : isLiderazgo ? 'w-16 h-16' : 'w-14 h-14'; // 80px, 64px, 56px
    const shouldShowEmail = isLeadership(m.role);
    
    // Determinar tamaño de imagen optimizada según el cardType
    const photoSize = isFundador ? 'large' : isLiderazgo ? 'medium' : 'small';
    const optimizedImage = m.image ? getTeamMemberPhoto(m.image, photoSize) : null;

    // Color scheme for leadership cards
    const getColorClasses = () => {
      if (isFundador) {
        return {
          card: 'bg-gradient-to-br from-primary to-primary/90 dark:from-primary dark:to-primary/80 text-white shadow-lg hover:shadow-xl',
          image: 'bg-white text-primary ring-4 ring-white/30',
          name: 'text-xl',
          role: 'text-white/90',
          area: 'bg-white/20 text-white',
          titles: 'text-white/80 italic',
        };
      } else if (isLiderazgo && customColor) {
        // Custom color for leadership members
        type ColorClasses = {
          card: string;
          image: string;
          name: string;
          role: string;
          area: string;
          titles: string;
        };

        const colorMap: Record<string, ColorClasses> = {
          teal: {
            card: 'bg-gradient-to-br from-[#2D7A7B] to-[#2D7A7B]/90 text-white shadow-md hover:shadow-lg',
            image: 'bg-white text-[#2D7A7B] ring-3 ring-white/30',
            name: 'text-lg',
            role: 'text-white/90',
            area: 'bg-white/20 text-white',
            titles: 'text-white/80 italic',
          },
          secondary: {
            card: 'bg-gradient-to-br from-[#2D7A7B] to-[#2D7A7B]/90 text-white shadow-md hover:shadow-lg',
            image: 'bg-white text-secondary ring-3 ring-white/30',
            name: 'text-lg',
            role: 'text-white/90',
            area: 'bg-white/20 text-white',
            titles: 'text-white/80 italic',
          },
        };
        return colorMap[customColor] || colorMap.teal;
      } else {
        // White cards for staff/auxiliares/pasantes
        return {
          card: 'bg-white dark:bg-[#1F2C33] shadow-card hover:shadow-md',
          image: 'bg-accent2 text-primary',
          name: 'text-base',
          role: 'text-secondary',
          area: 'bg-gray-100 dark:bg-gray-800 text-textLight',
          titles: 'text-textLight italic',
        };
      }
    };

    const colors = getColorClasses();

    return (
      <article
        key={m.name}
        className={`rounded-xl p-5 w-full h-full flex flex-col gap-4 transition-all duration-300 ${colors.card}`}
      >
        {/* Profile Image - Centered at top */}
        <div className="flex flex-col items-center gap-3">
          <div
            className={`${imageSize} rounded-full grid place-items-center font-semibold flex-shrink-0 overflow-hidden ${colors.image}`}
          >
            {optimizedImage ? (
              <img 
                src={optimizedImage} 
                alt={`${m.name} - ${m.role}`} 
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
                style={{ 
                  imageRendering: 'crisp-edges',
                  WebkitImageRendering: 'crisp-edges'
                }}
              />
            ) : (
              <span className={isFundador ? 'text-lg' : 'text-base'}>
                {m.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </span>
            )}
          </div>

          {/* Name and Role */}
          <div className="flex flex-col gap-1 items-center text-center">
            <h4 className={`font-montserrat font-bold ${colors.name}`}>{m.name}</h4>
            <p className={`text-sm font-medium ${colors.role}`}>{m.role}</p>
          </div>
        </div>

        {/* Area and Titles */}
        <div className="flex flex-col items-center justify-start gap-2 flex-grow">
          {m.area && (
            <div
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${colors.area}`}
            >
              {m.area}
            </div>
          )}

          {m.titles && m.titles.length > 0 && (
            <ul className={`text-xs space-y-1 text-center ${colors.titles}`}>
              {m.titles.map((t) => (
                <li key={t} className="leading-relaxed">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact Icons - Only show for leadership */}
        {shouldShowEmail && (
          <div className="flex items-center justify-center gap-4 pt-2 border-t border-current/10">
            <a
              href={`mailto:${m.email}`}
              className={`inline-flex items-center gap-1 transition-all ${
                isFundador || isLiderazgo
                  ? 'text-white hover:text-white/80 hover:scale-110'
                  : 'text-secondary hover:text-primary hover:scale-110'
              }`}
              title={m.email}
            >
              <Icon
                name="email"
                size={20}
                context={isFundador || isLiderazgo ? 'footer' : 'default'}
              />
            </a>
            {m.linkedin && (
              <a
                href={m.linkedin}
                className={`inline-flex items-center justify-center gap-1 transition-all ${
                  isFundador || isLiderazgo
                    ? 'text-white hover:text-white/80 hover:scale-110'
                    : 'text-secondary hover:text-primary hover:scale-110'
                }`}
                title="LinkedIn"
              >
                <Icon
                  name="linkedin"
                  size={20}
                  context={isFundador || isLiderazgo ? 'footer' : 'default'}
                />
              </a>
            )}
          </div>
        )}
      </article>
    );
  };

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
                <h3 className=" font-montserrat text-3xl md:text-4xl font-semibold text-start">
                  Nuestro equipo
                </h3>
                <ul className="mt-3 space-y-2 text-text flex flex-col items-start gap-2">
                  {team.intro.why.map((w) => (
                    <li key={w} className="flex gap-2 text-justify">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fundadores - Nieves & Javier */}
            {fundadores.length > 0 && (
              <div className="md:col-span-3 pt-5">
                <div className="flex justify-center gap-6 flex-wrap">
                  {fundadores.map((m) => (
                    <div
                      key={m.name}
                      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(50%-0.75rem)]"
                    >
                      {renderStaffCard(m, 'fundador')}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Liderazgo - Lorena, María Teresa, Luciano */}
            {liderazgo.length > 0 && (
              <div className="md:col-span-3 pt-5">
                <div className="flex justify-center gap-6 flex-wrap">
                  {liderazgo.map((m) => {
                    // Asignar color específico según el nombre
                    let color = 'teal';
                    if (m.name.toLowerCase().includes('vizgarra')) {
                      color = 'secondary';
                    }

                    return (
                      <div
                        key={m.name}
                        className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                      >
                        {renderStaffCard(m, 'liderazgo', color)}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Auxiliares */}
            {auxiliares.length > 0 && (
              <div className="md:col-span-3 pt-5">
                <div className="flex justify-center gap-6 flex-wrap">
                  {auxiliares.map((m) => (
                    <div
                      key={m.name}
                      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                    >
                      {renderStaffCard(m, 'staff')}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pasantes */}
            {pasantes.length > 0 && (
              <div className="md:col-span-3 pt-5">
                <div className="flex justify-center gap-6 flex-wrap">
                  {pasantes.map((m) => (
                    <div
                      key={m.name}
                      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                    >
                      {renderStaffCard(m, 'staff')}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
