'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Job = {
  _id: string;
  company: string;
  role: string;
  status: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError('Unable to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  if (loading) {
    return <p className="p-6">Loading jobs...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

 return (
  <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
    {/* Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        My Jobs
      </h1>
      <span className="text-sm text-gray-500">
        Total Jobs: {jobs.length}
      </span>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Applied" count={jobs.filter(j => j.status === 'applied').length} />
      <StatCard title="Interview" count={jobs.filter(j => j.status === 'interview').length} />
      <StatCard title="Offer" count={jobs.filter(j => j.status === 'offer').length} />
    </div>

    {/* Jobs List */}
    {jobs.length === 0 ? (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 text-lg">
          No jobs added yet 🚀
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Start tracking your applications
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {jobs.map(job => (
          <div
            key={job._id}
            className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.role}
                </h2>
                <p className="text-sm text-gray-500">
                  {job.company}
                </p>
              </div>

              <StatusBadge status={job.status} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
function StatCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    applied: 'bg-blue-100 text-blue-700',
    interview: 'bg-yellow-100 text-yellow-700',
    offer: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        colorMap[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}
