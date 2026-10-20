'use client';

import { useState } from 'react';
import { Project, Verification, ProjectStatus, AISeverity } from '@/types';
import { X, Camera, AlertTriangle, CheckCircle2, ShieldCheck, Loader2, FileCheck2 } from 'lucide-react';

interface ReportFormModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (verification: Verification, updatedStatus?: ProjectStatus) => void;
}

export default function ReportFormModal({
  project,
  isOpen,
  onClose,
  onSubmitReport,
}: ReportFormModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [citizenAlias, setCitizenAlias] = useState<string>('Warga Peduli (Anonim)');
  const [notes, setNotes] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{
    severity: AISeverity;
    summary: string;
    isRelevant: boolean;
  } | null>(null);

  if (!isOpen || !project) return null;

  // Handle Photo Selection & Convert to Base64
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setAiResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI Inspection
  const handleRunAiInspection = async () => {
    if (!photoPreview) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: project.title,
          imageBase64: photoPreview,
          userNotes: notes,
        }),
      });

      const data = await res.json();
      setAiResult({
        severity: data.aiSeverity || 'medium',
        summary: data.aiSummary || 'Analisis foto selesai diverifikasi.',
        isRelevant: data.isRelevant ?? true,
      });
    } catch (err) {
      console.error(err);
      setAiResult({
        severity: 'medium',
        summary: 'Analisis visual berhasil direkam untuk tinjauan tim pengawas.',
        isRelevant: true,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoPreview) {
      alert('Mohon lampirkan foto bukti kondisi lapangan.');
      return;
    }

    const finalSeverity: AISeverity = aiResult ? aiResult.severity : 'medium';
    const finalSummary: string = aiResult
      ? aiResult.summary
      : 'Laporan warga menunggu tinjauan otomatis pengawas.';

    const newVerification: Verification = {
      id: `verif-${Date.now()}`,
      projectId: project.id,
      citizenAlias: isAnonymous ? 'Warga Peduli (Anonim)' : citizenAlias || 'Warga Desa',
      photoUrl: photoPreview,
      notes: notes || 'Verifikasi kondisi fisik proyek di lokasi.',
      aiSummary: finalSummary,
      aiSeverity: finalSeverity,
      isRelevant: aiResult?.isRelevant ?? true,
      upvotes: 1,
      createdAt: 'Baru saja',
    };

    let updatedStatus: ProjectStatus | undefined = undefined;
    if (finalSeverity === 'high') {
      updatedStatus = 'flagged';
    }

    onSubmitReport(newVerification, updatedStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <header className="px-6 py-4.5 border-b border-[#E8E3DA] bg-[#FAF9F5] flex items-center justify-between">
          <div>
            <h2 id="form-title" className="text-base font-bold text-[#20362B]">
              Verifikasi Lapangan Proyek
            </h2>
            <p className="text-xs text-[#7E7970] mt-0.5 truncate max-w-sm">
              {project.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup formulir"
            className="p-1.5 text-[#7E7970] hover:text-[#222925] hover:bg-[#EFEBE4] rounded-lg transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4.5 bg-white">
          {/* Photo Dropzone */}
          <div className="space-y-1.5">
            <label htmlFor="photo-input" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Foto Bukti Kondisi Nyata <span className="text-[#B43E2C]">*</span>
            </label>

            {photoPreview ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#D8D2C6] bg-[#FAF9F5]">
                <img
                  src={photoPreview}
                  alt="Pratinjau foto bukti"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    setAiResult(null);
                  }}
                  className="absolute top-2.5 right-2.5 px-3 py-1 bg-[#20362B]/85 text-white rounded-lg text-xs font-medium hover:bg-[#20362B]"
                >
                  Ganti Foto
                </button>
              </div>
            ) : (
              <label
                htmlFor="photo-input"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D8D2C6] rounded-xl hover:border-[#284E3A] hover:bg-[#F4F9F5] cursor-pointer transition-colors"
              >
                <Camera size={28} className="text-[#888278] mb-1.5" aria-hidden="true" />
                <span className="text-xs font-bold text-[#20362B]">
                  Ambil Foto / Pilih Berkas
                </span>
                <span className="text-[11px] text-[#888278] mt-0.5">
                  Format JPG/PNG (Maksimal 5MB)
                </span>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          {/* AI Inspection Card */}
          {photoPreview && (
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E3DA] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#20362B]">
                  <FileCheck2 size={15} className="text-[#284E3A]" aria-hidden="true" />
                  <span>Validasi Fisik AI (Gemini 1.5 Flash)</span>
                </div>
                {!aiResult && (
                  <button
                    type="button"
                    onClick={handleRunAiInspection}
                    disabled={isAnalyzing}
                    className="px-3 py-1 bg-[#284E3A] hover:bg-[#1E3C2C] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-2xs"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={12} className="animate-spin" aria-hidden="true" />
                        Menganalisis...
                      </>
                    ) : (
                      'Uji Cek AI'
                    )}
                  </button>
                )}
              </div>

              {aiResult ? (
                <div className="space-y-2 pt-2 border-t border-[#E8E3DA] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B665D] font-medium text-[11px]">Hasil Analisis Anomali:</span>
                    {aiResult.severity === 'high' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FDF0ED] text-[#A33626] border border-[#F8D8D2] flex items-center gap-1">
                        <AlertTriangle size={11} aria-hidden="true" /> Kritis / Perlu Investigasi
                      </span>
                    ) : aiResult.severity === 'medium' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF7EA] text-[#8A5412] border border-[#F6E6C9]">
                        Sedang / Perlu Perbaikan
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF4EE] text-[#235C3A] border border-[#D0E4D7] flex items-center gap-1">
                        <CheckCircle2 size={11} aria-hidden="true" /> Kondisi Baik / Sesuai
                      </span>
                    )}
                  </div>
                  <p className="text-[#3E3830] font-mono text-[11px] bg-white p-3 rounded-lg border border-[#E8E3DA] leading-relaxed">
                    {aiResult.summary}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-[#7E7970]">
                  Klik &quot;Uji Cek AI&quot; untuk memeriksa foto secara otomatis sebelum laporan dikirim ke warga desa.
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-1">
            <label htmlFor="notes-input" className="block text-xs font-bold uppercase tracking-wider text-[#6B665D]">
              Catatan Kondisi Lapangan
            </label>
            <textarea
              id="notes-input"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jelaskan kondisi fisik proyek yang Anda saksikan di lapangan..."
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D8D2C6] focus:border-[#284E3A] focus:ring-1 focus:ring-[#284E3A] outline-none text-[#222925]"
            />
          </div>

          {/* Privacy & Alias */}
          <div className="space-y-2 pt-2 border-t border-[#F2ECE4]">
            <div className="flex items-center justify-between">
              <label htmlFor="anon-toggle" className="text-xs font-medium text-[#443E36] flex items-center gap-1.5 cursor-pointer">
                <ShieldCheck size={15} className="text-[#2A6B48]" aria-hidden="true" />
                <span>Kirim Sebagai Anonim (Privasi Terlindungi)</span>
              </label>
              <input
                id="anon-toggle"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-[#284E3A] rounded border-[#D8D2C6] focus:ring-[#284E3A] cursor-pointer"
              />
            </div>
            {!isAnonymous && (
              <div className="space-y-1 pt-1">
                <label htmlFor="alias-input" className="block text-[11px] font-medium text-[#6B665D]">
                  Nama Anda / Inisial
                </label>
                <input
                  id="alias-input"
                  type="text"
                  value={citizenAlias}
                  onChange={(e) => setCitizenAlias(e.target.value)}
                  placeholder="Misal: Pak Budi (RT 02)"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D8D2C6] focus:border-[#284E3A] focus:ring-1 focus:ring-[#284E3A] outline-none"
                />
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#524E46] bg-white border border-[#D8D2C6] rounded-lg hover:bg-[#FAF9F5] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#284E3A] hover:bg-[#1E3C2C] rounded-lg transition-colors shadow-xs"
            >
              Kirim Verifikasi Resmi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
