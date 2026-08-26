'use client';

import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderGit2,
  Users,
  Database,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  X,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
  UserX,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import styles from './admin.module.css';

interface ProjectItem {
  _id?: string;
  id?: string | number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
  isLive?: boolean;
  order?: number;
  createdAt?: string;
}

interface ClerkUserItem {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: string;
  isHostAdmin?: boolean;
  createdAt?: number;
}

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'projects' | 'subadmins' | 'system'>('projects');
  
  // Auth state
  const [userRole, setUserRole] = useState<'admin' | 'sub_admin' | 'user' | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Data states
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [users, setUsers] = useState<ClerkUserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    link: '',
    featured: false,
    isLive: true,
    order: 0,
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const checkUserRole = async () => {
    try {
      setAuthChecking(true);
      const res = await fetch('/api/admin/me');
      const data = await res.json();

      if (data.success && data.user) {
        setUserRole(data.user.role);
        if (data.user.role === 'admin' || data.user.role === 'sub_admin') {
          fetchProjects();
          if (data.user.role === 'admin') {
            fetchUsers();
          }
        }
      } else {
        setUserRole('user');
      }
    } catch (err) {
      console.error('Error checking role:', err);
      setUserRole('user');
    } finally {
      setAuthChecking(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/portfolio');
      const data = await res.json();

      if (data.success) {
        setProjects(data.projects || []);
      } else if (data.error && !data.error.includes('FORBIDDEN')) {
        showToast(data.error, 'error');
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/subadmins');
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      checkUserRole();
    }
  }, [isLoaded]);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Software Development',
      description: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      link: '#',
      featured: false,
      isLive: true,
      order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image,
      link: p.link,
      featured: Boolean(p.featured),
      isLive: p.isLive !== false,
      order: p.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      if (editingProject && (editingProject._id || editingProject.id)) {
        const id = editingProject._id || editingProject.id;
        const res = await fetch(`/api/admin/portfolio/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success) {
          showToast('Project updated successfully!');
          setModalOpen(false);
          fetchProjects();
        } else {
          showToast(data.error || 'Failed to update project.', 'error');
        }
      } else {
        const res = await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success) {
          showToast('New project created successfully!');
          setModalOpen(false);
          fetchProjects();
        } else {
          showToast(data.error || 'Failed to create project.', 'error');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving project.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleLive = async (p: ProjectItem) => {
    const id = p._id || p.id;
    if (!id) return;

    const newStatus = !(p.isLive !== false);
    setActionLoading(true);

    // Optimistic UI update
    setProjects((prev) =>
      prev.map((item) => ((item._id || item.id) === id ? { ...item, isLive: newStatus } : item))
    );

    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLive: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        showToast(`"${p.title}" is now ${newStatus ? 'Live 🚀' : 'Unlive (Draft) 🔒'}`);
      } else {
        showToast(data.error || 'Failed to toggle status.', 'error');
        fetchProjects(); // revert on failure
      }
    } catch (err: any) {
      showToast(err.message || 'Error toggling live status.', 'error');
      fetchProjects();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (p: ProjectItem) => {
    const id = p._id || p.id;
    if (!id) return;

    if (!confirm(`Are you sure you want to delete "${p.title}"?`)) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        showToast('Project deleted successfully.');
        fetchProjects();
      } else {
        showToast(data.error || 'Failed to delete project.', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error deleting project.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm('This will seed the 11 default RGB Tech projects into MongoDB Atlas. Continue?')) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        showToast(data.message || 'Database seeded successfully!');
        fetchProjects();
      } else {
        showToast(data.error || 'Failed to seed database.', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error seeding database.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleSubAdminRole = async (targetUser: ClerkUserItem) => {
    const newRole = targetUser.role === 'sub_admin' ? 'user' : 'sub_admin';
    const actionName = newRole === 'sub_admin' ? 'promote to Sub-Admin' : 'revoke Sub-Admin access';

    if (!confirm(`Are you sure you want to ${actionName} for ${targetUser.email}?`)) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/subadmins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: targetUser.id, role: newRole }),
      });
      const data = await res.json();

      if (data.success) {
        showToast(data.message || 'User role updated successfully.');
        fetchUsers();
      } else {
        showToast(data.error || 'Failed to update user role.', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error updating user role.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const liveCount = projects.filter((p) => p.isLive !== false).length;
  const subAdminsCount = users.filter((u) => u.role === 'sub_admin' || u.role === 'admin').length;

  // Unapproved User Screen (Neither Host Admin nor Sub-Admin)
  if (!authChecking && userRole === 'user') {
    return (
      <div className={styles.container}>
        <div className={styles.bgGlow} />
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerInner}>
              <div className={styles.brand}>
                <Link href="/" className={styles.logo}>
                  <Image
                    src="/logo.png"
                    alt="RGB Tech Logo"
                    width={28}
                    height={28}
                    style={{ borderRadius: '6px', objectFit: 'contain' }}
                  />
                  RGB<span>Admin</span>
                </Link>
              </div>
              <div className={styles.headerActions}>
                <Link href="/" className={styles.navLink}>Back to Website</Link>
                {isLoaded && <UserButton />}
              </div>
            </div>
          </div>
        </header>

        <main className={`container ${styles.mainContent}`} style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '36px 24px',
            maxWidth: '540px',
            width: '100%',
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              <Lock size={28} />
            </div>
            <h2 style={{ fontSize: '22px', color: '#fff', marginBottom: '12px' }}>
              Access Authorization Required
            </h2>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              Your account (<strong>{user?.primaryEmailAddress?.emailAddress}</strong>) is authenticated, but has not been granted Host Admin or Sub-Admin access.
            </p>
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '13px',
              color: '#c7d2fe',
              textAlign: 'left',
              marginBottom: '20px',
            }}>
              💡 <strong>Host Admin:</strong> Please ensure your Gmail address is set as <code>ADMIN_EMAIL</code> in <code>.env.local</code> and restart the server, or ask the Host Admin to authorize your account.
            </div>
            <button onClick={checkUserRole} className={styles.primaryBtn} style={{ margin: '0 auto', width: '100%', justifyContent: 'center' }}>
              <RefreshCw size={16} /> Re-check Authorization Status
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.bgGlow} />

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <Image
                  src="/logo.png"
                  alt="RGB Tech Logo"
                  width={28}
                  height={28}
                  style={{ borderRadius: '6px', objectFit: 'contain' }}
                />
                RGB<span>Admin</span>
              </Link>
              <span className={`${styles.roleBadge} ${userRole === 'admin' ? styles.roleAdmin : styles.roleSubAdmin}`}>
                {userRole === 'admin' ? 'Host Admin' : 'Sub Admin'}
              </span>
            </div>

            <div className={styles.headerActions}>
              <Link href="/portfolio" target="_blank" className={styles.navLink}>
                <span className={styles.navLinkText}>View Live Site</span> <ExternalLink size={14} />
              </Link>
              {isLoaded && <UserButton />}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container ${styles.mainContent}`}>
        {/* Quick Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FolderGit2 size={22} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{projects.length}</h3>
              <p className={styles.statLabel}>Projects ({liveCount} Live)</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
              <Layers size={22} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>{categories.length}</h3>
              <p className={styles.statLabel}>Categories</p>
            </div>
          </div>

          {userRole === 'admin' && (
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}>
                <Users size={22} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{subAdminsCount || 1}</h3>
                <p className={styles.statLabel}>Team Members</p>
              </div>
            </div>
          )}

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}>
              <Database size={22} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statValue}>Atlas</h3>
              <p className={styles.statLabel}>MongoDB Cloud</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Horizontally scrollable on mobile) */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <FolderGit2 size={16} /> <span>Portfolio Manager</span>
            </button>
            
            {userRole === 'admin' && (
              <button
                className={`${styles.tabBtn} ${activeTab === 'subadmins' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('subadmins')}
              >
                <Users size={16} /> <span>Sub-Admin Access ({users.length})</span>
              </button>
            )}

            {userRole === 'admin' && (
              <button
                className={`${styles.tabBtn} ${activeTab === 'system' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('system')}
              >
                <Database size={16} /> <span>Database & Sync</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: Projects Manager */}
        {activeTab === 'projects' && (
          <div>
            <div className={styles.sectionBar}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>Manage Portfolio Projects</h2>
                <p className={styles.sectionSub}>
                  Create, edit, toggle visibility (Live / Unlive), and organize client projects.
                </p>
              </div>

              <div className={styles.barActions}>
                <button
                  onClick={fetchProjects}
                  className={styles.secondaryBtn}
                  disabled={loading || actionLoading}
                >
                  <RefreshCw size={15} /> <span>Refresh</span>
                </button>
                <button onClick={handleOpenAdd} className={styles.primaryBtn}>
                  <Plus size={16} /> <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Desktop Table View (visible on tablet/desktop) */}
            <div className={styles.desktopTableContainer}>
              <div className={styles.tableCard}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Live Link</th>
                      <th>Order</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-dim)' }}>
                          No projects found in MongoDB Atlas. Click <strong>"Add Project"</strong> or go to <strong>"Database & Sync"</strong> to seed initial items.
                        </td>
                      </tr>
                    ) : (
                      projects.map((p) => {
                        const isItemLive = p.isLive !== false;
                        return (
                          <tr key={p._id || p.id || p.title}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.image} alt={p.title} className={styles.projectThumb} />
                                <div>
                                  <div style={{ fontWeight: 600, color: '#fff' }}>{p.title}</div>
                                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {p.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={styles.categoryTag}>{p.category}</span>
                            </td>
                            <td>
                              {/* Toggle Button Live / Unlive */}
                              <button
                                onClick={() => handleToggleLive(p)}
                                className={`${styles.liveToggleBtn} ${isItemLive ? styles.liveActive : styles.liveInactive}`}
                                title={isItemLive ? 'Click to make Unlive (Draft)' : 'Click to make Live (Published)'}
                                disabled={actionLoading}
                              >
                                <span className={styles.liveDot} />
                                {isItemLive ? (
                                  <>
                                    <Eye size={12} /> Live
                                  </>
                                ) : (
                                  <>
                                    <EyeOff size={12} /> Unlive
                                  </>
                                )}
                              </button>
                            </td>
                            <td>
                              {p.link && p.link !== '#' ? (
                                <a
                                  href={p.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ color: '#818cf8', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                                >
                                  Visit <ArrowUpRight size={13} />
                                </a>
                              ) : (
                                <span style={{ color: 'var(--color-text-dim)' }}>None</span>
                              )}
                            </td>
                            <td>{p.order ?? 0}</td>
                            <td>
                              <div className={styles.actionsCell}>
                                <button
                                  onClick={() => handleOpenEdit(p)}
                                  className={styles.iconBtn}
                                  title="Edit Project"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(p)}
                                  className={styles.iconBtn}
                                  style={{ color: '#f87171' }}
                                  title="Delete Project"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View (optimized for phone users) */}
            <div className={styles.mobileCardsList}>
              {projects.length === 0 ? (
                <div className={styles.emptyMobileState}>
                  No projects found. Tap <strong>"Add Project"</strong> to create your first portfolio item.
                </div>
              ) : (
                projects.map((p) => {
                  const isItemLive = p.isLive !== false;
                  return (
                    <div key={p._id || p.id || p.title} className={styles.mobileProjectCard}>
                      <div className={styles.mobileCardTop}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.title} className={styles.mobileThumb} />
                        <div className={styles.mobileCardHeading}>
                          <h4 className={styles.mobileCardTitle}>{p.title}</h4>
                          <span className={styles.categoryTag}>{p.category}</span>
                        </div>
                      </div>

                      <p className={styles.mobileCardDesc}>{p.description}</p>

                      <div className={styles.mobileCardMeta}>
                        <button
                          onClick={() => handleToggleLive(p)}
                          className={`${styles.liveToggleBtn} ${isItemLive ? styles.liveActive : styles.liveInactive}`}
                          disabled={actionLoading}
                        >
                          <span className={styles.liveDot} />
                          {isItemLive ? (
                            <>
                              <Eye size={12} /> Live
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} /> Unlive (Draft)
                            </>
                          )}
                        </button>

                        {p.link && p.link !== '#' && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.mobileLiveLink}
                          >
                            Live Link <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>

                      <div className={styles.mobileCardActions}>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className={styles.mobileEditBtn}
                        >
                          <Edit2 size={14} /> Edit Project
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p)}
                          className={styles.mobileDeleteBtn}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Sub-Admin Team */}
        {activeTab === 'subadmins' && userRole === 'admin' && (
          <div>
            <div className={styles.sectionBar}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>Sub-Admin Access Control</h2>
                <p className={styles.sectionSub}>
                  Only the Host Admin can authorize or revoke Sub-Admin access for registered users.
                </p>
              </div>

              <div className={styles.barActions}>
                <button onClick={fetchUsers} className={styles.secondaryBtn} disabled={actionLoading}>
                  <RefreshCw size={15} /> <span>Refresh Team</span>
                </button>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className={styles.desktopTableContainer}>
              <div className={styles.tableCard}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Current Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: '#1e293b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              fontWeight: 700,
                              color: '#818cf8'
                            }}>
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 600, color: '#fff' }}>{u.name}</span>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`${styles.roleBadge} ${u.role === 'admin' ? styles.roleAdmin : u.role === 'sub_admin' ? styles.roleSubAdmin : ''}`} style={u.role === 'user' ? { background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-dim)' } : {}}>
                            {u.isHostAdmin ? 'HOST ADMIN' : u.role.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          {u.isHostAdmin || u.role === 'admin' ? (
                            <span style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Host Super Admin (Protected)</span>
                          ) : u.role === 'sub_admin' ? (
                            <button
                              onClick={() => handleToggleSubAdminRole(u)}
                              className={styles.dangerBtn}
                              disabled={actionLoading}
                            >
                              <UserX size={14} /> Revoke Sub-Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleSubAdminRole(u)}
                              className={styles.primaryBtn}
                              style={{ padding: '6px 12px', fontSize: '12px' }}
                              disabled={actionLoading}
                            >
                              <UserCheck size={14} /> Grant Sub-Admin Access
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Sub-Admin Card View */}
            <div className={styles.mobileCardsList}>
              {users.map((u) => (
                <div key={u.id} className={styles.mobileUserCard}>
                  <div className={styles.mobileUserTop}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#818cf8',
                      flexShrink: 0,
                    }}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#fff', fontSize: '15px' }}>{u.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--color-text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {u.email}
                      </div>
                    </div>
                    <span className={`${styles.roleBadge} ${u.role === 'admin' ? styles.roleAdmin : u.role === 'sub_admin' ? styles.roleSubAdmin : ''}`} style={u.role === 'user' ? { background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-dim)' } : {}}>
                      {u.isHostAdmin ? 'HOST' : u.role.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ marginTop: '14px' }}>
                    {u.isHostAdmin || u.role === 'admin' ? (
                      <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textAlign: 'center', padding: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                        Host Super Admin (Protected)
                      </div>
                    ) : u.role === 'sub_admin' ? (
                      <button
                        onClick={() => handleToggleSubAdminRole(u)}
                        className={styles.dangerBtn}
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={actionLoading}
                      >
                        <UserX size={14} /> Revoke Sub-Admin Access
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleSubAdminRole(u)}
                        className={styles.primaryBtn}
                        style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                        disabled={actionLoading}
                      >
                        <UserCheck size={14} /> Grant Sub-Admin Access
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Database & Sync */}
        {activeTab === 'system' && userRole === 'admin' && (
          <div>
            <div className={styles.sectionBar}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>Database Management & Seeding</h2>
                <p className={styles.sectionSub}>
                  Sync and populate all RGB Tech default projects into MongoDB Atlas.
                </p>
              </div>
            </div>

            <div className={styles.systemCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <ShieldCheck size={28} color="#818cf8" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>MongoDB Atlas Automatic Seeder</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-dim)' }}>
                    Inserts all 11 default portfolio projects into your Atlas collection.
                  </p>
                </div>
              </div>

              <div style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '13px',
                color: '#c7d2fe',
                marginBottom: '20px'
              }}>
                ℹ️ Existing items with matching titles are safely skipped to avoid duplication.
              </div>

              <button
                onClick={handleSeedDatabase}
                className={styles.primaryBtn}
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={actionLoading}
              >
                <Database size={16} /> Seed Atlas Database Now
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Project Modal (Super Responsive) */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className={styles.iconBtn} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Investcly"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Financial News Platform"
                    className={styles.input}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a compelling overview of what this project accomplishes..."
                    className={styles.textarea}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Image URL (Unsplash or CDN)</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Live Project Link</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Display Order (Priority)</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className={styles.input}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#fff', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
                      checked={formData.isLive}
                      onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                    />
                    <span style={{ color: '#34d399', fontWeight: 600 }}>Publish as Live (Visible to public)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#cbd5e1', fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      style={{ width: '18px', height: '18px', accentColor: '#6366f1' }}
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    Feature this project on top
                  </label>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={styles.secondaryBtn}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.primaryBtn}
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Saving...' : editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
