import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const supabasePublishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim();

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Supabase environment variables are missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in the hosting environment.');
}

let parsedUrl: URL;
try {
  parsedUrl = new URL(supabaseUrl);
} catch {
  throw new Error('VITE_SUPABASE_URL is not a valid URL.');
}

if (parsedUrl.protocol !== 'https:' || !parsedUrl.hostname.endsWith('.supabase.co')) {
  throw new Error('VITE_SUPABASE_URL must use HTTPS and point to a Supabase project.');
}

if (/service[_-]?role|sb_secret_/i.test(supabasePublishableKey)) {
  throw new Error('A secret/service-role Supabase key must never be used in the browser.');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
