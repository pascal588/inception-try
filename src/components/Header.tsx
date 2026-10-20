'use client';

import { MapPin, Plus, Lightbulb, ShieldCheck } from 'lucide-react';
import { VillageMetrics } from '@/types';

interface HeaderProps {
  metrics: VillageMetrics;
  isAddingProposal: boolean;
  onToggleAddProposal: () => void;
  onOpenProposalList: () => void;
  proposalCount: number;
}

export default function Header({
  metrics,
  isAddingProposal,
  onToggleAddProposal,
  onOpenProposalList,
  proposalCount,
}: HeaderProps) {
  return (
    <header className="h-16 px-4 sm:px-6 bg-[#20362B] border-b border-[#2C4A3B] flex items-center justify-between text-white shrink-0 z-30 shadow-xs">
      {/* Brand & Village Identity */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#E6EFE9] text-[#20362B] flex items-center justify-center font-bold tracking-tight text-sm shadow-xs">
          PD
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base tracking-tight text-[#FAF9F5]">PantauDesa</h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#2B4638] text-[#BEE3CC] border border-[#3A5D4B]">
              <ShieldCheck size={12} className="text-[#96D9AE]" aria-hidden="true" />
              <span>Transparansi Dana Desa</span>
            </span>
          </div>
          <p className="flex items-center gap-1 text-xs text-[#CBD8D0] mt-0.5">
            <MapPin size={11} className="text-[#8FB9A0]" aria-hidden="true" />
            <span>{metrics.villageName}, {metrics.district}, {metrics.regency}</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Proposal List Trigger */}
        <button
          onClick={onOpenProposalList}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#E4EDE7] hover:text-white bg-[#2B4537] hover:bg-[#345343] border border-[#3A5D4B] transition-colors"
        >
          <Lightbulb size={14} className="text-[#E8BA6B]" aria-hidden="true" />
          <span>Aspirasi Warga ({proposalCount})</span>
        </button>

        {/* Primary Action Button (Warm Terracotta Accent) */}
        <button
          onClick={onToggleAddProposal}
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
            isAddingProposal
              ? 'bg-[#E5A84B] hover:bg-[#D4983D] text-[#222925]'
              : 'bg-[#C25E3B] hover:bg-[#AE4F2E] text-white'
          }`}
        >
          <Plus size={15} aria-hidden="true" />
          <span>{isAddingProposal ? 'Batalkan Titik' : 'Usul Proyek Baru'}</span>
        </button>
      </div>
    </header>
  );
}
