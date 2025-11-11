/**
 * Data Extraction Process Metadata for Juan's Review
 *
 * This file contains the complete data extraction process workflow for LithoData,
 * including flowchart steps, diagnostic questions, and bilingual content.
 */

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  inputs: string[];
  outputs: string[];
  tools: string[];
  team: string[];
  estimatedTime: string;
  workspaceLinks?: {
    label: string;
    url: string;
  }[];
  questions: {
    en: string;
    es: string;
  }[];
  icon: string;
}

export interface DiagnosticQuestion {
  id: string;
  category: string;
  question: {
    en: string;
    es: string;
  };
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'ranking' | 'rating' | 'multipleChoice' | 'url' | 'rankingWithTime' | 'multiLink';
  options?: {
    value: string;
    label: {
      en: string;
      es: string;
    };
    timePrompt?: {
      en: string;
      es: string;
    };
  }[];
  helpText?: {
    en: string;
    es: string;
  };
  description?: {
    en: string;
    es: string;
  };
  required: boolean;
  placeholder?: {
    en: string;
    es: string;
  };
}

/**
 * Data Extraction Process Steps
 * Based on typical LithoData extraction workflow
 */
export const dataExtractionSteps: ProcessStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: {
      en: 'Data Source Identification',
      es: 'Identificación de Fuente de Datos'
    },
    description: {
      en: 'Identify and qualify potential data sources including academic reports, government databases, mining company records, and laboratory results. This is the initial discovery phase where we determine which datasets are available and relevant for extraction.',
      es: 'Identificar y calificar fuentes potenciales de datos incluyendo informes académicos, bases de datos gubernamentales, registros de compañías mineras y resultados de laboratorio. Esta es la fase inicial de descubrimiento donde determinamos qué conjuntos de datos están disponibles y son relevantes para la extracción.'
    },
    inputs: ['Client requirements', 'Target regions', 'Data type specifications'],
    outputs: ['List of qualified data sources', 'Source metadata', 'Access requirements'],
    tools: ['Google Workspace', 'Web scrapers', 'Database catalogs'],
    team: ['Juan', 'Data researchers'],
    estimatedTime: '2-4 hours per source',
    icon: '🔍',
    questions: [
      {
        en: 'Who dictates the datasources to identify?',
        es: '¿Quién determina las fuentes de datos a identificar?'
      },
      {
        en: 'What Journals do you typically consider? Is there a hierarchy or quality review of the source?',
        es: '¿Qué revistas consideras típicamente? ¿Existe una jerarquía o revisión de calidad de la fuente?'
      },
      {
        en: 'How do you prioritize which sources to extract first?',
        es: '¿Cómo priorizas qué fuentes extraer primero?'
      }
    ]
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: {
      en: 'Data Acquisition',
      es: 'Adquisición de Datos'
    },
    description: {
      en: 'Acquire raw data files through downloads, API access, partnerships, or manual collection. This includes negotiating access rights, setting up data transfer mechanisms, and ensuring we have all necessary permissions and licenses.',
      es: 'Adquirir archivos de datos sin procesar mediante descargas, acceso API, asociaciones o recopilación manual. Esto incluye negociar derechos de acceso, configurar mecanismos de transferencia de datos y asegurar que tenemos todos los permisos y licencias necesarios.'
    },
    inputs: ['Qualified data sources', 'Access credentials', 'Legal permissions'],
    outputs: ['Raw data files', 'Source documentation', 'Metadata records'],
    tools: ['FTP/SFTP clients', 'APIs', 'Web scraping tools', 'Manual downloads'],
    team: ['Juan', 'IT support'],
    estimatedTime: '1-8 hours per source',
    icon: '📥',
    questions: [
      {
        en: 'What are the most common acquisition methods you use? Any specific tools (elicit, google?)',
        es: '¿Cuáles son los métodos de adquisición más comunes que utilizas? ¿Alguna herramienta específica (elicit, google?)'
      },
      {
        en: 'What challenges do you face during acquisition? How do you get access to journals behind a paywall?',
        es: '¿Qué desafíos enfrentas durante la adquisición? ¿Cómo obtienes acceso a revistas detrás de un muro de pago?'
      }
    ]
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: {
      en: 'Initial Data Assessment',
      es: 'Evaluación Inicial de Datos'
    },
    description: {
      en: 'Review acquired data to assess quality, completeness, format, and extraction complexity. Determine if the data meets our standards and identify any immediate issues like corruption, missing fields, or incompatible formats that need to be addressed.',
      es: 'Revisar los datos adquiridos para evaluar calidad, completitud, formato y complejidad de extracción. Determinar si los datos cumplen con nuestros estándares e identificar problemas inmediatos como corrupción, campos faltantes o formatos incompatibles que necesitan ser abordados.'
    },
    inputs: ['Raw data files', 'Quality standards checklist'],
    outputs: ['Quality assessment report', 'Extraction strategy', 'Issue log'],
    tools: ['Data preview tools', 'File analyzers', 'Workbench'],
    team: ['Juan'],
    estimatedTime: '1-2 hours per dataset',
    icon: '📊',
    questions: [
      {
        en: 'What quality indicators do you check first?',
        es: '¿Qué indicadores de calidad verificas primero?'
      },
      {
        en: 'How do you determine if data is worth extracting?',
        es: '¿Cómo determinas si los datos valen la pena extraer?'
      }
    ]
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: {
      en: 'Extraction Planning',
      es: 'Planificación de Extracción'
    },
    description: {
      en: 'Create detailed extraction plan including tools to use, parsing strategies, validation rules, and expected timeline. This is where we design the extraction workflow specific to each dataset\'s unique structure and requirements.',
      es: 'Crear un plan de extracción detallado incluyendo herramientas a utilizar, estrategias de análisis, reglas de validación y cronograma esperado. Aquí es donde diseñamos el flujo de trabajo de extracción específico para la estructura única de cada conjunto de datos y sus requisitos.'
    },
    inputs: ['Quality assessment', 'Data structure analysis', 'Client requirements'],
    outputs: ['Extraction plan document', 'Tool selection', 'Timeline estimate'],
    tools: ['Workbench', 'Planning templates', 'Google Docs'],
    team: ['Juan', 'Technical lead'],
    estimatedTime: '2-4 hours per dataset',
    icon: '📋',
    questions: [
      {
        en: 'Do you document your extraction plans formally or keep them in your head? If a team member is working on the extraction can someone pickup where they left off?',
        es: '¿Documentas tus planes de extracción formalmente o los mantienes en tu cabeza? Si un miembro del equipo está trabajando en la extracción, ¿puede alguien continuar donde lo dejó?'
      },
      {
        en: 'Are these extraction plans required before you start? Do they need to be reviewed?',
        es: '¿Se requieren estos planes de extracción antes de comenzar? ¿Necesitan ser revisados?'
      }
    ]
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: {
      en: 'Data Extraction (LithoClean)',
      es: 'Extracción de Datos (LithoClean)'
    },
    description: {
      en: 'Execute extraction using LithoClean and other tools to parse, transform, and normalize data into our standard formats. This is the core technical work where raw data becomes structured, clean information ready for loading into our databases.',
      es: 'Ejecutar la extracción utilizando LithoClean y otras herramientas para analizar, transformar y normalizar datos en nuestros formatos estándar. Este es el trabajo técnico central donde los datos sin procesar se convierten en información estructurada y limpia lista para cargar en nuestras bases de datos.'
    },
    inputs: ['Raw data files', 'Extraction plan', 'Parsing scripts'],
    outputs: ['Cleaned data files', 'Extraction logs', 'Error reports'],
    tools: ['LithoClean', 'Python scripts', 'Custom extractors', 'Regular expressions'],
    team: ['Juan', 'Development team'],
    estimatedTime: '4-40 hours per dataset',
    icon: '⚙️',
    questions: [
      {
        en: 'What percentage of your time is spent on extraction vs. troubleshooting?',
        es: '¿Qué porcentaje de tu tiempo se dedica a la extracción frente a la resolución de problemas?'
      },
      {
        en: 'What are the most common extraction errors you encounter?',
        es: '¿Cuáles son los errores de extracción más comunes que encuentras?'
      }
    ]
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: {
      en: 'Quality Control & Validation',
      es: 'Control de Calidad y Validación'
    },
    description: {
      en: 'Validate extracted data against source materials, check for completeness, accuracy, and consistency. Run automated validation scripts and perform manual spot-checks to ensure data integrity before loading into production databases.',
      es: 'Validar los datos extraídos contra los materiales fuente, verificar completitud, precisión y consistencia. Ejecutar scripts de validación automatizados y realizar verificaciones manuales para asegurar la integridad de los datos antes de cargar en bases de datos de producción.'
    },
    inputs: ['Cleaned data', 'Source materials', 'Validation rules'],
    outputs: ['Validation report', 'QC passed/failed status', 'Correction log'],
    tools: ['Validation scripts', 'Comparison tools', 'Statistical analysis'],
    team: ['Juan', 'Fun (QC specialist)'],
    estimatedTime: '2-8 hours per dataset',
    icon: '✅',
    questions: [
      {
        en: 'What validation checks are automated vs. manual?',
        es: '¿Qué verificaciones de validación son automatizadas vs. manuales?'
      },
      {
        en: 'How do you handle data that fails validation?',
        es: '¿Cómo manejas los datos que no pasan la validación?'
      }
    ]
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: {
      en: 'Database Loading',
      es: 'Carga a Base de Datos'
    },
    description: {
      en: 'Load validated data into production database systems with proper indexing, relationships, and metadata tagging. Ensure data is properly organized, searchable, and integrated with existing datasets in the LithoData platform.',
      es: 'Cargar datos validados en sistemas de bases de datos de producción con indexación adecuada, relaciones y etiquetado de metadatos. Asegurar que los datos estén adecuadamente organizados, sean buscables y estén integrados con conjuntos de datos existentes en la plataforma LithoData.'
    },
    inputs: ['Validated data', 'Database schemas', 'Loading scripts'],
    outputs: ['Loaded database records', 'Load summary report', 'Index updates'],
    tools: ['Database clients', 'ETL tools', 'SQL scripts', 'LithoData platform'],
    team: ['Juan', 'Database administrator'],
    estimatedTime: '1-4 hours per dataset',
    icon: '🗄️',
    questions: [
      {
        en: 'Do you have automated loading scripts or is it mostly manual? Do you use templates?',
        es: '¿Tienes scripts de carga automatizados o es principalmente manual? ¿Usas plantillas?'
      },
      {
        en: 'How do you verify data loaded correctly?',
        es: '¿Cómo verificas que los datos se cargaron correctamente?'
      }
    ]
  },
  {
    id: 'step-8',
    stepNumber: 8,
    title: {
      en: 'Documentation & Handoff',
      es: 'Documentación y Entrega'
    },
    description: {
      en: 'Create comprehensive documentation of the extraction process, data lineage, known issues, and usage notes. Prepare dataset for client delivery or internal use, including metadata, access instructions, and support materials.',
      es: 'Crear documentación completa del proceso de extracción, linaje de datos, problemas conocidos y notas de uso. Preparar el conjunto de datos para entrega al cliente o uso interno, incluyendo metadatos, instrucciones de acceso y materiales de soporte.'
    },
    inputs: ['Loaded data', 'Process logs', 'Quality reports'],
    outputs: ['Documentation', 'Metadata records', 'Client deliverables'],
    tools: ['Google Docs', 'Workbench', 'Documentation templates'],
    team: ['Juan', 'Keith (delivery)'],
    estimatedTime: '2-6 hours per dataset',
    icon: '📝',
    questions: [
      {
        en: 'What level of documentation do you typically create? Does the data extracted have sources referenced in the database?',
        es: '¿Qué nivel de documentación sueles crear? ¿Los datos extraídos tienen fuentes referenciadas en la base de datos?'
      },
      {
        en: 'How do you track what was done for future reference?',
        es: '¿Cómo rastrear lo que se hizo para referencia futura?'
      }
    ]
  }
];

/**
 * Detailed Diagnostic Questions (Page 2)
 * These questions dig deeper into the extraction process
 */
export const diagnosticQuestions: DiagnosticQuestion[] = [
  // Category 1: Process Overview
  {
    id: 'q1-overview',
    category: 'Process Overview',
    question: {
      en: 'On a scale of 1-10, how accurately does the previous page represent your actual extraction workflow?',
      es: 'En una escala del 1 al 10, ¿qué tan precisamente representa la página anterior tu flujo de trabajo de extracción real?'
    },
    type: 'rating',
    required: true,
    helpText: {
      en: '1 = Not accurate at all, 10 = Perfectly accurate',
      es: '1 = Nada preciso, 10 = Perfectamente preciso'
    }
  },
  {
    id: 'q2-missing-steps',
    category: 'Process Overview',
    question: {
      en: 'Are there any major steps missing from this flowchart? If so, please describe them in detail.',
      es: '¿Hay pasos importantes que faltan en este diagrama de flujo? Si es así, descríbelos en detalle.'
    },
    type: 'textarea',
    required: false,
    placeholder: {
      en: 'Describe any missing steps, where they fit in the process, and why they are important...',
      es: 'Describe los pasos que faltan, dónde encajan en el proceso y por qué son importantes...'
    }
  },
  {
    id: 'q3-step-order',
    category: 'Process Overview',
    question: {
      en: 'Rank the 8 steps in order of time consumed (most time-consuming first):',
      es: 'Clasifica los 8 pasos en orden de tiempo consumido (más tiempo primero):'
    },
    type: 'rankingWithTime',
    options: [
      {
        value: 'step-1',
        label: { en: 'Data Source Identification', es: 'Identificación de Fuente de Datos' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-2',
        label: { en: 'Data Acquisition', es: 'Adquisición de Datos' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-3',
        label: { en: 'Initial Data Assessment', es: 'Evaluación Inicial de Datos' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-4',
        label: { en: 'Extraction Planning', es: 'Planificación de Extracción' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-5',
        label: { en: 'Data Extraction', es: 'Extracción de Datos' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-6',
        label: { en: 'Quality Control & Validation', es: 'Control de Calidad y Validación' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-7',
        label: { en: 'Database Loading', es: 'Carga a Base de Datos' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      },
      {
        value: 'step-8',
        label: { en: 'Documentation & Handoff', es: 'Documentación y Entrega' },
        timePrompt: { en: 'How long', es: '¿Cuánto tiempo?' }
      }
    ],
    required: true
  },

  // Category 2: Tools & Technology
  {
    id: 'q4-tools',
    category: 'Tools & Technology',
    question: {
      en: 'Which tools do you use most frequently in the extraction process? (Select all that apply)',
      es: '¿Qué herramientas usas con más frecuencia en el proceso de extracción? (Selecciona todas las que apliquen)'
    },
    type: 'checkbox',
    options: [
      { value: 'python', label: { en: 'Python scripts', es: 'Scripts de Python' } },
      { value: 'excel', label: { en: 'Excel/Google Sheets', es: 'Excel/Google Sheets' } },
      { value: 'regex', label: { en: 'Regular expressions', es: 'Expresiones regulares' } },
      { value: 'sql', label: { en: 'SQL queries', es: 'Consultas SQL' } },
      { value: 'workbench', label: { en: 'Workbench', es: 'Workbench' } },
      { value: 'custom-tools', label: { en: 'Custom-built tools', es: 'Herramientas personalizadas' } },
      { value: 'manual', label: { en: 'Manual data entry', es: 'Entrada manual de datos' } },
      { value: 'pdf-extraction', label: { en: 'PDF extraction', es: 'Extracción de PDF' } }
    ],
    required: true
  },
  {
    id: 'q5-tool-pain-points',
    category: 'Tools & Technology',
    question: {
      en: 'What are the biggest pain points or limitations with your current system?',
      es: '¿Cuáles son los mayores puntos de dolor o limitaciones con tu sistema actual?'
    },
    type: 'textarea',
    required: true,
    placeholder: {
      en: 'Describe specific frustrations, limitations, or areas where better tools would help...',
      es: 'Describe frustraciones específicas, limitaciones o áreas donde mejores herramientas ayudarían...'
    }
  },
  {
    id: 'q6-automation',
    category: 'Tools & Technology',
    question: {
      en: 'What percentage of the extraction process is automated vs. manual?',
      es: '¿Qué porcentaje del proceso de extracción está automatizado vs. manual?'
    },
    type: 'multipleChoice',
    options: [
      { value: '0-25', label: { en: '0-25% automated', es: '0-25% automatizado' } },
      { value: '25-50', label: { en: '25-50% automated', es: '25-50% automatizado' } },
      { value: '50-75', label: { en: '50-75% automated', es: '50-75% automatizado' } },
      { value: '75-100', label: { en: '75-100% automated', es: '75-100% automatizado' } }
    ],
    required: true
  },
  {
    id: 'q6b-extraction-scripts',
    category: 'Tools & Technology',
    question: {
      en: 'Extraction Scripts & Tools',
      es: 'Scripts y Herramientas de Extracción'
    },
    type: 'multiLink',
    required: false,
    description: {
      en: 'Add links to where your extraction scripts, tools, and automation resources are saved. Include links to code repositories, script folders, documentation, or any other resources that contain your extraction tools. Provide a brief description of what each link contains to help others understand your toolkit.',
      es: 'Agrega enlaces a donde se guardan tus scripts de extracción, herramientas y recursos de automatización. Incluye enlaces a repositorios de código, carpetas de scripts, documentación o cualquier otro recurso que contenga tus herramientas de extracción. Proporciona una breve descripción de lo que contiene cada enlace para ayudar a otros a entender tu conjunto de herramientas.'
    }
  },

  // Category 3: Data Quality & Challenges
  {
    id: 'q7-error-types',
    category: 'Data Quality & Challenges',
    question: {
      en: 'Rank these error types by frequency (most common first):',
      es: 'Clasifica estos tipos de errores por frecuencia (más común primero):'
    },
    type: 'ranking',
    options: [
      { value: 'missing-data', label: { en: 'Missing or incomplete data', es: 'Datos faltantes o incompletos' } },
      { value: 'format-issues', label: { en: 'Format incompatibilities', es: 'Incompatibilidades de formato' } },
      { value: 'corrupt-files', label: { en: 'Corrupted files', es: 'Archivos corruptos' } },
      { value: 'inconsistent-units', label: { en: 'Inconsistent units/standards', es: 'Unidades/estándares inconsistentes' } },
      { value: 'duplicates', label: { en: 'Duplicate records', es: 'Registros duplicados' } },
      { value: 'parsing-errors', label: { en: 'Parsing errors', es: 'Errores de análisis' } },
      { value: 'miscommunication', label: { en: 'Miscommunication between the team', es: 'Falta de comunicación entre el equipo' } }
    ],
    required: true
  },
  {
    id: 'q8-quality-challenges',
    category: 'Data Quality & Challenges',
    question: {
      en: 'Describe the most challenging data quality issue you\'ve encountered and how you resolved it.',
      es: 'Describe el problema de calidad de datos más desafiante que has encontrado y cómo lo resolviste.'
    },
    type: 'textarea',
    required: true,
    placeholder: {
      en: 'Describe the issue, what made it difficult, your solution, and what you learned...',
      es: 'Describe el problema, qué lo hizo difícil, tu solución y qué aprendiste...'
    }
  },
  {
    id: 'q9-data-rejection',
    category: 'Data Quality & Challenges',
    question: {
      en: 'What percentage of datasets do you ultimately reject as unsuitable for extraction?',
      es: '¿Qué porcentaje de conjuntos de datos terminas rechazando como inadecuados para extracción?'
    },
    type: 'multipleChoice',
    options: [
      { value: '0-10', label: { en: '0-10%', es: '0-10%' } },
      { value: '10-25', label: { en: '10-25%', es: '10-25%' } },
      { value: '25-50', label: { en: '25-50%', es: '25-50%' } },
      { value: '50-plus', label: { en: 'More than 50%', es: 'Más del 50%' } }
    ],
    required: true
  },

  // Category 4: Workflow & Coordination
  {
    id: 'q10-team-coordination',
    category: 'Workflow & Coordination',
    question: {
      en: 'How do you coordinate with other team members during the extraction process?',
      es: '¿Cómo te coordinas con otros miembros del equipo durante el proceso de extracción?'
    },
    type: 'textarea',
    required: true,
    placeholder: {
      en: 'Describe communication methods, frequency, handoff points, collaboration tools used...',
      es: 'Describe métodos de comunicación, frecuencia, puntos de entrega, herramientas de colaboración utilizadas...'
    }
  },
  {
    id: 'q11-blockers',
    category: 'Workflow & Coordination',
    question: {
      en: 'What most frequently blocks or delays your extraction work? (Select top 3)',
      es: '¿Qué bloquea o retrasa más frecuentemente tu trabajo de extracción? (Selecciona los 3 principales)'
    },
    type: 'checkbox',
    options: [
      { value: 'data-access', label: { en: 'Waiting for data access/permissions', es: 'Esperando acceso/permisos de datos' } },
      { value: 'unclear-requirements', label: { en: 'Unclear client requirements', es: 'Requisitos del cliente poco claros' } },
      { value: 'tool-limitations', label: { en: 'Tool limitations', es: 'Limitaciones de herramientas' } },
      { value: 'quality-issues', label: { en: 'Poor source data quality', es: 'Mala calidad de datos fuente' } },
      { value: 'other-priorities', label: { en: 'Pulled away for other priorities', es: 'Desviado a otras prioridades' } },
      { value: 'review-delays', label: { en: 'Waiting for reviews/approvals', es: 'Esperando revisiones/aprobaciones' } },
      { value: 'technical-issues', label: { en: 'Technical/infrastructure issues', es: 'Problemas técnicos/de infraestructura' } },
      { value: 'pdf-extraction', label: { en: 'Data Extraction from PDFs', es: 'Extracción de datos de PDFs' } }
    ],
    required: true
  },

  // Category 5: Workspace & Documentation
  {
    id: 'q12-workbench-links',
    category: 'Workspace & Documentation',
    question: {
      en: 'Google Workspace / Workbench Links',
      es: 'Enlaces de Google Workspace / Workbench'
    },
    type: 'multiLink',
    required: false,
    description: {
      en: 'Add links to various Google Workspace resources where you track extraction projects. This could include folders, spreadsheets, project management boards, documentation sites, or any other workspace resources. You can add as many links as needed to different areas of your workflow.',
      es: 'Agrega enlaces a varios recursos de Google Workspace donde rastrear proyectos de extracción. Esto podría incluir carpetas, hojas de cálculo, tableros de gestión de proyectos, sitios de documentación o cualquier otro recurso del espacio de trabajo. Puedes agregar tantos enlaces como necesites a diferentes áreas de tu flujo de trabajo.'
    }
  },
  {
    id: 'q13-documentation-completeness',
    category: 'Workspace & Documentation',
    question: {
      en: 'Rate the completeness of your current extraction documentation:',
      es: 'Califica la completitud de tu documentación actual de extracción:'
    },
    type: 'rating',
    required: true,
    helpText: {
      en: '1 = Minimal/no documentation, 10 = Comprehensive documentation for every extraction',
      es: '1 = Documentación mínima/nula, 10 = Documentación completa para cada extracción'
    }
  },
  {
    id: 'q14-documentation-wishes',
    category: 'Workspace & Documentation',
    question: {
      en: 'If you had a perfect documentation system, what would it include?',
      es: 'Si tuvieras un sistema de documentación perfecto, ¿qué incluiría?'
    },
    type: 'textarea',
    required: false,
    placeholder: {
      en: 'Describe your ideal documentation system, templates, tracking, etc...',
      es: 'Describe tu sistema de documentación ideal, plantillas, seguimiento, etc...'
    }
  },

  // Category 6: Database & Technical Details
  {
    id: 'q15-database-schema',
    category: 'Database & Technical Details',
    question: {
      en: 'Describe how extracted data flows into the LithoData database (tables, schemas, loading process):',
      es: 'Describe cómo fluyen los datos extraídos a la base de datos LithoData (tablas, esquemas, proceso de carga):'
    },
    type: 'textarea',
    required: true,
    placeholder: {
      en: 'Describe database structure, table names, relationships, loading scripts/process...',
      es: 'Describe estructura de base de datos, nombres de tablas, relaciones, scripts/proceso de carga...'
    }
  },
  {
    id: 'q16-database-link',
    category: 'Database & Technical Details',
    question: {
      en: 'Provide a link to database schema documentation or diagrams (if available):',
      es: 'Proporciona un enlace a documentación de esquema de base de datos o diagramas (si está disponible):'
    },
    type: 'url',
    required: false,
    placeholder: {
      en: 'https://...',
      es: 'https://...'
    }
  },
  {
    id: 'q17-data-volumes',
    category: 'Database & Technical Details',
    question: {
      en: 'Approximately how many records do you extract and load per month?',
      es: '¿Aproximadamente cuántos registros extraes y cargas por mes?'
    },
    type: 'multipleChoice',
    options: [
      { value: '0-1k', label: { en: '0-1,000 records', es: '0-1,000 registros' } },
      { value: '1k-10k', label: { en: '1,000-10,000 records', es: '1,000-10,000 registros' } },
      { value: '10k-100k', label: { en: '10,000-100,000 records', es: '10,000-100,000 registros' } },
      { value: '100k-1m', label: { en: '100,000-1,000,000 records', es: '100,000-1,000,000 registros' } },
      { value: '1m-plus', label: { en: 'More than 1,000,000 records', es: 'Más de 1,000,000 registros' } }
    ],
    required: true
  },

  // Category 7: Improvement Opportunities
  {
    id: 'q18-biggest-improvement',
    category: 'Improvement Opportunities',
    question: {
      en: 'If you could improve ONE thing about the extraction process, what would it be?',
      es: 'Si pudieras mejorar UNA cosa sobre el proceso de extracción, ¿qué sería?'
    },
    type: 'textarea',
    required: true,
    placeholder: {
      en: 'Describe the specific improvement, why it matters, and the impact it would have...',
      es: 'Describe la mejora específica, por qué importa y el impacto que tendría...'
    }
  },
  {
    id: 'q19-time-savings',
    category: 'Improvement Opportunities',
    question: {
      en: 'Rank these potential improvements by time savings potential:',
      es: 'Clasifica estas posibles mejoras por potencial de ahorro de tiempo:'
    },
    type: 'ranking',
    options: [
      { value: 'better-tools', label: { en: 'Better extraction tools', es: 'Mejores herramientas de extracción' } },
      { value: 'automation', label: { en: 'More automation', es: 'Más automatización' } },
      { value: 'templates', label: { en: 'Standardized templates', es: 'Plantillas estandarizadas' } },
      { value: 'training', label: { en: 'Better training/documentation', es: 'Mejor capacitación/documentación' } },
      { value: 'clearer-requirements', label: { en: 'Clearer client requirements', es: 'Requisitos de cliente más claros' } },
      { value: 'faster-review', label: { en: 'Faster QC/review process', es: 'Proceso de QC/revisión más rápido' } }
    ],
    required: true
  },

  // Category 8: Final Thoughts
  {
    id: 'q20-additional-comments',
    category: 'Final Thoughts',
    question: {
      en: 'Any additional comments, clarifications, or details about the extraction process that we haven\'t covered?',
      es: '¿Algún comentario adicional, aclaración o detalle sobre el proceso de extracción que no hayamos cubierto?'
    },
    type: 'textarea',
    required: false,
    placeholder: {
      en: 'Share any other insights, concerns, or suggestions...',
      es: 'Comparte cualquier otra idea, preocupación o sugerencia...'
    }
  }
];

/**
 * Get questions grouped by category
 */
export function getQuestionsByCategory() {
  const categories = [...new Set(diagnosticQuestions.map(q => q.category))];
  return categories.map(category => ({
    category,
    questions: diagnosticQuestions.filter(q => q.category === category)
  }));
}

/**
 * Get total number of questions
 */
export function getTotalQuestions(): number {
  return diagnosticQuestions.length;
}

/**
 * Get required questions count
 */
export function getRequiredQuestionsCount(): number {
  return diagnosticQuestions.filter(q => q.required).length;
}
