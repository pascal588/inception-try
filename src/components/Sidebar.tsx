'use client';

import { Project, VillageMetrics } from '@/types';
import {
  Filter,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface SidebarProps {
  metrics: VillageMetrics;
  projects: Project[];
  selectedCategory: string;
  selectedStatus: string;
  onSelectCategory: (category: string) => void;
  onSelectStatus: (status: string) => void;
  onSelectProject: (project: Project) => void;
  selectedProjectId?: string;
}

export default function Sidebar({
  metrics,
  projects,
  selectedCategory,
  selectedStatus,
  onSelectCategory,
  onSelectStatus,
  onSelectProject,
  selectedProjectId,
}: SidebarProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'jalan', label: 'Jalan & Jembatan' },
    { id: 'irigasi', label: 'Irigasi' },
    { id: 'gedung', label: 'Fasilitas Sosial' },
    { id: 'air_bersih', label: 'Air Bersih' },
  ];

  const statuses = [
    { id: 'all', label: 'Semua Status' },
    { id: 'completed', label: 'Selesai', color: 'text-[#235C3A] bg-[#EAF4EE] border-[#D0E4D7]' },
    { id: 'ongoing', label: 'Pengerjaan', color: 'text-[#8A5412] bg-[#FEF7EA] border-[#F6E6C9]' },
    { id: 'flagged', label: 'Bermasalah', color: 'text-[#A33626] bg-[#FDF0ED] border-[#F8D8D2]' },
  ];

  return (
    <aside
      aria-label="Panel Filter dan Daftar Proyek"
      className="w-full lg:w-[410px] bg-[#FAF9F5] border-r border-[#E8E3DA] flex flex-col h-full shrink-0 overflow-hidden"
    >
      {/* Sticky Top KPI Card */}
      <section
        aria-label="Ringkasan APBDes"
        className="p-4 sm:p-5 border-b border-[#E8E3DA] bg-white shrink-0 space-y-3"
      >
        <div className="flex items-center justify-between text-xs text-[#6B665D] font-medium">
          <span className="uppercase tracking-wider text-[11px] text-[#6B665D] font-bold">
            Pagu APBDes TA 2024
          </span>
          <span className="inline-flex items-center gap-1 text-[#235C3A] font-semibold bg-[#EAF4EE] px-2.5 py-0.5 rounded-full text-[11px] border border-[#D0E4D7]">
            <ShieldCheck size={13} className="text-[#2A6B48]" aria-hidden="true" />
            Transparansi: {metrics.transparencyScore}%
          </span>
        </div>

        <div>
          <p className="text-2xl font-bold text-[#20362B] tracking-tight tabular-nums">
            {formatCurrency(metrics.totalBudget)}
          </p>
          <div className="flex items-center justify-between mt-2 text-xs text-[#6B665D] font-medium">
            <span>Realisasi Pembangunan Fisik</span>
            <span className="font-semibold text-[#20362B]">{metrics.realizationPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-[#EFEBE4] rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-[#284E3A] rounded-full transition-all duration-500"
              style={{ width: `${metrics.realizationPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric Counter Badges (Warm Pastel Tones) */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-[#FAF9F5] p-2 rounded-lg border border-[#E8E3DA]">
            <span className="text-[11px] text-[#6B665D] font-medium block">Total</span>
            <span className="text-sm font-bold text-[#20362B]">{metrics.totalProjects} Proyek</span>
          </div>
          <div className="bg-[#EAF4EE] p-2 rounded-lg border border-[#D0E4D7]">
            <span className="text-[11px] text-[#235C3A] font-medium block">Selesai</span>
            <span className="text-sm font-bold text-[#235C3A]">{metrics.verifiedProjects}</span>
          </div>
          <div className="bg-[#FDF0ED] p-2 rounded-lg border border-[#F8D8D2]">
            <span className="text-[11px] text-[#A33626] font-medium block">Temuan</span>
            <span className="text-sm font-bold text-[#A33626]">{metrics.flaggedProjects}</span>
          </div>
        </div>
      </section>

      {/* Filter Section (Earthy Pastels) */}
      <section aria-label="Filter Data Spasial" className="p-3.5 border-b border-[#E8E3DA] bg-[#FAF9F5] shrink-0 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#6B665D]">
          <span className="font-semibold flex items-center gap-1.5 text-[#222925]">
            <Filter size={13} aria-hidden="true" />
            Filter Data Spasial
          </span>
          <span className="text-[#888278] font-normal">
            {projects.length} Proyek
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#284E3A] text-white shadow-2xs'
                  : 'bg-white text-[#524E46] border border-[#E8E3DA] hover:bg-[#F2EDE5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {statuses.map((stat) => (
            <button
              key={stat.id}
              onClick={() => onSelectStatus(stat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === stat.id
                  ? 'bg-[#284E3A] text-white shadow-2xs'
                  : stat.id === 'all'
                  ? 'bg-white text-[#524E46] border border-[#E8E3DA] hover:bg-[#F2EDE5]'
                  : `${stat.color} border hover:opacity-90`
              }`}
            >
              {stat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Clean Project List */}
      <section aria-label="Daftar Proyek Fisik" className="flex-1 overflow-y-auto divide-y divide-[#EFEBE4] bg-white">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-[#888278] text-xs">
            Tidak ada proyek yang sesuai dengan filter yang dipilih.
          </div>
        ) : (
          projects.map((proj) => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <article
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`p-4 transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#F4F9F5] border-l-4 border-l-[#284E3A] pl-3.5'
                    : 'hover:bg-[#FAF9F5] bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold text-[#7E7970] uppercase tracking-wider">
                    {proj.categoryLabel}
                  </span>

                  {proj.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#235C3A] bg-[#EAF4EE] px-2 py-0.5 rounded-md border border-[#D0E4D7]">
                      <CheckCircle2 size={11} aria-hidden="true" /> Selesai
                    </span>
                  )}
                  {proj.status === 'ongoing' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8A5412] bg-[#FEF7EA] px-2 py-0.5 rounded-md border border-[#F6E6C9]">
                      <Clock size={11} aria-hidden="true" /> Pengerjaan
                    </span>
                  )}
                  {proj.status === 'flagged' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#A33626] bg-[#FDF0ED] px-2 py-0.5 rounded-md border border-[#F8D8D2]">
                      <AlertTriangle size={11} aria-hidden="true" /> Bermasalah
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-[#222925] mt-1.5 leading-snug">
                  {proj.title}
                </h3>

                <div className="mt-2.5 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#20362B] tabular-nums">
                    {formatCurrency(proj.budget)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#666158] font-medium">
                    {proj.verificationsCount} Bukti Warga
                    <ChevronRight size={13} className="text-[#A29C91]" aria-hidden="true" />
                  </span>
                </div>
              </article>
            );
          })
        )}
      </section>
    </aside>
  );
}
