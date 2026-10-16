import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://api.nafilestates.com";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.nafilestates.com";

// Created on first use, not at import: the devControl page is prerendered at build
// time, when no anon key may be present.
let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  client ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return client;
}

export const supabase = {
  get auth() {
    return getClient().auth;
  },
};

export class DevControlApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function devControlFetch<T>(path: string): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new DevControlApiError(401, "Not signed in");
  const res = await fetch(`${API_URL}/devcontrol${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new DevControlApiError(
      res.status,
      res.status === 403 ? "This account is not a super admin" : `Request failed (${res.status})`,
    );
  }
  return res.json() as Promise<T>;
}
