import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const { data, error } = await supabase.rpc('registrar_visitante_sin_duplicar', {
  p_evento_id: eventoId,
  p_numero_id: cedula,
  p_nombre: nombre,
  p_correo: correo,
  p_telefono: telefono,
});
