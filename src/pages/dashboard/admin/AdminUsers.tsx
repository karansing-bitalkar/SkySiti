import { useState } from 'react';
import { Search, UserX, Edit2, Shield, Download, Plus, Trash2, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardTopbar from '@/layouts/DashboardTopbar';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { toast } from 'sonner';

const INITIAL_USERS = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'user', status: 'active', joined: '2026-01-15', location: 'Downtown' },
  { id: '2', name: 'Sarah Mitchell', email: 'sarah@example.com', role: 'business', status: 'active', joined: '2026-02-10', location: 'Midtown' },
  { id: '3', name: 'Marcus Chen', email: 'marcus@example.com', role: 'organizer', status: 'active', joined: '2026-02-22', location: 'Westside' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'user', status: 'suspended', joined: '2026-03-05', location: 'Eastside' },
  { id: '5', name: 'Jordan Lee', email: 'jordan@example.com', role: 'user', status: 'active', joined: '2026-03-12', location: 'Northgate' },
  { id: '6', name: 'Priya Patel', email: 'priya@example.com', role: 'business', status: 'active', joined: '2026-03-20', location: 'Harbor' },
  { id: '7', name: 'Ryan Davis', email: 'ryan@example.com', role: 'user', status: 'inactive', joined: '2026-04-01', location: 'Suburbs' },
  { id: '8', name: 'Isabella Torres', email: 'isabella@example.com', role: 'user', status: 'active', joined: '2026-04-05', location: 'Central' },
  { id: '9', name: 'Liam Brooks', email: 'liam@example.com', role: 'organizer', status: 'active', joined: '2026-04-08', location: 'Riverside' },
  { id: '10', name: 'Aisha Kamara', email: 'aisha@example.com', role: 'business', status: 'active', joined: '2026-04-10', location: 'Harbor' },
  { id: '11', name: 'Noah Patel', email: 'noah@example.com', role: 'user', status: 'inactive', joined: '2026-04-12', location: 'Downtown' },
  { id: '12', name: 'Sofia Reyes', email: 'sofia@example.com', role: 'user', status: 'active', joined: '2026-04-14', location: 'Midtown' },
];

const ROLES = ['user', 'business', 'organizer', 'admin'];
const STATUSES = ['active', 'inactive', 'suspended'];
const PER_PAGE = 10;

const roleBadge: Record<string, string> = {
  user: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
  business: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400',
  organizer: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
  admin: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};
const statusBadge: Record<string, string> = {
  active: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
  suspended: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  inactive: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
};

interface UserEntry { id: string; name: string; email: string; role: string; status: string; joined: string; location: string; }
const emptyForm = (): Omit<UserEntry, 'id'> => ({ name: '', email: '', role: 'user', status: 'active', joined: new Date().toISOString().slice(0, 10), location: '' });

export default function AdminUsers() {
  const [users, setUsers] = useState<UserEntry[]>(INITIAL_USERS);
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserEntry | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [suspendId, setSuspendId] = useState<string | null>(null);

  const filtered = users.filter(u => {
    const mq = !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase());
    const mr = roleFilter === 'all' || u.role === roleFilter;
    return mq && mr;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const openAdd = () => { setEditingUser(null); setForm(emptyForm()); setShowModal(true); };
  const openEdit = (u: UserEntry) => { setEditingUser(u); setForm({ name: u.name, email: u.email, role: u.role, status: u.status, joined: u.joined, location: u.location }); setShowModal(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...form } : u));
      toast.success('User updated successfully');
    } else {
      const newUser: UserEntry = { ...form, id: Date.now().toString() };
      setUsers(prev => [...prev, newUser]);
      toast.success('User added successfully');
      setPage(Math.ceil((users.length + 1) / PER_PAGE));
    }
    setShowModal(false);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User deleted successfully');
  };

  const toggleSuspend = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
    toast.success('User status updated');
  };

  return (
    <div className="dark:bg-slate-950 min-h-screen">
      <DashboardTopbar title="User Management" />
      <div className="p-6 max-w-7xl">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 shadow-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search users..." className="bg-transparent text-sm focus:outline-none text-slate-800 dark:text-white placeholder-slate-400 w-44" />
            </div>
            <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }} className="input-field py-2.5 text-sm w-auto">
              <option value="all">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast.success('Users exported!')} className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> Add User
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Users', value: users.length, color: 'text-primary-600' },
            { label: 'Active', value: users.filter(u => u.status === 'active').length, color: 'text-accent-600' },
            { label: 'Suspended', value: users.filter(u => u.status === 'suspended').length, color: 'text-red-500' },
            { label: 'Business/Org', value: users.filter(u => ['business','organizer'].includes(u.role)).length, color: 'text-secondary-600' },
          ].map(s => (
            <div key={s.label} className="card dark:bg-slate-800 p-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card dark:bg-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                  {['User', 'Role', 'Status', 'Joined', 'Location', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">No users found</td></tr>
                ) : paginated.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`badge capitalize ${roleBadge[u.role] || 'bg-slate-100 text-slate-600'}`}>{u.role}</span></td>
                    <td className="px-4 py-3"><span className={`badge capitalize ${statusBadge[u.status] || 'bg-slate-100 text-slate-600'}`}>{u.status}</span></td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{u.joined}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{u.location}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(u)} title="Edit" className="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setSuspendId(u.id)} title={u.status === 'suspended' ? 'Unsuspend' : 'Suspend'} className="p-1.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg text-slate-400 hover:text-amber-500 transition-colors">
                          <Shield className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(u.id)} title="Delete" className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${page === p ? 'bg-primary-500 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-500" />
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Full Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Enter full name" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Email Address *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="user@example.com" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Role</label>
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field">
                    {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="input-field">
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">Location</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field" placeholder="City or area" />
              </div>
              {!editingUser && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
                  A temporary password will be emailed to the user upon creation.
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!suspendId} onClose={() => setSuspendId(null)} onConfirm={() => { suspendId && toggleSuspend(suspendId); setSuspendId(null); }} title="Update User Status?" message="This will change the user's access to the platform." confirmLabel="Confirm" variant="warning" />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { deleteId && deleteUser(deleteId); setDeleteId(null); }} title="Delete User?" message="This user will be permanently deleted from the platform. This cannot be undone." confirmLabel="Delete" variant="danger" />
    </div>
  );
}
