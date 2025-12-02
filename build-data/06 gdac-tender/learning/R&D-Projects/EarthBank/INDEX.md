# EarthBank / AuScope Geochemistry Network - Documentation Index

**Extraction Date:** 2025-11-28
**Source Directory:** `build-data/06 gdac-tender/learning/EarthBank/`
**Purpose:** GDAC Tender Submission Reference Documentation

---

## Platform Overview

| Field | Value |
|-------|-------|
| **Platform Name** | EarthBank (formerly AusGeoChem) |
| **Developer** | Lithodat Pty Ltd |
| **Client/Partner** | AuScope Geochemistry Network (AGN) |
| **Platform URL** | https://ausgeochem.auscope.org.au/ |
| **Funding** | NCRIS (National Collaborative Research Infrastructure Strategy) |
| **Director** | Professor Brent McInnes (Curtin University) |

### Key Statistics (from AuScope Website)

| Metric | Value |
|--------|-------|
| **Registered Users** | 1,300+ |
| **Registered Samples** | 350,000+ |
| **Partner Universities** | 10+ Australian universities |
| **Initial Funding** | $450,000 (AuScope Opportunity Fund 2021) |
| **Current Program Funding** | $19 million |

---

## Lithodat's Role

Lithodat Pty Ltd (ABN 63 627 008 904) developed the EarthBank platform in partnership with the AuScope Geochemistry Network. Key contributions include:

- **Platform Development:** Cloud-based, browser-native geochemistry data platform
- **Data Schema Design:** Custom SKOS-format relational database architecture
- **FAIR Compliance:** Findable, Accessible, Interoperable, Reusable data principles
- **API Development:** REST API for machine-to-machine interoperability
- **LithoPlates Integration:** Paleogeographic reconstruction tool (jointly with EarthByte/University of Sydney)

---

## Document Index

### 1. Peer-Reviewed Publication

| Document | Description |
|----------|-------------|
| `1-s2.0-S0009254125004826-main.pdf` | **Chemical Geology (2025)** - "Volcanoes to vugs: Demonstrating a FAIR geochemistry framework with a diverse application of major and trace element data through the AuScope EarthBank platform" |

**Citation:**
Nixon, A.L., Boone, S.C., Gréau, Y., Kohlmann, F., Theile, M., Noble, W., et al. (2025). Chemical Geology, 696, 123092.
DOI: https://doi.org/10.1016/j.chemgeo.2025.123092

**Key Authors from Lithodat:**
- Fabian Kohlmann
- Moritz Theile
- Wayne Noble

### 2. Conference Abstract

| Document | Description |
|----------|-------------|
| `EGU25-14320-print.pdf` | **EGU General Assembly 2025** - "EarthBank by AuScope: Building FAIR research data infrastructure for the global geochemical community" |

**Citation:**
Nixon, A., Ware, B., McInnes, B., Kohlmann, F., Theile, M., Noble, W., et al. (2025).
DOI: https://doi.org/10.5194/egusphere-egu25-14320

### 3. Platform Feature Documentation

| Document | Description |
|----------|-------------|
| `Copy of LithoPlates - A Cloud-based Deep-time Reconstruction Tool for Geochemistry Data_.docx` | **LithoPlates Feature** - Deep-time plate reconstruction tool integrated with EarthBank |

**Key Features:**
- 11 different plate tectonic models (including 2024 reconstruction to 1.8 Ga)
- Based on GPlates Web Service (EarthByte Group)
- 1-million-year time step navigation
- REST API access for external workflows

### 4. AGN Development Roadmap

| Document | Description |
|----------|-------------|
| `AGN Earthbank proposal.docx` | **AuScope Geochemistry Network Technical Roadmap** - Core software enhancements and future features |

**Planned Enhancements:**
- Scalability via clustering
- Change history/audit trails
- IsoplotR integration
- Additional data models: Ar/Ar, K-Ar, Lu-Hf, Rb-Sr, Sm-Nd, Re-Os, I-Xe
- Rock properties, heat flow, borehole models
- 2M U-Pb zircon dataset integration
- PID minting for machines

### 5. Workshop Manuals

| Document | Description |
|----------|-------------|
| `EarthBank Workshop GSN 2025.docx` | **GSN 2025 Workshop Manual** - Comprehensive user guide for EarthBank platform |
| `EarthBank Workshop Thermo 2025.docx` | **Thermo 2025 Workshop Manual** - Comprehensive user guide (thermochronology focus) |

**Manual Contents:**
1. Account creation and activation
2. Institution joining process
3. Map View user interface
4. EarthBank toolbar and tools
5. Data packages and analytical layers
6. Basemaps (satellite, geology, topography)
7. Select Area tools (polygon, rectangle, group)
8. Dashboards (sample and technique-specific)
9. LithoPlates paleoreconstruction tool
10. Interpolation and swath profile tools
11. Data tab and metadata management
12. API documentation

### 6. International Proposal

| Document | Description |
|----------|-------------|
| `Empowering Saudi Arabia's Geoscience Future_ A Modular Proposal for Data Integration and Innovation.docx` | **Saudi Arabia National Platform Proposal** - Comprehensive proposal for national geoscience data infrastructure |

**Proposal Components:**
1. Data Standardisation and Cleansing
2. Specialised Data Mining and Integration
3. National Geoscience Data Portal (powered by LithoSurfer)

**Key Details:**
- Proposed MVP delivery: 12 months
- Full national ownership pathway available
- Aligned with Saudi Vision 2030
- Clients referenced: BHP, AngloAmerican, Geoscience Australia

### 7. AuScope Case Study

| Document | Description |
|----------|-------------|
| `earthbank` | **AuScope Website Content** - "A new era of open Earth science data with AuScope EarthBank" case study |

---

## Technical Architecture

### Data Schema (from Chemical Geology Paper)

```
EarthBank Data Model:
├── Data Package (project/collection container)
├── Sample (with coordinates, lithology, stratigraphy)
│   └── Data Point
│       ├── Inorganic Geochemistry
│       │   ├── Geochemical Data Point (procedural metadata)
│       │   ├── GC Aliquot (individual analyses)
│       │   ├── Elemental Concentration (μg/g)
│       │   └── Oxide Concentration (wt%)
│       ├── Fission Track
│       ├── (U-Th)/He
│       ├── U/Pb
│       ├── Ar/Ar
│       └── Statement (data linkage)
```

### Supported Data Types

| Data Type | Status |
|-----------|--------|
| U/Pb geochronology | ✅ Implemented |
| Fission track | ✅ Implemented |
| (U-Th-Sm)/He thermochronology | ✅ Implemented |
| 40Ar/39Ar | ✅ Implemented |
| Inorganic major/trace geochemistry | ✅ Implemented |
| Thermal histories | ✅ Implemented |
| Ar/Ar, K-Ar, Lu-Hf, Rb-Sr, Sm-Nd, Re-Os | 🔄 Planned |

### Platform Features

| Feature | Description |
|---------|-------------|
| **Map View** | Interactive spatial visualization with multiple basemaps |
| **3D View** | Globe view and terrain visualization |
| **Data Packages** | Project-based data organization with sharing controls |
| **Analytical Layers** | Technique-specific data filtering and visualization |
| **Dashboards** | Sample and technique-specific analytical dashboards |
| **LithoPlates** | Paleogeographic reconstruction (11 plate models, to 1.8 Ga) |
| **Interpolation** | On-the-fly IDW interpolation maps |
| **Swath Profiles** | Elevation and sample profile analysis |
| **DOI Minting** | Digital Object Identifier generation for datasets |
| **IGSN Minting** | International Geo Sample Number registration |
| **API Access** | REST API for programmatic data access |
| **Shapefile Export** | Export selected samples for GIS applications |

---

## Case Studies (from Chemical Geology Paper)

### 1. Sunda-Banda Arc Volcanic Geochemistry
- **Dataset:** 473 volcanic samples from Prof. John Foden collection
- **DOI:** https://doi.org/10.58024/AGUAEBE2CBB4
- **Application:** Magma evolution, volcanic classification, arc geochemistry

### 2. Ni-Cu-Co-PGE Mafic-Ultramafic Mineralisation
- **Dataset:** 5,767 samples from Dr. Steven Barnes (CSIRO)
- **DOI:** https://doi.org/10.25919/p5v1-j775
- **Application:** Mineral exploration, prospectivity assessment

### 3. Ontario Stream Sediment Geochemistry
- **Dataset:** 2,113 samples from Ontario Geological Survey
- **DOI:** https://doi.org/10.57744/LDLDEB878DE5
- **Application:** Provenance studies, environmental contamination detection

---

## Vocabularies and Standards

| Resource | Location |
|----------|----------|
| **AGN Vocabularies** | https://vocabs.ardc.edu.au/viewById/689 |
| **API Documentation** | Available in EarthBank Documentation tab |
| **Upload Templates** | Available through EarthBank platform |

---

## Key Contacts

| Role | Name | Institution |
|------|------|-------------|
| **EarthBank Director** | Prof. Brent McInnes | Curtin University |
| **Technical Lead (Lithodat)** | Fabian Kohlmann | Lithodat Pty Ltd |
| **Technical Lead (Lithodat)** | Wayne Noble | Lithodat Pty Ltd |
| **Technical Lead (Lithodat)** | Moritz Theile | Lithodat Pty Ltd |

**Lithodat Support:** support@lithodat.com

---

## Relevance to GDAC Tender

This documentation demonstrates:

1. **Technical Capability:** Lithodat's proven ability to develop complex geoscience data platforms
2. **FAIR Compliance:** Expertise in implementing FAIR data principles
3. **International Recognition:** Peer-reviewed publication in Chemical Geology
4. **Government Partnerships:** Collaboration with AuScope/NCRIS national infrastructure
5. **Industry Adoption:** Platform used by BHP, AngloAmerican
6. **Scalability:** System handling 350,000+ samples, 1,300+ users
7. **API Integration:** REST API for machine-to-machine interoperability
8. **Data Mining:** Capabilities for extracting and standardising legacy data

---

*Generated for GDAC Tender Submission - Lithodat Pty Ltd*
