export const TAGS_DICTIONARY: Record<string, string[]> = {
  laboral: [
    'laboral','trabajo','empleo','sindicato','paritaria','paritarias','salario','salarios',
    'sueldos','afip 931','f931','art','convenio','convenio colectivo',
    'indemnizacion','indemnización','despido','jornada','vacaciones','licencia','aguinaldo',
    'asignaciones','uom','smvm','cargas sociales','registración laboral','cct'
  ],
  impositivo: [
    'impuesto','impositiva','tributaria','tributario','tributo','afip','iva','ganancias',
    'monotributo','arba','ingresos brutos','alicuota','alícuota','percepcion','percepción',
    'retencion','retención','aduana','aduanero','resolución general','regimen simplificado',
    'facturacion electronica','comprobantes electronicos','rg','dgi','reforma tributaria'
  ],
  contable: [
    'contable','contabilidad','balance','estados contables','auditoría','auditoria','patrimonio',
    'activo','pasivo','flujo de caja','cash flow','financiero','finanzas','costos','inventario',
    'asiento contable','ifrs','iasb','audit','revisor fiscal','nia','normas contables'
  ],
  societaria: [
    'societaria','sociedad','sociedades','asamblea','estatuto','accionistas','acciones',
    'directorio','srl','sa','sas','igj','inspección de justicia','registración societaria',
    'reforma estatutaria','contrato social','socios','constitución de sociedad'
  ]
};

export const REGIONES: Record<string, string[]> = {
  'Bariloche': [
    'bariloche','san carlos de bariloche','nahuel huapi','rio negro','río negro',
    'andina','cordillera','pilcaniyeu','dina huapi','el bolsón','bolson'
  ],
  'Patagonia': [
    'neuquen','neuquén','chubut','santa cruz','tierra del fuego','ushuaia',
    'comodoro','madryn','rio gallegos','vaca muerta'
  ],
  'Argentina': [
    'argentina','nacional','caba','buenos aires','ministerio de economía','mecon',
    'ministerio de trabajo','casa rosada','anses','afip'
  ]
};

export const BLACKLIST = [
  'deporte','deportivo','policial','accidente','choque','femicidio','crimen','tiroteo',
  'robó','robo','incendio','espectáculo','farándula','celebridades','viral','receta',
  'cocina','música','entretenimiento','clima','sismo','horóscopo','quini','lotería',
  'fútbol','futbol','básquet','tenis','rugby','racing','boca','river','hamilton','colapinto',
  'asesinato','homicidio','violación','secuestro','narcotráfico'
];
