import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [officers, setOfficers] = useState([]);
  const [allOfficers, setAllOfficers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [activeData, allData, incidentData] = await Promise.all([
        api.getActiveOfficers(),
        api.getAllOfficers(),
        api.getAllIncidents()
      ]);
      setOfficers(activeData || []);
      setAllOfficers(allData || []);
      setIncidents(incidentData || []);
    } catch (err) {
      console.error("Gagal load data, mungkin belum login?", err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleAssign = async (incidentId, officerId) => {
    const officer = officers.find(o => o.id == officerId);
    if (!officer) return;

    try {
      await api.assignOfficer(incidentId, officer);
      alert(`Petugas ${officer.name} berhasil ditugaskan!`);
      await fetchData();
    } catch (err) {
      alert("Gagal menugaskan petugas");
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getIncidentTypeLabel = (type) => {
    const types = {
      'Theft': 'Pencurian',
      'Fire': 'Kebakaran',
      'Medical': 'Medis',
      'Vandalism': 'Vandalisme',
      'Suspicious': 'Mencurigakan',
      'Other': 'Lainnya'
    };
    return types[type] || type;
  };

  const offDutyOfficers = allOfficers.filter(o => o.status?.toUpperCase() !== 'ON_DUTY');
  const openIncidents = incidents.filter(i => i.status === 'OPEN');
  const assignedIncidents = incidents.filter(i => i.status === 'ASSIGNED');

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Pos Komando</h2>
            <p className="text-gray-500 mt-1">Integrasi Patrol Service & Incident Service</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{officers.length}</p>
                  <p className="text-sm text-gray-500">Petugas Aktif</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{allOfficers.length}</p>
                  <p className="text-sm text-gray-500">Total Petugas</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{openIncidents.length}</p>
                  <p className="text-sm text-gray-500">Laporan Baru</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
                  <p className="text-sm text-gray-500">Total Laporan</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Petugas */}
            <div className="lg:col-span-1 space-y-4">
              {/* Petugas Aktif */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
                  <h3 className="font-bold text-white">Petugas Aktif</h3>
                  <span className="flex items-center gap-1.5 text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    {officers.length}
                  </span>
                </div>
                
                <div className="p-3 max-h-[40vh] overflow-y-auto">
                  {officers.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">Tidak ada petugas aktif.</p>
                  ) : (
                    <ul className="space-y-2">
                      {officers.map(off => (
                        <li key={off.id} className="p-3 bg-green-50 rounded-lg border border-green-100">
                          <div className="flex items-start justify-between mb-1">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 text-sm truncate">{off.name}</p>
                              {off.position && <p className="text-xs text-gray-500">{off.position}</p>}
                            </div>
                          </div>
                          {off.phone_number && (
                            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {off.phone_number}
                            </p>
                          )}
                          {off.location && (
                            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {off.location}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-3">Microservices</h3>
                
                {/* Service Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium text-gray-900">Patrol Service</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm font-medium text-gray-900">Incident Service</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Laporan Masuk */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Laporan Masuk (Incident Service)</h3>
                <span className="text-sm text-gray-500">{incidents.length} total laporan</span>
              </div>
              
              {incidents.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500">Belum ada laporan masuk</p>
                  <p className="text-gray-400 text-sm mt-1">Data diambil dari Incident Service</p>
                </div>
              ) : (
                incidents.map(inc => (
                  <div key={inc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            inc.status === 'OPEN' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {inc.status === 'OPEN' ? 'Menunggu' : 'Ditangani'}
                          </span>
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {getIncidentTypeLabel(inc.incident_type)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-700 mb-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium">{inc.location}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mt-2">{inc.description || 'Tidak ada deskripsi'}</p>
                        <p className="text-gray-400 text-xs mt-2">Pelapor: {inc.reporter_name}</p>
                        
                        {inc.assigned_officer_name && (
                          <div className="mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-green-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Ditangani: {inc.assigned_officer_name}
                          </div>
                        )}
                      </div>

                      {inc.status === 'OPEN' && (
                        <div className="lg:w-48 shrink-0">
                          <label className="text-xs text-gray-500 font-medium mb-1 block">Tugaskan Petugas (Patrol)</label>
                          <select 
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-siskam-green focus:border-siskam-green bg-white"
                            onChange={(e) => handleAssign(inc.id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Pilih petugas...</option>
                            {officers.map(off => (
                              <option key={off.id} value={off.id}>{off.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}