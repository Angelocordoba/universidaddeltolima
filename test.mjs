import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://TU-PROYECTO.supabase.co",
  "TU-ANON-KEY"
);

const { data, error } = await supabase.from("usuarios").select("*").limit(1);

console.log("data:", data);
console.log("error:", error);
