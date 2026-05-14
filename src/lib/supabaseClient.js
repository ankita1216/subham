// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Directly define credentials
const SUPABASE_URL = "https://zufgodbvzxztmnzqbgdj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_B4J1F8x5rWE-TnW5txifgQ_vgKv_x4b"
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
