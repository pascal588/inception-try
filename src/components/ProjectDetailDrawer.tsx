'use client';

import { useState } from 'react';
import { Project, Verification } from '@/types';
import {
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  ThumbsUp,
  Camera,
  FileCheck2,
} from 'lucide-react';

interface ProjectDetailDrawerProps {
  project: Project | null;
  verifications: Verification[];
  onClose: () => void;
  onOpenReportForm: (project: Project) => void;
  onUpvoteVerification: (verificationId: string) => void;
}

export default function ProjectDetailDrawer({
  project,
  verifications,
  onClose,
  onOpenReportForm,
  onUpvoteVerification,
}: ProjectDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'verifications' | 'official'>('verifications');

  if (!project) return null;

  const projectVerifications = verifications.filter((v) => v.projectId === project.id);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStatusBadge = () => {
    switch (project.status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF4EE] text-[#235C3A] border border-[#D0E4D7]">
            <CheckCircle2 size={13} aria-hidden="true" />
            Selesai & Terverifikasi
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF7EA] text-[#8A5412] border border-[#F6E6C9]">
            <Clock size={13} aria-hidden="true" />
            Pengerjaan Fisik Berjalan
          </span>
        );
      case 'flagged':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF0ED] text-[#A33626] border border-[#F8D8D2]">
            <AlertTriangle size={13} aria-hidden="true" />
            Temuan / Dilaporkan Bermasalah
          </span>
        );
    }
  };

  return (
    <section
      aria-label="Rincian Proyek Desa"
      className="fixed inset-y-0 right-0 z-40 w-full sm:max-w-xl bg-white shadow-2xl flex flex-col border-l border-[#E8E3DA] animate-in slide-in-from-right duration-250"
    >
      {/* Drawer Header */}
      <header className="p-5 border-b border-[#E8E3DA] bg-[#FAF9F5] flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            {getStatusBadge()}
            <span className="text-[11px] text-[#7E7970] font-mono">#{project.id}</span>
          </div>
          <h2 className="text-lg font-bold text-[#20362B] leading-snug">
            {project.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Tutup rincian proyek"
          className="p-1.5 text-[#7E7970] hover:text-[#222925] hover:bg-[#EFEBE4] rounded-lg transition-colors"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      {/* Financial Summary Card (Warm Earthy Forest) */}
      <div className="px-6 py-4 bg-[#233A2D] text-white flex items-center justify-between border-b border-[#2C4939]">
        <div>
          <p className="text-[11px] text-[#A7C9B5] uppercase tracking-wider font-semibold">Pagu Anggaran Resmi</p>
          <p className="text-2xl font-bold tracking-tight text-[#FAF9F5] mt-0.5 tabular-nums">
            {formatCurrency(project.budget)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-[#A7C9B5] font-medium">Tahun Anggaran</p>
          <p className="text-base font-bold text-[#FAF9F5]">{project.fiscalYear}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex border-b border-[#E8E3DA] bg-white px-6">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`py-3 px-1 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'verifications'
              ? 'border-[#284E3A] text-[#284E3A]'
              : 'border-transparent text-[#7E7970] hover:text-[#222925]'
          }`}
        >
          <Camera size={14} aria-hidden="true" />
          Bukti Lapangan Warga ({projectVerifications.length})
        </button>
        <button
          onClick={() => setActiveTab('official')}
          className={`py-3 px-1 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ml-6 ${
            activeTab === 'official'
              ? 'border-[#284E3A] text-[#284E3A]'
              : 'border-transparent text-[#7E7970] hover:text-[#222925]'
          }`}
        >
          <Building2 size={14} aria-hidden="true" />
          Rencana Resmi Desa
        </button>
      </nav>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#FAF9F5]">
        {activeTab === 'verifications' ? (
          <div className="space-y-4">
            {/* Friendly Action Callout */}
            <div className="p-4 rounded-xl bg-[#EAF4EE] border border-[#CFE4D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#20362B]">Pernah melihat kondisi proyek ini?</p>
                <p className="text-xs text-[#456A54] mt-0.5">
                  Bantu warga pastikan anggaran fisik terealisasi sesuai fakta di lapangan.
                </p>
              </div>
              <button
                onClick={() => onOpenReportForm(project)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#284E3A] hover:bg-[#1E3C2C] text-white rounded-lg text-xs font-semibold transition-colors shrink-0 shadow-xs"
              >
                <Camera size={14} aria-hidden="true" />
                Verifikasi Lapangan
              </button>
            </div>

            {/* List of Verifications */}
            {projectVerifications.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#D8D2C6] p-6">
                <Camera size={32} className="mx-auto text-[#B0A99D] mb-2" aria-hidden="true" />
                <p className="text-xs font-semibold text-[#524E46]">Belum ada verifikasi foto warga</p>
                <p className="text-xs text-[#888278] mt-0.5">
                  Jadilah warga pertama yang mengambil foto dan mengaudit kondisi proyek ini.
                </p>
              </div>
            ) : (
              projectVerifications.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#E8E3DA] bg-white overflow-hidden shadow-2xs"
                >
                  <div className="relative aspect-video w-full bg-[#EFEBE4]">
                    <img
                      src={item.photoUrl}
                      alt={`Bukti lapangan oleh ${item.citizenAlias}`}
                      className="w-full h-full object-cover"
                    />
                    {item.aiSeverity === 'high' && (
                      <span className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#B43E2C] text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                        <AlertTriangle size={12} aria-hidden="true" />
                        Temuan Anomali AI
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#7E7970]">
                      <span className="font-semibold text-[#222925]">{item.citizenAlias}</span>
                      <time dateTime={item.createdAt} className="text-[11px]">{item.createdAt}</time>
                    </div>

                    <p className="text-xs text-[#443E36] leading-relaxed">{item.notes}</p>

                    {/* Official Technical Audit Sheet (Warm Earthy Styling) */}
                    {item.aiSummary && (
                      <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E8E3DA] text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#20362B] flex items-center gap-1">
                            <FileCheck2 size={13} className="text-[#284E3A]" aria-hidden="true" />
                            Lembar Verifikasi Teknis AI
                          </span>
                          <span className="text-[#888278] font-mono text-[10px]">Gemini Vision Core</span>
                        </div>
                        <p className="text-[#3E3830] font-mono text-[11px] leading-relaxed bg-white p-2.5 rounded-md border border-[#E8E3DA]">
                          {item.aiSummary}
                        </p>
                      </div>
                    )}

                    {/* Community Upvote */}
                    <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between">
                      <span className="text-[11px] text-[#6B665D] font-medium">
                        Dikonfirmasi {item.upvotes} warga sekitar
                      </span>
                      <button
                        onClick={() => onUpvoteVerification(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-[#443E36] hover:text-[#222925] hover:bg-[#F4EFEB] border border-[#E8E3DA] transition-colors"
                      >
                        <ThumbsUp size={12} aria-hidden="true" />
                        Saksi Fakta (+1)
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {/* Official Photo */}
            <div className="rounded-xl overflow-hidden border border-[#E8E3DA] bg-white">
              <img
                src={project.officialPhotoUrl}
                alt={`Klaim resmi ${project.title}`}
                className="w-full aspect-video object-cover"
              />
              <div className="p-3 bg-[#FAF9F5] border-t border-[#E8E3DA] text-xs text-[#7E7970] flex items-center justify-between">
                <span>Foto Arsip Perencanaan Desa</span>
                <span>Pembaruan: {project.lastUpdated}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B665D]">
                Tujuan Pembangunan
              </h3>
              <p className="text-xs text-[#3E3830] leading-relaxed bg-white p-4 rounded-xl border border-[#E8E3DA]">
                {project.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B665D]">
                Spesifikasi Teknis
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-lg border border-[#E8E3DA] bg-white">
                  <p className="text-[#7E7970] text-[11px]">Sumber Dana</p>
                  <p className="font-semibold text-[#20362B] mt-0.5">{project.sourceOfFund}</p>
                </div>
                <div className="p-3 rounded-lg border border-[#E8E3DA] bg-white">
                  <p className="text-[#7E7970] text-[11px]">Pelaksana Kegiatan</p>
                  <p className="font-semibold text-[#20362B] mt-0.5">{project.executor}</p>
                </div>
                <div className="p-3 rounded-lg border border-[#E8E3DA] bg-white col-span-2">
                  <p className="text-[#7E7970] text-[11px]">Target Volume Fisik</p>
                  <p className="font-semibold text-[#20362B] mt-0.5">{project.volumeTarget}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer */}
      <footer className="p-4 border-t border-[#E8E3DA] bg-[#FAF9F5] flex items-center justify-between text-xs text-[#7E7970]">
        <span>Transparansi Sesuai UU KIP No. 14/2008</span>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white text-[#443E36] font-semibold rounded-lg border border-[#D8D2C6] hover:bg-[#F4EFEB] transition-colors"
        >
          Tutup
        </button>
      </footer>
    </section>
  );
}
