// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Directly define credentials
const SUPABASE_URL = "https://mzivnzqvscmggbadwnqy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16aXZuenF2c2NtZ2diYWR3bnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MTYwMzcsImV4cCI6MjA4MDk5MjAzN30.trDDDyQ9WV8ioSqZaXsdWpOZREdl0qsOmAse3KZUx6Q";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
