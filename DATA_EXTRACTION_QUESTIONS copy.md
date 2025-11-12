# Data Extraction Review - All Questions

**Purpose:** This file contains all questions used in the data extraction review process. Update questions here, then use this file to batch update the source code.

**Last Updated:** 2025-11-11

---

## SECTION 1: PROCESS STEP QUESTIONS

These questions appear when reviewing each step in the process visualization (process page).

### Step 1: Data Source Identification

**Quick Questions:**
1. Who dictates the datasources to identify?
   - ES: ¿Esto describe con precisión cómo identificas las fuentes de datos?

2. What Journals do you typically consider? Is there a hierachy or quality review of the source?
   - ES: ¿Qué otras fuentes sueles considerar?

3. How do you prioritize which sources to extract first? 
   - ES: ¿Cómo priorizas qué fuentes extraer primero?

---

### Step 2: Data Acquisition

**Quick Questions:**
1. What are the most common acquisition methods you use? Any specific tools (elicit, google?)
   - ES: ¿Cuáles son los métodos de adquisición más comunes que utilizas?

2. What challenges do you face during acquisition? How do you get access to journals behind a paywall?
   - ES: ¿Qué desafíos enfrentas durante la adquisición?

---

### Step 3: Initial Data Assessment

**Quick Questions:**
1. What quality indicators do you check first?
   - ES: ¿Qué indicadores de calidad verificas primero?

2. How do you determine if data is worth extracting?
   - ES: ¿Cómo determinas si los datos valen la pena extraer?

---

### Step 4: Extraction Planning

**Quick Questions:**
1. Do you document your extraction plans formally or keep them in your head? If a team member is working on the extraction can someone pickup where they left off?
   - ES: ¿Documentas tus planes de extracción formalmente o los mantienes en tu cabeza?

2. Are these extraction plans required before you start? Do they need to be reviewed?
   - ES: ¿Quién revisa tus planes de extracción antes de comenzar?

---

### Step 5: Data Extraction (LithoClean)

**Quick Questions:**
1. What percentage of your time is spent on extraction vs. troubleshooting?
   - ES: ¿Qué porcentaje de tu tiempo se dedica a la extracción frente a la resolución de problemas?

2. What are the most common extraction errors you encounter?
   - ES: ¿Cuáles son los errores de extracción más comunes que encuentras?

---

### Step 6: Quality Control & Validation

**Quick Questions:**
1. What validation checks are automated vs. manual?
   - ES: ¿Qué verificaciones de validación son automatizadas vs. manuales?

2. How do you handle data that fails validation?
   - ES: ¿Cómo manejas los datos que no pasan la validación?

---

### Step 7: Database Loading

**Quick Questions:**
1. Do you have automated loading scripts or is it mostly manual? Do you use tempaltes?
   - ES: ¿Tienes scripts de carga automatizados o es principalmente manual?

2. How do you verify data loaded correctly?
   - ES: ¿Cómo verificas que los datos se cargaron correctamente?

---

### Step 8: Documentation & Handoff

**Quick Questions:**
1. What level of documentation do you typically create? Does the data extracted have sources referenced in the database?
   - ES: ¿Qué nivel de documentación sueles crear?

2. How do you track what was done for future reference?
   - ES: ¿Cómo rastrear lo que se hizo para referencia futura?

---

## SECTION 2: DETAILED DIAGNOSTIC QUESTIONS

These questions appear on the detailed questions page (questions page).

### Category: Process Overview

**Q1:** On a scale of 1-10, how accurately does the flowchart above represent your actual extraction workflow?
- **Type:** Rating (1-10)
- **Required:** Yes
- **Help Text:** 1 = Not accurate at all, 10 = Perfectly accurate
- **ES:** En una escala del 1 al 10, ¿qué tan precisamente representa el diagrama de flujo arriba tu flujo de trabajo de extracción real?
- **ES Help Text:** 1 = Nada preciso, 10 = Perfectamente preciso

**Q2:** Are there any major steps missing from this flowchart? If so, please describe them in detail.
- **Type:** Textarea
- **Required:** No
- **Placeholder:** Describe any missing steps, where they fit in the process, and why they are important...
- **ES:** ¿Hay pasos importantes que faltan en este diagrama de flujo? Si es así, descríbelos en detalle.
- **ES Placeholder:** Describe los pasos que faltan, dónde encajan en el proceso y por qué son importantes...

**Q3:** Rank the 8 steps in order of time consumed (most time-consuming first):
- **Type:** Ranking
- **Required:** Yes
- **Options:**
  1. Data Source Identification / Identificación de Fuente de Datos
  2. Data Acquisition / Adquisición de Datos
  3. Initial Data Assessment / Evaluación Inicial de Datos
  4. Extraction Planning / Planificación de Extracción
  5. Data Extraction (LithoClean) / Extracción de Datos (LithoClean)
  6. Quality Control & Validation / Control de Calidad y Validación
  7. Database Loading / Carga a Base de Datos
  8. Documentation & Handoff / Documentación y Entrega

## add question for each step that asks for the time for each of these 8 options.
---

### Category: Tools & Technology

**Q4:** Which tools do you use most frequently in the extraction process? (Select all that apply)
- **Type:** Checkbox
- **Required:** Yes
- **Options:**
  - Python scripts / Scripts de Python
  - Excel/Google Sheets / Excel/Google Sheets
  - Regular expressions / Expresiones regulares
  - SQL queries / Consultas SQL
  - Workbench / Workbench
  - Custom-built tools / Herramientas personalizadas
  - Manual data entry / Entrada manual de datos
  - PDF extraction / 

**Q5:** What are the biggest pain points or limitations with your current system?
- **Type:** Textarea
- **Required:** Yes
- **Placeholder:** Describe specific frustrations, limitations, or areas where better tools would help...
- **ES:** ¿Cuáles son los mayores puntos de dolor o limitaciones con tus herramientas actuales?
- **ES Placeholder:** Describe frustraciones específicas, limitaciones o áreas donde mejores herramientas ayudarían...

**Q6:** What percentage of the extraction process is automated vs. manual?
- **Type:** Multiple Choice
- **Required:** Yes
- **Options:**
  - 0-25% automated / 0-25% automatizado
  - 25-50% automated / 25-50% automatizado
  - 50-75% automated / 50-75% automatizado
  - 75-100% automated / 75-100% automatizado

---

### Category: Data Quality & Challenges

**Q7:** Rank these error types by frequency (most common first):
- **Type:** Ranking
- **Required:** Yes
- **Options:**
  1. Missing or incomplete data / Datos faltantes o incompletos
  2. Format incompatibilities / Incompatibilidades de formato
  3. Corrupted files / Archivos corruptos
  4. Inconsistent units/standards / Unidades/estándares inconsistentes
  5. Duplicate records / Registros duplicados
  6. Parsing errors / Errores de análisis
  7. Miscommunication between the team 

**Q8:** Describe the most challenging data quality issue you've encountered and how you resolved it.
- **Type:** Textarea
- **Required:** Yes
- **Placeholder:** Describe the issue, what made it difficult, your solution, and what you learned...
- **ES:** Describe el problema de calidad de datos más desafiante que has encontrado y cómo lo resolviste.
- **ES Placeholder:** Describe el problema, qué lo hizo difícil, tu solución y qué aprendiste...

**Q9:** What percentage of datasets do you ultimately reject as unsuitable for extraction?
- **Type:** Multiple Choice
- **Required:** Yes
- **Options:**
  - 0-10% / 0-10%
  - 10-25% / 10-25%
  - 25-50% / 25-50%
  - More than 50% / Más del 50%

---

### Category: Workflow & Coordination

**Q10:** How do you coordinate with other team members during the extraction process?
- **Type:** Textarea
- **Required:** Yes
- **Placeholder:** Describe communication methods, frequency, handoff points, collaboration tools used...
- **ES:** ¿Cómo te coordinas con otros miembros del equipo durante el proceso de extracción?
- **ES Placeholder:** Describe métodos de comunicación, frecuencia, puntos de entrega, herramientas de colaboración utilizadas...

**Q11:** What most frequently blocks or delays your extraction work? (Select top 3)
- **Type:** Checkbox
- **Required:** Yes
- **Options:**
  - Waiting for data access/permissions / Esperando acceso/permisos de datos
  - Unclear client requirements / Requisitos del cliente poco claros
  - Tool limitations / Limitaciones de herramientas
  - Poor source data quality / Mala calidad de datos fuente
  - Pulled away for other priorities / Desviado a otras prioridades
  - Waiting for reviews/approvals / Esperando revisiones/aprobaciones
  - Technical/infrastructure issues / Problemas técnicos/de infraestructura
  - Data Extraction from PDFs 

---

### Category: Workspace & Documentation

**Q12:** Provide the primary Google Workspace/Workbench link where you track extraction projects:
- **Type:** URL
- **Required:** No
- **Placeholder:** https://...
- **Help Text:** This could be a folder, spreadsheet, or project management board
- **ES:** Proporciona el enlace principal de Google Workspace/Workbench donde rastrear proyectos de extracción:
- **ES Help Text:** Esto podría ser una carpeta, hoja de cálculo o tablero de gestión de proyectos

**Q13:** Rate the completeness of your current extraction documentation:
- **Type:** Rating (1-10)
- **Required:** Yes
- **Help Text:** 1 = Minimal/no documentation, 10 = Comprehensive documentation for every extraction
- **ES:** Califica la completitud de tu documentación actual de extracción:
- **ES Help Text:** 1 = Documentación mínima/nula, 10 = Documentación completa para cada extracción

**Q14:** If you had a perfect documentation system, what would it include?
- **Type:** Textarea
- **Required:** No
- **Placeholder:** Describe your ideal documentation system, templates, tracking, etc...
- **ES:** Si tuvieras un sistema de documentación perfecto, ¿qué incluiría?
- **ES Placeholder:** Describe tu sistema de documentación ideal, plantillas, seguimiento, etc...

---

### Category: Database & Technical Details

**Q15:** Describe how extracted data flows into the LithoData database (tables, schemas, loading process):
- **Type:** Textarea
- **Required:** Yes
- **Placeholder:** Describe database structure, table names, relationships, loading scripts/process...
- **ES:** Describe cómo fluyen los datos extraídos a la base de datos LithoData (tablas, esquemas, proceso de carga):
- **ES Placeholder:** Describe estructura de base de datos, nombres de tablas, relaciones, scripts/proceso de carga...

**Q16:** Provide a link to database schema documentation or diagrams (if available):
- **Type:** URL
- **Required:** No
- **Placeholder:** https://...
- **ES:** Proporciona un enlace a documentación de esquema de base de datos o diagramas (si está disponible):

**Q17:** Approximately how many records does the team extract and load per month?
- **Type:** Multiple Choice
- **Required:** Yes
- **Options:**
  - 0-1,000 records / 0-1,000 registros
  - 1,000-10,000 records / 1,000-10,000 registros
  - 10,000-100,000 records / 10,000-100,000 registros
  - 100,000-1,000,000 records / 100,000-1,000,000 registros
  - More than 1,000,000 records / Más de 1,000,000 registros

---

### Category: Improvement Opportunities

**Q18:** If you could improve ONE thing about the extraction process, what would it be?
- **Type:** Textarea
- **Required:** Yes
- **Placeholder:** Describe the specific improvement, why it matters, and the impact it would have...
- **ES:** Si pudieras mejorar UNA cosa sobre el proceso de extracción, ¿qué sería?
- **ES Placeholder:** Describe la mejora específica, por qué importa y el impacto que tendría...

**Q19:** Rank these potential improvements by time savings potential:
- **Type:** Ranking
- **Required:** Yes
- **Options:**
  1. Better extraction tools / Mejores herramientas de extracción
  2. More automation / Más automatización
  3. Standardized templates / Plantillas estandarizadas
  4. Better training/documentation / Mejor capacitación/documentación
  5. Clearer client requirements / Requisitos de cliente más claros
  6. Faster QC/review process / Proceso de QC/revisión más rápido

---

### Category: Final Thoughts

**Q20:** Any additional comments, clarifications, or details about the extraction process that we haven't covered?
- **Type:** Textarea
- **Required:** No
- **Placeholder:** Share any other insights, concerns, or suggestions...
- **ES:** ¿Algún comentario adicional, aclaración o detalle sobre el proceso de extracción que no hayamos cubierto?
- **ES Placeholder:** Comparte cualquier otra idea, preocupación o sugerencia...

---

## INSTRUCTIONS FOR BATCH UPDATE

After updating questions in this file:

1. **Update Process Step Questions** → Edit `/src/lib/data-extraction-metadata.ts`
   - Find the `dataExtractionSteps` array
   - Update the `questions` array for each step

2. **Update Detailed Questions** → Edit `/src/lib/data-extraction-metadata.ts`
   - Find the `diagnosticQuestions` array
   - Update question text, help text, options, and placeholders

3. **Test Changes:**
   ```bash
   cd /Users/keithdimech/Pathway/Dev/Lithodat/Viable\ Systems\ Model/VSM-Platform-Project/prototypes/web-app/code/vss-mvp
   npm run dev
   ```

4. **Navigate to:**
   - Process page: http://localhost:3000/data-extraction/process
   - Questions page: http://localhost:3000/data-extraction/questions

---

## SOURCE FILES

- **Process Steps & Questions:** `/src/lib/data-extraction-metadata.ts`
- **Research Content:** `/src/lib/data-extraction-research.ts`
- **Process Visualization:** `/src/app/(dashboard)/data-extraction/process/ProcessVisualizationClient.tsx`
- **Questions Interface:** `/src/app/(dashboard)/data-extraction/questions/QuestionsClient.tsx`
- **Research Interface:** `/src/app/(dashboard)/data-extraction/research/ResearchClient.tsx`
