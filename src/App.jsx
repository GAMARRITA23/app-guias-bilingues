import { useEffect, useState } from "react";
import { db } from "./services/db";
import { supabase, supabaseConfigurado } from "./services/supabase";

const tiposId = [
  { codigo: "CC", descripcion: "Cédula de ciudadanía" },
  { codigo: "TI", descripcion: "Tarjeta de identidad" },
  { codigo: "RC", descripcion: "Registro civil" },
  { codigo: "CE", descripcion: "Cédula de extranjería" },
  { codigo: "PA", descripcion: "Pasaporte" },
  { codigo: "AS", descripcion: "Adulto sin identificación" },
  { codigo: "MS", descripcion: "Menor sin identificación" },
  { codigo: "PT", descripcion: "Permiso por Protección Temporal" },
  { codigo: "CN", descripcion: "Certificado de nacido vivo" },
  { codigo: "PE", descripcion: "Permiso especial de permanencia" },
  { codigo: "SC", descripcion: "Salvo conducto" },
];

const municipios = [
  { id: 1, nombre: "MANAURE" },
  { id: 2, nombre: "RIOHACHA" },
];

const riesgos = [
  { codigo: "R00", nombre: "Sin riesgo observado" },
  { codigo: "R01", nombre: "Cardiovascular" },
  { codigo: "R02", nombre: "Metabólico" },
  { codigo: "R03", nombre: "Oncológico" },
  { codigo: "R04", nombre: "Nutricional" },
  { codigo: "R05", nombre: "Infeccioso" },
  { codigo: "R06", nombre: "Neonatal" },
  { codigo: "R07", nombre: "Vectorial" },
  { codigo: "R08", nombre: "Sexual y reproductivo" },
  { codigo: "R09", nombre: "Materno perinatal" },
  { codigo: "R10", nombre: "Salud mental" },
  { codigo: "R11", nombre: "Sociocultural" },
  { codigo: "R12", nombre: "Medicina tradicional" },
  { codigo: "R13", nombre: "Desarrollo infantil y adolescente" },
  { codigo: "R14", nombre: "Transporte / acceso" },
];

const guias = [
  { identificacion: "1192901034", nombre: "CIRLIS RUBID DELUQUE FERNÁNDEZ" },
  { identificacion: "1124383018", nombre: "MADELEINE DAMARIS MARQUEZ FERNANDEZ" },
  { identificacion: "1124413443", nombre: "FLORENTINA FERNANDEZ EPIEYU" },
  { identificacion: "1118854353", nombre: "JOSE RICARDO URIANA IPUANA" },
  { identificacion: "1006578287", nombre: "LUZ MERY PIMIENTA PUSHAINA" },
  { identificacion: "40953510", nombre: "YARIDZA CRISTINA SIJONA RIVEIRA" },
  { identificacion: "1124406459", nombre: "PETRINA ISABEL EPIAYU EPIAYU" },
  { identificacion: "1118834528", nombre: "MILEDIS MARGARITA AGUILAR URIANA" },
  { identificacion: "1124369101", nombre: "OLIMPO ZUÑIGA URIANA" },
  { identificacion: "40954037", nombre: "ILSA ISABEL AGUILAR IPUANA" },
  { identificacion: "40952047", nombre: "NOEMI MERCADO PUSHAINA" },
];

const EPS_CONTRATO_ANASWAYUU = "EPSI ANASWAYUU / Nota tecnica vigente";
const EPS_CONTRATO_DUSAKAWI = "DUSAKAWI EPSI / Contrato 44560-160-DFI";

const catalogoCupsBaseAnaswayuu = [
  {
    codigo: "S50002-01",
    descripcion: "Guías Bilingües",
    intervencion: "Desarrollar espacios de educación grupal en las diferentes comunidades, orientados a la prevención de la hipertensión arterial, integrando prácticas culturales y saberes propios del pueblo Wayuu.",
  },
  {
    codigo: "S50002-02",
    descripcion: "Guías Bilingües",
    intervencion: "Promover espacios de educación grupal en las distintas comunidades Wayuu, enfocados en la prevención de la diabetes, mediante talleres que integren prácticas culturales y saberes propios del pueblo Wayuu.",
  },
  {
    codigo: "S50002-03",
    descripcion: "Guías Bilingües",
    intervencion: "Desarrollar espacios de educación grupal en las diferentes comunidades, orientados a promover el autocuidado del cuerpo y signos de alerta del cáncer, integrando prácticas culturales y saberes propios del pueblo Wayuu.",
  },
  {
    codigo: "S50002-04",
    descripcion: "Guías Bilingües",
    intervencion: "Promover espacios de educación grupal en las distintas comunidades Wayuu, enfocados en la prevención de la desnutrición infantil, mediante talleres que integren prácticas culturales y saberes propios del pueblo Wayuu.",
  },
  {
    codigo: "S50002-05",
    descripcion: "Guías Bilingües",
    intervencion: "Desarrollar espacios de educación grupal en las distintas comunidades Wayuu, enfocados en el manejo de la enfermedad diarreica aguda, mediante talleres que integren prácticas culturales y saberes propios del pueblo Wayuu.",
  },
  {
    codigo: "S50002-06",
    descripcion: "Guías Bilingües",
    intervencion: "Promover espacios de educación grupal en las distintas comunidades Wayuu, enfocados en el manejo de la infección respiratoria aguda, mediante talleres que integren prácticas culturales y saberes propios del pueblo Wayuu.",
  },
  {
    codigo: "S50002-07",
    descripcion: "Guías Bilingües",
    intervencion: "Desarrollar espacios de educación grupal en las comunidades Wayuu, orientados a la prevención, detección temprana y adecuado manejo de la tuberculosis.",
  },
  {
    codigo: "S50002-08",
    descripcion: "Guías Bilingües",
    intervencion: "Fomentar espacios de educación grupal en las comunidades Wayuu, orientados al cuidado integral del recién nacido, teniendo en cuenta prácticas culturales y saberes tradicionales, con el fin de fortalecer el acompañamiento familiar y comunitario durante los primeros días de vida.",
  },
  {
    codigo: "S50002-09",
    descripcion: "Guías Bilingües",
    intervencion: "Desarrollar espacios de educación grupal en las comunidades Wayuu, orientados a fortalecer la vigilancia epidemiológica comunitaria frente a enfermedades transmitidas por vectores como el dengue, chikungunya, zika y fiebre amarilla, adaptando los contenidos al contexto cultural del pueblo Wayuu.",
  },
  {
    codigo: "S50003-1",
    descripcion: "Acciones Individuales de Medicina Tradicional",
    intervencion: "Identificar y reportar a las mujeres Wayuu que utilizan métodos de planificación tradicionales y occidentales, reconociendo prácticas culturales, decisiones autónomas y redes de apoyo familiar.",
  },
  {
    codigo: "S50003-2",
    descripcion: "Acciones Individuales de Medicina Tradicional",
    intervencion: "Desarrollar talleres comunitarios interculturales en las diferentes comunidades, con el propósito de identificar los cinco principales males 'wanülü' que afectan el espiritu del Wayuu y requieren atención a través de la medicina tradicional.",
  },
  {
    codigo: "S50004",
    descripcion: "Acciones Individuales de Adecuación Sociocultural de los Servicios de Salud no Indígena",
    intervencion: "Fortalecer el proceso de atención mediante estrategias de comunicación apropiada, que disminuyan las barreras idiomáticas, sociales, geográficas y culturales en la prestación de los servicios de salud en el ámbito intra y extramural.",
  },
  {
    codigo: "S50005-1",
    descripcion: "Acciones Individuales de Promoción y Prevención en Salud Indígena",
    intervencion: "Desarrollar talleres educativos en las comunidades Wayuu para identificar y fortalecer las prácticas tradicionales de salud materna, incluyendo los métodos culturales de promoción de la salud, el significado del Ritual del Encierro durante la menarquia, el rol de la partera tradicional (Emeijat) a lo largo del ciclo reproductivo, y la educación asertiva sobre los signos de alarma durante el embarazo en adolescentes y mujeres adultas.",
  },
  {
    codigo: "S50005-2",
    descripcion: "Acciones Individuales de Promoción y Prevención en Salud Indígena",
    intervencion: "Realizar talleres educativos en las comunidades Wayuu, dirigidos a mujeres gestantes y acompañados por la partera tradicional (Emeijat), con el objetivo de abordar temas clave como el seguimiento trimestral del embarazo, la referencia oportuna a los controles médicos institucionales correspondientes a cada etapa de la gestación y el registro del censo obstétrico.",
  },
  {
    codigo: "S50005-3",
    descripcion: "Acciones Individuales de Promoción y Prevención en Salud Indígena",
    intervencion: "Identificar los factores sociales y culturales que afectan la salud mental de la población indígena Wayuu en las comunidades.",
  },
  {
    codigo: "S50005-4",
    descripcion: "Acciones Individuales de Promoción y Prevención en Salud Indígena",
    intervencion: "Diálogo de saberes encaminado a preservar la salud individual indígena, en su contexto social y cultural.",
  },
  {
    codigo: "S50005-5",
    descripcion: "Acciones Individuales de Promoción y Prevención en Salud Indígena",
    intervencion: "Fomentar el uso y la práctica de juegos tradicionales Wayuu como herramienta para fortalecer el desarrollo psicomotriz en la niñez y contribuir al bienestar y la salud mental en la adolescencia.",
  },
  {
    codigo: "S50007-01",
    descripcion: "Transporte Urbano",
    intervencion: "Desplazamiento R1 (0 a 20 km ida y regreso).",
  },
  {
    codigo: "S50007-02",
    descripcion: "Transporte Urbano",
    intervencion: "Desplazamiento R2 (>20 a 30 km ida y regreso).",
  },
];

const catalogoCupsAnaswayuu = catalogoCupsBaseAnaswayuu.map((cups) => ({
  ...cups,
  contrato_eps: "ANASWAYUU",
  eps_contrato: EPS_CONTRATO_ANASWAYUU,
}));

const catalogoCupsDusakawi = [
  {
    codigo: "S50004-21",
    descripcion: "Acciones de adecuación sociocultural de los servicios no indígenas",
    intervencion: "Búsqueda de pacientes inactivos de programas prioritarios en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50004-3",
    descripcion: "Acciones de adecuación sociocultural de los servicios no indígenas",
    intervencion: "Apoyo a trabajos tradicionales o comunitarios para facilitar el desarrollo de los servicios occidentales en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50004-4",
    descripcion: "Acciones de adecuación sociocultural de los servicios no indígenas",
    intervencion: "Visitas domiciliarias a los pacientes indígenas con tratamiento occidental en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S500004-16",
    descripcion: "Acciones de adecuación sociocultural de los servicios no indígenas",
    intervencion: "Suministro de agua potable en eventos de salud intercultural en territorio Wayuu",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-41",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Visita domiciliaria en territorio para capacitación intercultural preventiva y fomento del buen vivir: normas de comportamiento, cuidados e higiene personal y familiar en el hogar",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-28",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Control y prevención propio y/o intercultural de animales que causan daños en territorio, como: serpientes, arañas, piojos, pulgas, garrapatas, ratas, cucarachas, avispas, pitos, zancudos, entre otros",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-7-5",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Capacitación individual y familiar preventiva de conductas suicidas en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-7-4",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Fomento del buen vivir y armonía familiar en territorio: diálogo familiar y cumplimiento de rol familiar",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-7-3",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Capacitación propia e intercultural preventiva en territorio sobre el consumo de SPA",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-7-1",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Capacitación y concientización preventiva del abuso y/o violación sexual en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-3",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Educación propia y/o intercultural en territorio sobre alimentación propia según ciclo de vida",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-5",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Fomento del uso de la medicina propia y sus prácticas en casa",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-6",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Educación propia y/o intercultural en territorio de las prácticas preventivas en salud bucal",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-8",
    descripcion: "Acciones individuales de promoción y prevención en salud indígena",
    intervencion: "Fomento del cuidado propio y/o intercultural del medio ambiente y los recursos naturales en territorio: manejo de basura, productos químicos, talas y quemas",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-15",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Cuidado y seguimiento propio y/o intercultural a la gestante en territorio: cuidado del embarazo; educación tradicional prenatal",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-12",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Diálogo con parteras para potenciar la atención materno-perinatal intercultural en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-10",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Búsqueda e identificación de gestantes en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-16",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Cuidado preventivo-domiciliario y seguimiento propio y/o intercultural a la materna y recién nacido en territorio: alimentación adecuada, prevención de enfermedades y protección",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-22",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Cuidado físico de la madre y del recién nacido antes del bautizo tradicional en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-23",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Cuidado del bebé antes de recibir alimentos sólidos (0–2 años) en territorio: alimentación adecuada, prevención de desnutrición, IRA, EDA y demás",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-25",
    descripcion: "Acciones preventivas específicas ciclo de vida 1 - Nacimiento",
    intervencion: "Fomento de adecuada alimentación del niño(a) y adolescente según etapa de vida en territorio: prevenir alteraciones nutricionales y enfermedades asociadas",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-32",
    descripcion: "Acciones preventivas específicas ciclo de vida 2 - Desarrollo",
    intervencion: "Diálogo con los padres y guías espirituales para brindar adecuado manejo y orientación al desarrollo de los(as) adolescentes en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-34",
    descripcion: "Acciones preventivas específicas ciclo de vida 2 - Desarrollo",
    intervencion: "Educación preventiva sobre signos y síntomas de enfermedades del(la) adolescente en territorio",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-5-9",
    descripcion: "Acciones preventivas específicas ciclo de vida 2 - Desarrollo",
    intervencion: "Orientación y acompañamiento en territorio al(la) adolescente hasta alcanzar su etapa de vida en pareja",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-35",
    descripcion: "Acciones preventivas específicas ciclo de vida 3 - Vida en pareja",
    intervencion: "Educación preventiva propia y/o intercultural en territorio de las enfermedades específica de la vida en pareja",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-35-7",
    descripcion: "Acciones preventivas específicas ciclo de vida 3 - Vida en pareja",
    intervencion: "Capacitación propia y/o intercultural en territorio sobre el cuidado integral del adulto mayor",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50005-35-3",
    descripcion: "Acciones preventivas específicas ciclo de vida 3 - Vida en pareja",
    intervencion: "Educación preventiva propia y/o intercultural en territorio sobre enfermedades específicas de la mujer en su etapa reproductiva",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 1",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado gestante",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 2",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado proceso de parto",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 3",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado madre y recién nacido",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 4",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado menor desnutrido / riesgo DNT",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 5",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado ETV / tuberculosis",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 8",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado de urgencia desde comunidad",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 9",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado a cita especializada",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 10",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado en jornada de salud",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 11",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado paciente alto costo",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 12",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado de fallecido rural",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 13",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado retorno de paciente a comunidad",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 14",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado a cita y/o procedimientos médicos",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
  {
    codigo: "S50008-1 / Beneficio 16",
    descripcion: "Transporte intermunicipal o rural",
    intervencion: "Traslado de paciente ordenado por el sabedor",
    contrato_eps: "DUSAKAWI",
    eps_contrato: EPS_CONTRATO_DUSAKAWI,
  },
];

const catalogoCups = [...catalogoCupsAnaswayuu, ...catalogoCupsDusakawi];

function normalizarTextoPlano(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();
}

function obtenerContratoPorEps(eps) {
  const epsNormalizada = normalizarTextoPlano(eps);

  if (epsNormalizada.includes("DUSAKAWI")) {
    return "DUSAKAWI";
  }

  if (epsNormalizada.includes("ANASWAYUU") || epsNormalizada.includes("ANAS WAYUU")) {
    return "ANASWAYUU";
  }

  return "";
}

function generarUuidLocal() {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


const BUILD_LABEL = "Netlify 2026-03-21";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Admin2026!";

const SECTION_TITLE_STYLE = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#0f172a",
  letterSpacing: "-0.03em",
  lineHeight: "1.15",
};

const SECTION_SUBTITLE_STYLE = {
  fontSize: "12px",
  color: "#5b6b80",
  marginTop: "4px",
  lineHeight: "1.55",
};

const PRIMARY_BUTTON_STYLE = {
  minHeight: "52px",
  width: "100%",
  padding: "13px 16px",
  borderRadius: "17px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "15px",
  letterSpacing: "-0.01em",
  boxShadow: "0 12px 24px rgba(37,99,235,0.22)",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
};

const SUCCESS_BUTTON_STYLE = {
  minHeight: "52px",
  width: "100%",
  padding: "13px 16px",
  borderRadius: "17px",
  border: "none",
  background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "15px",
  boxShadow: "0 12px 24px rgba(22,163,74,0.22)",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
};

const DANGER_BUTTON_STYLE = {
  minHeight: "52px",
  width: "100%",
  padding: "13px 16px",
  borderRadius: "17px",
  border: "none",
  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "15px",
  boxShadow: "0 12px 24px rgba(220,38,38,0.22)",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
};

const SOFT_PANEL_STYLE = {
  padding: "15px",
  border: "1px solid #d9e5f2",
  borderRadius: "20px",
  background: "linear-gradient(180deg, #fbfdff 0%, #f6fafc 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.94), 0 8px 18px rgba(15,23,42,0.04)",
};

const STATUS_PILL_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "bold",
};

const MINI_DANGER_BUTTON_STYLE = {
  minHeight: "32px",
  padding: "6px 10px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "12px",
  boxShadow: "0 6px 12px rgba(220,38,38,0.18)",
  cursor: "pointer",
};

const INFO_TEXT_STYLE = {
  fontSize: "12px",
  color: "#526275",
  lineHeight: "1.6",
};
const MUTED_LABEL_STYLE = {
  fontSize: "11px",
  color: "#64748b",
  fontWeight: "bold",
  letterSpacing: "0.45px",
  textTransform: "uppercase",
};
const VALUE_TEXT_STYLE = {
  fontSize: "13px",
  color: "#0f172a",
  lineHeight: "1.55",
};

const INLINE_BADGE_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  padding: "5px 10px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: "bold",
};

const DETAIL_SECTION_STYLE = {
  display: "grid",
  gap: "8px",
  padding: "13px",
  borderRadius: "16px",
  border: "1px solid #dbe4f0",
  background: "linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)",
  boxShadow: "0 8px 18px rgba(15,23,42,0.04)",
};
const CARD_STYLE = {
  display: "grid",
  gap: "12px",
  width: "calc(100% - 8px)",
  margin: "0 auto",
  boxSizing: "border-box",
  padding: "16px",
  background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,252,0.99) 100%)",
  border: "1px solid rgba(203,213,225,0.88)",
  borderRadius: "24px",
  boxShadow: "0 18px 34px rgba(15,23,42,0.07), 0 1px 0 rgba(255,255,255,0.9) inset",
};

const INPUT_STYLE = {
  minHeight: "52px",
  padding: "12px 14px",
  borderRadius: "17px",
  border: "1px solid #c8d4e2",
  width: "100%",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box",
  fontSize: "16px",
  color: "#0f172a",
  boxShadow: "inset 0 1px 2px rgba(15,23,42,0.04), 0 1px 0 rgba(255,255,255,0.8)",
};

const FIELD_LABEL_STYLE = {
  display: "grid",
  gap: "7px",
  fontWeight: "bold",
  fontSize: "14px",
  color: "#334155",
};

const WHITE_INPUT_STYLE = {
  ...INPUT_STYLE,
  backgroundColor: "#ffffff",
};

const USER_SEARCH_RESULT_BUTTON_STYLE = {
  minHeight: "46px",
  width: "100%",
  padding: "11px 13px",
  borderRadius: "14px",
  border: "1px solid #d6deea",
  background: "linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)",
  color: "#0f172a",
  textAlign: "left",
  fontSize: "13px",
  boxShadow: "0 8px 16px rgba(15,23,42,0.05)",
};

const SURFACE_BUTTON_STYLE = {
  minHeight: "42px",
  width: "100%",
  padding: "11px 12px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "13px",
  cursor: "pointer",
};

const USER_SELECTED_CARD_STYLE = {
  padding: "14px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)",
  border: "1px solid #bbf7d0",
  color: "#166534",
  fontSize: "13px",
  lineHeight: "1.55",
  boxShadow: "0 8px 18px rgba(22,163,74,0.10)",
};

const HOME_ACTION_CARD_STYLE = {
  ...CARD_STYLE,
  padding: "20px 18px",
  textAlign: "left",
  cursor: "pointer",
  overflow: "hidden",
  minHeight: "218px",
};

const HOME_ICON_STYLE = {
  width: "62px",
  height: "62px",
  borderRadius: "20px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 16px 30px rgba(15,23,42,0.18)",
};

const HOME_ICON_SVG_STYLE = {
  width: "26px",
  height: "26px",
  display: "block",
};

const STAT_CARD_STYLE = {
  ...CARD_STYLE,
  padding: "16px",
  minHeight: "108px",
};

const SIMPLE_LIST_STYLE = {
  paddingLeft: 0,
  margin: 0,
  listStyle: "none",
  display: "grid",
  gap: "8px",
};

const DASHBOARD_METRIC_STYLE = {
  padding: "14px 15px",
  borderRadius: "20px",
  background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.98) 100%)",
  border: "1px solid rgba(203,213,225,0.85)",
  boxShadow: "0 14px 24px rgba(15,23,42,0.06)",
};

function HomeActionCard({ icon, title, description, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...HOME_ACTION_CARD_STYLE,
        position: "relative",
        border: "1px solid rgba(203,213,225,0.95)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,252,1) 100%)",
        boxShadow: "0 18px 34px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.92)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 auto auto 0",
          width: "100%",
          height: "110px",
          background:
            "radial-gradient(circle at top left, rgba(14,165,233,0.08), transparent 58%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "grid", gap: "14px", position: "relative" }}>
        <div
          style={{
            ...HOME_ICON_STYLE,
            background: accent,
          }}
        >
          {icon}
        </div>
        <div style={{ display: "grid", gap: "7px" }}>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a", letterSpacing: "-0.03em", lineHeight: "1.15" }}>
            {title}
          </div>
          <div style={{ fontSize: "13px", color: "#526275", lineHeight: "1.6" }}>{description}</div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            width: "fit-content",
            padding: "8px 12px",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%)",
            color: "#1d4ed8",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            border: "1px solid #bfdbfe",
          }}
        >
          Abrir modulo
        </div>
      </div>
    </button>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function RegisterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <path d="M8 3h8" />
      <path d="M9 3v3" />
      <path d="M15 3v3" />
      <rect x="5" y="6" width="14" height="15" rx="2" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <path d="M4 20h16" />
      <path d="M7 16v-4" />
      <path d="M12 16V8" />
      <path d="M17 16v-7" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <path d="M9 18l-4 2V6l4-2 6 2 4-2v14l-4 2-6-2z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
      <path d="M12 12h.01" />
    </svg>
  );
}

function RiskManagementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <path d="M12 3l7 3v5c0 5-3.4 8.6-7 10-3.6-1.4-7-5-7-10V6l7-3z" />
      <path d="M8 12h2l1.2-2.5L13 15l1.2-3H16" />
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={HOME_ICON_SVG_STYLE}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="M19 7l1 1 2-2" />
    </svg>
  );
}

const riesgosGestion = [
  {
    id: "dnt",
    nombre: "DNT o riesgo de DNT en menores de 5 años",
    descripcion: "Tamizaje comunitario con perímetro braquial y signos de alarma nutricional.",
    tipo: "dnt",
    preguntas: [
      "¿Ha tenido pérdida visible de peso o delgadez marcada en las últimas semanas?",
      "¿Ha presentado poco apetito o rechazo frecuente de alimentos?",
      "¿Ha estado más decaído, somnoliento o con menos actividad de lo habitual?",
      "¿Ha tenido diarrea o vómito frecuente en los últimos días?",
      "¿Tiene fiebre, tos persistente u otra infección reciente?",
      "¿Se observan edema en pies, palidez marcada o cambios evidentes en piel y cabello?",
    ],
  },
  {
    id: "hta",
    nombre: "Hipertensión",
    descripcion: "Evaluación por tensión arterial y signos de alarma cardiovascular.",
    tipo: "hta",
    preguntas: [
      "¿Ha presentado dolor de cabeza frecuente o intenso?",
      "¿Ha sentido mareo o visión borrosa en los últimos días?",
      "¿Ha tenido zumbido en los oídos o palpitaciones?",
      "¿Ha presentado dolor en el pecho o sensación de presión?",
      "¿Tiene antecedentes personales o familiares de hipertensión?",
      "¿Ha suspendido o no toma regularmente medicamentos formulados para la presión?",
    ],
  },
  {
    id: "tb",
    nombre: "Tuberculosis",
    descripcion: "Cuestionario por síntomas respiratorios y signos de alarma.",
    tipo: "cuestionario",
    preguntas: [
      "¿Tiene tos por más de 15 días?",
      "¿Ha presentado fiebre, especialmente en las noches?",
      "¿Ha tenido sudoración nocturna abundante?",
      "¿Ha perdido peso sin causa aparente?",
      "¿Ha tenido contacto cercano con una persona diagnosticada con tuberculosis?",
      "¿Ha presentado expectoración con sangre o dolor al respirar?",
    ],
  },
  {
    id: "dm",
    nombre: "Diabetes",
    descripcion: "Tamizaje con signos y síntomas de alteración glicémica.",
    tipo: "cuestionario",
    preguntas: [
      "¿Orina con mucha frecuencia durante el día o la noche?",
      "¿Siente mucha sed de manera repetida?",
      "¿Ha perdido peso sin explicación reciente?",
      "¿Siente cansancio o debilidad con frecuencia?",
      "¿Ha presentado visión borrosa o heridas que tardan en sanar?",
      "¿Tiene antecedentes personales o familiares de diabetes?",
    ],
  },
  {
    id: "ira",
    nombre: "IRA",
    descripcion: "Tamizaje con signos respiratorios de alarma.",
    tipo: "cuestionario",
    preguntas: [
      "¿Ha presentado tos reciente?",
      "¿Tiene fiebre o sensación febril?",
      "¿Respira rápido o con dificultad?",
      "¿Se le hunden las costillas o usa esfuerzo para respirar?",
      "¿Tiene silbidos, quejido o sonidos anormales al respirar?",
      "¿Se observa decaimiento marcado o dificultad para alimentarse?",
    ],
  },
  {
    id: "eda",
    nombre: "EDA",
    descripcion: "Tamizaje con signos digestivos y de deshidratación.",
    tipo: "cuestionario",
    preguntas: [
      "¿Ha presentado diarrea en las últimas 24 a 72 horas?",
      "¿Ha tenido vómito frecuente?",
      "¿Tiene sed intensa o boca seca?",
      "¿Ha orinado menos de lo habitual?",
      "¿Se observa ojos hundidos o decaimiento marcado?",
      "¿Ha presentado sangre en la deposición o dolor abdominal fuerte?",
    ],
  },
  {
    id: "vectores",
    nombre: "Enfermedad por vectores",
    descripcion: "Tamizaje comunitario por signos compatibles con dengue, malaria u otras ETV.",
    tipo: "cuestionario",
    preguntas: [
      "¿Ha presentado fiebre reciente?",
      "¿Tiene dolor de cabeza intenso o dolor detrás de los ojos?",
      "¿Ha tenido dolor muscular o articular fuerte?",
      "¿Presenta escalofrío, sudoración o sensación de mucho cansancio?",
      "¿Ha tenido brote, manchas en piel o sangrado de nariz/encías?",
      "¿Vive o permanece en zona con presencia frecuente de zancudos u otros vectores?",
    ],
  },
  {
    id: "mme",
    nombre: "Morbilidad materna extrema",
    descripcion: "Tamizaje para gestantes o puérperas con signos de alarma materna.",
    tipo: "cuestionario",
    preguntas: [
      "¿Está embarazada o tuvo parto/aborto en las últimas 6 semanas?",
      "¿Ha presentado sangrado vaginal abundante?",
      "¿Tiene dolor de cabeza intenso, visión borrosa o convulsiones?",
      "¿Ha presentado dificultad respiratoria o dolor en el pecho?",
      "¿Tiene fiebre alta, flujo con mal olor o sospecha de infección?",
      "¿Ha notado hinchazón marcada, dolor abdominal intenso o disminución de movimientos fetales?",
    ],
  },
];

function evaluarTamizajeGestionRiesgo(config, respuestas, datosMedicion) {
  if (!config) {
    return null;
  }

  const totalPreguntas = config.preguntas.length;
  const respuestasPositivas = config.preguntas.reduce(
    (total, _, index) => total + (respuestas[`${config.id}-${index}`] ? 1 : 0),
    0
  );
  const porcentajePositivo = totalPreguntas > 0 ? respuestasPositivas / totalPreguntas : 0;
  const superaUmbral = porcentajePositivo > 0.5;

  if (config.tipo === "dnt") {
    const edadMeses = Number(datosMedicion.edadMeses || 0);
    const perimetroBraquial = Number(datosMedicion.perimetroBraquial || 0);
    const esMenorCinco = edadMeses > 0 && edadMeses < 60;
    const cumpleDnt = esMenorCinco && perimetroBraquial > 0 && perimetroBraquial < 11.5;
    const cumpleRiesgo = esMenorCinco && perimetroBraquial >= 11.5 && perimetroBraquial < 12.5;
    const clasificacion = cumpleDnt
      ? "Probable DNT"
      : cumpleRiesgo
        ? "Probable riesgo de DNT"
        : superaUmbral && esMenorCinco
          ? "Tamizaje positivo por signos de alarma"
          : "Sin criterios suficientes en este tamizaje";

    return {
      totalPreguntas,
      respuestasPositivas,
      porcentajePositivo,
      esPositivo: cumpleDnt || cumpleRiesgo || (superaUmbral && esMenorCinco),
      clasificacion,
      detalle:
        !esMenorCinco
          ? "El tamizaje de DNT aplica para menores de 5 años."
          : perimetroBraquial <= 0
            ? "Registra el perímetro braquial para completar la orientación."
            : cumpleDnt
              ? "El perímetro braquial es menor de 11.5 cm."
              : cumpleRiesgo
                ? "El perímetro braquial está entre 11.5 cm y 12.4 cm."
                : "La clasificación se orienta por signos de alarma reportados.",
    };
  }

  if (config.tipo === "hta") {
    const sistolica = Number(datosMedicion.presionSistolica || 0);
    const diastolica = Number(datosMedicion.presionDiastolica || 0);
    const tensionElevada = sistolica >= 140 || diastolica >= 90;

    return {
      totalPreguntas,
      respuestasPositivas,
      porcentajePositivo,
      esPositivo: tensionElevada || superaUmbral,
      clasificacion: tensionElevada
        ? "Probable hipertensión"
        : superaUmbral
          ? "Tamizaje positivo por signos de alarma"
          : "Sin criterios suficientes en este tamizaje",
      detalle: tensionElevada
        ? `Tensión arterial registrada: ${sistolica || "-"} / ${diastolica || "-"} mmHg.`
        : "La clasificación se orienta por signos de alarma y antecedentes reportados.",
    };
  }

  return {
    totalPreguntas,
    respuestasPositivas,
    porcentajePositivo,
    esPositivo: superaUmbral,
    clasificacion: superaUmbral
      ? "Tamizaje positivo por signos de alarma"
      : "Sin criterios suficientes en este tamizaje",
    detalle: "Resultado orientador basado en el cuestionario de signos de alarma.",
  };
}

function calcularMapaBounds(puntos) {
  if (!puntos || puntos.length === 0) {
    return null;
  }

  const latitudes = puntos.map((item) => Number(item.latitud)).filter((value) => Number.isFinite(value));
  const longitudes = puntos.map((item) => Number(item.longitud)).filter((value) => Number.isFinite(value));

  if (latitudes.length === 0 || longitudes.length === 0) {
    return null;
  }

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const latPadding = Math.max((maxLat - minLat) * 0.12, 0.01);
  const lonPadding = Math.max((maxLon - minLon) * 0.12, 0.01);

  return {
    minLat: minLat - latPadding,
    maxLat: maxLat + latPadding,
    minLon: minLon - lonPadding,
    maxLon: maxLon + lonPadding,
  };
}

function StatCard({ label, value, accent }) {
  return (
    <div
      style={{
        ...STAT_CARD_STYLE,
        gap: "6px",
        border: `1px solid ${accent}`,
      }}
    >
      <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0f172a" }}>{value}</div>
    </div>
  );
}

function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [cerrandoSplash, setCerrandoSplash] = useState(false);
  const [tipoId, setTipoId] = useState("");
  const [identificacionUsuario, setIdentificacionUsuario] = useState("");
  const [confirmacionUsuario, setConfirmacionUsuario] = useState("");
  const [fecha, setFecha] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [riesgo, setRiesgo] = useState("");
  const [guia, setGuia] = useState("");
  const [cupsSeleccionado, setCupsSeleccionado] = useState("");
  const [cupsAgregados, setCupsAgregados] = useState([]);
  const [atencionesGuardadas, setAtencionesGuardadas] = useState([]);
  const [detallesCups, setDetallesCups] = useState([]);
  const [tamizajesGestionGuardados, setTamizajesGestionGuardados] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroMunicipio, setFiltroMunicipio] = useState("");
  const [filtroGuia, setFiltroGuia] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroSeguimientoRiesgo, setFiltroSeguimientoRiesgo] = useState("");
  const [filtroSeguimientoEstado, setFiltroSeguimientoEstado] = useState("");
  const [filtroSeguimientoUsuario, setFiltroSeguimientoUsuario] = useState("");
  const [tamizajeMapaSeleccionado, setTamizajeMapaSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [atencionEditando, setAtencionEditando] = useState(null);
  const [paginaActiva, setPaginaActiva] = useState("home");
  const [vistaActiva, setVistaActiva] = useState("formulario");
  const [atencionMapaSeleccionada, setAtencionMapaSeleccionada] = useState(null);
  const [registrosExpandidos, setRegistrosExpandidos] = useState({});
  const [usuariosDb, setUsuariosDb] = useState([]);
  const [busquedaUsuario, setBusquedaUsuario] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [buscandoUsuarios, setBuscandoUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState("");
  const [usuariosBusquedaRemota, setUsuariosBusquedaRemota] = useState([]);
  const [ultimaActualizacionUsuarios, setUltimaActualizacionUsuarios] = useState("");
  const [modoOffline, setModoOffline] = useState(false);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [precisionGps, setPrecisionGps] = useState("");
  const [fechaGps, setFechaGps] = useState("");
  const [capturandoUbicacion, setCapturandoUbicacion] = useState(false);
  const [latitudGestion, setLatitudGestion] = useState("");
  const [longitudGestion, setLongitudGestion] = useState("");
  const [precisionGestionGps, setPrecisionGestionGps] = useState("");
  const [fechaGestionGps, setFechaGestionGps] = useState("");
  const [capturandoUbicacionGestion, setCapturandoUbicacionGestion] = useState(false);
  const [riesgoGestionSeleccionado, setRiesgoGestionSeleccionado] = useState("");
  const [respuestasGestionRiesgo, setRespuestasGestionRiesgo] = useState({});
  const [datosGestionRiesgo, setDatosGestionRiesgo] = useState({
    edadMeses: "",
    perimetroBraquial: "",
    presionSistolica: "",
    presionDiastolica: "",
    observaciones: "",
  });
  const [adminUsuario, setAdminUsuario] = useState("");
  const [adminClave, setAdminClave] = useState("");
  const [adminAutenticado, setAdminAutenticado] = useState(false);
  const [adminErrorAcceso, setAdminErrorAcceso] = useState("");
  const [adminCargando, setAdminCargando] = useState(false);
  const [adminErrorDatos, setAdminErrorDatos] = useState("");
  const [adminAtencionesRemotas, setAdminAtencionesRemotas] = useState([]);
  const [adminTamizajesRemotos, setAdminTamizajesRemotos] = useState([]);
  const [adminMapaSeleccionado, setAdminMapaSeleccionado] = useState(null);
  const [adminTamizajeMapaSeleccionado, setAdminTamizajeMapaSeleccionado] = useState(null);
  const [eventoInstalacion, setEventoInstalacion] = useState(null);
  const [puedeInstalar, setPuedeInstalar] = useState(false);
  const epsActualUsuario = usuarioSeleccionado?.eps || atencionEditando?.eps_usuario || "";
  const contratoEpsActual = obtenerContratoPorEps(epsActualUsuario);
  const catalogoCupsDisponible = contratoEpsActual
    ? catalogoCups.filter((cups) => cups.contrato_eps === contratoEpsActual)
    : [];
  const etiquetaContratoActual = contratoEpsActual
    ? catalogoCupsDisponible[0]?.eps_contrato || ""
    : "";
  const riesgoGestionConfig = riesgosGestion.find((item) => item.id === riesgoGestionSeleccionado) || null;
  const resultadoGestionRiesgo = evaluarTamizajeGestionRiesgo(
    riesgoGestionConfig,
    respuestasGestionRiesgo,
    datosGestionRiesgo
  );

  const agregarCups = () => {
    if (!cupsSeleccionado) return;

    const yaExiste = cupsAgregados.find((c) => c.codigo === cupsSeleccionado);
    if (yaExiste) {
      alert("Ese CUPS ya fue agregado.");
      return;
    }

    const cupsObj = catalogoCupsDisponible.find((c) => c.codigo === cupsSeleccionado);
    if (cupsObj) {
      setCupsAgregados([...cupsAgregados, cupsObj]);
      setCupsSeleccionado("");
    }
  };

  const eliminarCups = (codigo) => {
    setCupsAgregados(cupsAgregados.filter((c) => c.codigo !== codigo));
  };

  const cargarAtenciones = async () => {
    const atenciones = await db.atenciones.orderBy("id").reverse().toArray();
    const detalles = await db.atencion_cups.toArray();
    setAtencionesGuardadas(atenciones);
    setDetallesCups(detalles);
  };

  const cargarTamizajesGestionRiesgo = async () => {
    const tamizajes = await db.gestion_riesgo_tamizajes.orderBy("id").reverse().toArray();
    setTamizajesGestionGuardados(tamizajes);
  };

  const normalizarUsuario = (row) => {
  const identificacion = String(
    row.identificacion_usuario ??
      row.identificacion ??
      row.numero_documento ??
      row.documento ??
      ""
  ).trim();

  const tipoIdUsuario = String(
    row.tipo_id ?? row.tipo_documento ?? row.tipo_identificacion ?? ""
  ).trim();

  const primerNombre = String(row.primer_nombre ?? row.nombre1 ?? "").trim();
  const segundoNombre = String(row.segundo_nombre ?? row.nombre2 ?? "").trim();
  const primerApellido = String(row.primer_apellido ?? row.apellido1 ?? "").trim();
  const segundoApellido = String(row.segundo_apellido ?? row.apellido2 ?? "").trim();

  const nombreCompleto = String(
    row.nombre_completo ??
      row.nombre ??
      [primerNombre, segundoNombre, primerApellido, segundoApellido]
        .filter(Boolean)
        .join(" ") ??
      ""
  ).trim();

  if (!identificacion) return null;

  return {
    identificacion,
    tipoId: tipoIdUsuario,
    nombreCompleto: nombreCompleto || identificacion,
    eps: String(row.eps ?? row.EPS ?? "").trim(),
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
  };
};

 const cargarUsuarios = async () => {
  try {
    const usuariosLocales = await db.usuarios.toArray();
    const unicosLocales = Array.from(
      new Map((usuariosLocales || []).map((usuario) => [usuario.identificacion, usuario])).values()
    );
    setUsuariosDb(unicosLocales);
  } catch (error) {
    console.error("Error cargando usuarios locales:", error);
  }
};

  const buscarUsuariosRemotos = async (terminoBusqueda) => {
    if (modoOffline || !supabaseConfigurado || !supabase) {
      setUsuariosBusquedaRemota([]);
      return;
    }

    const termino = String(terminoBusqueda || "").trim();
    if (termino.length < 3) {
      setUsuariosBusquedaRemota([]);
      return;
    }

    try {
      setBuscandoUsuarios(true);
      setErrorUsuarios("");

      const terminoEscapado = termino.replace(/[%]/g, "");
      let resultados = [];

      const { data: exactos, error: errorExactos } = await supabase
        .from("usuarios")
        .select("*")
        .eq("identificacion", termino)
        .limit(20);

      if (errorExactos) {
        throw errorExactos;
      }

      resultados = [...(exactos || [])];

      const { data: aproximados, error: errorAproximados } = await supabase
        .from("usuarios")
        .select("*")
        .or(
          `identificacion.ilike.%${terminoEscapado}%,nombre_completo.ilike.%${terminoEscapado}%,primer_nombre.ilike.%${terminoEscapado}%,segundo_nombre.ilike.%${terminoEscapado}%,primer_apellido.ilike.%${terminoEscapado}%,segundo_apellido.ilike.%${terminoEscapado}%,eps.ilike.%${terminoEscapado}%`
        )
        .limit(20);

      if (errorAproximados) {
        throw errorAproximados;
      }

      resultados = [...resultados, ...(aproximados || [])];

      const normalizados = resultados.map(normalizarUsuario).filter(Boolean);
      const unicos = Array.from(
        new Map(normalizados.map((usuario) => [usuario.identificacion, usuario])).values()
      );

      setUsuariosBusquedaRemota(unicos);
    } catch (error) {
      console.error("Error buscando usuarios en línea:", error);
      setErrorUsuarios(`No fue posible consultar usuarios en línea: ${error?.message || error}`);
      setUsuariosBusquedaRemota([]);
    } finally {
      setBuscandoUsuarios(false);
    }
  };
  useEffect(() => {
    const termino = busquedaUsuario.trim();

    if (modoOffline || !termino || termino.length < 3) {
      setUsuariosBusquedaRemota([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      buscarUsuariosRemotos(termino);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [busquedaUsuario, modoOffline]);

  useEffect(() => {
    const iniciarSalida = window.setTimeout(() => {
      setCerrandoSplash(true);
    }, 1800);

    const ocultarSplash = window.setTimeout(() => {
      setMostrarSplash(false);
    }, 2400);

    return () => {
      window.clearTimeout(iniciarSalida);
      window.clearTimeout(ocultarSplash);
    };
  }, []);

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;

    const manejarBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setEventoInstalacion(event);
      setPuedeInstalar(true);
    };

    const manejarAppInstalada = () => {
      setEventoInstalacion(null);
      setPuedeInstalar(false);
    };

    if (isIos && !isStandalone) {
      setPuedeInstalar(true);
    }

    window.addEventListener("beforeinstallprompt", manejarBeforeInstallPrompt);
    window.addEventListener("appinstalled", manejarAppInstalada);

    return () => {
      window.removeEventListener("beforeinstallprompt", manejarBeforeInstallPrompt);
      window.removeEventListener("appinstalled", manejarAppInstalada);
    };
  }, []);

  const actualizarUsuariosDesdeSupabase = async () => {
    if (modoOffline) {
      alert("El modo offline está activado. Desactívalo para actualizar usuarios desde Supabase.");
      return;
    }
    if (!supabaseConfigurado || !supabase) {
      alert("Supabase no está configurado. No es posible actualizar la base local de usuarios.");
      return;
    }

    try {
      setCargandoUsuarios(true);
      setErrorUsuarios("");

      const lote = 1000;
      let desde = 0;
      let todosLosUsuarios = [];
      let continuar = true;

      while (continuar) {
        const { data, error } = await supabase
          .from("usuarios")
          .select("*")
          .range(desde, desde + lote - 1);

        if (error) {
          throw error;
        }

        const filas = data || [];
        todosLosUsuarios = [...todosLosUsuarios, ...filas];

        if (filas.length < lote) {
          continuar = false;
        } else {
          desde += lote;
        }
      }

      const normalizados = todosLosUsuarios.map(normalizarUsuario).filter(Boolean);
      const unicos = Array.from(
        new Map(normalizados.map((usuario) => [usuario.identificacion, usuario])).values()
      );

      await db.transaction("rw", db.usuarios, async () => {
        await db.usuarios.clear();
        if (unicos.length > 0) {
          await db.usuarios.bulkAdd(unicos);
        }
      });

      setUsuariosDb(unicos);
      setUltimaActualizacionUsuarios(new Date().toISOString());
      setUsuariosBusquedaRemota([]);
      alert(`Base local de usuarios actualizada correctamente. Total usuarios: ${unicos.length}.`);
    } catch (error) {
      console.error("Error actualizando usuarios desde Supabase:", error);
      setErrorUsuarios("No fue posible actualizar la base local de usuarios.");
      alert(`Error actualizando usuarios: ${error?.message || error}`);
    } finally {
      setCargandoUsuarios(false);
    }
  };

  const seleccionarUsuario = (usuario) => {
  setUsuarioSeleccionado(usuario);
  setBusquedaUsuario(`${usuario.identificacion} - ${usuario.nombreCompleto}`);
  setIdentificacionUsuario(usuario.identificacion);
  setConfirmacionUsuario(usuario.identificacion);
  setTipoId(usuario.tipoId || "");
};

  const capturarUbicacion = () => {
    if (!navigator.geolocation) {
      alert("Este dispositivo o navegador no permite geolocalización.");
      return;
    }

    setCapturandoUbicacion(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitud(String(position.coords.latitude));
        setLongitud(String(position.coords.longitude));
        setPrecisionGps(String(position.coords.accuracy ?? ""));
        setFechaGps(new Date().toISOString());
        setCapturandoUbicacion(false);
        alert("Ubicación capturada correctamente.");
      },
      (error) => {
        console.error("Error capturando ubicación:", error);
        setCapturandoUbicacion(false);
        alert(`No fue posible capturar la ubicación: ${error?.message || error}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const capturarUbicacionGestionRiesgo = () => {
    if (!navigator.geolocation) {
      alert("Este dispositivo o navegador no permite geolocalización.");
      return;
    }

    setCapturandoUbicacionGestion(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitudGestion(String(position.coords.latitude));
        setLongitudGestion(String(position.coords.longitude));
        setPrecisionGestionGps(
          position.coords.accuracy ? `${Math.round(position.coords.accuracy)} m` : ""
        );
        setFechaGestionGps(new Date().toISOString());
        setCapturandoUbicacionGestion(false);
      },
      (error) => {
        setCapturandoUbicacionGestion(false);
        alert(`No fue posible capturar la ubicación: ${error?.message || error}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };


  useEffect(() => {
    cargarAtenciones();
    cargarTamizajesGestionRiesgo();
    cargarUsuarios();
  }, []);

  useEffect(() => {
    const valorGuardado = localStorage.getItem("modoOfflineGuiasBilingues");
    if (valorGuardado === "true") {
      setModoOffline(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("modoOfflineGuiasBilingues", String(modoOffline));
  }, [modoOffline]);

  useEffect(() => {
    if (!cupsSeleccionado) return;

    const cupsSigueDisponible = catalogoCupsDisponible.some((cups) => cups.codigo === cupsSeleccionado);
    if (!cupsSigueDisponible) {
      setCupsSeleccionado("");
    }
  }, [cupsSeleccionado, catalogoCupsDisponible]);

  useEffect(() => {
    setRespuestasGestionRiesgo({});
    setDatosGestionRiesgo({
      edadMeses: "",
      perimetroBraquial: "",
      presionSistolica: "",
      presionDiastolica: "",
      observaciones: "",
    });
    setLatitudGestion("");
    setLongitudGestion("");
    setPrecisionGestionGps("");
    setFechaGestionGps("");
  }, [riesgoGestionSeleccionado]);


  const obtenerNombreMunicipio = (municipioId) => {
    const municipioObj = municipios.find((m) => String(m.id) === String(municipioId));
    return municipioObj ? municipioObj.nombre : municipioId;
  };

  const obtenerNombreRiesgo = (codigoRiesgo) => {
    const riesgoObj = riesgos.find((r) => r.codigo === codigoRiesgo);
    return riesgoObj ? riesgoObj.nombre : codigoRiesgo;
  };

  const obtenerCupsPorAtencion = (uuidLocal) => {
    return detallesCups.filter((d) => d.atencion_uuid_local === uuidLocal);
  };

  const alternarExpansionRegistro = (id) => {
    setRegistrosExpandidos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const actualizarRespuestaGestionRiesgo = (preguntaKey, valor) => {
    setRespuestasGestionRiesgo((prev) => ({
      ...prev,
      [preguntaKey]: valor,
    }));
  };

  const actualizarDatoGestionRiesgo = (campo, valor) => {
    setDatosGestionRiesgo((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const limpiarGestionRiesgo = () => {
    setRiesgoGestionSeleccionado("");
    setRespuestasGestionRiesgo({});
    setDatosGestionRiesgo({
      edadMeses: "",
      perimetroBraquial: "",
      presionSistolica: "",
      presionDiastolica: "",
      observaciones: "",
    });
    setLatitudGestion("");
    setLongitudGestion("");
    setPrecisionGestionGps("");
    setFechaGestionGps("");
  };

  const usuariosFiltradosLocales = busquedaUsuario.trim()
    ? usuariosDb
        .filter((usuario) => {
          const termino = busquedaUsuario.toLowerCase();
          return (
            String(usuario.identificacion || "").toLowerCase().includes(termino) ||
            String(usuario.nombreCompleto || "").toLowerCase().includes(termino) ||
            String(usuario.eps || "").toLowerCase().includes(termino)
          );
        })
        .slice(0, 8)
    : [];

  const usuariosFiltrados = Array.from(
    new Map(
      [...usuariosFiltradosLocales, ...usuariosBusquedaRemota].map((usuario) => [
        usuario.identificacion,
        usuario,
      ])
    ).values()
  ).slice(0, 8);

  const atencionesFiltradas = atencionesGuardadas.filter((a) => {
    const coincideUsuario = filtroUsuario
      ? String(a.identificacion_usuario ?? "")
          .toLowerCase()
          .includes(filtroUsuario.toLowerCase())
      : true;

    const coincideMunicipio = filtroMunicipio
      ? String(a.municipio_id) === String(filtroMunicipio)
      : true;

    const coincideGuia = filtroGuia
      ? String(a.identificacion_guia) === String(filtroGuia)
      : true;

    const coincideFecha = filtroFecha
      ? String(a.fecha_atencion) === String(filtroFecha)
      : true;

    return coincideUsuario && coincideMunicipio && coincideGuia && coincideFecha;
  });

  const totalAtenciones = atencionesGuardadas.length;
  const totalUsuariosUnicos = new Set(
    atencionesGuardadas.map((a) => String(a.identificacion_usuario || "").trim()).filter(Boolean)
  ).size;
  const totalPendientes = atencionesGuardadas.filter((a) => a.estado_sync === "pendiente").length;
  const totalSincronizadas = atencionesGuardadas.filter((a) => a.estado_sync === "sincronizado").length;
  const totalErroresSync = atencionesGuardadas.filter((a) => a.estado_sync === "error").length;
  const totalCupsRegistrados = detallesCups.length;
  const atencionesConUbicacion = atencionesGuardadas.filter(
    (a) => a.ubicacion_capturada === 1 && a.latitud && a.longitud
  );
  const atencionMapaActiva =
    atencionMapaSeleccionada ||
    atencionesConUbicacion[0] ||
    null;
  const totalTamizajesGestion = tamizajesGestionGuardados.length;
  const totalTamizajesPositivos = tamizajesGestionGuardados.filter((item) => item.es_positivo === 1).length;
  const totalTamizajesPendientes = tamizajesGestionGuardados.filter((item) => item.estado_sync === "pendiente").length;
  const totalTamizajesError = tamizajesGestionGuardados.filter((item) => item.estado_sync === "error").length;
  const totalUsuariosTamizados = new Set(
    tamizajesGestionGuardados.map((item) => String(item.identificacion_usuario || "").trim()).filter(Boolean)
  ).size;

  const contarPorClave = (items, getKey, getLabel = (value) => value) => {
    const mapa = new Map();

    items.forEach((item) => {
      const key = getKey(item);
      if (!key) return;

      const actual = mapa.get(key) || 0;
      mapa.set(key, actual + 1);
    });

    return Array.from(mapa.entries())
      .map(([key, total]) => ({
        key,
        label: getLabel(key),
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  const estadisticasPorMunicipio = contarPorClave(
    atencionesGuardadas,
    (item) => String(item.municipio_id || ""),
    (key) => obtenerNombreMunicipio(key)
  );

  const estadisticasPorRiesgo = contarPorClave(
    atencionesGuardadas,
    (item) => String(item.identificacion_riesgo || ""),
    (key) => obtenerNombreRiesgo(key)
  );

  const estadisticasPorGuia = contarPorClave(
    atencionesGuardadas,
    (item) => String(item.identificacion_guia || ""),
    (key) => guias.find((g) => g.identificacion === key)?.nombre || key
  );

  const estadisticasTamizajesPorRiesgo = contarPorClave(
    tamizajesGestionGuardados,
    (item) => String(item.riesgo_codigo || ""),
    (key) => riesgosGestion.find((item) => item.id === key)?.nombre || key
  );

  const tamizajesSeguimientoFiltrados = tamizajesGestionGuardados.filter((item) => {
    const coincideRiesgo = filtroSeguimientoRiesgo
      ? String(item.riesgo_codigo || "") === String(filtroSeguimientoRiesgo)
      : true;

    const coincideUsuario = filtroSeguimientoUsuario
      ? `${String(item.identificacion_usuario || "")} ${String(item.nombre_usuario || "")}`
          .toLowerCase()
          .includes(filtroSeguimientoUsuario.toLowerCase())
      : true;

    const coincideEstado = filtroSeguimientoEstado
      ? filtroSeguimientoEstado === "positivo"
        ? item.es_positivo === 1
        : filtroSeguimientoEstado === "pendiente"
          ? item.estado_sync === "pendiente"
          : filtroSeguimientoEstado === "sincronizado"
            ? item.estado_sync === "sincronizado"
            : filtroSeguimientoEstado === "error"
              ? item.estado_sync === "error"
              : true
      : true;

    return coincideRiesgo && coincideUsuario && coincideEstado;
  });
  const tamizajesSeguimientoConUbicacion = tamizajesSeguimientoFiltrados.filter(
    (item) => Number(item.ubicacion_capturada) === 1 && item.latitud && item.longitud
  );
  const tamizajeMapaActivo = tamizajeMapaSeleccionado || tamizajesSeguimientoConUbicacion[0] || null;
  const tamizajeMapaBounds = calcularMapaBounds(tamizajesSeguimientoConUbicacion);
  const adminAtencionesConUbicacion = adminAtencionesRemotas.filter(
    (item) => Number(item.ubicacion_capturada) === 1 && item.latitud && item.longitud
  );
  const adminMapaActivo = adminMapaSeleccionado || adminAtencionesConUbicacion[0] || null;
  const adminMapaBounds = calcularMapaBounds(adminAtencionesConUbicacion);
  const adminTamizajesConUbicacion = adminTamizajesRemotos.filter(
    (item) => Number(item.ubicacion_capturada) === 1 && item.latitud && item.longitud
  );
  const adminTamizajeMapaActivo =
    adminTamizajeMapaSeleccionado || adminTamizajesConUbicacion[0] || null;
  const adminTamizajeMapaBounds = calcularMapaBounds(adminTamizajesConUbicacion);
  const adminTotalAtenciones = adminAtencionesRemotas.length;
  const adminTotalTamizajes = adminTamizajesRemotos.length;
  const adminTotalCups = adminAtencionesRemotas.reduce(
    (total, item) => total + Number(item.total_cups || 0),
    0
  );
  const adminTotalProfesionales = new Set(
    adminAtencionesRemotas.map((item) => String(item.identificacion_guia || "").trim()).filter(Boolean)
  ).size;
  const adminTamizajesPositivos = adminTamizajesRemotos.filter((item) => Number(item.es_positivo) === 1).length;

  const adminEstadisticasPorMunicipio = contarPorClave(
    adminAtencionesRemotas,
    (item) => String(item.municipio_id || ""),
    (key) => obtenerNombreMunicipio(key)
  );

  const adminEstadisticasPorRiesgo = contarPorClave(
    adminAtencionesRemotas,
    (item) => String(item.identificacion_riesgo || ""),
    (key) => obtenerNombreRiesgo(key)
  );

  const adminEstadisticasPorGuia = contarPorClave(
    adminAtencionesRemotas,
    (item) => String(item.identificacion_guia || ""),
    (key) => adminAtencionesRemotas.find((row) => String(row.identificacion_guia || "") === String(key))?.nombre_guia || key
  );

  const adminTamizajesPorRiesgo = contarPorClave(
    adminTamizajesRemotos,
    (item) => String(item.riesgo_codigo || ""),
    (key) => riesgosGestion.find((item) => item.id === key)?.nombre || key
  );

  const eliminarAtencion = async (atencion) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar la atención del usuario ${atencion.identificacion_usuario} del día ${atencion.fecha_atencion}?`
    );

    if (!confirmar) return;

    await db.atenciones.delete(atencion.id);
    await db.atencion_cups
      .where("atencion_uuid_local")
      .equals(atencion.uuid_local)
      .delete();

    await cargarAtenciones();
    alert("Atención eliminada correctamente.");
  };

  const iniciarEdicion = (atencion) => {
    const cupsDeLaAtencion = obtenerCupsPorAtencion(atencion.uuid_local).map((c) => ({
      codigo: c.codigo_cups,
      descripcion: c.descripcion_cups,
      intervencion: c.intervencion,
    }));

    setModoEdicion(true);
    setVistaActiva("formulario");
    setAtencionEditando(atencion);
    setUsuarioSeleccionado(null);
    setBusquedaUsuario(atencion.identificacion_usuario || "");
    setTipoId(atencion.tipo_id || "");
    setIdentificacionUsuario(atencion.identificacion_usuario || "");
    setConfirmacionUsuario(atencion.confirmacion_usuario || "");
    setFecha(atencion.fecha_atencion || "");
    setMunicipio(String(atencion.municipio_id || ""));
    setRiesgo(atencion.identificacion_riesgo || "");
    setGuia(atencion.identificacion_guia || "");
    setLatitud(atencion.latitud ? String(atencion.latitud) : "");
    setLongitud(atencion.longitud ? String(atencion.longitud) : "");
    setPrecisionGps(atencion.precision_gps ? String(atencion.precision_gps) : "");
    setFechaGps(atencion.fecha_gps || "");
    setCupsSeleccionado("");
    setCupsAgregados(cupsDeLaAtencion);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const limpiarFormulario = () => {
    setTipoId("");
    setIdentificacionUsuario("");
    setConfirmacionUsuario("");
    setFecha("");
    setMunicipio("");
    setRiesgo("");
    setGuia("");
    setLatitud("");
    setLongitud("");
    setPrecisionGps("");
    setFechaGps("");
    setCupsSeleccionado("");
    setCupsAgregados([]);
    setBusquedaUsuario("");
    setUsuarioSeleccionado(null);
    setModoEdicion(false);
    setAtencionEditando(null);
  };

  const actualizarAtencion = async () => {
    try {
      if (!atencionEditando) return;

      if (!tipoId || !identificacionUsuario || !fecha || !municipio || !riesgo || !guia) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      if (cupsAgregados.length === 0) {
        alert("Debes agregar al menos un CUPS.");
        return;
      }

      const confirmacionFinal = confirmacionUsuario || identificacionUsuario;
      const guiaObj = guias.find((g) => g.identificacion === guia);

      if (!guiaObj) {
        alert("No se encontró la guía seleccionada.");
        return;
      }

      await db.atenciones.update(atencionEditando.id, {
        tipo_id: tipoId,
        identificacion_usuario: identificacionUsuario,
        nombre_usuario: usuarioSeleccionado?.nombreCompleto || atencionEditando.nombre_usuario || "",
        eps_usuario: usuarioSeleccionado?.eps || atencionEditando.eps_usuario || "",
        confirmacion_usuario: confirmacionFinal,
        fecha_atencion: fecha,
        municipio_id: municipio,
        identificacion_riesgo: riesgo,
        identificacion_guia: guiaObj.identificacion,
        nombre_guia: guiaObj.nombre,
        latitud: latitud || null,
        longitud: longitud || null,
        precision_gps: precisionGps || null,
        fecha_gps: fechaGps || null,
        ubicacion_capturada: latitud && longitud ? 1 : 0,
        estado_sync: "pendiente",
        sincronizado: 0,
        fecha_sincronizacion: null,
        mensaje_error_sync: null,
      });

      await db.atencion_cups
        .where("atencion_uuid_local")
        .equals(atencionEditando.uuid_local)
        .delete();

      for (const c of cupsAgregados) {
        await db.atencion_cups.add({
          atencion_uuid_local: atencionEditando.uuid_local,
          codigo_cups: c.codigo,
          descripcion_cups: c.descripcion,
          intervencion: c.intervencion,
          cantidad: 1,
        });
      }

      await cargarAtenciones();
      setVistaActiva("registros");
      limpiarFormulario();
      alert("Atención actualizada correctamente.");
    } catch (error) {
      console.error("Error actualizando atención:", error);
      alert(`Error al actualizar la atención: ${error?.message || error}`);
    }
  };

  const sincronizarPendientes = async () => {
    if (modoOffline) {
      alert("El modo offline está activado. Desactívalo para sincronizar con Supabase.");
      return;
    }
    if (!supabaseConfigurado || !supabase) {
      alert(
        "Supabase aún no está configurado. Debes editar src/services/supabase.js con tu URL y tu ANON KEY."
      );
      return;
    }

    const pendientes = await db.atenciones.where("sincronizado").equals(0).toArray();
    const pendientesTamizajes = await db.gestion_riesgo_tamizajes.where("sincronizado").equals(0).toArray();

    if (pendientes.length === 0 && pendientesTamizajes.length === 0) {
      alert("No hay registros pendientes por sincronizar.");
      return;
    }

    let sincronizadasOk = 0;
    let sincronizadasError = 0;

    for (const atencion of pendientes) {
      try {
        const cupsDeLaAtencion = await db.atencion_cups
          .where("atencion_uuid_local")
          .equals(atencion.uuid_local)
          .toArray();

const payloadAtencion = {
  uuid_local: atencion.uuid_local,
  tipo_id: atencion.tipo_id,
  identificacion_usuario: atencion.identificacion_usuario,
  nombre_usuario: atencion.nombre_usuario || null,
  eps_usuario: atencion.eps_usuario || null,
  confirmacion_usuario: atencion.confirmacion_usuario,
  fecha_atencion: atencion.fecha_atencion,
  municipio_id: Number(atencion.municipio_id),
  identificacion_riesgo: atencion.identificacion_riesgo,
  identificacion_guia: atencion.identificacion_guia,
  nombre_guia: atencion.nombre_guia,
  latitud: atencion.latitud || null,
  longitud: atencion.longitud || null,
  precision_gps: atencion.precision_gps || null,
  fecha_gps: atencion.fecha_gps || null,
  ubicacion_capturada: atencion.ubicacion_capturada ?? 0,
  fecha_creacion_local: atencion.fecha_creacion_local,
};

        const { error: errorAtencion } = await supabase
          .from("atenciones")
          .upsert(payloadAtencion, { onConflict: "uuid_local" });

        if (errorAtencion) {
          throw errorAtencion;
        }

        const { error: errorDeleteCups } = await supabase
          .from("atencion_cups")
          .delete()
          .eq("atencion_uuid_local", atencion.uuid_local);

        if (errorDeleteCups) {
          throw errorDeleteCups;
        }

        if (cupsDeLaAtencion.length > 0) {
          const payloadCups = cupsDeLaAtencion.map((c) => ({
            atencion_uuid_local: c.atencion_uuid_local,
            tipo_id_usuario: atencion.tipo_id,
            identificacion_usuario: atencion.identificacion_usuario,
            codigo_cups: c.codigo_cups,
            descripcion_cups: c.descripcion_cups,
            intervencion: c.intervencion,
            cantidad: c.cantidad ?? 1,
            fecha_atencion: atencion.fecha_atencion,
            documento_guia: atencion.identificacion_guia,
            identificacion_riesgo: atencion.identificacion_riesgo,
          }));

          const { data: dataCups, error: errorCups } = await supabase
            .from("atencion_cups")
            .insert(payloadCups)
            .select();

          if (errorCups) {
            throw errorCups;
          }

          console.log("CUPS enviados a Supabase:", payloadCups);
          console.log("CUPS guardados en Supabase:", dataCups);
        }

        await db.atenciones.update(atencion.id, {
          sincronizado: 1,
          estado_sync: "sincronizado",
          fecha_sincronizacion: new Date().toISOString(),
          mensaje_error_sync: null,
        });

        console.log("Atención sincronizada correctamente:", atencion.uuid_local);

        sincronizadasOk += 1;
      } catch (error) {
        await db.atenciones.update(atencion.id, {
          sincronizado: 0,
          estado_sync: "error",
          mensaje_error_sync: String(error?.message || error || "Error desconocido de sincronización"),
        });
        console.error("Error sincronizando atención:", error);
        sincronizadasError += 1;
      }
    }

    for (const tamizaje of pendientesTamizajes) {
      try {
        const payloadTamizaje = {
          uuid_local: tamizaje.uuid_local,
          identificacion_usuario: tamizaje.identificacion_usuario,
          nombre_usuario: tamizaje.nombre_usuario || null,
          eps_usuario: tamizaje.eps_usuario || null,
          riesgo_codigo: tamizaje.riesgo_codigo,
          riesgo_nombre: tamizaje.riesgo_nombre,
          descripcion_riesgo: tamizaje.descripcion_riesgo || null,
          respuestas_json: tamizaje.respuestas_json || null,
          total_preguntas: Number(tamizaje.total_preguntas || 0),
          respuestas_positivas: Number(tamizaje.respuestas_positivas || 0),
          porcentaje_positivo: Number(tamizaje.porcentaje_positivo || 0),
          clasificacion: tamizaje.clasificacion || null,
          es_positivo: Number(tamizaje.es_positivo || 0),
          detalle_resultado: tamizaje.detalle_resultado || null,
          edad_meses: tamizaje.edad_meses ?? null,
          perimetro_braquial: tamizaje.perimetro_braquial ?? null,
          presion_sistolica: tamizaje.presion_sistolica ?? null,
          presion_diastolica: tamizaje.presion_diastolica ?? null,
          latitud: tamizaje.latitud ?? null,
          longitud: tamizaje.longitud ?? null,
          precision_gps: tamizaje.precision_gps || null,
          fecha_gps: tamizaje.fecha_gps || null,
          ubicacion_capturada: Number(tamizaje.ubicacion_capturada || 0),
          observaciones: tamizaje.observaciones || null,
          fecha_tamizaje: tamizaje.fecha_tamizaje,
        };

        const { error: errorTamizaje } = await supabase
          .from("gestion_riesgo_tamizajes")
          .upsert(payloadTamizaje, { onConflict: "uuid_local" });

        if (errorTamizaje) {
          throw errorTamizaje;
        }

        await db.gestion_riesgo_tamizajes.update(tamizaje.id, {
          sincronizado: 1,
          estado_sync: "sincronizado",
          fecha_sincronizacion: new Date().toISOString(),
          mensaje_error_sync: null,
        });

        sincronizadasOk += 1;
      } catch (error) {
        await db.gestion_riesgo_tamizajes.update(tamizaje.id, {
          sincronizado: 0,
          estado_sync: "error",
          mensaje_error_sync: String(error?.message || error || "Error desconocido de sincronización"),
        });
        console.error("Error sincronizando tamizaje de gestión de riesgo:", error);
        sincronizadasError += 1;
      }
    }

    await cargarAtenciones();
    await cargarTamizajesGestionRiesgo();
    alert(
      `Sincronización finalizada. Exitosas: ${sincronizadasOk}. Con error: ${sincronizadasError}.`
    );
  };

  const guardarAtencion = async () => {
    try {
      if (!tipoId || !identificacionUsuario || !fecha || !municipio || !riesgo || !guia) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      if (cupsAgregados.length === 0) {
        alert("Debes agregar al menos un CUPS.");
        return;
      }

      const confirmacionFinal = confirmacionUsuario || identificacionUsuario;
      const guiaObj = guias.find((g) => g.identificacion === guia);

      if (!guiaObj) {
        alert("No se encontró la guía seleccionada.");
        return;
      }

      const uuidLocal = generarUuidLocal();

      await db.atenciones.add({
        uuid_local: uuidLocal,
        tipo_id: tipoId,
        identificacion_usuario: identificacionUsuario,
        nombre_usuario: usuarioSeleccionado?.nombreCompleto || "",
        eps_usuario: usuarioSeleccionado?.eps || "",
        confirmacion_usuario: confirmacionFinal,
        fecha_atencion: fecha,
        municipio_id: municipio,
        identificacion_riesgo: riesgo,
        identificacion_guia: guiaObj.identificacion,
        nombre_guia: guiaObj.nombre,
        latitud: latitud || null,
        longitud: longitud || null,
        precision_gps: precisionGps || null,
        fecha_gps: fechaGps || null,
        ubicacion_capturada: latitud && longitud ? 1 : 0,
        sincronizado: 0,
        estado_sync: "pendiente",
        fecha_creacion_local: new Date().toISOString(),
        fecha_sincronizacion: null,
        mensaje_error_sync: null,
      });

      for (const c of cupsAgregados) {
        await db.atencion_cups.add({
          atencion_uuid_local: uuidLocal,
          codigo_cups: c.codigo,
          descripcion_cups: c.descripcion,
          intervencion: c.intervencion,
          cantidad: 1,
        });
      }

      await cargarAtenciones();
      alert("Atención guardada localmente.");
      setVistaActiva("registros");
      limpiarFormulario();
    } catch (error) {
      console.error("Error guardando atención localmente:", error);
      alert(`Error al guardar localmente: ${error?.message || error}`);
    }
  };

  const guardarTamizajeGestionRiesgo = async () => {
    try {
      if (!usuarioSeleccionado) {
        alert("Debes seleccionar un usuario para guardar el tamizaje.");
        return;
      }

      if (!riesgoGestionConfig || !resultadoGestionRiesgo) {
        alert("Debes seleccionar un riesgo y completar el tamizaje.");
        return;
      }

      const uuidLocal = generarUuidLocal();

      await db.gestion_riesgo_tamizajes.add({
        uuid_local: uuidLocal,
        identificacion_usuario: usuarioSeleccionado.identificacion,
        nombre_usuario: usuarioSeleccionado.nombreCompleto || "",
        eps_usuario: usuarioSeleccionado.eps || "",
        riesgo_codigo: riesgoGestionConfig.id,
        riesgo_nombre: riesgoGestionConfig.nombre,
        descripcion_riesgo: riesgoGestionConfig.descripcion,
        respuestas_json: JSON.stringify(respuestasGestionRiesgo),
        total_preguntas: resultadoGestionRiesgo.totalPreguntas,
        respuestas_positivas: resultadoGestionRiesgo.respuestasPositivas,
        porcentaje_positivo: Number((resultadoGestionRiesgo.porcentajePositivo || 0).toFixed(4)),
        clasificacion: resultadoGestionRiesgo.clasificacion,
        es_positivo: resultadoGestionRiesgo.esPositivo ? 1 : 0,
        detalle_resultado: resultadoGestionRiesgo.detalle,
        edad_meses: datosGestionRiesgo.edadMeses ? Number(datosGestionRiesgo.edadMeses) : null,
        perimetro_braquial: datosGestionRiesgo.perimetroBraquial ? Number(datosGestionRiesgo.perimetroBraquial) : null,
        presion_sistolica: datosGestionRiesgo.presionSistolica ? Number(datosGestionRiesgo.presionSistolica) : null,
        presion_diastolica: datosGestionRiesgo.presionDiastolica ? Number(datosGestionRiesgo.presionDiastolica) : null,
        latitud: latitudGestion || null,
        longitud: longitudGestion || null,
        precision_gps: precisionGestionGps || null,
        fecha_gps: fechaGestionGps || null,
        ubicacion_capturada: latitudGestion && longitudGestion ? 1 : 0,
        observaciones: datosGestionRiesgo.observaciones || "",
        fecha_tamizaje: new Date().toISOString(),
        sincronizado: 0,
        estado_sync: "pendiente",
        fecha_sincronizacion: null,
        mensaje_error_sync: null,
      });

      await cargarTamizajesGestionRiesgo();
      alert("Tamizaje de gestión de riesgo guardado localmente.");
      limpiarGestionRiesgo();
    } catch (error) {
      console.error("Error guardando tamizaje de gestión de riesgo:", error);
      alert(`Error al guardar el tamizaje: ${error?.message || error}`);
    }
  };

  const cargarDashboardAdministrador = async () => {
    if (!supabaseConfigurado || !supabase) {
      setAdminErrorDatos("Supabase no está configurado para consultar el tablero administrador.");
      return;
    }

    try {
      setAdminCargando(true);
      setAdminErrorDatos("");

      const [{ data: dataAtenciones, error: errorAtenciones }, { data: dataTamizajes, error: errorTamizajes }] =
        await Promise.all([
          supabase
            .from("atenciones")
            .select("*")
            .order("fecha_atencion", { ascending: false }),
          supabase
            .from("gestion_riesgo_tamizajes")
            .select("*")
            .order("fecha_tamizaje", { ascending: false }),
        ]);

      if (errorAtenciones) {
        throw errorAtenciones;
      }

      if (errorTamizajes) {
        throw errorTamizajes;
      }

      const cupsPorAtencion = await Promise.all(
        (dataAtenciones || []).map(async (atencion) => {
          const { count, error } = await supabase
            .from("atencion_cups")
            .select("*", { count: "exact", head: true })
            .eq("atencion_uuid_local", atencion.uuid_local);

          if (error) {
            throw error;
          }

          return {
            ...atencion,
            total_cups: count || 0,
          };
        })
      );

      setAdminAtencionesRemotas(cupsPorAtencion);
      setAdminTamizajesRemotos(dataTamizajes || []);
      setAdminMapaSeleccionado(cupsPorAtencion.find((item) => Number(item.ubicacion_capturada) === 1 && item.latitud && item.longitud) || null);
      setAdminTamizajeMapaSeleccionado((dataTamizajes || []).find((item) => Number(item.ubicacion_capturada) === 1 && item.latitud && item.longitud) || null);
    } catch (error) {
      console.error("Error cargando dashboard administrador:", error);
      setAdminErrorDatos(`No fue posible cargar la información administrativa: ${error?.message || error}`);
    } finally {
      setAdminCargando(false);
    }
  };

  const ingresarAdministrador = async () => {
    if (adminUsuario.trim() !== ADMIN_USERNAME || adminClave !== ADMIN_PASSWORD) {
      setAdminAutenticado(false);
      setAdminErrorAcceso("Usuario o clave de administrador inválidos.");
      return;
    }

    setAdminErrorAcceso("");
    setAdminAutenticado(true);
    await cargarDashboardAdministrador();
  };

  const salirAdministrador = () => {
    setAdminAutenticado(false);
    setAdminUsuario("");
    setAdminClave("");
    setAdminErrorAcceso("");
    setAdminErrorDatos("");
    setAdminAtencionesRemotas([]);
    setAdminTamizajesRemotos([]);
    setAdminMapaSeleccionado(null);
    setAdminTamizajeMapaSeleccionado(null);
  };

  const instalarAplicacion = async () => {
    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;

    if (isStandalone) {
      alert("La aplicación ya está instalada en este dispositivo.");
      return;
    }

    if (eventoInstalacion) {
      eventoInstalacion.prompt();
      const resultado = await eventoInstalacion.userChoice;

      if (resultado?.outcome === "accepted") {
        setEventoInstalacion(null);
        setPuedeInstalar(false);
      }
      return;
    }

    if (isIos) {
      alert("En iPhone o iPad, abre el menú Compartir de Safari y luego pulsa 'Agregar a pantalla de inicio' para instalar la app.");
      return;
    }

    alert("Si tu navegador es compatible, usa el menú del navegador y selecciona la opción para instalar esta aplicación.");
  };

  const encabezadoPagina =
    paginaActiva === "consulta"
      ? {
          titulo: "Consulta de Usuario",
          descripcion: "Busca una persona en la base de datos y consulta su información disponible.",
        }
      : paginaActiva === "estadisticas"
        ? {
            titulo: "Estadísticas",
            descripcion: "Consulta el resumen local de atenciones, usuarios y CUPS registrados.",
          }
        : paginaActiva === "gestion-riesgo"
          ? {
              titulo: "Gestión de Riesgo",
              descripcion: "Tamizaje comunitario orientador para identificar posibles usuarios a captar.",
            }
          : paginaActiva === "admin"
            ? {
                titulo: "Administrador",
                descripcion: "Panel consolidado de todos los profesionales, seguimientos y ubicaciones sincronizadas en Supabase.",
              }
          : paginaActiva === "seguimiento-riesgo"
            ? {
                titulo: "Seguimiento de Riesgo",
                descripcion: "Consulta los tamizajes guardados, prioriza casos positivos y revisa su estado de sincronización.",
              }
        : paginaActiva === "mapa"
          ? {
              titulo: "Mapa de Ubicaciones",
              descripcion: "Visualiza en el mapa las ubicaciones capturadas durante las atenciones registradas.",
            }
        : paginaActiva === "registro"
          ? {
              titulo: "Registro de Atención",
              descripcion: "Guías bilingües · operación comunitaria · captura local y sincronización",
            }
          : {
              titulo: "Guías Bilingües",
              descripcion: "Selecciona el módulo que deseas usar dentro de la aplicación.",
            };

  if (mostrarSplash) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          boxSizing: "border-box",
          background:
            "radial-gradient(circle at top, rgba(14,165,233,0.18), transparent 32%), linear-gradient(180deg, #eef8f7 0%, #f7fbfb 52%, #f8fafc 100%)",
          opacity: cerrandoSplash ? 0 : 1,
          transition: "opacity 0.55s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            display: "grid",
            justifyItems: "center",
            gap: "18px",
            transform: cerrandoSplash ? "scale(1.06) translateY(-10px)" : "scale(1) translateY(0px)",
            opacity: cerrandoSplash ? 0 : 1,
            transition: "transform 0.7s ease, opacity 0.55s ease",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(244,249,250,0.96) 100%)",
              boxShadow: "0 24px 50px rgba(15,23,42,0.14)",
              border: "1px solid rgba(203,213,225,0.72)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/logo.jpeg"
              alt="Unidad Medica Wayuu Anouta Wakuaipa IPSI"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ textAlign: "center", display: "grid", gap: "6px" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#0f766e",
              }}
            >
              Bienvenido
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                letterSpacing: "-0.04em",
                color: "#0f172a",
              }}
            >
              Guías Bilingües
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#475569",
                lineHeight: "1.6",
              }}
            >
              Cargando panel operativo y módulos de atención comunitaria
            </div>
          </div>
          <div
            style={{
              width: "140px",
              height: "6px",
              borderRadius: "999px",
              backgroundColor: "rgba(148,163,184,0.22)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: cerrandoSplash ? "100%" : "76%",
                height: "100%",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #0f766e 0%, #0ea5e9 100%)",
                transition: "width 1.8s ease",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(14,165,233,0.14), transparent 28%), radial-gradient(circle at top right, rgba(15,118,110,0.12), transparent 24%), linear-gradient(180deg, #eef8f7 0%, #f6fbfb 30%, #f8fafc 100%)",
        display: "flex",
        justifyContent: "center",
        padding: "18px 10px 28px 10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "472px",
          minHeight: "100vh",
          padding: "18px 15px 24px 15px",
          fontFamily: "\"Avenir Next\", \"Segoe UI\", sans-serif",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.68) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxSizing: "border-box",
          borderRadius: "32px",
          border: "1px solid rgba(255,255,255,0.82)",
          boxShadow: "0 26px 64px rgba(15,23,42,0.14)",
        }}
      >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "18px",
          padding: "20px 18px 22px 18px",
          borderRadius: "28px",
          background: "linear-gradient(135deg, #0f766e 0%, #0d9488 36%, #0ea5e9 100%)",
          color: "#ffffff",
          boxShadow: "0 22px 36px rgba(15,118,110,0.24)",
          border: "1px solid rgba(255,255,255,0.24)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-34px",
            right: "-26px",
            width: "140px",
            height: "140px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-42px",
            left: "-24px",
            width: "120px",
            height: "120px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <span
            style={{
              ...INLINE_BADGE_STYLE,
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor: modoOffline ? "#fff7ed" : "#dcfce7",
              color: modoOffline ? "#9a3412" : "#166534",
              border: `1px solid ${modoOffline ? "#fdba74" : "#86efac"}`,
              backdropFilter: "blur(8px)",
              boxShadow: modoOffline
                ? "0 6px 14px rgba(245,158,11,0.14)"
                : "0 6px 14px rgba(22,163,74,0.14)",
            }}
          >
            {modoOffline ? "OFFLINE ACTIVADO" : "EN LÍNEA"}
          </span>
        </div>
        <div style={{ fontSize: "12px", opacity: 0.92, marginBottom: "4px", textAlign: "center" }}>
          Aplicación móvil
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              padding: "5px 11px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: "bold",
              backgroundColor: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.24)",
              backdropFilter: "blur(8px)",
            }}
          >
            Versión: {BUILD_LABEL}
          </span>
        </div>
        <h1
          style={{
            fontSize: "23px",
            margin: 0,
            textAlign: "center",
            lineHeight: "1.08",
            color: "#ffffff",
            letterSpacing: "-0.04em",
          }}
        >
          {encabezadoPagina.titulo}
        </h1>
        <div style={{ fontSize: "12px", opacity: 0.95, textAlign: "center", marginTop: "9px", lineHeight: "1.6" }}>
          {encabezadoPagina.descripcion}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
          <button
            onClick={instalarAplicacion}
            style={{
              minHeight: "40px",
              padding: "10px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.28)",
              background: puedeInstalar ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.12)",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "12px",
              letterSpacing: "0.02em",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
            }}
          >
            {puedeInstalar ? "Instalar app en el telefono" : "Como instalar la app"}
          </button>
        </div>
      </div>
      {paginaActiva !== "home" && (
        <div style={{ ...CARD_STYLE, padding: "10px", marginBottom: "14px" }}>
          <button
            onClick={() => setPaginaActiva("home")}
            style={{
              minHeight: "42px",
              borderRadius: "12px",
              border: "1px solid #d6deea",
              backgroundColor: "#ffffff",
              color: "#334155",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Volver al inicio
          </button>
        </div>
      )}
      {paginaActiva === "registro" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "14px",
          }}
        >
          <button
            onClick={() => setVistaActiva("formulario")}
            style={{
              minHeight: "50px",
              borderRadius: "14px",
              border: vistaActiva === "formulario" ? "1px solid #0f766e" : "1px solid #d6deea",
              background: vistaActiva === "formulario" ? "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)" : "#ffffff",
              color: vistaActiva === "formulario" ? "#ffffff" : "#334155",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow: vistaActiva === "formulario" ? "0 8px 18px rgba(15,118,110,0.22)" : "0 4px 12px rgba(15,23,42,0.05)",
            }}
          >
            Nueva atención
          </button>

          <button
            onClick={() => setVistaActiva("registros")}
            style={{
              minHeight: "50px",
              borderRadius: "14px",
              border: vistaActiva === "registros" ? "1px solid #0f766e" : "1px solid #d6deea",
              background: vistaActiva === "registros" ? "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)" : "#ffffff",
              color: vistaActiva === "registros" ? "#ffffff" : "#334155",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow: vistaActiva === "registros" ? "0 8px 18px rgba(15,118,110,0.22)" : "0 4px 12px rgba(15,23,42,0.05)",
            }}
          >
            Registros
          </button>
        </div>
      )}
      {paginaActiva === "registro" && modoEdicion && (
        <div
          style={{
            marginBottom: "16px",
            padding: "14px 16px",
            background: "linear-gradient(135deg, #fff7ed 0%, #fffbeb 100%)",
            border: "1px solid #fed7aa",
            borderRadius: "16px",
            boxShadow: "0 8px 18px rgba(245,158,11,0.12)",
            color: "#9a3412",
            lineHeight: "1.45",
          }}
        >
          <strong>Modo edición activo.</strong> Estás editando la atención del usuario {atencionEditando?.identificacion_usuario}.
        </div>
      )}

      <div style={{ display: "grid", gap: "10px", width: "100%" }}>
        {paginaActiva === "home" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <HomeActionCard
                icon={<DatabaseIcon />}
                title="Consulta de usuario"
                description="Busca una persona en la base local o en línea."
                accent="linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)"
                onClick={() => setPaginaActiva("consulta")}
              />
              <HomeActionCard
                icon={<RegisterIcon />}
                title="Registro de atención"
                description="Registra atenciones, CUPS y ubicación."
                accent="linear-gradient(135deg, #0f766e 0%, #0d9488 100%)"
                onClick={() => {
                  setPaginaActiva("registro");
                  setVistaActiva("formulario");
                }}
              />
              <HomeActionCard
                icon={<StatsIcon />}
                title="Estadísticas"
                description="Revisa indicadores y resumen operativo."
                accent="linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)"
                onClick={() => setPaginaActiva("estadisticas")}
              />
              <HomeActionCard
                icon={<MapIcon />}
                title="Mapa de ubicaciones"
                description="Explora puntos capturados en el territorio."
                accent="linear-gradient(135deg, #ea580c 0%, #f97316 100%)"
                onClick={() => {
                  setAtencionMapaSeleccionada(atencionesConUbicacion[0] || null);
                  setPaginaActiva("mapa");
                }}
              />
              <HomeActionCard
                icon={<RiskManagementIcon />}
                title="Gestión de riesgo"
                description="Tamiza signos de alarma y posibles captaciones prioritarias."
                accent="linear-gradient(135deg, #be123c 0%, #e11d48 100%)"
                onClick={() => setPaginaActiva("gestion-riesgo")}
              />
              <HomeActionCard
                icon={<FollowUpIcon />}
                title="Seguimiento"
                description="Revisa tamizajes positivos, pendientes y prioridades por riesgo."
                accent="linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)"
                onClick={() => setPaginaActiva("seguimiento-riesgo")}
              />
              <HomeActionCard
                icon={<AdminIcon />}
                title="Administrador"
                description="Consolida la operación de todos los profesionales desde Supabase."
                accent="linear-gradient(135deg, #111827 0%, #334155 100%)"
                onClick={() => setPaginaActiva("admin")}
              />
            </div>

            <div
              style={{
                ...CARD_STYLE,
                padding: "18px",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(241,249,248,0.98) 100%)",
              }}
            >
              <div style={{ display: "grid", gap: "8px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    width: "fit-content",
                    padding: "7px 12px",
                    borderRadius: "999px",
                    backgroundColor: "#ecfeff",
                    color: "#0f766e",
                    fontSize: "11px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  Panel principal
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", letterSpacing: "-0.04em" }}>
                  Centro de control operativo
                </div>
                <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>
                  Accede rápidamente a consulta de usuarios, registro de atención, estadísticas y mapa de ubicaciones desde un solo panel.
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
                <div style={DASHBOARD_METRIC_STYLE}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>
                    Atenciones
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginTop: "4px" }}>
                    {totalAtenciones}
                  </div>
                </div>
                <div style={DASHBOARD_METRIC_STYLE}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>
                    Usuarios
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginTop: "4px" }}>
                    {totalUsuariosUnicos}
                  </div>
                </div>
                <div style={DASHBOARD_METRIC_STYLE}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>
                    CUPS
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginTop: "4px" }}>
                    {totalCupsRegistrados}
                  </div>
                </div>
                <div style={DASHBOARD_METRIC_STYLE}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "bold", textTransform: "uppercase" }}>
                    Mapa
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginTop: "4px" }}>
                    {atencionesConUbicacion.length}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                ...CARD_STYLE,
                width: "calc(100% - 24px)",
                padding: "14px 16px",
                textAlign: "center",
                display: "grid",
                gap: "4px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(241,245,249,0.96) 100%)",
                border: "1px solid rgba(203,213,225,0.85)",
                boxShadow: "0 12px 22px rgba(15,23,42,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: "bold",
                }}
              >
                Disenado y desarrollado por
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#0f172a",
                  fontWeight: "bold",
                  letterSpacing: "-0.02em",
                }}
              >
                Magister en Gestion de Servicios de Salud
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: "1.5",
                }}
              >
                Luis Gamarra
              </div>
            </div>
          </>
        )}

        {paginaActiva === "consulta" && (
          <>
            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Consulta de usuario</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Busca en la base local del dispositivo o en la consulta en línea para ver la información disponible.
                </div>
              </div>

              <div
                style={{
                  ...SOFT_PANEL_STYLE,
                  display: "grid",
                  gap: "10px",
                }}
              >
                <label style={FIELD_LABEL_STYLE}>
                  Buscar usuario en base de datos
                  <input
                    type="text"
                    value={busquedaUsuario}
                    onChange={(e) => {
                      setBusquedaUsuario(e.target.value);
                      setUsuarioSeleccionado(null);
                      setIdentificacionUsuario("");
                      setConfirmacionUsuario("");
                      setTipoId("");
                      if (e.target.value.trim().length < 3) {
                        setUsuariosBusquedaRemota([]);
                      }
                    }}
                    placeholder="Escribe nombre o identificación"
                    style={{ ...INPUT_STYLE, backgroundColor: "#ffffff" }}
                  />
                </label>

                {cargandoUsuarios && (
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Actualizando base local de usuarios...</div>
                )}

                {buscandoUsuarios && !modoOffline && busquedaUsuario.trim().length >= 3 && (
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Buscando usuarios en línea...</div>
                )}

                {errorUsuarios && (
                  <div style={{ fontSize: "12px", color: "#b91c1c" }}>{errorUsuarios}</div>
                )}

                {!cargandoUsuarios && !errorUsuarios && busquedaUsuario.trim() !== "" && usuariosFiltrados.length > 0 && (
                  <div style={{ display: "grid", gap: "8px" }}>
                    {usuariosFiltrados.map((usuario) => (
                      <button
                        type="button"
                        key={`consulta-${usuario.identificacion}`}
                        onClick={() => seleccionarUsuario(usuario)}
                        style={{
                          minHeight: "46px",
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "12px",
                          border: "1px solid #d6deea",
                          backgroundColor: "#ffffff",
                          color: "#0f172a",
                          textAlign: "left",
                          fontSize: "13px",
                          boxShadow: "0 4px 10px rgba(15,23,42,0.05)",
                        }}
                      >
                        <strong>{usuario.identificacion}</strong>
                        <br />
                        <span>{usuario.nombreCompleto}</span>
                      </button>
                    ))}
                  </div>
                )}

                {!cargandoUsuarios && !buscandoUsuarios && !errorUsuarios && busquedaUsuario.trim().length >= 3 && usuariosFiltrados.length === 0 && (
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {modoOffline
                      ? "No se encontraron usuarios en la base local del dispositivo. Actualiza usuarios con internet e inténtalo nuevamente."
                      : "No se encontraron usuarios ni en la base local ni en la consulta en línea."}
                  </div>
                )}
              </div>
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Información del usuario</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Revisa los datos disponibles después de seleccionar una coincidencia.
                </div>
              </div>

              {usuarioSeleccionado ? (
                <div
                  style={{
                    ...SOFT_PANEL_STYLE,
                    background: "linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%)",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <div style={{ display: "grid", gap: "10px" }}>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Identificación</div>
                      <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.identificacion}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Tipo ID</div>
                      <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.tipoId || "No registrado"}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Nombre completo</div>
                      <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.nombreCompleto}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>EPS</div>
                      <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.eps || "No registrada"}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={INFO_TEXT_STYLE}>
                  Selecciona un usuario desde los resultados de búsqueda para consultar su información.
                </div>
              )}
            </div>
          </>
        )}

        {paginaActiva === "gestion-riesgo" && (
          <>
            <div style={CARD_STYLE}>
              <button
                onClick={sincronizarPendientes}
                disabled={modoOffline}
                style={{
                  ...PRIMARY_BUTTON_STYLE,
                  minHeight: "46px",
                  background: modoOffline
                    ? "linear-gradient(135deg, #94a3b8 0%, #94a3b8 100%)"
                    : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: modoOffline ? "none" : "0 10px 18px rgba(37,99,235,0.22)",
                }}
              >
                Sincronizar pendientes
              </button>

              <div style={INFO_TEXT_STYLE}>
                Usa este botón para enviar a Supabase los tamizajes guardados para seguimiento y cualquier otro registro pendiente.
              </div>
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Selección del usuario</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Busca la persona y luego selecciona el evento de riesgo que deseas tamizar.
                </div>
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                <label style={FIELD_LABEL_STYLE}>
                  Buscar usuario en base de datos
                  <input
                    type="text"
                    value={busquedaUsuario}
                    onChange={(e) => {
                      setBusquedaUsuario(e.target.value);
                      setUsuarioSeleccionado(null);
                      setIdentificacionUsuario("");
                      setConfirmacionUsuario("");
                      setTipoId("");
                      if (e.target.value.trim().length < 3) {
                        setUsuariosBusquedaRemota([]);
                      }
                    }}
                    placeholder="Escribe nombre o identificación"
                    style={WHITE_INPUT_STYLE}
                  />
                </label>

                {cargandoUsuarios && <div style={{ fontSize: "12px", color: "#64748b" }}>Actualizando base local de usuarios...</div>}
                {buscandoUsuarios && !modoOffline && busquedaUsuario.trim().length >= 3 && (
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Buscando usuarios en línea...</div>
                )}
                {errorUsuarios && <div style={{ fontSize: "12px", color: "#b91c1c" }}>{errorUsuarios}</div>}

                {!cargandoUsuarios && !errorUsuarios && busquedaUsuario.trim() !== "" && usuariosFiltrados.length > 0 && (
                  <div style={{ display: "grid", gap: "8px" }}>
                    {usuariosFiltrados.map((usuario) => (
                      <button
                        type="button"
                        key={`gestion-riesgo-${usuario.identificacion}`}
                        onClick={() => seleccionarUsuario(usuario)}
                        style={USER_SEARCH_RESULT_BUTTON_STYLE}
                      >
                        <strong>{usuario.identificacion}</strong>
                        <br />
                        <span>{usuario.nombreCompleto}</span>
                      </button>
                    ))}
                  </div>
                )}

                {!cargandoUsuarios && !buscandoUsuarios && !errorUsuarios && busquedaUsuario.trim().length >= 3 && usuariosFiltrados.length === 0 && (
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {modoOffline
                      ? "No se encontraron usuarios en la base local del dispositivo. Actualiza usuarios con internet e inténtalo nuevamente."
                      : "No se encontraron usuarios ni en la base local ni en la consulta en línea."}
                  </div>
                )}

                {usuarioSeleccionado ? (
                  <div
                    style={{
                      ...USER_SELECTED_CARD_STYLE,
                      background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <div style={{ marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1d4ed8" }}>
                      Usuario seleccionado para tamizaje
                    </div>
                    <div style={{ display: "grid", gap: "8px" }}>
                      <div>
                        <div style={MUTED_LABEL_STYLE}>Identificación</div>
                        <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.identificacion}</div>
                      </div>
                      <div>
                        <div style={MUTED_LABEL_STYLE}>Nombre</div>
                        <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.nombreCompleto}</div>
                      </div>
                      <div>
                        <div style={MUTED_LABEL_STYLE}>EPS</div>
                        <div style={VALUE_TEXT_STYLE}>{usuarioSeleccionado.eps || "No registrada"}</div>
                      </div>
                      <div>
                        <div style={MUTED_LABEL_STYLE}>Atenciones registradas</div>
                        <div style={VALUE_TEXT_STYLE}>
                          {
                            atencionesGuardadas.filter(
                              (item) => String(item.identificacion_usuario || "") === String(usuarioSeleccionado.identificacion || "")
                            ).length
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={INFO_TEXT_STYLE}>
                    Selecciona primero un usuario para orientar el reporte de gestión de riesgo.
                  </div>
                )}
              </div>
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Evento de riesgo prioritario</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Selecciona el tamizaje y responde el cuestionario mínimo según el evento elegido.
                </div>
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                <label style={FIELD_LABEL_STYLE}>
                  Riesgo a evaluar
                  <select
                    value={riesgoGestionSeleccionado}
                    onChange={(e) => setRiesgoGestionSeleccionado(e.target.value)}
                    style={WHITE_INPUT_STYLE}
                  >
                    <option value="">Seleccione</option>
                    {riesgosGestion.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                {riesgoGestionConfig ? (
                  <div
                    style={{
                      ...SOFT_PANEL_STYLE,
                      background: "linear-gradient(180deg, #fffaf0 0%, #f8fafc 100%)",
                      border: "1px solid #fed7aa",
                    }}
                  >
                    <div style={{ display: "grid", gap: "6px" }}>
                      <div style={{ ...MUTED_LABEL_STYLE, color: "#c2410c" }}>Descripción del tamizaje</div>
                      <div style={VALUE_TEXT_STYLE}>{riesgoGestionConfig.descripcion}</div>
                    </div>
                  </div>
                ) : (
                  <div style={INFO_TEXT_STYLE}>
                    Elige uno de los riesgos priorizados para habilitar el cuestionario y la interpretación automática.
                  </div>
                )}
              </div>
            </div>

            {riesgoGestionConfig && (
              <>
                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Ubicación del usuario</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      Captura la ubicación donde se realiza el tamizaje para incluirla en el seguimiento y en Supabase.
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "12px" }}>
                    <button
                      type="button"
                      onClick={capturarUbicacionGestionRiesgo}
                      disabled={capturandoUbicacionGestion}
                      style={{
                        ...PRIMARY_BUTTON_STYLE,
                        background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                        boxShadow: "0 10px 18px rgba(15,118,110,0.22)",
                        opacity: capturandoUbicacionGestion ? 0.75 : 1,
                      }}
                    >
                      {capturandoUbicacionGestion ? "Capturando ubicación..." : "Capturar ubicación del tamizaje"}
                    </button>

                    <div
                      style={{
                        ...SOFT_PANEL_STYLE,
                        background: "linear-gradient(180deg, #f8fbff 0%, #f8fafc 100%)",
                      }}
                    >
                      {latitudGestion && longitudGestion ? (
                        <div style={{ display: "grid", gap: "8px" }}>
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Latitud</div>
                            <div style={VALUE_TEXT_STYLE}>{latitudGestion}</div>
                          </div>
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Longitud</div>
                            <div style={VALUE_TEXT_STYLE}>{longitudGestion}</div>
                          </div>
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Precisión</div>
                            <div style={VALUE_TEXT_STYLE}>{precisionGestionGps || "No disponible"}</div>
                          </div>
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Fecha GPS</div>
                            <div style={VALUE_TEXT_STYLE}>
                              {fechaGestionGps ? new Date(fechaGestionGps).toLocaleString() : "No disponible"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={INFO_TEXT_STYLE}>
                          Aún no se ha capturado la ubicación del usuario para este tamizaje.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {(riesgoGestionConfig.tipo === "dnt" || riesgoGestionConfig.tipo === "hta") && (
                  <div style={{ ...CARD_STYLE, padding: "16px" }}>
                    <div
                      style={{
                        paddingBottom: "8px",
                        borderBottom: "1px solid #e5e7eb",
                        marginBottom: "6px",
                      }}
                    >
                      <div style={SECTION_TITLE_STYLE}>Datos de apoyo para la clasificación</div>
                      <div style={SECTION_SUBTITLE_STYLE}>
                        Registra los datos mínimos disponibles en campo para complementar el tamizaje.
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: "12px" }}>
                      {riesgoGestionConfig.tipo === "dnt" && (
                        <>
                          <label style={FIELD_LABEL_STYLE}>
                            Edad en meses
                            <input
                              type="number"
                              min="0"
                              value={datosGestionRiesgo.edadMeses}
                              onChange={(e) => actualizarDatoGestionRiesgo("edadMeses", e.target.value)}
                              placeholder="Ej: 24"
                              style={WHITE_INPUT_STYLE}
                            />
                          </label>
                          <label style={FIELD_LABEL_STYLE}>
                            Perímetro braquial (cm)
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={datosGestionRiesgo.perimetroBraquial}
                              onChange={(e) => actualizarDatoGestionRiesgo("perimetroBraquial", e.target.value)}
                              placeholder="Ej: 11.8"
                              style={WHITE_INPUT_STYLE}
                            />
                          </label>
                        </>
                      )}

                      {riesgoGestionConfig.tipo === "hta" && (
                        <>
                          <label style={FIELD_LABEL_STYLE}>
                            Presión sistólica (mmHg)
                            <input
                              type="number"
                              min="0"
                              value={datosGestionRiesgo.presionSistolica}
                              onChange={(e) => actualizarDatoGestionRiesgo("presionSistolica", e.target.value)}
                              placeholder="Ej: 145"
                              style={WHITE_INPUT_STYLE}
                            />
                          </label>
                          <label style={FIELD_LABEL_STYLE}>
                            Presión diastólica (mmHg)
                            <input
                              type="number"
                              min="0"
                              value={datosGestionRiesgo.presionDiastolica}
                              onChange={(e) => actualizarDatoGestionRiesgo("presionDiastolica", e.target.value)}
                              placeholder="Ej: 92"
                              style={WHITE_INPUT_STYLE}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Cuestionario mínimo</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      Marca los signos, síntomas o antecedentes identificados durante la visita.
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "10px" }}>
                    {riesgoGestionConfig.preguntas.map((pregunta, index) => {
                      const preguntaKey = `${riesgoGestionConfig.id}-${index}`;
                      const activa = !!respuestasGestionRiesgo[preguntaKey];

                      return (
                        <button
                          key={preguntaKey}
                          type="button"
                          onClick={() => actualizarRespuestaGestionRiesgo(preguntaKey, !activa)}
                          style={{
                            ...SURFACE_BUTTON_STYLE,
                            minHeight: "auto",
                            textAlign: "left",
                            background: activa
                              ? "linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%)"
                              : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                            border: activa ? "1px solid #86efac" : "1px solid #d6deea",
                            color: "#0f172a",
                          }}
                        >
                          <strong style={{ display: "block", marginBottom: "4px" }}>
                            {activa ? "Sí aplica" : "Marcar si aplica"}
                          </strong>
                          <span>{pregunta}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Resultado orientador del tamizaje</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      La app marca posible captación cuando se supera el 50% del cuestionario o cuando la medición clínica lo sugiera.
                    </div>
                  </div>

                  {resultadoGestionRiesgo ? (
                    <div
                      style={{
                        ...SOFT_PANEL_STYLE,
                        background: resultadoGestionRiesgo.esPositivo
                          ? "linear-gradient(180deg, #fef2f2 0%, #fff7ed 100%)"
                          : "linear-gradient(180deg, #ecfdf5 0%, #f8fafc 100%)",
                        border: resultadoGestionRiesgo.esPositivo ? "1px solid #fca5a5" : "1px solid #bbf7d0",
                      }}
                    >
                      <div style={{ display: "grid", gap: "10px" }}>
                        <div>
                          <div style={{ ...MUTED_LABEL_STYLE, color: resultadoGestionRiesgo.esPositivo ? "#b91c1c" : "#166534" }}>
                            Clasificación
                          </div>
                          <div style={{ ...VALUE_TEXT_STYLE, color: resultadoGestionRiesgo.esPositivo ? "#991b1b" : "#166534" }}>
                            {resultadoGestionRiesgo.clasificacion}
                          </div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Respuestas positivas</div>
                          <div style={VALUE_TEXT_STYLE}>
                            {resultadoGestionRiesgo.respuestasPositivas} de {resultadoGestionRiesgo.totalPreguntas} (
                            {Math.round((resultadoGestionRiesgo.porcentajePositivo || 0) * 100)}%)
                          </div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Interpretación</div>
                          <div style={VALUE_TEXT_STYLE}>{resultadoGestionRiesgo.detalle}</div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Orientación operativa</div>
                          <div style={VALUE_TEXT_STYLE}>
                            {resultadoGestionRiesgo.esPositivo
                              ? "Se sugiere captar al usuario, confirmar con el equipo clínico y activar la ruta correspondiente."
                              : "Continúa seguimiento comunitario y reevalúa si aparecen nuevos signos de alarma."}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={INFO_TEXT_STYLE}>
                      Selecciona un riesgo para calcular el resultado orientador del tamizaje.
                    </div>
                  )}

                  <label style={{ ...FIELD_LABEL_STYLE, marginTop: "12px" }}>
                    Observaciones del tamizaje
                    <textarea
                      value={datosGestionRiesgo.observaciones}
                      onChange={(e) => actualizarDatoGestionRiesgo("observaciones", e.target.value)}
                      rows={4}
                      placeholder="Anota hallazgos relevantes, barreras o acciones sugeridas."
                      style={{ ...WHITE_INPUT_STYLE, resize: "vertical", minHeight: "96px" }}
                    />
                  </label>

                  <div style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
                    <button
                      type="button"
                      onClick={guardarTamizajeGestionRiesgo}
                      disabled={!usuarioSeleccionado || !riesgoGestionConfig}
                      style={{
                        ...PRIMARY_BUTTON_STYLE,
                        background: "linear-gradient(135deg, #be123c 0%, #e11d48 100%)",
                        boxShadow: "0 10px 18px rgba(190,24,93,0.22)",
                        opacity: !usuarioSeleccionado || !riesgoGestionConfig ? 0.7 : 1,
                      }}
                    >
                      Guardar tamizaje para seguimiento
                    </button>
                    <div style={INFO_TEXT_STYLE}>
                      Guardados localmente: <strong>{tamizajesGestionGuardados.length}</strong>.
                      Pendientes por sincronizar:{" "}
                      <strong>
                        {tamizajesGestionGuardados.filter((item) => item.sincronizado === 0).length}
                      </strong>
                      .
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {paginaActiva === "seguimiento-riesgo" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <StatCard label="Tamizajes" value={totalTamizajesGestion} accent="#bfdbfe" />
              <StatCard label="Positivos" value={totalTamizajesPositivos} accent="#fecaca" />
              <StatCard label="Pendientes" value={totalTamizajesPendientes} accent="#fde68a" />
              <StatCard label="Usuarios" value={totalUsuariosTamizados} accent="#bbf7d0" />
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Filtros de seguimiento</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Prioriza por riesgo, usuario o estado para enfocar las captaciones más urgentes.
                </div>
              </div>

              <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "10px" }}>
                <label style={FIELD_LABEL_STYLE}>
                  Buscar por usuario
                  <input
                    type="text"
                    value={filtroSeguimientoUsuario}
                    onChange={(e) => setFiltroSeguimientoUsuario(e.target.value)}
                    placeholder="Nombre o identificación"
                    style={WHITE_INPUT_STYLE}
                  />
                </label>

                <label style={FIELD_LABEL_STYLE}>
                  Filtrar por riesgo
                  <select
                    value={filtroSeguimientoRiesgo}
                    onChange={(e) => setFiltroSeguimientoRiesgo(e.target.value)}
                    style={WHITE_INPUT_STYLE}
                  >
                    <option value="">Todos</option>
                    {riesgosGestion.map((item) => (
                      <option key={`seguimiento-${item.id}`} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={FIELD_LABEL_STYLE}>
                  Filtrar por estado
                  <select
                    value={filtroSeguimientoEstado}
                    onChange={(e) => setFiltroSeguimientoEstado(e.target.value)}
                    style={WHITE_INPUT_STYLE}
                  >
                    <option value="">Todos</option>
                    <option value="positivo">Tamizajes positivos</option>
                    <option value="pendiente">Pendientes de sincronizar</option>
                    <option value="sincronizado">Sincronizados</option>
                    <option value="error">Con error</option>
                  </select>
                </label>

                <button
                  onClick={() => {
                    setFiltroSeguimientoUsuario("");
                    setFiltroSeguimientoRiesgo("");
                    setFiltroSeguimientoEstado("");
                    setTamizajeMapaSeleccionado(null);
                  }}
                  style={{
                    ...PRIMARY_BUTTON_STYLE,
                    background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                    boxShadow: "0 10px 18px rgba(71,85,105,0.18)",
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Tamizajes por riesgo</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Resumen local de los eventos priorizados con más actividad.
                </div>
              </div>

              {estadisticasTamizajesPorRiesgo.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>Aún no hay tamizajes guardados para mostrar seguimiento.</div>
              ) : (
                <div style={{ display: "grid", gap: "8px" }}>
                  {estadisticasTamizajesPorRiesgo.map((item) => (
                    <div
                      key={`top-riesgo-${item.key}`}
                      style={{
                        ...SOFT_PANEL_STYLE,
                        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                      }}
                    >
                      <div style={MUTED_LABEL_STYLE}>{item.label}</div>
                      <div style={VALUE_TEXT_STYLE}>{item.total} tamizajes</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Mapa de usuarios georreferenciados</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Se muestran en el mapa los puntos de los usuarios captados en seguimiento de riesgo.
                </div>
              </div>

              {tamizajeMapaActivo ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #dbe4f0",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <iframe
                      title="Mapa de seguimientos"
                      src={
                        tamizajeMapaBounds
                          ? `https://www.openstreetmap.org/export/embed.html?bbox=${tamizajeMapaBounds.minLon}%2C${tamizajeMapaBounds.minLat}%2C${tamizajeMapaBounds.maxLon}%2C${tamizajeMapaBounds.maxLat}&layer=mapnik&marker=${tamizajeMapaActivo.latitud}%2C${tamizajeMapaActivo.longitud}`
                          : `https://www.openstreetmap.org/export/embed.html?bbox=${Number(tamizajeMapaActivo.longitud) - 0.01}%2C${Number(tamizajeMapaActivo.latitud) - 0.01}%2C${Number(tamizajeMapaActivo.longitud) + 0.01}%2C${Number(tamizajeMapaActivo.latitud) + 0.01}&layer=mapnik&marker=${tamizajeMapaActivo.latitud}%2C${tamizajeMapaActivo.longitud}`
                      }
                      style={{
                        width: "100%",
                        height: "280px",
                        border: "0",
                        display: "block",
                      }}
                      loading="lazy"
                    />

                    {tamizajeMapaBounds && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                        }}
                      >
                        {tamizajesSeguimientoConUbicacion.map((item) => {
                          const top =
                            ((tamizajeMapaBounds.maxLat - Number(item.latitud)) /
                              (tamizajeMapaBounds.maxLat - tamizajeMapaBounds.minLat || 1)) *
                            100;
                          const left =
                            ((Number(item.longitud) - tamizajeMapaBounds.minLon) /
                              (tamizajeMapaBounds.maxLon - tamizajeMapaBounds.minLon || 1)) *
                            100;
                          const esActivo = item.uuid_local === tamizajeMapaActivo?.uuid_local;

                          return (
                            <button
                              key={`seguimiento-overlay-${item.uuid_local}`}
                              type="button"
                              onClick={() => setTamizajeMapaSeleccionado(item)}
                              title={
                                item.nombre_usuario
                                  ? `${item.nombre_usuario} (${item.identificacion_usuario})`
                                  : item.identificacion_usuario
                              }
                              style={{
                                position: "absolute",
                                top: `${Math.min(Math.max(top, 4), 96)}%`,
                                left: `${Math.min(Math.max(left, 4), 96)}%`,
                                transform: "translate(-50%, -50%)",
                                width: esActivo ? "18px" : "13px",
                                height: esActivo ? "18px" : "13px",
                                borderRadius: "999px",
                                border: esActivo ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.92)",
                                background: esActivo
                                  ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                                  : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                boxShadow: esActivo
                                  ? "0 0 0 5px rgba(220,38,38,0.18), 0 8px 14px rgba(15,23,42,0.22)"
                                  : "0 0 0 3px rgba(37,99,235,0.14), 0 6px 10px rgba(15,23,42,0.16)",
                                pointerEvents: "auto",
                                cursor: "pointer",
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Usuario</div>
                      <div style={VALUE_TEXT_STYLE}>
                        {tamizajeMapaActivo.nombre_usuario
                          ? `${tamizajeMapaActivo.nombre_usuario} (${tamizajeMapaActivo.identificacion_usuario})`
                          : tamizajeMapaActivo.identificacion_usuario}
                      </div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Riesgo</div>
                      <div style={VALUE_TEXT_STYLE}>{tamizajeMapaActivo.riesgo_nombre}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Ubicación</div>
                      <div style={VALUE_TEXT_STYLE}>
                        {tamizajeMapaActivo.latitud}, {tamizajeMapaActivo.longitud}
                      </div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Total de puntos</div>
                      <div style={VALUE_TEXT_STYLE}>{tamizajesSeguimientoConUbicacion.length}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={INFO_TEXT_STYLE}>
                  No hay tamizajes con ubicación capturada para mostrar en el mapa con los filtros actuales.
                </div>
              )}
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Mapa de seguimientos con ubicación</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Visualiza los puntos capturados en los tamizajes y selecciona cada caso directamente desde el mapa.
                </div>
              </div>

              {tamizajeMapaActivo ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #dbe4f0",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <iframe
                      title="Mapa de seguimientos de riesgo"
                      src={
                        tamizajeMapaBounds
                          ? `https://www.openstreetmap.org/export/embed.html?bbox=${tamizajeMapaBounds.minLon}%2C${tamizajeMapaBounds.minLat}%2C${tamizajeMapaBounds.maxLon}%2C${tamizajeMapaBounds.maxLat}&layer=mapnik&marker=${tamizajeMapaActivo.latitud}%2C${tamizajeMapaActivo.longitud}`
                          : `https://www.openstreetmap.org/export/embed.html?bbox=${Number(tamizajeMapaActivo.longitud) - 0.01}%2C${Number(tamizajeMapaActivo.latitud) - 0.01}%2C${Number(tamizajeMapaActivo.longitud) + 0.01}%2C${Number(tamizajeMapaActivo.latitud) + 0.01}&layer=mapnik&marker=${tamizajeMapaActivo.latitud}%2C${tamizajeMapaActivo.longitud}`
                      }
                      style={{ width: "100%", height: "280px", border: "0", display: "block" }}
                      loading="lazy"
                    />

                    {tamizajeMapaBounds && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                        }}
                      >
                        {tamizajesSeguimientoConUbicacion.map((item) => {
                          const top =
                            ((tamizajeMapaBounds.maxLat - Number(item.latitud)) /
                              (tamizajeMapaBounds.maxLat - tamizajeMapaBounds.minLat || 1)) *
                            100;
                          const left =
                            ((Number(item.longitud) - tamizajeMapaBounds.minLon) /
                              (tamizajeMapaBounds.maxLon - tamizajeMapaBounds.minLon || 1)) *
                            100;
                          const esActivo = item.uuid_local === tamizajeMapaActivo?.uuid_local;

                          return (
                            <button
                              key={`tamizaje-overlay-${item.uuid_local}`}
                              type="button"
                              onClick={() => setTamizajeMapaSeleccionado(item)}
                              title={
                                item.nombre_usuario
                                  ? `${item.nombre_usuario} (${item.identificacion_usuario})`
                                  : item.identificacion_usuario
                              }
                              style={{
                                position: "absolute",
                                top: `${Math.min(Math.max(top, 4), 96)}%`,
                                left: `${Math.min(Math.max(left, 4), 96)}%`,
                                transform: "translate(-50%, -50%)",
                                width: esActivo ? "18px" : "13px",
                                height: esActivo ? "18px" : "13px",
                                borderRadius: "999px",
                                border: esActivo ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.92)",
                                background: esActivo
                                  ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                                  : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                boxShadow: esActivo
                                  ? "0 0 0 5px rgba(220,38,38,0.18), 0 8px 14px rgba(15,23,42,0.22)"
                                  : "0 0 0 3px rgba(37,99,235,0.14), 0 6px 10px rgba(15,23,42,0.16)",
                                pointerEvents: "auto",
                                cursor: "pointer",
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Usuario</div>
                      <div style={VALUE_TEXT_STYLE}>
                        {tamizajeMapaActivo.nombre_usuario
                          ? `${tamizajeMapaActivo.nombre_usuario} (${tamizajeMapaActivo.identificacion_usuario})`
                          : tamizajeMapaActivo.identificacion_usuario}
                      </div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Riesgo</div>
                      <div style={VALUE_TEXT_STYLE}>{tamizajeMapaActivo.riesgo_nombre}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Coordenadas</div>
                      <div style={VALUE_TEXT_STYLE}>
                        {tamizajeMapaActivo.latitud}, {tamizajeMapaActivo.longitud}
                      </div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Puntos visibles en el mapa</div>
                      <div style={VALUE_TEXT_STYLE}>{tamizajesSeguimientoConUbicacion.length}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={INFO_TEXT_STYLE}>
                  No hay tamizajes con ubicación capturada para mostrar en el mapa con los filtros actuales.
                </div>
              )}
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Casos para seguimiento</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Lista priorizada de tamizajes guardados localmente con su clasificación y estado de envío.
                </div>
              </div>

              {tamizajesGestionGuardados.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>Todavía no hay tamizajes guardados para seguimiento.</div>
              ) : tamizajesSeguimientoFiltrados.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>No hay resultados con los filtros aplicados.</div>
              ) : (
                <ul style={SIMPLE_LIST_STYLE}>
                  {tamizajesSeguimientoFiltrados.map((item) => (
                    <li
                      key={item.uuid_local}
                      style={{
                        padding: "14px",
                        borderRadius: "16px",
                        border: "1px solid #dbe4f0",
                        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                        boxShadow: "0 8px 18px rgba(15,23,42,0.06)",
                      }}
                    >
                      <div style={{ display: "grid", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                          <div>
                            <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0f172a" }}>
                              {item.nombre_usuario || item.identificacion_usuario}
                            </div>
                            <div style={{ fontSize: "13px", color: "#475569", marginTop: "4px", lineHeight: "1.4" }}>
                              {item.identificacion_usuario} • {item.riesgo_nombre}
                            </div>
                          </div>

                          <span
                            style={{
                              ...STATUS_PILL_STYLE,
                              whiteSpace: "nowrap",
                              backgroundColor: item.es_positivo === 1 ? "#fee2e2" : "#dcfce7",
                              color: item.es_positivo === 1 ? "#991b1b" : "#166534",
                              border: item.es_positivo === 1 ? "1px solid #fca5a5" : "1px solid #86efac",
                            }}
                          >
                            {item.es_positivo === 1 ? "Prioritario" : "En observacion"}
                          </span>
                        </div>

                        <div>
                          <div style={MUTED_LABEL_STYLE}>Clasificación</div>
                          <div style={VALUE_TEXT_STYLE}>{item.clasificacion || "Sin clasificación"}</div>
                        </div>

                        <div>
                          <div style={MUTED_LABEL_STYLE}>Resultado</div>
                          <div style={VALUE_TEXT_STYLE}>
                            {item.respuestas_positivas || 0} de {item.total_preguntas || 0} respuestas positivas
                          </div>
                        </div>

                        <div>
                          <div style={MUTED_LABEL_STYLE}>Fecha</div>
                          <div style={VALUE_TEXT_STYLE}>
                            {item.fecha_tamizaje ? new Date(item.fecha_tamizaje).toLocaleString() : "No disponible"}
                          </div>
                        </div>

                        {Number(item.ubicacion_capturada) === 1 && item.latitud && item.longitud && (
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Ubicación</div>
                            <div style={VALUE_TEXT_STYLE}>
                              {item.latitud}, {item.longitud}
                            </div>
                          </div>
                        )}

                        {item.detalle_resultado && (
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Detalle</div>
                            <div style={VALUE_TEXT_STYLE}>{item.detalle_resultado}</div>
                          </div>
                        )}

                        {item.observaciones && (
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Observaciones</div>
                            <div style={VALUE_TEXT_STYLE}>{item.observaciones}</div>
                          </div>
                        )}

                        <div>
                          <div style={MUTED_LABEL_STYLE}>Estado de sincronización</div>
                          <div style={VALUE_TEXT_STYLE}>
                            {item.estado_sync === "sincronizado"
                              ? "Sincronizado"
                              : item.estado_sync === "error"
                                ? "Error"
                                : "Pendiente"}
                          </div>
                        </div>

                        {item.mensaje_error_sync && (
                          <div
                            style={{
                              padding: "10px 12px",
                              borderRadius: "12px",
                              border: "1px solid #fecaca",
                              backgroundColor: "#fef2f2",
                            }}
                          >
                            <div style={{ ...MUTED_LABEL_STYLE, color: "#991b1b" }}>Error de sincronización</div>
                            <div style={{ ...VALUE_TEXT_STYLE, color: "#991b1b" }}>{item.mensaje_error_sync}</div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {totalTamizajesError > 0 && (
                <div style={{ ...INFO_TEXT_STYLE, marginTop: "12px", color: "#991b1b" }}>
                  Hay <strong>{totalTamizajesError}</strong> tamizajes con error de sincronización. Puedes revisarlos aquí y volver a usar `Sincronizar pendientes`.
                </div>
              )}
            </div>
          </>
        )}

        {paginaActiva === "admin" && (
          <>
            {!adminAutenticado ? (
              <div style={{ ...CARD_STYLE, padding: "16px" }}>
                <div
                  style={{
                    paddingBottom: "8px",
                    borderBottom: "1px solid #e5e7eb",
                    marginBottom: "6px",
                  }}
                >
                  <div style={SECTION_TITLE_STYLE}>Ingreso administrador</div>
                  <div style={SECTION_SUBTITLE_STYLE}>
                    Accede al tablero consolidado para consultar toda la operación sincronizada en Supabase.
                  </div>
                </div>

                <div style={{ display: "grid", gap: "12px" }}>
                  <label style={FIELD_LABEL_STYLE}>
                    Usuario
                    <input
                      type="text"
                      value={adminUsuario}
                      onChange={(e) => setAdminUsuario(e.target.value)}
                      placeholder="Usuario administrador"
                      style={WHITE_INPUT_STYLE}
                    />
                  </label>

                  <label style={FIELD_LABEL_STYLE}>
                    Clave
                    <input
                      type="password"
                      value={adminClave}
                      onChange={(e) => setAdminClave(e.target.value)}
                      placeholder="Clave de acceso"
                      style={WHITE_INPUT_STYLE}
                    />
                  </label>

                  {adminErrorAcceso && <div style={{ fontSize: "12px", color: "#b91c1c" }}>{adminErrorAcceso}</div>}

                  <button
                    onClick={ingresarAdministrador}
                    style={{
                      ...PRIMARY_BUTTON_STYLE,
                      background: "linear-gradient(135deg, #111827 0%, #334155 100%)",
                      boxShadow: "0 10px 18px rgba(15,23,42,0.24)",
                    }}
                  >
                    Ingresar como administrador
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={CARD_STYLE}>
                  <button
                    onClick={cargarDashboardAdministrador}
                    disabled={adminCargando}
                    style={{
                      ...PRIMARY_BUTTON_STYLE,
                      minHeight: "46px",
                      background: "linear-gradient(135deg, #111827 0%, #334155 100%)",
                      boxShadow: "0 10px 18px rgba(15,23,42,0.24)",
                    }}
                  >
                    {adminCargando ? "Actualizando tablero..." : "Actualizar datos desde Supabase"}
                  </button>

                  <button
                    onClick={salirAdministrador}
                    style={{
                      ...PRIMARY_BUTTON_STYLE,
                      minHeight: "46px",
                      background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                      boxShadow: "0 10px 18px rgba(220,38,38,0.18)",
                    }}
                  >
                    Cerrar sesión administrador
                  </button>

                  <div style={INFO_TEXT_STYLE}>
                    Este tablero muestra información consolidada de todos los profesionales tomada directamente desde Supabase.
                  </div>
                </div>

                {adminErrorDatos && (
                  <div style={{ ...CARD_STYLE, padding: "16px", color: "#991b1b" }}>
                    <div style={{ fontWeight: "bold" }}>No fue posible cargar el tablero administrador.</div>
                    <div style={INFO_TEXT_STYLE}>{adminErrorDatos}</div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <StatCard label="Atenciones" value={adminTotalAtenciones} accent="#bfdbfe" />
                  <StatCard label="Tamizajes" value={adminTotalTamizajes} accent="#fbcfe8" />
                  <StatCard label="Profesionales" value={adminTotalProfesionales} accent="#bbf7d0" />
                  <StatCard label="CUPS" value={adminTotalCups} accent="#ddd6fe" />
                  <StatCard label="Positivos" value={adminTamizajesPositivos} accent="#fecaca" />
                  <StatCard label="Ubicaciones" value={adminAtencionesConUbicacion.length} accent="#fed7aa" />
                </div>

                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Estadísticas globales por profesional</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      Top de actividad sincronizada por guía bilingüe en toda la operación.
                    </div>
                  </div>
                  {adminEstadisticasPorGuia.length === 0 ? (
                    <div style={INFO_TEXT_STYLE}>Aún no hay información sincronizada para mostrar en este tablero.</div>
                  ) : (
                    <ul style={SIMPLE_LIST_STYLE}>
                      {adminEstadisticasPorGuia.map((item) => (
                        <li key={`admin-guia-${item.key}`} style={DETAIL_SECTION_STYLE}>
                          <div style={MUTED_LABEL_STYLE}>{item.label}</div>
                          <div style={VALUE_TEXT_STYLE}>{item.total} atenciones</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Seguimientos de gestión de riesgo</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      Casos positivos y riesgos priorizados consolidados de todos los profesionales.
                    </div>
                  </div>

                  {adminTamizajesRemotos.length === 0 ? (
                    <div style={INFO_TEXT_STYLE}>No hay tamizajes sincronizados todavía.</div>
                  ) : (
                    <div style={{ display: "grid", gap: "12px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                          <div style={MUTED_LABEL_STYLE}>Tamizajes por riesgo</div>
                          {adminTamizajesPorRiesgo.length === 0 ? (
                            <div style={VALUE_TEXT_STYLE}>Sin datos</div>
                          ) : (
                            adminTamizajesPorRiesgo.map((item) => (
                              <div key={`admin-riesgo-${item.key}`} style={VALUE_TEXT_STYLE}>
                                {item.label}: {item.total}
                              </div>
                            ))
                          )}
                        </div>
                        <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                          <div style={MUTED_LABEL_STYLE}>Tamizajes positivos recientes</div>
                          {adminTamizajesRemotos.filter((item) => Number(item.es_positivo) === 1).slice(0, 5).length === 0 ? (
                            <div style={VALUE_TEXT_STYLE}>Sin positivos recientes</div>
                          ) : (
                            adminTamizajesRemotos
                              .filter((item) => Number(item.es_positivo) === 1)
                              .slice(0, 5)
                              .map((item) => (
                                <div key={`admin-positivo-${item.uuid_local}`} style={VALUE_TEXT_STYLE}>
                                  {item.nombre_usuario || item.identificacion_usuario} · {item.riesgo_nombre}
                                </div>
                              ))
                          )}
                        </div>
                      </div>

                      <ul style={SIMPLE_LIST_STYLE}>
                        {adminTamizajesRemotos.slice(0, 10).map((item) => (
                          <li key={`admin-tamizaje-${item.uuid_local}`} style={DETAIL_SECTION_STYLE}>
                            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a" }}>
                              {item.nombre_usuario || item.identificacion_usuario}
                            </div>
                            <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
                              {item.riesgo_nombre} · {item.clasificacion || "Sin clasificación"}
                            </div>
                            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                              {item.fecha_tamizaje ? new Date(item.fecha_tamizaje).toLocaleString() : "Sin fecha"}
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "10px" }}>
                        <div style={MUTED_LABEL_STYLE}>Mapa global de gestión de riesgo</div>

                        {adminTamizajeMapaActivo ? (
                          <>
                            <div
                              style={{
                                position: "relative",
                                borderRadius: "16px",
                                overflow: "hidden",
                                border: "1px solid #dbe4f0",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              <iframe
                                title="Mapa global de gestion de riesgo"
                                src={
                                  adminTamizajeMapaBounds
                                    ? `https://www.openstreetmap.org/export/embed.html?bbox=${adminTamizajeMapaBounds.minLon}%2C${adminTamizajeMapaBounds.minLat}%2C${adminTamizajeMapaBounds.maxLon}%2C${adminTamizajeMapaBounds.maxLat}&layer=mapnik&marker=${adminTamizajeMapaActivo.latitud}%2C${adminTamizajeMapaActivo.longitud}`
                                    : `https://www.openstreetmap.org/export/embed.html?bbox=${Number(adminTamizajeMapaActivo.longitud) - 0.01}%2C${Number(adminTamizajeMapaActivo.latitud) - 0.01}%2C${Number(adminTamizajeMapaActivo.longitud) + 0.01}%2C${Number(adminTamizajeMapaActivo.latitud) + 0.01}&layer=mapnik&marker=${adminTamizajeMapaActivo.latitud}%2C${adminTamizajeMapaActivo.longitud}`
                                }
                                style={{ width: "100%", height: "280px", border: "0", display: "block" }}
                                loading="lazy"
                              />

                              {adminTamizajeMapaBounds && (
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    pointerEvents: "none",
                                  }}
                                >
                                  {adminTamizajesConUbicacion.map((item) => {
                                    const top =
                                      ((adminTamizajeMapaBounds.maxLat - Number(item.latitud)) /
                                        (adminTamizajeMapaBounds.maxLat - adminTamizajeMapaBounds.minLat || 1)) *
                                      100;
                                    const left =
                                      ((Number(item.longitud) - adminTamizajeMapaBounds.minLon) /
                                        (adminTamizajeMapaBounds.maxLon - adminTamizajeMapaBounds.minLon || 1)) *
                                      100;
                                    const esActivo = item.uuid_local === adminTamizajeMapaActivo?.uuid_local;

                                    return (
                                      <button
                                        key={`admin-tamizaje-overlay-${item.uuid_local}`}
                                        type="button"
                                        onClick={() => setAdminTamizajeMapaSeleccionado(item)}
                                        title={
                                          item.nombre_usuario
                                            ? `${item.nombre_usuario} (${item.identificacion_usuario})`
                                            : item.identificacion_usuario
                                        }
                                        style={{
                                          position: "absolute",
                                          top: `${Math.min(Math.max(top, 4), 96)}%`,
                                          left: `${Math.min(Math.max(left, 4), 96)}%`,
                                          transform: "translate(-50%, -50%)",
                                          width: esActivo ? "18px" : "13px",
                                          height: esActivo ? "18px" : "13px",
                                          borderRadius: "999px",
                                          border: esActivo ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.92)",
                                          background: esActivo
                                            ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                                            : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                          boxShadow: esActivo
                                            ? "0 0 0 5px rgba(220,38,38,0.18), 0 8px 14px rgba(15,23,42,0.22)"
                                            : "0 0 0 3px rgba(37,99,235,0.14), 0 6px 10px rgba(15,23,42,0.16)",
                                          pointerEvents: "auto",
                                          cursor: "pointer",
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            <div style={{ display: "grid", gap: "6px" }}>
                              <div style={VALUE_TEXT_STYLE}>
                                {adminTamizajeMapaActivo.nombre_usuario || adminTamizajeMapaActivo.identificacion_usuario}
                              </div>
                              <div style={INFO_TEXT_STYLE}>
                                {adminTamizajeMapaActivo.riesgo_nombre} · {adminTamizajeMapaActivo.latitud}, {adminTamizajeMapaActivo.longitud}
                              </div>
                              <div style={INFO_TEXT_STYLE}>
                                Estado: {Number(adminTamizajeMapaActivo.es_positivo) === 1 ? "Prioritario" : "En seguimiento"} · Puntos visibles: {adminTamizajesConUbicacion.length}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div style={VALUE_TEXT_STYLE}>
                            No hay seguimientos de riesgo con ubicación sincronizada para mostrar en el mapa.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Mapa global de atenciones</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      Puntos sincronizados de todos los profesionales con ubicación capturada.
                    </div>
                  </div>

                  {adminMapaActivo ? (
                    <div style={{ display: "grid", gap: "12px" }}>
                      <div
                        style={{
                          position: "relative",
                          borderRadius: "16px",
                          overflow: "hidden",
                          border: "1px solid #dbe4f0",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <iframe
                          title="Mapa administrador"
                          src={
                            adminMapaBounds
                              ? `https://www.openstreetmap.org/export/embed.html?bbox=${adminMapaBounds.minLon}%2C${adminMapaBounds.minLat}%2C${adminMapaBounds.maxLon}%2C${adminMapaBounds.maxLat}&layer=mapnik&marker=${adminMapaActivo.latitud}%2C${adminMapaActivo.longitud}`
                              : `https://www.openstreetmap.org/export/embed.html?bbox=${Number(adminMapaActivo.longitud) - 0.01}%2C${Number(adminMapaActivo.latitud) - 0.01}%2C${Number(adminMapaActivo.longitud) + 0.01}%2C${Number(adminMapaActivo.latitud) + 0.01}&layer=mapnik&marker=${adminMapaActivo.latitud}%2C${adminMapaActivo.longitud}`
                          }
                          style={{ width: "100%", height: "280px", border: "0", display: "block" }}
                          loading="lazy"
                        />

                        {adminMapaBounds && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              pointerEvents: "none",
                            }}
                          >
                            {adminAtencionesConUbicacion.map((item) => {
                              const top =
                                ((adminMapaBounds.maxLat - Number(item.latitud)) /
                                  (adminMapaBounds.maxLat - adminMapaBounds.minLat || 1)) *
                                100;
                              const left =
                                ((Number(item.longitud) - adminMapaBounds.minLon) /
                                  (adminMapaBounds.maxLon - adminMapaBounds.minLon || 1)) *
                                100;
                              const esActivo = item.uuid_local === adminMapaActivo?.uuid_local;

                              return (
                                <button
                                  key={`admin-overlay-${item.uuid_local}`}
                                  type="button"
                                  onClick={() => setAdminMapaSeleccionado(item)}
                                  title={
                                    item.nombre_usuario
                                      ? `${item.nombre_usuario} (${item.identificacion_usuario})`
                                      : item.identificacion_usuario
                                  }
                                  style={{
                                    position: "absolute",
                                    top: `${Math.min(Math.max(top, 4), 96)}%`,
                                    left: `${Math.min(Math.max(left, 4), 96)}%`,
                                    transform: "translate(-50%, -50%)",
                                    width: esActivo ? "18px" : "13px",
                                    height: esActivo ? "18px" : "13px",
                                    borderRadius: "999px",
                                    border: esActivo ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.92)",
                                    background: esActivo
                                      ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                                      : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                    boxShadow: esActivo
                                      ? "0 0 0 5px rgba(220,38,38,0.18), 0 8px 14px rgba(15,23,42,0.22)"
                                      : "0 0 0 3px rgba(37,99,235,0.14), 0 6px 10px rgba(15,23,42,0.16)",
                                    pointerEvents: "auto",
                                    cursor: "pointer",
                                  }}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Usuario</div>
                          <div style={VALUE_TEXT_STYLE}>
                            {adminMapaActivo.nombre_usuario
                              ? `${adminMapaActivo.nombre_usuario} (${adminMapaActivo.identificacion_usuario})`
                              : adminMapaActivo.identificacion_usuario}
                          </div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Profesional</div>
                          <div style={VALUE_TEXT_STYLE}>{adminMapaActivo.nombre_guia || adminMapaActivo.identificacion_guia}</div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Municipio</div>
                          <div style={VALUE_TEXT_STYLE}>{obtenerNombreMunicipio(adminMapaActivo.municipio_id)}</div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Puntos visibles en el mapa</div>
                          <div style={VALUE_TEXT_STYLE}>{adminAtencionesConUbicacion.length}</div>
                        </div>
                      </div>

                      <ul style={SIMPLE_LIST_STYLE}>
                        {adminAtencionesConUbicacion.slice(0, 10).map((item) => (
                          <li key={`admin-mapa-${item.uuid_local}`} style={DETAIL_SECTION_STYLE}>
                            <button
                              onClick={() => setAdminMapaSeleccionado(item)}
                              style={{
                                width: "100%",
                                border: "none",
                                background: "transparent",
                                padding: 0,
                                textAlign: "left",
                                color: "inherit",
                              }}
                            >
                              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a" }}>
                                {item.nombre_usuario
                                  ? `${item.nombre_usuario} (${item.identificacion_usuario})`
                                  : item.identificacion_usuario}
                              </div>
                              <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
                                {obtenerNombreMunicipio(item.municipio_id)} · {item.nombre_guia || item.identificacion_guia}
                              </div>
                              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                                {item.latitud}, {item.longitud}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div style={INFO_TEXT_STYLE}>No hay ubicaciones sincronizadas disponibles para el tablero administrador.</div>
                  )}
                </div>

                <div style={{ ...CARD_STYLE, padding: "16px" }}>
                  <div
                    style={{
                      paddingBottom: "8px",
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "6px",
                    }}
                  >
                    <div style={SECTION_TITLE_STYLE}>Distribución global</div>
                    <div style={SECTION_SUBTITLE_STYLE}>
                      Resumen de atenciones sincronizadas por municipio y riesgo.
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                      <div style={MUTED_LABEL_STYLE}>Por municipio</div>
                      {adminEstadisticasPorMunicipio.length === 0 ? (
                        <div style={VALUE_TEXT_STYLE}>Sin datos</div>
                      ) : (
                        adminEstadisticasPorMunicipio.map((item) => (
                          <div key={`admin-municipio-${item.key}`} style={VALUE_TEXT_STYLE}>
                            {item.label}: {item.total}
                          </div>
                        ))
                      )}
                    </div>

                    <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                      <div style={MUTED_LABEL_STYLE}>Por riesgo</div>
                      {adminEstadisticasPorRiesgo.length === 0 ? (
                        <div style={VALUE_TEXT_STYLE}>Sin datos</div>
                      ) : (
                        adminEstadisticasPorRiesgo.map((item) => (
                          <div key={`admin-riesgo-atencion-${item.key}`} style={VALUE_TEXT_STYLE}>
                            {item.label}: {item.total}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {paginaActiva === "registro" && vistaActiva === "formulario" && (
          <>
        <div style={CARD_STYLE}>
          <button
            onClick={() => {
              const nuevoEstado = !modoOffline;
              setModoOffline(nuevoEstado);
              alert(nuevoEstado ? "Modo offline activado. La app trabajará con la base local del dispositivo." : "Modo offline desactivado. Ya puedes actualizar usuarios y sincronizar con Supabase.");
            }}
            style={{
              ...PRIMARY_BUTTON_STYLE,
              minHeight: "46px",
              background: modoOffline
                ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                : "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
              boxShadow: modoOffline
                ? "0 10px 18px rgba(220,38,38,0.18)"
                : "0 10px 18px rgba(15,118,110,0.20)",
            }}
          >
            {modoOffline ? "Desactivar modo offline" : "Activar modo offline"}
          </button>

          <button
            onClick={sincronizarPendientes}
            disabled={modoOffline}
            style={{
              ...PRIMARY_BUTTON_STYLE,
              minHeight: "46px",
              background: modoOffline
                ? "linear-gradient(135deg, #94a3b8 0%, #94a3b8 100%)"
                : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: modoOffline ? "none" : "0 10px 18px rgba(37,99,235,0.22)",
            }}
          >
            Sincronizar pendientes
          </button>

          <div
            style={{
              padding: "12px 14px",
              borderRadius: "14px",
              backgroundColor: modoOffline ? "#fff7ed" : supabaseConfigurado ? "#ecfdf5" : "#fef2f2",
              color: modoOffline ? "#9a3412" : supabaseConfigurado ? "#166534" : "#991b1b",
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
              border: `1px solid ${modoOffline ? "#fdba74" : supabaseConfigurado ? "#bbf7d0" : "#fecaca"}`,
              boxShadow: modoOffline
                ? "0 8px 16px rgba(245,158,11,0.10)"
                : supabaseConfigurado
                  ? "0 8px 16px rgba(22,163,74,0.10)"
                  : "0 8px 16px rgba(239,68,68,0.10)",
            }}
          >
            Estado: {modoOffline ? "Modo offline activado" : supabaseConfigurado ? "En línea / Supabase configurado" : "Supabase no configurado"}
          </div>
        </div>

        <div style={CARD_STYLE}>
          <button
            onClick={actualizarUsuariosDesdeSupabase}
            disabled={modoOffline}
            style={{
              ...PRIMARY_BUTTON_STYLE,
              minHeight: "46px",
              background: modoOffline
                ? "linear-gradient(135deg, #94a3b8 0%, #94a3b8 100%)"
                : "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
              boxShadow: modoOffline ? "none" : "0 10px 18px rgba(15,118,110,0.20)",
            }}
          >
            Actualizar usuarios para uso offline
          </button>
          <div style={INFO_TEXT_STYLE}>
            La búsqueda de usuarios en el teléfono se realiza sobre la base local guardada en el dispositivo.
            Actualízala cuando tengas internet para trabajar sin conexión.
            {ultimaActualizacionUsuarios && (
              <>
                <br />
                <strong>Última actualización:</strong> {new Date(ultimaActualizacionUsuarios).toLocaleString()}
              </>
            )}
          </div>
        </div>

        <div style={{ ...CARD_STYLE, padding: "16px" }}>
          <div
            style={{
              paddingBottom: "10px",
              borderBottom: "1px solid #e5e7eb",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                padding: "6px 10px",
                borderRadius: "999px",
                backgroundColor: "#ecfeff",
                color: "#0f766e",
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                marginBottom: "8px",
              }}
            >
              Formulario principal
            </div>
            <div style={SECTION_TITLE_STYLE}>Nueva atención</div>
            <div style={SECTION_SUBTITLE_STYLE}>
              Diligencia los datos del usuario y registra uno o más CUPS.
            </div>
          </div>
          <div
            style={{
              ...SOFT_PANEL_STYLE,
              display: "grid",
              gap: "12px",
              background: "linear-gradient(180deg, #f8fbff 0%, #f3f8fb 100%)",
            }}
          >
            <div style={{ display: "grid", gap: "4px" }}>
              <div style={{ ...MUTED_LABEL_STYLE, color: "#0f766e" }}>Paso 1</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0f172a" }}>
                Identificación de la atención
              </div>
            </div>

            <label style={FIELD_LABEL_STYLE}>
              Guía bilingüe
              <select
                value={guia}
                onChange={(e) => setGuia(e.target.value)}
                style={INPUT_STYLE}
              >
                <option value="">Seleccione</option>
                {guias.map((g) => (
                  <option key={g.identificacion} value={g.identificacion}>
                    {g.identificacion} - {g.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label style={FIELD_LABEL_STYLE}>
              Tipo ID
              <select
                value={tipoId}
                onChange={(e) => setTipoId(e.target.value)}
                disabled={!!usuarioSeleccionado && !!usuarioSeleccionado.tipoId}
                style={{
                  ...INPUT_STYLE,
                  backgroundColor: usuarioSeleccionado && usuarioSeleccionado.tipoId ? "#e2e8f0" : "#f8fafc",
                  opacity: usuarioSeleccionado && usuarioSeleccionado.tipoId ? 0.9 : 1,
                }}
              >
                <option value="">Seleccione</option>
                {tiposId.map((t) => (
                  <option key={t.codigo} value={t.codigo}>
                    {t.codigo} - {t.descripcion}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            style={{
              ...SOFT_PANEL_STYLE,
              display: "grid",
              gap: "12px",
              background: "linear-gradient(180deg, #fbfdff 0%, #f8fafc 100%)",
            }}
          >
            <div style={{ display: "grid", gap: "4px" }}>
              <div style={{ ...MUTED_LABEL_STYLE, color: "#0f766e" }}>Paso 2</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0f172a" }}>
                Selección del usuario
              </div>
            </div>
            <label style={FIELD_LABEL_STYLE}>
              Buscar usuario en base de datos
              <input
                type="text"
                value={busquedaUsuario}
                onChange={(e) => {
                  setBusquedaUsuario(e.target.value);
                  setUsuarioSeleccionado(null);
                  setIdentificacionUsuario("");
                  setConfirmacionUsuario("");
                  setTipoId("");
                  if (e.target.value.trim().length < 3) {
                    setUsuariosBusquedaRemota([]);
                  }
                }}
                placeholder="Escribe nombre o identificación"
                style={{ ...INPUT_STYLE, backgroundColor: "#ffffff" }}
              />
            </label>

            {cargandoUsuarios && (
              <div style={{ fontSize: "12px", color: "#64748b" }}>Actualizando base local de usuarios...</div>
            )}

            {buscandoUsuarios && !modoOffline && busquedaUsuario.trim().length >= 3 && (
              <div style={{ fontSize: "12px", color: "#64748b" }}>Buscando usuarios en línea...</div>
            )}

            {errorUsuarios && (
              <div style={{ fontSize: "12px", color: "#b91c1c" }}>{errorUsuarios}</div>
            )}

            {!cargandoUsuarios && !errorUsuarios && busquedaUsuario.trim() !== "" && usuariosFiltrados.length > 0 && (
              <div style={{ display: "grid", gap: "8px" }}>
                {usuariosFiltrados.map((usuario) => (
                  <button
                    type="button"
                    key={usuario.identificacion}
                    onClick={() => seleccionarUsuario(usuario)}
                    style={{
                      minHeight: "46px",
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: "1px solid #d6deea",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                      textAlign: "left",
                      fontSize: "13px",
                      boxShadow: "0 4px 10px rgba(15,23,42,0.05)",
                    }}
                  >
                    <strong>{usuario.identificacion}</strong>
                    <br />
                    <span>{usuario.nombreCompleto}</span>
                  </button>
                ))}
              </div>
            )}
            {!cargandoUsuarios && !buscandoUsuarios && !errorUsuarios && busquedaUsuario.trim().length >= 3 && usuariosFiltrados.length === 0 && (
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                {modoOffline
                  ? "No se encontraron usuarios en la base local del dispositivo. Actualiza usuarios con internet e inténtalo nuevamente."
                  : "No se encontraron usuarios ni en la base local ni en la consulta en línea."}
              </div>
            )}

            {usuarioSeleccionado && (
              <div
                style={{
                  padding: "14px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                  fontSize: "13px",
                  lineHeight: "1.55",
                  boxShadow: "0 8px 18px rgba(22,163,74,0.10)",
                }}
              >
                <div style={{ marginBottom: "6px", fontSize: "14px", fontWeight: "bold" }}>Usuario seleccionado</div>
                <strong>Identificación:</strong> {usuarioSeleccionado.identificacion}
                <br />
                <strong>Nombres y apellidos:</strong> {usuarioSeleccionado.nombreCompleto}
                <br />
                <strong>EPS:</strong> {usuarioSeleccionado.eps || "No registrada"}
              </div>
            )}

            {usuarioSeleccionado && (
              <div style={INFO_TEXT_STYLE}>
                El campo <strong>Identificación usuario</strong> fue completado automáticamente desde la base de datos y no se puede editar mientras haya un usuario seleccionado.
                {!usuarioSeleccionado.tipoId && (
                  <>
                    <br />
                    El <strong>Tipo ID</strong> no vino en la base de datos para este usuario, por lo que debes seleccionarlo manualmente.
                  </>
                )}
                {usuarioSeleccionado.tipoId && (
                  <>
                    <br />
                    El campo <strong>Tipo ID</strong> también fue completado automáticamente desde la base de datos.
                  </>
                )}
              </div>
            )}

            
            <label style={FIELD_LABEL_STYLE}>
              Identificación usuario
              <input
                type="text"
                value={identificacionUsuario}
                onChange={(e) => setIdentificacionUsuario(e.target.value)}
                readOnly={!!usuarioSeleccionado}
                style={{
                  ...INPUT_STYLE,
                  backgroundColor: usuarioSeleccionado ? "#e2e8f0" : "#ffffff",
                  opacity: usuarioSeleccionado ? 0.9 : 1,
                }}
              />
            </label>
          </div>

          <label style={FIELD_LABEL_STYLE}>
            Fecha de atención
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={INPUT_STYLE}
            />
          </label>

          <label style={FIELD_LABEL_STYLE}>
            Municipio
            <select
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              style={INPUT_STYLE}
            >
              <option value="">Seleccione</option>
              {municipios.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </label>

          <label style={FIELD_LABEL_STYLE}>
            Riesgo observado
            <select
              value={riesgo}
              onChange={(e) => setRiesgo(e.target.value)}
              style={INPUT_STYLE}
            >
              <option value="">Seleccione</option>
              {riesgos.map((r) => (
                <option key={r.codigo} value={r.codigo}>
                  {r.codigo} - {r.nombre}
                </option>
              ))}
            </select>
          </label>
          <div
            style={{
              ...SOFT_PANEL_STYLE,
              display: "grid",
              gap: "12px",
              background: "linear-gradient(180deg, #faf5ff 0%, #f8fafc 100%)",
              border: "1px solid #ddd6fe",
            }}
          >
            <div style={{ display: "grid", gap: "4px" }}>
              <div style={{ ...MUTED_LABEL_STYLE, color: "#7c3aed" }}>Paso 3</div>
              <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0f172a" }}>
                Geolocalización del servicio
              </div>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              Captura la ubicación del punto de atención
            </div>

            <button
              type="button"
              onClick={capturarUbicacion}
              disabled={capturandoUbicacion}
              style={{
                ...PRIMARY_BUTTON_STYLE,
                minHeight: "48px",
                background: capturandoUbicacion
                  ? "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)"
                  : "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                boxShadow: "0 10px 18px rgba(124,58,237,0.20)",
              }}
            >
              {capturandoUbicacion ? "Capturando ubicación..." : "Capturar ubicación actual"}
            </button>

            <div style={{ display: "grid", gap: "6px" }}>
              {latitud && longitud ? (
                <>
                  <div>
                    <div style={MUTED_LABEL_STYLE}>Latitud</div>
                    <div style={VALUE_TEXT_STYLE}>{latitud}</div>
                  </div>
                  <div>
                    <div style={MUTED_LABEL_STYLE}>Longitud</div>
                    <div style={VALUE_TEXT_STYLE}>{longitud}</div>
                  </div>
                  <div>
                    <div style={MUTED_LABEL_STYLE}>Precisión</div>
                    <div style={VALUE_TEXT_STYLE}>{precisionGps || "No disponible"}</div>
                  </div>
                  <div>
                    <div style={MUTED_LABEL_STYLE}>Fecha GPS</div>
                    <div style={VALUE_TEXT_STYLE}>{fechaGps ? new Date(fechaGps).toLocaleString() : "No disponible"}</div>
                  </div>
                </>
              ) : (
                <div style={INFO_TEXT_STYLE}>Aún no se ha capturado la ubicación del servicio.</div>
              )}
            </div>
          </div>
          <div
            style={{
              margin: "6px 0 2px 0",
              paddingTop: "12px",
              borderTop: "1px dashed #cbd5e1",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                padding: "6px 10px",
                borderRadius: "999px",
                backgroundColor: "#eff6ff",
                color: "#1d4ed8",
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                marginBottom: "8px",
              }}
            >
              Paso 4
            </div>
            <div style={SECTION_TITLE_STYLE}>Registro de CUPS</div>
            <div style={SECTION_SUBTITLE_STYLE}>
              Selecciona y agrega todos los CUPS que correspondan al usuario.
            </div>
          </div>

          <div
            style={{
              ...SOFT_PANEL_STYLE,
              background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
              border: "1px solid #bfdbfe",
            }}
          >
            <div style={{ display: "grid", gap: "6px" }}>
              <div style={{ ...MUTED_LABEL_STYLE, color: "#1d4ed8" }}>EPS detectada</div>
              <div style={{ ...VALUE_TEXT_STYLE, color: "#0f172a" }}>
                {epsActualUsuario || "No registrada"}
              </div>
              <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>
                {contratoEpsActual
                  ? `Mostrando ${catalogoCupsDisponible.length} CUPS del contrato: ${etiquetaContratoActual}`
                  : epsActualUsuario
                    ? "La EPS del usuario no coincide con un anexo tecnico configurado. No se muestran CUPS hasta definir ese contrato."
                    : "Selecciona primero un usuario para cargar automaticamente los CUPS segun la EPS correspondiente."}
              </div>
            </div>
          </div>

          <label style={FIELD_LABEL_STYLE}>
            Agregar CUPS
            <select
              value={cupsSeleccionado}
              onChange={(e) => setCupsSeleccionado(e.target.value)}
              style={INPUT_STYLE}
              disabled={!contratoEpsActual}
            >
              <option value="">Seleccione</option>
              {catalogoCupsDisponible.map((c) => (
                <option key={c.codigo} value={c.codigo}>
                  {c.codigo} - {c.intervencion}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={agregarCups}
            disabled={!contratoEpsActual}
            style={{
              ...PRIMARY_BUTTON_STYLE,
              background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
              boxShadow: "0 10px 18px rgba(15,118,110,0.22)",
              letterSpacing: "0.1px",
              opacity: contratoEpsActual ? 1 : 0.7,
            }}
          >
            Agregar CUPS
          </button>

          <div
            style={{
              ...SOFT_PANEL_STYLE,
              background: "linear-gradient(180deg, #f8fbff 0%, #f8fafc 100%)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "8px", fontSize: "15px", color: "#0f172a" }}>
              CUPS agregados
            </h3>
            {cupsAgregados.length === 0 ? (
              <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>No hay CUPS agregados.</p>
            ) : (
              <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none", display: "grid", gap: "10px" }}>
                {cupsAgregados.map((c) => (
                  <li
                    key={c.codigo}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: "1px solid #dbe4f0",
                      backgroundColor: "#ffffff",
                      color: "#334155",
                      lineHeight: "1.45",
                      boxShadow: "0 4px 10px rgba(15,23,42,0.04)",
                    }}
                  >
                    <strong>{c.codigo}</strong> - {c.intervencion}{" "}
                    <button
                      onClick={() => eliminarCups(c.codigo)}
                      style={{
                        ...MINI_DANGER_BUTTON_STYLE,
                        marginLeft: "8px",
                      }}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            <button
              onClick={modoEdicion ? actualizarAtencion : guardarAtencion}
              style={SUCCESS_BUTTON_STYLE}
            >
              {modoEdicion ? "Actualizar atención" : "Guardar atención localmente"}
            </button>

            {modoEdicion && (
              <button
                onClick={limpiarFormulario}
                style={DANGER_BUTTON_STYLE}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </div>
        <hr />
          </>
        )}

        {paginaActiva === "registro" && vistaActiva === "registros" && (
          <>
            <div style={CARD_STYLE}>
              <button
                onClick={() => {
                  const nuevoEstado = !modoOffline;
                  setModoOffline(nuevoEstado);
                  alert(nuevoEstado ? "Modo offline activado. La app trabajará con la base local del dispositivo." : "Modo offline desactivado. Ya puedes actualizar usuarios y sincronizar con Supabase.");
                }}
                style={{
                  ...PRIMARY_BUTTON_STYLE,
                  minHeight: "46px",
                  background: modoOffline
                    ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                    : "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                  boxShadow: modoOffline
                    ? "0 10px 18px rgba(220,38,38,0.18)"
                    : "0 10px 18px rgba(15,118,110,0.20)",
                }}
              >
                {modoOffline ? "Desactivar modo offline" : "Activar modo offline"}
              </button>

              <button
                onClick={sincronizarPendientes}
                disabled={modoOffline}
                style={{
                  ...PRIMARY_BUTTON_STYLE,
                  minHeight: "46px",
                  background: modoOffline
                    ? "linear-gradient(135deg, #94a3b8 0%, #94a3b8 100%)"
                    : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: modoOffline ? "none" : "0 10px 18px rgba(37,99,235,0.22)",
                }}
              >
                Sincronizar pendientes
              </button>

              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  backgroundColor: modoOffline ? "#fff7ed" : supabaseConfigurado ? "#ecfdf5" : "#fef2f2",
                  color: modoOffline ? "#9a3412" : supabaseConfigurado ? "#166534" : "#991b1b",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "center",
                  border: `1px solid ${modoOffline ? "#fdba74" : supabaseConfigurado ? "#bbf7d0" : "#fecaca"}`,
                  boxShadow: modoOffline
                    ? "0 8px 16px rgba(245,158,11,0.10)"
                    : supabaseConfigurado
                      ? "0 8px 16px rgba(22,163,74,0.10)"
                      : "0 8px 16px rgba(239,68,68,0.10)",
                }}
              >
                Estado: {modoOffline ? "Modo offline activado" : supabaseConfigurado ? "En línea / Supabase configurado" : "Supabase no configurado"}
              </div>
            </div>

            <div style={CARD_STYLE}>
              <button
                onClick={actualizarUsuariosDesdeSupabase}
                disabled={modoOffline}
                style={{
                  ...PRIMARY_BUTTON_STYLE,
                  minHeight: "46px",
                  background: modoOffline
                    ? "linear-gradient(135deg, #94a3b8 0%, #94a3b8 100%)"
                    : "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                  boxShadow: modoOffline ? "none" : "0 10px 18px rgba(15,118,110,0.20)",
                }}
              >
                Actualizar usuarios para uso offline
              </button>
              <div style={INFO_TEXT_STYLE}>
                La base local de usuarios se usa para buscar personas sin conexión.
                {ultimaActualizacionUsuarios && (
                  <>
                    <br />
                    <strong>Última actualización:</strong> {new Date(ultimaActualizacionUsuarios).toLocaleString()}
                  </>
                )}
              </div>
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
          <div
            style={{
              paddingBottom: "8px",
              borderBottom: "1px solid #e5e7eb",
              marginBottom: "6px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "18px", color: "#0f172a", letterSpacing: "0.1px" }}>Atenciones guardadas localmente</h2>
            <div style={SECTION_SUBTITLE_STYLE}>
              Consulta, filtra, edita o elimina registros almacenados.
            </div>
          </div>

          <div
            style={{
              ...SOFT_PANEL_STYLE,
              display: "grid",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "15px", color: "#0f172a", letterSpacing: "0.1px" }}>Filtros de búsqueda</h3>

            <label style={FIELD_LABEL_STYLE}>
              Buscar por identificación de usuario
              <input
                type="text"
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
                placeholder="Ej: 12345678"
                style={{ ...INPUT_STYLE, backgroundColor: "#ffffff" }}
              />
            </label>

            <label style={FIELD_LABEL_STYLE}>
              Filtrar por municipio
              <select
                value={filtroMunicipio}
                onChange={(e) => setFiltroMunicipio(e.target.value)}
                style={{ ...INPUT_STYLE, backgroundColor: "#ffffff" }}
              >
                <option value="">Todos</option>
                {municipios.map((m) => (
                  <option key={`filtro-${m.id}`} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label style={FIELD_LABEL_STYLE}>
              Filtrar por guía bilingüe
              <select
                value={filtroGuia}
                onChange={(e) => setFiltroGuia(e.target.value)}
                style={{ ...INPUT_STYLE, backgroundColor: "#ffffff" }}
              >
                <option value="">Todos</option>
                {guias.map((g) => (
                  <option key={`filtro-guia-${g.identificacion}`} value={g.identificacion}>
                    {g.identificacion} - {g.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label style={FIELD_LABEL_STYLE}>
              Filtrar por fecha
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                style={{ ...INPUT_STYLE, backgroundColor: "#ffffff" }}
              />
            </label>

            <button
              onClick={() => {
                setFiltroUsuario("");
                setFiltroMunicipio("");
                setFiltroGuia("");
                setFiltroFecha("");
              }}
              style={{
                ...PRIMARY_BUTTON_STYLE,
                background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                boxShadow: "0 10px 18px rgba(71,85,105,0.18)",
              }}
            >
              Limpiar filtros
            </button>
          </div>
          {atencionesGuardadas.length === 0 ? (
            <p>No hay atenciones guardadas todavía.</p>
          ) : atencionesFiltradas.length === 0 ? (
            <p>No hay resultados con los filtros aplicados.</p>
          ) : (
            <ul style={{ paddingLeft: 0, margin: 0, width: "100%" }}>
              {atencionesFiltradas.map((a) => {
                const cupsDeLaAtencion = obtenerCupsPorAtencion(a.uuid_local);

                return (
                  <li
                    key={a.id}
                    style={{
                      marginBottom: "14px",
                      padding: "16px",
                      border: "1px solid #dbe4f0",
                      borderRadius: "18px",
                      background: "linear-gradient(180deg, #ffffff 0%, #fcfefe 100%)",
                      boxShadow: "0 12px 24px rgba(15,23,42,0.07)",
                      listStyle: "none",
                    }}
                  >
                    <div style={{ display: "grid", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: "bold", color: "#0f172a" }}>
                            Usuario: {a.nombre_usuario ? `${a.nombre_usuario} (${a.identificacion_usuario})` : a.identificacion_usuario}
                          </div>
                          <div style={{ fontSize: "13px", color: "#475569", marginTop: "4px", lineHeight: "1.4" }}>
                            {obtenerNombreMunicipio(a.municipio_id)} • {a.fecha_atencion}
                          </div>
                        </div>

                        <span
                          style={{
                            ...STATUS_PILL_STYLE,
                            whiteSpace: "nowrap",
                            backgroundColor:
                              a.estado_sync === "sincronizado"
                                ? "#dcfce7"
                                : a.estado_sync === "error"
                                  ? "#fee2e2"
                                  : "#fef3c7",
                            color:
                              a.estado_sync === "sincronizado"
                                ? "#166534"
                                : a.estado_sync === "error"
                                  ? "#991b1b"
                                  : "#92400e",
                            border:
                              a.estado_sync === "sincronizado"
                                ? "1px solid #86efac"
                                : a.estado_sync === "error"
                                  ? "1px solid #fca5a5"
                                  : "1px solid #fcd34d",
                          }}
                        >
                          {a.estado_sync === "sincronizado"
                            ? "Sincronizado"
                            : a.estado_sync === "error"
                              ? "Error"
                              : "Pendiente"}
                        </span>
                      </div>

                      <div style={{ display: "grid", gap: "6px" }}>
                        {a.eps_usuario && (
                          <div>
                            <div style={MUTED_LABEL_STYLE}>EPS</div>
                            <div style={VALUE_TEXT_STYLE}>{a.eps_usuario}</div>
                          </div>
                        )}
                        {a.ubicacion_capturada === 1 && (
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Ubicación</div>
                            <div style={VALUE_TEXT_STYLE}>Capturada</div>
                          </div>
                        )}
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Riesgo</div>
                          <div style={VALUE_TEXT_STYLE}>{obtenerNombreRiesgo(a.identificacion_riesgo)}</div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Guía</div>
                          <div style={VALUE_TEXT_STYLE}>{a.nombre_guia}</div>
                        </div>
                        <div>
                          <div style={MUTED_LABEL_STYLE}>Total CUPS</div>
                          <div style={VALUE_TEXT_STYLE}>{cupsDeLaAtencion.length}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => alternarExpansionRegistro(a.id)}
                        style={{
                          minHeight: "42px",
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "12px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#f8fafc",
                          color: "#334155",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        {registrosExpandidos[a.id] ? "Ocultar detalles" : "Ver detalles"}
                      </button>

                      {registrosExpandidos[a.id] && (
                        <div
                          style={{
                            marginTop: "6px",
                            padding: "14px",
                            borderRadius: "14px",
                            background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
                            border: "1px solid #dbe4f0",
                            fontSize: "13px",
                            color: "#334155",
                            lineHeight: "1.5",
                          }}
                        >
                          {a.nombre_usuario && (
                            <div>
                              <div style={MUTED_LABEL_STYLE}>Nombre usuario</div>
                              <div style={VALUE_TEXT_STYLE}>{a.nombre_usuario}</div>
                            </div>
                          )}
                          {a.eps_usuario && (
                            <div>
                              <div style={MUTED_LABEL_STYLE}>EPS</div>
                              <div style={VALUE_TEXT_STYLE}>{a.eps_usuario}</div>
                            </div>
                          )}
                          {a.ubicacion_capturada === 1 && (
                            <>
                              <div>
                                <div style={MUTED_LABEL_STYLE}>Latitud</div>
                                <div style={VALUE_TEXT_STYLE}>{a.latitud}</div>
                              </div>
                              <div>
                                <div style={MUTED_LABEL_STYLE}>Longitud</div>
                                <div style={VALUE_TEXT_STYLE}>{a.longitud}</div>
                              </div>
                              <div>
                                <div style={MUTED_LABEL_STYLE}>Precisión GPS</div>
                                <div style={VALUE_TEXT_STYLE}>{a.precision_gps || "No disponible"}</div>
                              </div>
                              <div>
                                <div style={MUTED_LABEL_STYLE}>Fecha GPS</div>
                                <div style={VALUE_TEXT_STYLE}>{a.fecha_gps ? new Date(a.fecha_gps).toLocaleString() : "No disponible"}</div>
                              </div>
                            </>
                          )}
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Sincronizado</div>
                            <div style={VALUE_TEXT_STYLE}>{a.sincronizado === 1 ? "Sí" : "No"}</div>
                          </div>
                          <div>
                            <div style={MUTED_LABEL_STYLE}>Fecha sincronización</div>
                            <div style={VALUE_TEXT_STYLE}>{a.fecha_sincronizacion || "Pendiente"}</div>
                          </div>
                          {a.mensaje_error_sync && (
                            <div
                              style={{
                                marginTop: "10px",
                                padding: "10px 12px",
                                borderRadius: "12px",
                                border: "1px solid #fecaca",
                                backgroundColor: "#fef2f2",
                              }}
                            >
                              <div style={{ ...MUTED_LABEL_STYLE, color: "#991b1b" }}>Error sync</div>
                              <div style={{ ...VALUE_TEXT_STYLE, color: "#991b1b" }}>{a.mensaje_error_sync}</div>
                            </div>
                          )}

                          <div style={{ ...DETAIL_SECTION_STYLE, marginTop: "10px" }}>
                            <div style={MUTED_LABEL_STYLE}>CUPS registrados</div>
                            {cupsDeLaAtencion.length === 0 ? (
                              <div style={VALUE_TEXT_STYLE}>No hay CUPS asociados.</div>
                            ) : (
                              <ul style={{ paddingLeft: 0, marginTop: 0, marginBottom: 0, listStyle: "none", display: "grid", gap: "8px" }}>
                                {cupsDeLaAtencion.map((c, index) => (
                                  <li
                                    key={`${c.codigo_cups}-${index}`}
                                    style={{
                                      padding: "8px 10px",
                                      borderRadius: "10px",
                                      border: "1px solid #dbe4f0",
                                      backgroundColor: "#ffffff",
                                    }}
                                  >
                                    <strong>{c.codigo_cups}</strong> - {c.intervencion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
                      <button
                        onClick={() => iniciarEdicion(a)}
                        style={{
                          ...PRIMARY_BUTTON_STYLE,
                          minHeight: "46px",
                          padding: "10px 14px",
                          fontSize: "14px",
                          background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                          boxShadow: "0 10px 18px rgba(15,118,110,0.20)",
                        }}
                      >
                        Editar atención
                      </button>
                      <button
                        onClick={() => eliminarAtencion(a)}
                        style={{
                          ...DANGER_BUTTON_STYLE,
                          minHeight: "46px",
                          padding: "10px 14px",
                          fontSize: "14px",
                        }}
                      >
                        Eliminar atención
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
            </div>
          </>
        )}

        {paginaActiva === "estadisticas" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <StatCard label="Atenciones" value={totalAtenciones} accent="#bfdbfe" />
              <StatCard label="Usuarios" value={totalUsuariosUnicos} accent="#bbf7d0" />
              <StatCard label="CUPS" value={totalCupsRegistrados} accent="#ddd6fe" />
              <StatCard label="Pendientes" value={totalPendientes} accent="#fde68a" />
              <StatCard label="Sincronizadas" value={totalSincronizadas} accent="#86efac" />
              <StatCard label="Errores" value={totalErroresSync} accent="#fecaca" />
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Atenciones por municipio</div>
                <div style={SECTION_SUBTITLE_STYLE}>Top de registros locales agrupados por municipio.</div>
              </div>
              {estadisticasPorMunicipio.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>Aún no hay datos suficientes para mostrar estadísticas.</div>
              ) : (
                <ul style={SIMPLE_LIST_STYLE}>
                  {estadisticasPorMunicipio.map((item) => (
                    <li key={`municipio-${item.key}`} style={DETAIL_SECTION_STYLE}>
                      <div style={MUTED_LABEL_STYLE}>{item.label}</div>
                      <div style={VALUE_TEXT_STYLE}>{item.total} atenciones</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Atenciones por riesgo</div>
                <div style={SECTION_SUBTITLE_STYLE}>Resumen local agrupado por riesgo observado.</div>
              </div>
              {estadisticasPorRiesgo.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>Aún no hay datos suficientes para mostrar estadísticas.</div>
              ) : (
                <ul style={SIMPLE_LIST_STYLE}>
                  {estadisticasPorRiesgo.map((item) => (
                    <li key={`riesgo-${item.key}`} style={DETAIL_SECTION_STYLE}>
                      <div style={MUTED_LABEL_STYLE}>{item.label}</div>
                      <div style={VALUE_TEXT_STYLE}>{item.total} atenciones</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Atenciones por guía</div>
                <div style={SECTION_SUBTITLE_STYLE}>Top local de registros agrupados por guía bilingüe.</div>
              </div>
              {estadisticasPorGuia.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>Aún no hay datos suficientes para mostrar estadísticas.</div>
              ) : (
                <ul style={SIMPLE_LIST_STYLE}>
                  {estadisticasPorGuia.map((item) => (
                    <li key={`guia-${item.key}`} style={DETAIL_SECTION_STYLE}>
                      <div style={MUTED_LABEL_STYLE}>{item.label}</div>
                      <div style={VALUE_TEXT_STYLE}>{item.total} atenciones</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {paginaActiva === "mapa" && (
          <>
            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Mapa de ubicaciones registradas</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Selecciona una atención con coordenadas para verla en el mapa.
                </div>
              </div>

              {atencionMapaActiva ? (
                <div style={{ display: "grid", gap: "12px" }}>
                  <div
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #dbe4f0",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <iframe
                      title="Mapa de ubicación registrada"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(atencionMapaActiva.longitud) - 0.01}%2C${Number(atencionMapaActiva.latitud) - 0.01}%2C${Number(atencionMapaActiva.longitud) + 0.01}%2C${Number(atencionMapaActiva.latitud) + 0.01}&layer=mapnik&marker=${atencionMapaActiva.latitud}%2C${atencionMapaActiva.longitud}`}
                      style={{
                        width: "100%",
                        height: "280px",
                        border: "0",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ ...SOFT_PANEL_STYLE, display: "grid", gap: "8px" }}>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Usuario</div>
                      <div style={VALUE_TEXT_STYLE}>
                        {atencionMapaActiva.nombre_usuario
                          ? `${atencionMapaActiva.nombre_usuario} (${atencionMapaActiva.identificacion_usuario})`
                          : atencionMapaActiva.identificacion_usuario}
                      </div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Municipio</div>
                      <div style={VALUE_TEXT_STYLE}>{obtenerNombreMunicipio(atencionMapaActiva.municipio_id)}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Fecha de atención</div>
                      <div style={VALUE_TEXT_STYLE}>{atencionMapaActiva.fecha_atencion}</div>
                    </div>
                    <div>
                      <div style={MUTED_LABEL_STYLE}>Coordenadas</div>
                      <div style={VALUE_TEXT_STYLE}>
                        {atencionMapaActiva.latitud}, {atencionMapaActiva.longitud}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <a
                        href={`https://www.google.com/maps?q=${atencionMapaActiva.latitud},${atencionMapaActiva.longitud}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          ...PRIMARY_BUTTON_STYLE,
                          minHeight: "44px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                        }}
                      >
                        Google Maps
                      </a>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${atencionMapaActiva.latitud}&mlon=${atencionMapaActiva.longitud}#map=16/${atencionMapaActiva.latitud}/${atencionMapaActiva.longitud}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          ...PRIMARY_BUTTON_STYLE,
                          minHeight: "44px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
                        }}
                      >
                        OpenStreetMap
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={INFO_TEXT_STYLE}>
                  Aún no hay atenciones con ubicación capturada para mostrar en el mapa.
                </div>
              )}
            </div>

            <div style={{ ...CARD_STYLE, padding: "16px" }}>
              <div
                style={{
                  paddingBottom: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: "6px",
                }}
              >
                <div style={SECTION_TITLE_STYLE}>Ubicaciones disponibles</div>
                <div style={SECTION_SUBTITLE_STYLE}>
                  Selecciona una atención para centrar el visor del mapa en esa ubicación.
                </div>
              </div>

              {atencionesConUbicacion.length === 0 ? (
                <div style={INFO_TEXT_STYLE}>
                  No hay registros con latitud y longitud disponibles en este momento.
                </div>
              ) : (
                <ul style={SIMPLE_LIST_STYLE}>
                  {atencionesConUbicacion.map((atencion) => (
                    <li key={`mapa-${atencion.id}`} style={DETAIL_SECTION_STYLE}>
                      <button
                        onClick={() => setAtencionMapaSeleccionada(atencion)}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          textAlign: "left",
                          color: "inherit",
                        }}
                      >
                        <div style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a" }}>
                          {atencion.nombre_usuario
                            ? `${atencion.nombre_usuario} (${atencion.identificacion_usuario})`
                            : atencion.identificacion_usuario}
                        </div>
                        <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px" }}>
                          {obtenerNombreMunicipio(atencion.municipio_id)} · {atencion.fecha_atencion}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                          {atencion.latitud}, {atencion.longitud}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}

export default App;
