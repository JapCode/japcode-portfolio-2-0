// app/admin/layout.tsx
import AdminMobileMenu from '@/components/AdminMobileMenu';
import GlassSidebar from '@/components/SideBar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-page-layout">
      <div className="admin-sidebar">
        <GlassSidebar />
      </div>
      <div className="admin-mobile">
        <AdminMobileMenu />
      </div>
      <main className="admin-main">{children}</main>
    </div>
  );
}
