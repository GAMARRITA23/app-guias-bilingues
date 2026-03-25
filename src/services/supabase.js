import { createClient } from "@supabase/supabase-js";

// Reemplaza este valor con el Project URL real que aparece en Supabase > Project Settings > API
const supabaseUrl = "https://zmjudpnabprrisjpcdev.supabase.co";

// Reemplaza este valor con el anon public key real que aparece en Supabase > Project Settings > API
const supabaseAnonKey = "sb_publishable_NNwvG67Xriq9dkvcrtGtqA_087a2b5I";

// Mientras estos dos valores sigan con los textos de ejemplo, la app mostrará:
// "Estado Supabase: No configurado"
// Cuando pegues los datos reales y guardes el archivo, pasará a:
// "Estado Supabase: Configurado"
export const supabaseConfigurado =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes("TU-PROYECTO") &&
  !supabaseAnonKey.includes("TU-ANON-KEY");

export const supabase = supabaseConfigurado
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;