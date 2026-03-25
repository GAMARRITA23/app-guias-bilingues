import Dexie from "dexie";

export const db = new Dexie("GuiasBilinguesDB");

db.version(1).stores({
  atenciones: "++id, uuid_local, identificacion_usuario, fecha_atencion, municipio_id, identificacion_guia, sincronizado",
  atencion_cups: "++id, atencion_uuid_local, codigo_cups",
});

db.version(2).stores({
  atenciones: "++id, uuid_local, identificacion_usuario, fecha_atencion, municipio_id, identificacion_guia, sincronizado, fecha_sincronizacion, mensaje_error_sync",
  atencion_cups: "++id, atencion_uuid_local, codigo_cups",
});

db.version(4).stores({
  atenciones: "++id, uuid_local, identificacion_usuario, fecha_atencion, municipio_id, identificacion_guia, sincronizado, fecha_sincronizacion, mensaje_error_sync, latitud, longitud, ubicacion_capturada",
  atencion_cups: "++id, atencion_uuid_local, codigo_cups",
  usuarios: "++id, identificacion, nombreCompleto, tipoId, eps",
});

db.version(5).stores({
  atenciones: "++id, uuid_local, identificacion_usuario, fecha_atencion, municipio_id, identificacion_guia, sincronizado, fecha_sincronizacion, mensaje_error_sync, latitud, longitud, ubicacion_capturada",
  atencion_cups: "++id, atencion_uuid_local, codigo_cups",
  usuarios: "++id, identificacion, nombreCompleto, tipoId, eps",
  gestion_riesgo_tamizajes:
    "++id, uuid_local, identificacion_usuario, riesgo_codigo, fecha_tamizaje, sincronizado, estado_sync, fecha_sincronizacion, mensaje_error_sync",
});

db.version(6).stores({
  atenciones: "++id, uuid_local, identificacion_usuario, fecha_atencion, municipio_id, identificacion_guia, sincronizado, fecha_sincronizacion, mensaje_error_sync, latitud, longitud, ubicacion_capturada",
  atencion_cups: "++id, atencion_uuid_local, codigo_cups",
  usuarios: "++id, identificacion, nombreCompleto, tipoId, eps",
  gestion_riesgo_tamizajes:
    "++id, uuid_local, identificacion_usuario, riesgo_codigo, fecha_tamizaje, sincronizado, estado_sync, fecha_sincronizacion, mensaje_error_sync, latitud, longitud, ubicacion_capturada",
});

db.version(7).stores({
  atenciones: "++id, uuid_local, identificacion_usuario, fecha_atencion, municipio_id, identificacion_guia, sincronizado, fecha_sincronizacion, mensaje_error_sync, latitud, longitud, ubicacion_capturada",
  atencion_cups: "++id, atencion_uuid_local, codigo_cups",
  usuarios: "++id, identificacion, nombreCompleto, tipoId, eps",
  gestion_riesgo_tamizajes:
    "++id, uuid_local, identificacion_usuario, riesgo_codigo, fecha_tamizaje, sincronizado, estado_sync, estado_seguimiento, fecha_ultima_gestion, fecha_sincronizacion, mensaje_error_sync, latitud, longitud, ubicacion_capturada",
});
