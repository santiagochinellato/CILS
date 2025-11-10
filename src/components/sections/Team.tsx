import React from 'react';
import { siteConfig } from '../../config/site.config';
import { Icon } from '../ui/Icon';

export const Team: React.FC = () => {
  const team = siteConfig.team;
  if (!team) return null;
  return (
    <section id="team" className="section">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <span className="inline-block px-3 py-1 rounded bg-accent2 text-primary text-sm font-medium">{team.intro.heading}</span>
            {team.intro.text.map((p, i)=>(
              <p key={i} className={i===0? 'mt-4 text-textLight':'mt-3 text-textLight'}>{p}</p>
            ))}
            <div className="mt-6">
              <h3 className="font-montserrat text-xl font-semibold">¿Por qué elegirnos?</h3>
              <ul className="mt-3 space-y-2 text-text">
                {team.intro.why.map((w)=> (
                  <li key={w} className="flex gap-2"><Icon name="badgeCheck" size={18} context="accent" />{w}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.staff.map((m)=> (
                <article key={m.name} className="bg-white dark:bg-[#1F2C33] rounded-xl p-6 shadow-card">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent2 grid place-items-center text-primary font-semibold">{m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold">{m.name}</h4>
                      <p className="text-sm text-textLight">{m.role}</p>
                    </div>
                  </div>
                  {m.titles && m.titles.length>0 && (
                    <ul className="mt-3 text-sm text-textLight list-disc list-inside">
                      {m.titles.map((t)=> <li key={t}>{t}</li>)}
                    </ul>
                  )}
                  {m.area && <div className="mt-2 text-xs text-textLight">Área: {m.area}</div>}
                  <div className="mt-4 flex items-center gap-3">
                    <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-secondary hover:text-primary">
                      <Icon name="email" size={18} /> Email
                    </a>
                    {m.linkedin && (
                      <a href={m.linkedin} className="inline-flex items-center gap-1 text-secondary hover:text-primary">
                        <Icon name="linkedin" size={18} /> LinkedIn
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
