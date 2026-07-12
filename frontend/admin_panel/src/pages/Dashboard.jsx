import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';

export default function Dashboard() {
  // Mock data for the stats
  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12.5%', icon: '👥' },
    { title: 'Revenue', value: '$84,326', change: '+8.2%', icon: '💰' },
    { title: 'Products', value: '1,203', change: '-2.1%', icon: '📦' },
    { title: 'Active Sessions', value: '324', change: '+5.4%', icon: '🟢' },
  ];

  // Mock recent users
  const recentUsers = [
    { name: 'Sarah Chen', email: 'sarah@startup.co', role: 'Admin', status: 'Active' },
    { name: 'Mike Johnson', email: 'mike@tech.io', role: 'Editor', status: 'Pending' },
    { name: 'Emma Wilson', email: 'emma@design.studio', role: 'User', status: 'Active' },
    { name: 'Alex Rivera', email: 'alex@dev.agency', role: 'User', status: 'Inactive' },
  ];

  return (
    <MainLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px] mb-[40px]">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Recent Users Table */}
      <div className="bg-surface rounded-md border border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-[24px] py-[20px] border-b border-border/50">
          <h2 className="text-[20px] font-light leading-[1.15] tracking-[-0.01em] text-on-surface">
            Recent Users
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/40 bg-[#F8FAFC]/50">
                <th className="px-[24px] py-[14px] text-[14px] font-normal text-muted tracking-[-0.01em]">Name</th>
                <th className="px-[24px] py-[14px] text-[14px] font-normal text-muted tracking-[-0.01em]">Email</th>
                <th className="px-[24px] py-[14px] text-[14px] font-normal text-muted tracking-[-0.01em]">Role</th>
                <th className="px-[24px] py-[14px] text-[14px] font-normal text-muted tracking-[-0.01em]">Status</th>
                <th className="px-[24px] py-[14px] text-[14px] font-normal text-muted tracking-[-0.01em]">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, idx) => (
                <tr key={idx} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="px-[24px] py-[16px] text-[16px] font-light text-on-surface tracking-[-0.01em]">
                    {user.name}
                  </td>
                  <td className="px-[24px] py-[16px] text-[16px] font-light text-muted tracking-[-0.01em]">
                    {user.email}
                  </td>
                  <td className="px-[24px] py-[16px] text-[16px] font-light text-on-surface tracking-[-0.01em]">
                    {user.role}
                  </td>
                  <td className="px-[24px] py-[16px]">
                    <Badge 
                      variant={
                        user.status === 'Active' ? 'success' : 
                        user.status === 'Pending' ? 'default' : 'error'
                      }
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-[24px] py-[16px]">
                    <button className="text-[16px] font-light text-primary hover:text-tertiary transition-colors tracking-[-0.01em]">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Primary CTA button matching the spec */}
        <div className="px-[24px] py-[20px] border-t border-border/50 flex justify-end">
          <button className="bg-primary text-neutral text-[16px] font-normal leading-[1.2] tracking-[-0.01em] rounded-sm px-[24px] py-[16px] h-[48px] hover:bg-tertiary hover:text-primary transition-all shadow-sm">
            + Add New User
          </button>
        </div>
      </div>
    </MainLayout>
  );
}