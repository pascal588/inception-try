'use client';

import { Proposal } from '@/types';
import { X, Lightbulb, ThumbsUp, MapPin, Users, CheckCircle } from 'lucide-react';

interface ProposalListModalProps {
  isOpen: boolean;
  proposals: Proposal[];
  onClose: () => void;
  onUpvoteProposal: (proposalId: string) => void;
}

export default function ProposalListModal({
  isOpen,
  proposals,
  onClose,
  onUpvoteProposal,
}: ProposalListModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposals-title"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <header className="px-6 py-4.5 border-b border-[#E8E3DA] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEF7EA] text-[#9C6016] flex items-center justify-center border border-[#F6E6C9]">
              <Lightbulb size={17} aria-hidden="true" />
            </div>
            <div>
              <h2 id="proposals-title" className="text-base font-bold text-[#20362B]">
                Aspirasi & Usulan Pembangunan Warga
              </h2>
              <p className="text-[11px] text-[#7E7970] mt-0.5">
                Kanal Musrenbangdes Partisipatif Desa Sukamaju
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup daftar aspirasi"
            className="p-1.5 text-[#7E7970] hover:text-[#222925] hover:bg-[#EFEBE4] rounded-lg transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {/* Proposals List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF9F5]">
          <div className="p-3.5 bg-[#EAF4EE] rounded-xl border border-[#CFE4D6] text-xs text-[#20362B] flex items-start gap-2.5">
            <CheckCircle size={16} className="text-[#2A6B48] shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-relaxed">
              Usulan dengan jumlah dukungan terbanyak dari masyarakat akan direkomendasikan secara otomatis ke dalam dokumen RKPDes (Rencana Kerja Pemerintah Desa) tahun anggaran berikutnya.
            </span>
          </div>

          {proposals.length === 0 ? (
            <div className="text-center py-12 text-[#888278] text-xs">
              Belum ada usulan pembangunan dari warga.
            </div>
          ) : (
            proposals.map((prop) => (
              <article
                key={prop.id}
                className="p-4 rounded-xl border border-[#E8E3DA] bg-white hover:border-[#D0C9BD] shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-[#666158] uppercase tracking-wider bg-[#F2EDE5] px-2.5 py-0.5 rounded-full">
                      {prop.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold text-[#20362B] mt-1.5">
                      {prop.title}
                    </h3>
                  </div>

                  {prop.status === 'prioritized' ? (
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EAF4EE] text-[#235C3A] border border-[#D0E4D7] shrink-0">
                      Prioritas RKPDes
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#F2EDE5] text-[#524E46] shrink-0">
                      Tahap Aspirasi
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#443E36] leading-relaxed">
                  {prop.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#7E7970] pt-2 border-t border-[#F2ECE4]">
                  <span className="flex items-center gap-1.5">
                    <Users size={13} className="text-[#888278]" aria-hidden="true" />
                    Manfaat: {prop.beneficiaryEstimate}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <MapPin size={13} className="text-[#888278]" aria-hidden="true" />
                    Koordinat: {prop.lat.toFixed(4)}, {prop.lng.toFixed(4)}
                  </span>
                </div>

                {/* Upvote Action */}
                <div className="pt-2 flex items-center justify-between border-t border-[#F5F0E8]">
                  <span className="text-[11px] text-[#888278]">
                    Diajukan: {prop.createdAt}
                  </span>
                  <button
                    onClick={() => onUpvoteProposal(prop.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#284E3A] text-white rounded-lg text-xs font-semibold hover:bg-[#1E3C2C] transition-colors shadow-2xs"
                  >
                    <ThumbsUp size={12} aria-hidden="true" />
                    <span>Dukung Usulan Ini ({prop.upvotes})</span>
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[#E8E3DA] bg-[#FAF9F5] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#524E46] bg-white border border-[#D8D2C6] rounded-lg hover:bg-[#FAF9F5] transition-colors"
          >
            Tutup
          </button>
        </footer>
      </div>
    </div>
  );
}
