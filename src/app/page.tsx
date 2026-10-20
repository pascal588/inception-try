'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  initialProjects,
  initialVerifications,
  initialProposals,
  initialVillageMetrics,
} from '@/data/mock-data';
import { Project, Verification, Proposal, ProjectStatus } from '@/types';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProjectDetailDrawer from '@/components/ProjectDetailDrawer';
import ReportFormModal from '@/components/ReportFormModal';
import ProposalModal from '@/components/ProposalModal';
import ProposalListModal from '@/components/ProposalListModal';
import { Loader2 } from 'lucide-react';

// SSR-safe dynamic map loader
const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF9F5] text-[#20362B] gap-2 min-h-[450px]">
      <Loader2 className="animate-spin text-[#284E3A]" size={32} aria-hidden="true" />
      <span className="text-sm font-semibold">Memuat Peta Spasial Desa Sukamaju...</span>
    </div>
  ),
});

export default function HomePage() {
  // Application Data States
  const [metrics, setMetrics] = useState(initialVillageMetrics);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [verifications, setVerifications] = useState<Verification[]>(initialVerifications);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  // UI Selection States
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Proposal Creation Mode
  const [isAddingProposal, setIsAddingProposal] = useState<boolean>(false);
  const [newProposalCoords, setNewProposalCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Modal Visibility States
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);
  const [isProposalListOpen, setIsProposalListOpen] = useState<boolean>(false);

  // Filtered Projects based on sidebar selections
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchStat = selectedStatus === 'all' || p.status === selectedStatus;
      return matchCat && matchStat;
    });
  }, [projects, selectedCategory, selectedStatus]);

  // Selected Project Object
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Handler: Select Project from Map or Sidebar
  const handleSelectProject = (project: Project) => {
    setSelectedProjectId(project.id);
  };

  // Handler: Map Click (for Musrenbangdes Proposal Mode)
  const handleMapClick = (coords: { lat: number; lng: number }) => {
    if (isAddingProposal) {
      setNewProposalCoords(coords);
      setIsProposalModalOpen(true);
    }
  };

  // Handler: Submit Citizen Verification Report
  const handleSubmitReport = (newVerification: Verification, updatedStatus?: ProjectStatus) => {
    setVerifications((prev) => [newVerification, ...prev]);

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === newVerification.projectId) {
          const newStatus = updatedStatus || p.status;
          return {
            ...p,
            status: newStatus,
            verificationsCount: p.verificationsCount + 1,
            lastUpdated: 'Baru saja',
          };
        }
        return p;
      })
    );

    // Update village metrics if status changed to flagged
    if (updatedStatus === 'flagged') {
      setMetrics((prev) => ({
        ...prev,
        flaggedProjects: prev.flaggedProjects + 1,
      }));
    }
  };

  // Handler: Upvote Verification
  const handleUpvoteVerification = (verificationId: string) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === verificationId ? { ...v, upvotes: v.upvotes + 1 } : v))
    );
  };

  // Handler: Submit New Proposal
  const handleSubmitProposal = (newProposal: Proposal) => {
    setProposals((prev) => [newProposal, ...prev]);
    setIsAddingProposal(false);
    setNewProposalCoords(null);
  };

  // Handler: Upvote Proposal
  const handleUpvoteProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-[#FAF9F5]">
      {/* Top Navigation */}
      <Header
        metrics={metrics}
        isAddingProposal={isAddingProposal}
        onToggleAddProposal={() => {
          setIsAddingProposal((prev) => !prev);
          if (isAddingProposal) setNewProposalCoords(null);
        }}
        onOpenProposalList={() => setIsProposalListOpen(true)}
        proposalCount={proposals.length}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Left Side Control Panel */}
        <Sidebar
          metrics={metrics}
          projects={filteredProjects}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onSelectCategory={setSelectedCategory}
          onSelectStatus={setSelectedStatus}
          onSelectProject={handleSelectProject}
          selectedProjectId={selectedProjectId || undefined}
        />

        {/* Right Side WebGIS Map */}
        <section aria-label="Peta WebGIS Interaktif" className="flex-1 relative h-full">
          <DynamicMap
            projects={filteredProjects}
            proposals={proposals}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            onSelectProposal={() => setIsProposalListOpen(true)}
            isAddingProposal={isAddingProposal}
            newProposalCoords={newProposalCoords}
            onMapClick={handleMapClick}
          />
        </section>

        {/* Project Detail Drawer */}
        <ProjectDetailDrawer
          project={selectedProject}
          verifications={verifications}
          onClose={() => setSelectedProjectId(null)}
          onOpenReportForm={() => setIsReportModalOpen(true)}
          onUpvoteVerification={handleUpvoteVerification}
        />
      </main>

      {/* Modals */}
      <ReportFormModal
        project={selectedProject}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleSubmitReport}
      />

      <ProposalModal
        isOpen={isProposalModalOpen}
        coords={newProposalCoords}
        onClose={() => {
          setIsProposalModalOpen(false);
          setNewProposalCoords(null);
          setIsAddingProposal(false);
        }}
        onSubmitProposal={handleSubmitProposal}
      />

      <ProposalListModal
        isOpen={isProposalListOpen}
        proposals={proposals}
        onClose={() => setIsProposalListOpen(false)}
        onUpvoteProposal={handleUpvoteProposal}
      />
    </div>
  );
}
