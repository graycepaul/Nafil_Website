export type Scope = "live" | "test";

export type Overview = {
  scope: Scope;
  other_scope: { users: number; estates: number };
  users: {
    total: number;
    confirmed: number;
    active_24h: number;
    active_7d: number;
    active_30d: number;
    new_7d: number;
    new_30d: number;
    first_signup: string | null;
    last_signup: string | null;
  };
  roles: { role: string; count: number; approved: number }[];
  signups_weekly: { week: string; count: number }[];
  last_sign_ins_daily: { day: string; count: number }[];
  usage: Record<string, number>;
  usage_30d: Record<string, number>;
  system: {
    db_size_bytes: number;
    db_connections: number;
    push_tokens: number;
    notifications_unread: number;
    db_time: string;
    api_uptime_seconds: number;
  };
};

export type TestSource = "rule" | "manual" | null;

export type EstateRow = {
  test_source: TestSource;
  id: string;
  name: string;
  created_at: string;
  members: number;
  approved_members: number;
  issues: number;
  visitor_passes: number;
  announcements: number;
  listings: number;
  pending_requests: number;
};

export type UserRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  approved: boolean | null;
  estate: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  test_source: TestSource;
};
