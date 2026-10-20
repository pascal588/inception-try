'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Project, Proposal } from '@/types';

interface MapProps {
  projects: Project[];
  proposals: Proposal[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onSelectProposal?: (proposal: Proposal) => void;
  isAddingProposal: boolean;
  newProposalCoords: { lat: number; lng: number } | null;
  onMapClick: (coords: { lat: number; lng: number }) => void;
}

export default function Map({
  projects,
  proposals,
  selectedProject,
  onSelectProject,
  onSelectProposal,
  isAddingProposal,
  newProposalCoords,
  onMapClick,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tempMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center point of Desa Sukamaju, Dlanggu, Mojokerto
    const initialCenter: [number, number] = [-7.5590, 112.4775];
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 15,
      zoomControl: false,
    });

    // OpenStreetMap Standard Tile Layer (Clean, reliable, 100% watermark-free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Zoom control at bottom right to avoid header collision
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Markers layer
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Click handler for proposal mode
    map.on('click', (e: L.LeafletMouseEvent) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run once on mount

  // Update map click callback ref
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.off('click');
    mapInstanceRef.current.on('click', (e: L.LeafletMouseEvent) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    });
  }, [onMapClick]);

  // Update Markers with Precision Tapered Geo-Pins
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Helper SVG Tapered Geo-Pin with needle tip anchor
    const createGeoPin = (pinTypeClass: string, iconSvg: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="geo-pin-wrapper ${pinTypeClass}">
            <div class="geo-pin-head">
              ${iconSvg}
            </div>
            <div class="geo-pin-needle"></div>
          </div>
        `,
        iconSize: [34, 40],
        iconAnchor: [17, 40], // Point anchor directly on the ground needle tip!
        popupAnchor: [0, -42],
      });
    };

    // 1. Render Official Projects
    projects.forEach((proj) => {
      let pinTypeClass = 'pin-completed';
      let iconSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

      if (proj.status === 'ongoing') {
        pinTypeClass = 'pin-ongoing';
        iconSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
      } else if (proj.status === 'flagged') {
        pinTypeClass = 'pin-flagged';
        iconSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      }

      const marker = L.marker([proj.lat, proj.lng], {
        icon: createGeoPin(pinTypeClass, iconSvg),
        title: proj.title,
      });

      marker.on('click', () => {
        onSelectProject(proj);
      });

      markersLayerRef.current?.addLayer(marker);
    });

    // 2. Render Proposals from Citizens
    proposals.forEach((prop) => {
      const iconSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>`;
      const marker = L.marker([prop.lat, prop.lng], {
        icon: createGeoPin('pin-proposal', iconSvg),
        title: `Usulan: ${prop.title}`,
      });

      marker.on('click', () => {
        if (onSelectProposal) onSelectProposal(prop);
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [projects, proposals, onSelectProject, onSelectProposal]);

  // Handle Temporary Marker for New Proposal Draft
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tempMarkerRef.current) {
      tempMarkerRef.current.remove();
      tempMarkerRef.current = null;
    }

    if (newProposalCoords) {
      const pulseIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="geo-pin-wrapper pin-proposal">
            <div class="geo-pin-head" style="box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.35);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <div class="geo-pin-needle"></div>
          </div>
        `,
        iconSize: [34, 40],
        iconAnchor: [17, 40],
      });

      const tempMarker = L.marker([newProposalCoords.lat, newProposalCoords.lng], {
        icon: pulseIcon,
      }).addTo(mapInstanceRef.current);

      tempMarkerRef.current = tempMarker;
    }
  }, [newProposalCoords]);

  // Center on Selected Project smoothly
  useEffect(() => {
    if (selectedProject && mapInstanceRef.current) {
      mapInstanceRef.current.panTo([selectedProject.lat, selectedProject.lng], {
        animate: true,
        duration: 0.6,
      });
    }
  }, [selectedProject]);

  return (
    <div className="relative w-full h-full min-h-[450px]">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Adding Proposal Overlay Instruction Banner */}
      {isAddingProposal && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 text-xs sm:text-sm border border-slate-700 animate-in fade-in duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span><strong>Ketuk lokasi di peta</strong> untuk menentukan titik rencana pembangunan.</span>
        </div>
      )}
    </div>
  );
}
