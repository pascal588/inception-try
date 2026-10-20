export type ProjectCategory = 'jalan' | 'irigasi' | 'gedung' | 'air_bersih';

export type ProjectStatus = 'completed' | 'ongoing' | 'flagged';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  budget: number;
  fiscalYear: number;
  sourceOfFund: string;
  executor: string;
  volumeTarget: string;
  status: ProjectStatus;
  lat: number;
  lng: number;
  officialPhotoUrl: string;
  description: string;
  verificationsCount: number;
  lastUpdated: string;
}

export type AISeverity = 'none' | 'low' | 'medium' | 'high';

export interface Verification {
  id: string;
  projectId: string;
  citizenAlias: string;
  photoUrl: string;
  notes: string;
  aiSummary: string;
  aiSeverity: AISeverity;
  isRelevant: boolean;
  upvotes: number;
  createdAt: string;
}

export interface Proposal {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  lat: number;
  lng: number;
  photoUrl?: string;
  beneficiaryEstimate: string;
  upvotes: number;
  createdAt: string;
  status: 'submitted' | 'under_review' | 'prioritized';
}

export interface VillageMetrics {
  villageName: string;
  district: string;
  regency: string;
  province: string;
  totalBudget: number;
  realizationPercentage: number;
  totalProjects: number;
  verifiedProjects: number;
  flaggedProjects: number;
  transparencyScore: number;
}
