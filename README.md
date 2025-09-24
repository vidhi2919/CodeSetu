# Namah API

**High-Level Architecture for AYUSH ↔ ICD-11 Dual Coding**

Namah API is a modular, scalable, and secure API that enables seamless mapping between traditional AYUSH medical codes (NAMASTE) and WHO ICD-11 codes. It integrates AI/NLP-based mapping, insurance pre-checks, and FHIR-based interoperability.

---

## 🔑 Core Components

### 1. API Gateway (FastAPI Layer)
- Exposes REST endpoints:
  - `/search` → Search AYUSH/ICD codes  
  - `/translate` → Translate between code systems  
  - `/encounter` → Manage patient encounters  
  - `/insurance` → Pre-check insurance eligibility  
- Handles:
  - Request validation  
  - OAuth2 / ABHA authentication  
  - Request routing to respective services  

### 2. Services Layer

| Service | Responsibility |
|---------|----------------|
| **AYUSH Service** | Reads NAMASTE codes from local DB/CSV |
| **WHO ICD Service** | Connects to WHO ICD-11 API; manages tokens |
| **Mapping Engine** | AI/NLP assistant aligning AYUSH ↔ ICD codes |
| **Insurance Service** | Pre-checks claim eligibility and compliance |

### 3. Data Layer
- **Primary DB:** PostgreSQL (FHIR resources, code mappings, encounters)  
- **Offline/Cache DB:** SQLite for rural/offline deployments  
- **Standards:** FHIR ConceptMap & CodeSystem for terminology standardization  

### 4. Security & Compliance
- OAuth2 + ABHA-linked identity  
- Full audit logs for compliance (who searched, what codes mapped, when)  

### 5. Analytics & Monitoring
- Dashboards for:
  - Code usage statistics  
  - Mapping gaps  
  - Insurance claim trends  
- System health metrics and logs  

---

## 📊 Architecture Diagram (ASCII Representation)


