'use client';

import { useState } from 'react';
import { Proposal, ProjectCategory } from '@/types';
import { X, MapPin, Lightbulb, Camera } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  coords: { lat: number; lng: number } | null;
  onClose: () => void;
  onSubmitProposal: (proposal: Proposal) => void;
}

export default function ProposalModal({
  isOpen,
  coords,
  onClose,
  onSubmitProposal,
}: ProposalModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('jalan');
  const [description, setDescription] = useState('');
  const [beneficiaryEstimate, setBeneficiaryEstimate] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  if (!isOpen || !coords) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Mohon isi judul dan rincian kebutuhan usulan.');
      return;
    }

    const categoryLabels: Record<ProjectCategory, string> = {
      jalan: 'Jalan & Jembatan',
      irigasi: 'Irigasi & Air',
      gedung: 'Fasilitas Sosial',
      air_bersih: 'Air Bersih',
    };

    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      title,
      category,
      categoryLabel: categoryLabels[category],
      description,
      lat: coords.lat,
      lng: coords.lng,
      photoUrl: photoPreview || undefined,
      beneficiaryEstimate: beneficiaryEstimate || 'Warga sekitar lokasi',
      upvotes: 1,
      createdAt: 'Baru saja',
      status: 'submitted',
    };

    onSubmitProposal(newProposal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-title"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <header className="px-6 py-4.5 border-b border-[#E8E3DA] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] text-[#284E3A] flex items-center justify-center border border-[#CFE4D6]">
              <Lightbulb size={17} aria-hidden="true" />
            </div>
            <div>
              <h2 id="proposal-title" className="text-sm font-bold text-[#20362B]">
                Usulkan Pembangunan Baru (Musrenbangdes)
              </h2>
              <p className="text-[11px] text-[#7E7970] flex items-center gap-1 mt-0.5 font-mono">
                <MapPin size={11} className="text-[#2A6B48]" aria-hidden="true" />
                <span>Titik: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup form usulan"
            className="p-1.5 text-[#7E7970] hover:text-[#222925] hover:bg-[#EFEBE4] rounded-lg transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="prop-title" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Judul Kebutuhan Pembangunan <span className="text-[#B43E2C]">*</span>
            </label>
            <input
              id="prop-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pengaspalan Jalan Tani Dusun Kidul"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D8D2C6] focus:border-[#284E3A] focus:ring-1 focus:ring-[#284E3A] outline-none text-[#222925]"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label htmlFor="prop-category" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Kategori Proyek
            </label>
            <select
              id="prop-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D8D2C6] focus:border-[#284E3A] focus:ring-1 focus:ring-[#284E3A] outline-none bg-white text-[#222925]"
            >
              <option value="jalan">Jalan & Jembatan</option>
              <option value="irigasi">Irigasi & Pertanian</option>
              <option value="air_bersih">Air Bersih & Sanitasi</option>
              <option value="gedung">Fasilitas Sosial / Posyandu</option>
            </select>
          </div>

          {/* Beneficiaries */}
          <div className="space-y-1">
            <label htmlFor="prop-beneficiaries" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Estimasi Warga Terdampak
            </label>
            <input
              id="prop-beneficiaries"
              type="text"
              value={beneficiaryEstimate}
              onChange={(e) => setBeneficiaryEstimate(e.target.value)}
              placeholder="Contoh: 45 KK Petani padi & anak sekolah"
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D8D2C6] focus:border-[#284E3A] focus:ring-1 focus:ring-[#284E3A] outline-none text-[#222925]"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="prop-desc" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Deskripsi Masalah & Urgensi <span className="text-[#B43E2C]">*</span>
            </label>
            <textarea
              id="prop-desc"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kondisi saat ini dan mengapa lokasi ini mendesak untuk dianggarkan oleh pemerintah desa..."
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D8D2C6] focus:border-[#284E3A] focus:ring-1 focus:ring-[#284E3A] outline-none text-[#222925]"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-1">
            <label htmlFor="prop-photo" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Foto Lokasi (Opsional)
            </label>
            {photoPreview ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#D8D2C6]">
                <img src={photoPreview} alt="Pratinjau lokasi usulan" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-2.5 right-2.5 px-3 py-1 bg-[#20362B]/85 text-white rounded-lg text-xs font-medium"
                >
                  Hapus Foto
                </button>
              </div>
            ) : (
              <label
                htmlFor="prop-photo"
                className="flex items-center gap-3 p-3.5 border border-[#D8D2C6] rounded-xl cursor-pointer hover:bg-[#FAF9F5] transition-colors"
              >
                <Camera size={19} className="text-[#7E7970]" aria-hidden="true" />
                <span className="text-xs text-[#524E46]">Lampirkan foto kondisi tanah / jalan</span>
                <input
                  id="prop-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#524E46] bg-white border border-[#D8D2C6] rounded-lg hover:bg-[#FAF9F5]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#C25E3B] hover:bg-[#AE4F2E] rounded-lg shadow-xs"
            >
              Daftarkan Usulan Warga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
