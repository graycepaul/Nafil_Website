"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { DevControlApiError, devControlFetch, setTestFlag, supabase } from "@/lib/devcontrol/client";
import type { EstateRow, Overview, Scope, TestSource, UserRow } from "@/lib/devcontrol/types";
import { formatBytes, formatDate, formatDuration, formatRelative } from "./format";

type Tab = "overview" | "estates" | "users";

export function DevControl({ scope = "live" }: { scope?: Scope }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return null;
  if (!session) return <SignIn />;
  return <Dashboard email={session.user.email ?? ""} scope={scope} />;
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError("Incorrect email or password.");
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
        <h1 className="text-xl font-semibold text-zinc-950">devControl</h1>
        <p className="mt-1 text-sm text-zinc-500">Developer sign in</p>
        <label className="mt-6 block text-sm font-medium text-zinc-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        <label className="mt-4 block text-sm font-medium text-zinc-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-lg bg-brand-800 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ email, scope }: { email: string; scope: Scope }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [estates, setEstates] = useState<EstateRow[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [o, e, u] = await Promise.all([
        devControlFetch<Overview>("/overview", scope),
        devControlFetch<EstateRow[]>("/estates", scope),
        devControlFetch<UserRow[]>("/users", scope),
      ]);
      setOverview(o);
      setEstates(e);
      setUsers(u);
      setLoadedAt(new Date());
    } catch (err) {
      if (err instanceof DevControlApiError && err.status === 403) setForbidden(true);
      else setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [scope]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "estates", label: "Estates" },
    { id: "users", label: "Users" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-950">devControl</h1>
          <p className="text-sm text-zinc-500">
            {email}
            {loadedAt && ` · updated ${loadedAt.toLocaleTimeString("en-GB")}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100">
            Refresh
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-100"
          >
            Sign out
          </button>
        </div>
      </header>

      <ScopeSwitch scope={scope} other={overview?.other_scope} />

      {forbidden ? (
        <p className="mt-10 rounded-xl bg-white p-6 text-sm text-zinc-700 ring-1 ring-zinc-200">
          This account does not have super admin access.
        </p>
      ) : (
        <>
          <nav className="mt-4 flex gap-1 border-b border-zinc-200">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
                  tab === t.id
                    ? "border-brand-800 text-brand-800"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
          {!overview && !error && <p className="mt-6 text-sm text-zinc-500">Loading...</p>}
          {overview && tab === "overview" && <OverviewTab data={overview} />}
          {tab === "estates" && <EstatesTab rows={estates} scope={scope} onChanged={load} />}
          {tab === "users" && <UsersTab rows={users} scope={scope} onChanged={load} />}
        </>
      )}
    </div>
  );
}

function ScopeSwitch({ scope, other }: { scope: Scope; other?: { users: number; estates: number } }) {
  // On devadmin.* the proxy rewrites "/" and "/test" into /devcontrol, so links
  // stay relative to whichever prefix the browser is currently using.
  const pathname = usePathname();
  const base = pathname.startsWith("/devcontrol") ? "/devcontrol" : "";
  const items: { id: Scope; label: string; href: string }[] = [
    { id: "live", label: "Live data", href: base || "/" },
    { id: "test", label: "Test data", href: `${base}/test` },
  ];
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="inline-flex rounded-lg bg-zinc-200 p-1 text-sm">
        {items.map((i) => (
          <Link
            key={i.id}
            href={i.href}
            className={`rounded-md px-3 py-1 font-medium ${
              scope === i.id ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            {i.label}
          </Link>
        ))}
      </div>
      {scope === "test" ? (
        <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-900">
          Test accounts and demo estates only. Not counted in live figures.
        </span>
      ) : (
        other && (
          <span className="text-xs text-zinc-500">
            {other.users} test accounts and {other.estates} test estate{other.estates === 1 ? "" : "s"} excluded
          </span>
        )
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-950">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

function Bars({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  if (items.length === 0) return <p className="text-sm text-zinc-500">No data yet.</p>;
  return (
    <div className="flex h-32 items-end gap-2">
      {items.map((i) => (
        <div key={i.label} className="flex flex-1 flex-col items-center justify-end gap-1" title={`${i.label}: ${i.value}`}>
          <span className="text-xs text-zinc-600">{i.value}</span>
          <div className="w-full rounded-t bg-brand-600" style={{ height: `${(i.value / max) * 80}%`, minHeight: 2 }} />
          <span className="text-[10px] text-zinc-500">{i.label}</span>
        </div>
      ))}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-5 ring-1 ring-zinc-200">
      <h2 className="mb-4 text-sm font-semibold text-zinc-900">{title}</h2>
      {children}
    </section>
  );
}

function shortDay(value: string) {
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function OverviewTab({ data }: { data: Overview }) {
  const { users, usage, usage_30d: u30, system } = data;
  const features: [string, string][] = [
    ["issues", "Issues"],
    ["visitor_passes", "Visitor passes"],
    ["visitor_check_ins", "Gate check-ins"],
    ["announcements", "Announcements"],
    ["listings", "Listings"],
    ["wallet_transactions", "Wallet transactions"],
  ];

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Total users" value={users.total} hint={`${users.confirmed} confirmed`} />
        <Stat label="New (7 days)" value={users.new_7d} hint={`${users.new_30d} in 30 days`} />
        <Stat label="Active (24h)" value={users.active_24h} hint={`${users.active_7d} in 7 days`} />
        <Stat label="Active (30 days)" value={users.active_30d} hint={`of ${users.total} users`} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Signups per week">
          <Bars items={data.signups_weekly.map((r) => ({ label: shortDay(r.week), value: r.count }))} />
        </Panel>
        <Panel title="Users by last sign-in day (30 days)">
          <Bars items={data.last_sign_ins_daily.map((r) => ({ label: shortDay(r.day), value: r.count }))} />
        </Panel>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title="Feature usage">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-zinc-500">
              <tr>
                <th className="pb-2 font-medium">Feature</th>
                <th className="pb-2 text-right font-medium">All time</th>
                <th className="pb-2 text-right font-medium">Last 30 days</th>
              </tr>
            </thead>
            <tbody>
              {features.map(([key, label]) => (
                <tr key={key} className="border-t border-zinc-100">
                  <td className="py-2">{label}</td>
                  <td className="py-2 text-right">{usage[key] ?? 0}</td>
                  <td className="py-2 text-right">{u30[key] ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-zinc-500">
            {usage.issues_open} open issues · {usage.join_requests_pending} pending join requests
          </p>
        </Panel>

        <Panel title="Users by role">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-zinc-500">
              <tr>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 text-right font-medium">Users</th>
                <th className="pb-2 text-right font-medium">Approved</th>
              </tr>
            </thead>
            <tbody>
              {data.roles.map((r) => (
                <tr key={r.role} className="border-t border-zinc-100">
                  <td className="py-2 capitalize">{r.role.replace("_", " ")}</td>
                  <td className="py-2 text-right">{r.count}</td>
                  <td className="py-2 text-right">{r.approved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <Panel title="System">
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-5">
          <Metric label="API uptime" value={formatDuration(system.api_uptime_seconds)} />
          <Metric label="Database size" value={formatBytes(system.db_size_bytes)} />
          <Metric label="DB connections" value={String(system.db_connections)} />
          <Metric label="Push tokens" value={String(system.push_tokens)} />
          <Metric label="Unread notifications" value={String(system.notifications_unread)} />
        </div>
      </Panel>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-0.5 font-medium text-zinc-950">{value}</p>
    </div>
  );
}

function FlagButton({
  kind,
  id,
  name,
  scope,
  source,
  onChanged,
}: {
  kind: "user" | "estate";
  id: string;
  name: string;
  scope: Scope;
  source: TestSource;
  onChanged: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  // Rule-matched entries (a @nafil.test email, Demo Gardens, dev admins) are
  // test by definition and can't be moved back from here.
  if (source === "rule") return <span className="text-xs text-zinc-400">Auto</span>;

  const toTest = scope === "live";
  const label = toTest ? "Mark as test" : "Move to live";
  const detail = kind === "estate" ? " and everyone in it" : "";
  const prompt = toTest
    ? `Mark ${name}${detail} as test data? It will be excluded from live figures.`
    : `Move ${name}${detail} back to live data?`;

  async function click() {
    if (!window.confirm(prompt)) return;
    setBusy(true);
    setError(false);
    try {
      await setTestFlag(kind, id, toTest);
      onChanged();
    } catch {
      setError(true);
    }
    setBusy(false);
  }

  return (
    <button
      onClick={click}
      disabled={busy}
      className="whitespace-nowrap rounded-md border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-100 disabled:opacity-60"
    >
      {error ? "Failed, retry" : busy ? "Saving..." : label}
    </button>
  );
}

function EstatesTab({ rows, scope, onChanged }: { rows: EstateRow[]; scope: Scope; onChanged: () => void }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl bg-white ring-1 ring-zinc-200">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs text-zinc-500">
          <tr>
            {["Estate", "Created", "Members", "Approved", "Issues", "Visitor passes", "Announcements", "Listings", "Pending requests", ""].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-zinc-100">
              <td className="px-4 py-3 font-medium">{r.name}</td>
              <td className="px-4 py-3">{formatDate(r.created_at)}</td>
              <td className="px-4 py-3">{r.members}</td>
              <td className="px-4 py-3">{r.approved_members}</td>
              <td className="px-4 py-3">{r.issues}</td>
              <td className="px-4 py-3">{r.visitor_passes}</td>
              <td className="px-4 py-3">{r.announcements}</td>
              <td className="px-4 py-3">{r.listings}</td>
              <td className="px-4 py-3">{r.pending_requests}</td>
              <td className="px-4 py-3 text-right">
                <FlagButton kind="estate" id={r.id} name={r.name} scope={scope} source={r.test_source} onChanged={onChanged} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersTab({ rows, scope, onChanged }: { rows: UserRow[]; scope: Scope; onChanged: () => void }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        [r.full_name, r.email, r.role, r.estate].some((v) => v?.toLowerCase().includes(q)),
      )
    : rows;

  return (
    <div className="mt-6">
      <input
        type="search"
        placeholder="Search name, email, role or estate"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3 w-full max-w-sm rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
      />
      <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-zinc-200">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs text-zinc-500">
            <tr>
              {["Name", "Email", "Role", "Estate", "Approved", "Joined", "Last sign-in", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-medium">{r.full_name ?? "Unnamed"}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3 capitalize">{r.role?.replace("_", " ") ?? "None"}</td>
                <td className="px-4 py-3">{r.estate ?? "None"}</td>
                <td className="px-4 py-3">{r.approved ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{formatDate(r.created_at)}</td>
                <td className="px-4 py-3">{formatRelative(r.last_sign_in_at)}</td>
                <td className="px-4 py-3 text-right">
                  <FlagButton
                    kind="user"
                    id={r.id}
                    name={r.email ?? r.full_name ?? "this account"}
                    scope={scope}
                    source={r.test_source}
                    onChanged={onChanged}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Showing {filtered.length} of {rows.length}
      </p>
    </div>
  );
}
