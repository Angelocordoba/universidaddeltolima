import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const test = async () => {
  console.log("🔍 Probando conexión a Supabase...");
  const { data, error } = await supabase.from('usuarios').select('*').limit(1);
  if (error) console.error("❌ Error:", error);
  else console.log("✅ Conexión correcta:", data);
};

test();
