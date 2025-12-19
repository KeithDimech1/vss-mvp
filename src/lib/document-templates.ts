/**
 * Document Builder Templates
 * Starter templates for resumes, reports, and custom documents
 */

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'RESUME' | 'BUSINESS_REPORT' | 'VSM_REPORT' | 'CUSTOM';
  html: string;
  css: string;
  thumbnailUrl?: string;
  variables?: Array<{
    name: string;
    description: string;
    defaultValue: string;
  }>;
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Document',
    description: 'Start from scratch with basic HTML structure',
    category: 'CUSTOM',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Untitled Document</title>
</head>
<body>
    <div class="container">
        <h1>Your Document Title</h1>
        <p>Start writing your content here...</p>
    </div>
</body>
</html>`,
    css: `@page {
    size: A4;
    margin: 20mm;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fff;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #2c3e50;
}

p {
    margin-bottom: 15px;
}`,
  },

  {
    id: 'professional-resume',
    name: 'Professional Resume',
    description: 'Clean, professional resume template with sections for experience, education, and skills',
    category: 'RESUME',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - {{name}}</title>
</head>
<body>
    <div class="resume">
        <header class="resume-header">
            <h1>{{name}}</h1>
            <p class="title">{{jobTitle}}</p>
            <div class="contact-info">
                <span>{{email}}</span> •
                <span>{{phone}}</span> •
                <span>{{location}}</span>
            </div>
        </header>

        <section class="resume-section">
            <h2>Professional Summary</h2>
            <p>{{summary}}</p>
        </section>

        <section class="resume-section">
            <h2>Experience</h2>
            <div class="experience-item">
                <div class="experience-header">
                    <h3>Senior Developer</h3>
                    <span class="date">2020 - Present</span>
                </div>
                <p class="company">Tech Company Inc.</p>
                <ul>
                    <li>Led development of key features</li>
                    <li>Mentored junior developers</li>
                    <li>Improved system performance by 40%</li>
                </ul>
            </div>
        </section>

        <section class="resume-section">
            <h2>Education</h2>
            <div class="education-item">
                <div class="education-header">
                    <h3>Bachelor of Computer Science</h3>
                    <span class="date">2016 - 2020</span>
                </div>
                <p class="school">University Name</p>
            </div>
        </section>

        <section class="resume-section">
            <h2>Skills</h2>
            <div class="skills">
                <span class="skill">JavaScript</span>
                <span class="skill">TypeScript</span>
                <span class="skill">React</span>
                <span class="skill">Node.js</span>
                <span class="skill">SQL</span>
            </div>
        </section>
    </div>
</body>
</html>`,
    css: `@page {
    size: A4;
    margin: 15mm;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', 'Helvetica', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fff;
}

.resume {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
}

.resume-header {
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 3px solid #2c3e50;
    margin-bottom: 30px;
}

.resume-header h1 {
    font-size: 2.5em;
    color: #2c3e50;
    margin-bottom: 5px;
}

.resume-header .title {
    font-size: 1.3em;
    color: #7f8c8d;
    margin-bottom: 15px;
}

.contact-info {
    font-size: 0.95em;
    color: #555;
}

.resume-section {
    margin-bottom: 30px;
    page-break-inside: avoid;
}

.resume-section h2 {
    font-size: 1.5em;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

.experience-item,
.education-item {
    margin-bottom: 20px;
}

.experience-header,
.education-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 5px;
}

.experience-header h3,
.education-header h3 {
    font-size: 1.2em;
    color: #2c3e50;
}

.date {
    font-size: 0.9em;
    color: #7f8c8d;
    font-style: italic;
}

.company,
.school {
    color: #7f8c8d;
    margin-bottom: 10px;
}

.experience-item ul {
    margin-left: 20px;
}

.experience-item li {
    margin-bottom: 5px;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.skill {
    background: #3498db;
    color: #fff;
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 0.9em;
}`,
    variables: [
      { name: 'name', description: 'Your full name', defaultValue: 'John Doe' },
      { name: 'jobTitle', description: 'Your job title', defaultValue: 'Software Developer' },
      { name: 'email', description: 'Your email address', defaultValue: 'john@example.com' },
      { name: 'phone', description: 'Your phone number', defaultValue: '+1 234 567 8900' },
      { name: 'location', description: 'Your location', defaultValue: 'City, Country' },
      { name: 'summary', description: 'Professional summary', defaultValue: 'Experienced developer with expertise in web technologies.' },
    ],
  },

  {
    id: 'business-report',
    name: 'Business Report',
    description: 'Professional business report template with executive summary, data tables, and charts',
    category: 'BUSINESS_REPORT',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{reportTitle}}</title>
</head>
<body>
    <div class="report">
        <div class="cover-page">
            <h1>{{reportTitle}}</h1>
            <p class="subtitle">{{subtitle}}</p>
            <div class="report-meta">
                <p><strong>Prepared by:</strong> {{author}}</p>
                <p><strong>Date:</strong> {{date}}</p>
                <p><strong>Department:</strong> {{department}}</p>
            </div>
        </div>

        <div class="table-of-contents">
            <h2>Table of Contents</h2>
            <ul>
                <li><a href="#executive-summary">Executive Summary</a></li>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#findings">Key Findings</a></li>
                <li><a href="#recommendations">Recommendations</a></li>
                <li><a href="#conclusion">Conclusion</a></li>
            </ul>
        </div>

        <section id="executive-summary">
            <h2>Executive Summary</h2>
            <p class="summary-box">This report presents an analysis of {{topic}}. Key findings indicate significant opportunities for improvement in operational efficiency and cost reduction.</p>
        </section>

        <section id="introduction">
            <h2>1. Introduction</h2>
            <p>This section provides background and context for the report...</p>
        </section>

        <section id="findings">
            <h2>2. Key Findings</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Current</th>
                        <th>Target</th>
                        <th>Variance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Revenue Growth</td>
                        <td>12%</td>
                        <td>15%</td>
                        <td class="negative">-3%</td>
                    </tr>
                    <tr>
                        <td>Customer Satisfaction</td>
                        <td>88%</td>
                        <td>85%</td>
                        <td class="positive">+3%</td>
                    </tr>
                    <tr>
                        <td>Operating Costs</td>
                        <td>$2.1M</td>
                        <td>$2.0M</td>
                        <td class="negative">+$100K</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section id="recommendations">
            <h2>3. Recommendations</h2>
            <div class="recommendation-box">
                <h3>Recommendation 1: Optimize Operations</h3>
                <p>Implement automated workflows to reduce manual processing time by 30%.</p>
                <p><strong>Impact:</strong> High | <strong>Effort:</strong> Medium</p>
            </div>
            <div class="recommendation-box">
                <h3>Recommendation 2: Enhance Training</h3>
                <p>Develop comprehensive training program for new team members.</p>
                <p><strong>Impact:</strong> Medium | <strong>Effort:</strong> Low</p>
            </div>
        </section>

        <section id="conclusion">
            <h2>4. Conclusion</h2>
            <p>Based on the analysis presented in this report, we recommend implementing the proposed changes to achieve our strategic objectives.</p>
        </section>
    </div>
</body>
</html>`,
    css: `@page {
    size: A4;
    margin: 20mm;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Calibri', 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fff;
}

.report {
    max-width: 800px;
    margin: 0 auto;
}

.cover-page {
    text-align: center;
    padding: 100px 40px;
    page-break-after: always;
    border: 3px solid #2c3e50;
    margin-bottom: 40px;
}

.cover-page h1 {
    font-size: 2.5em;
    color: #2c3e50;
    margin-bottom: 20px;
}

.subtitle {
    font-size: 1.3em;
    color: #7f8c8d;
    margin-bottom: 60px;
}

.report-meta {
    text-align: left;
    max-width: 400px;
    margin: 0 auto;
}

.report-meta p {
    margin-bottom: 10px;
}

.table-of-contents {
    padding: 30px 0;
    page-break-after: always;
}

.table-of-contents h2 {
    font-size: 1.8em;
    color: #2c3e50;
    margin-bottom: 20px;
}

.table-of-contents ul {
    list-style: none;
}

.table-of-contents li {
    padding: 10px 0;
    border-bottom: 1px dotted #ccc;
}

.table-of-contents a {
    color: #3498db;
    text-decoration: none;
}

section {
    margin-bottom: 40px;
    page-break-inside: avoid;
}

section h2 {
    font-size: 1.8em;
    color: #2c3e50;
    border-bottom: 3px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

section h3 {
    font-size: 1.3em;
    color: #34495e;
    margin: 20px 0 10px;
}

.summary-box {
    background: #ecf0f1;
    border-left: 4px solid #3498db;
    padding: 20px;
    margin: 20px 0;
    font-size: 1.1em;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.data-table th,
.data-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.data-table th {
    background: #2c3e50;
    color: #fff;
    font-weight: bold;
}

.data-table tbody tr:nth-child(even) {
    background: #f9f9f9;
}

.data-table .positive {
    color: #27ae60;
    font-weight: bold;
}

.data-table .negative {
    color: #e74c3c;
    font-weight: bold;
}

.recommendation-box {
    background: #fff;
    border: 2px solid #3498db;
    border-radius: 5px;
    padding: 20px;
    margin: 20px 0;
}

.recommendation-box h3 {
    color: #3498db;
    margin-top: 0;
}

.recommendation-box p {
    margin: 10px 0;
}`,
    variables: [
      { name: 'reportTitle', description: 'Report title', defaultValue: 'Quarterly Business Report' },
      { name: 'subtitle', description: 'Report subtitle', defaultValue: 'Q4 2025 Performance Analysis' },
      { name: 'author', description: 'Report author', defaultValue: 'John Doe' },
      { name: 'date', description: 'Report date', defaultValue: 'December 18, 2025' },
      { name: 'department', description: 'Department name', defaultValue: 'Strategy & Operations' },
      { name: 'topic', description: 'Main topic', defaultValue: 'operational efficiency' },
    ],
  },

  {
    id: 'vsm-report',
    name: 'VSM Assessment Report',
    description: 'Generate reports from VSM assessment data with charts and analysis',
    category: 'VSM_REPORT',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VSM Assessment Report - {{companyName}}</title>
</head>
<body>
    <div class="vsm-report">
        <header class="report-header">
            <div class="logo-area">
                <h1>Viable Systems Model</h1>
                <p class="subtitle">Organizational Assessment Report</p>
            </div>
            <div class="company-info">
                <h2>{{companyName}}</h2>
                <p>Assessment Date: {{assessmentDate}}</p>
                <p>Prepared by: {{preparedBy}}</p>
            </div>
        </header>

        <section class="executive-summary">
            <h2>Executive Summary</h2>
            <div class="summary-card">
                <h3>Overall System Health</h3>
                <div class="health-score">
                    <div class="score-circle">78%</div>
                    <p>Good - Some areas need attention</p>
                </div>
            </div>
        </section>

        <section class="system-analysis">
            <h2>System 1: Operations Analysis</h2>
            <div class="system-card">
                <h3>Key Findings</h3>
                <ul>
                    <li><strong>Strengths:</strong> Clear operational procedures, efficient workflows</li>
                    <li><strong>Weaknesses:</strong> Limited autonomy in decision-making</li>
                    <li><strong>Opportunities:</strong> Automation potential in routine tasks</li>
                    <li><strong>Threats:</strong> Resource constraints during peak periods</li>
                </ul>
            </div>

            <div class="metrics-table">
                <h3>Performance Metrics</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Metric</th>
                            <th>Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Autonomy</td>
                            <td>7/10</td>
                            <td class="status-good">Good</td>
                        </tr>
                        <tr>
                            <td>Resource Adequacy</td>
                            <td>6/10</td>
                            <td class="status-fair">Fair</td>
                        </tr>
                        <tr>
                            <td>Communication Flow</td>
                            <td>8/10</td>
                            <td class="status-good">Good</td>
                        </tr>
                        <tr>
                            <td>Adaptation Speed</td>
                            <td>5/10</td>
                            <td class="status-needs-improvement">Needs Improvement</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="recommendations">
            <h2>Strategic Recommendations</h2>
            <div class="rec-priority-high">
                <h3>High Priority</h3>
                <ol>
                    <li>Empower operational units with increased decision-making authority</li>
                    <li>Implement automated monitoring systems for key performance indicators</li>
                    <li>Establish clear communication channels between Systems 1 and 3</li>
                </ol>
            </div>
            <div class="rec-priority-medium">
                <h3>Medium Priority</h3>
                <ol>
                    <li>Develop training programs for adaptive management</li>
                    <li>Review resource allocation processes</li>
                </ol>
            </div>
        </section>

        <section class="next-steps">
            <h2>Next Steps</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <strong>Week 1-2:</strong> Review findings with management team
                </div>
                <div class="timeline-item">
                    <strong>Week 3-4:</strong> Develop detailed implementation plan
                </div>
                <div class="timeline-item">
                    <strong>Month 2:</strong> Begin high-priority interventions
                </div>
                <div class="timeline-item">
                    <strong>Month 3:</strong> First progress review
                </div>
            </div>
        </section>
    </div>
</body>
</html>`,
    css: `@page {
    size: A4;
    margin: 15mm;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fff;
}

.vsm-report {
    max-width: 800px;
    margin: 0 auto;
}

.report-header {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: #fff;
    padding: 40px;
    margin-bottom: 40px;
    page-break-after: avoid;
}

.logo-area h1 {
    font-size: 2.5em;
    margin-bottom: 5px;
}

.subtitle {
    font-size: 1.2em;
    opacity: 0.9;
    margin-bottom: 30px;
}

.company-info h2 {
    font-size: 1.8em;
    margin-bottom: 10px;
}

.company-info p {
    font-size: 0.95em;
    opacity: 0.95;
}

section {
    margin-bottom: 40px;
    page-break-inside: avoid;
}

section h2 {
    font-size: 1.8em;
    color: #1e3a8a;
    border-bottom: 3px solid #3b82f6;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.summary-card {
    background: #f0f9ff;
    border-left: 5px solid #3b82f6;
    padding: 25px;
    margin: 20px 0;
}

.health-score {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-top: 15px;
}

.score-circle {
    background: #10b981;
    color: #fff;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    font-weight: bold;
}

.system-card {
    background: #fff;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}

.system-card h3 {
    color: #1e3a8a;
    margin-bottom: 15px;
}

.system-card ul {
    margin-left: 20px;
}

.system-card li {
    margin-bottom: 10px;
}

.metrics-table {
    margin: 30px 0;
}

.metrics-table h3 {
    color: #1e3a8a;
    margin-bottom: 15px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
}

table th,
table td {
    border: 1px solid #e5e7eb;
    padding: 12px;
    text-align: left;
}

table th {
    background: #1e3a8a;
    color: #fff;
    font-weight: bold;
}

table tbody tr:nth-child(even) {
    background: #f9fafb;
}

.status-good {
    color: #10b981;
    font-weight: bold;
}

.status-fair {
    color: #f59e0b;
    font-weight: bold;
}

.status-needs-improvement {
    color: #ef4444;
    font-weight: bold;
}

.rec-priority-high,
.rec-priority-medium {
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
}

.rec-priority-high {
    background: #fee2e2;
    border-left: 5px solid #ef4444;
}

.rec-priority-medium {
    background: #fef3c7;
    border-left: 5px solid #f59e0b;
}

.rec-priority-high h3,
.rec-priority-medium h3 {
    color: #1e3a8a;
    margin-bottom: 15px;
}

.rec-priority-high ol,
.rec-priority-medium ol {
    margin-left: 20px;
}

.rec-priority-high li,
.rec-priority-medium li {
    margin-bottom: 10px;
}

.timeline {
    background: #f9fafb;
    border-radius: 8px;
    padding: 20px;
}

.timeline-item {
    padding: 15px;
    border-left: 3px solid #3b82f6;
    margin: 10px 0;
    padding-left: 20px;
}`,
    variables: [
      { name: 'companyName', description: 'Company name', defaultValue: 'Your Company' },
      { name: 'assessmentDate', description: 'Assessment date', defaultValue: 'December 18, 2025' },
      { name: 'preparedBy', description: 'Report preparer', defaultValue: 'VSM Consultant' },
    ],
  },

  {
    id: 'modern-invoice',
    name: 'Modern Invoice',
    description: 'Professional invoice template for billing and payments',
    category: 'BUSINESS_REPORT',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{invoiceNumber}}</title>
</head>
<body>
    <div class="invoice">
        <header class="invoice-header">
            <div class="company-info">
                <h1>{{companyName}}</h1>
                <p>{{address}}</p>
                <p>{{city}}, {{country}}</p>
                <p>Email: {{email}}</p>
            </div>
            <div class="invoice-details">
                <h2>INVOICE</h2>
                <p><strong>Invoice #:</strong> {{invoiceNumber}}</p>
                <p><strong>Date:</strong> {{invoiceDate}}</p>
                <p><strong>Due Date:</strong> {{dueDate}}</p>
            </div>
        </header>

        <section class="bill-to">
            <h3>Bill To:</h3>
            <p><strong>{{clientName}}</strong></p>
            <p>{{clientAddress}}</p>
            <p>{{clientCity}}, {{clientCountry}}</p>
        </section>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Web Development Services</td>
                    <td>40 hours</td>
                    <td>$100.00</td>
                    <td>$4,000.00</td>
                </tr>
                <tr>
                    <td>Design Consultation</td>
                    <td>10 hours</td>
                    <td>$80.00</td>
                    <td>$800.00</td>
                </tr>
                <tr>
                    <td>Hosting Setup</td>
                    <td>1</td>
                    <td>$200.00</td>
                    <td>$200.00</td>
                </tr>
            </tbody>
        </table>

        <div class="totals">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>$5,000.00</span>
            </div>
            <div class="total-row">
                <span>Tax (10%):</span>
                <span>$500.00</span>
            </div>
            <div class="total-row total-amount">
                <span>Total:</span>
                <span>$5,500.00</span>
            </div>
        </div>

        <section class="payment-info">
            <h3>Payment Information</h3>
            <p><strong>Bank:</strong> {{bankName}}</p>
            <p><strong>Account Number:</strong> {{accountNumber}}</p>
            <p><strong>Swift Code:</strong> {{swiftCode}}</p>
        </section>

        <footer class="invoice-footer">
            <p>Thank you for your business!</p>
            <p class="note">Payment is due within 30 days. Late payments may incur additional fees.</p>
        </footer>
    </div>
</body>
</html>`,
    css: `@page {
    size: A4;
    margin: 15mm;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', 'Helvetica', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fff;
}

.invoice {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
}

.invoice-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    border-bottom: 3px solid #3498db;
    margin-bottom: 30px;
}

.company-info h1 {
    font-size: 2em;
    color: #2c3e50;
    margin-bottom: 10px;
}

.company-info p {
    color: #7f8c8d;
    font-size: 0.9em;
}

.invoice-details {
    text-align: right;
}

.invoice-details h2 {
    font-size: 2.5em;
    color: #3498db;
    margin-bottom: 15px;
}

.invoice-details p {
    margin-bottom: 5px;
}

.bill-to {
    margin-bottom: 30px;
}

.bill-to h3 {
    color: #2c3e50;
    margin-bottom: 10px;
}

.bill-to p {
    margin-bottom: 5px;
}

.items-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
}

.items-table thead {
    background: #2c3e50;
    color: #fff;
}

.items-table th,
.items-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
}

.items-table th:last-child,
.items-table td:last-child {
    text-align: right;
}

.items-table tbody tr:hover {
    background: #f8f9fa;
}

.totals {
    max-width: 300px;
    margin-left: auto;
    margin-bottom: 30px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ecf0f1;
}

.total-amount {
    font-size: 1.3em;
    font-weight: bold;
    color: #2c3e50;
    border-top: 3px solid #3498db;
    border-bottom: 3px solid #3498db;
    padding: 15px 0;
}

.payment-info {
    background: #ecf0f1;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 30px;
}

.payment-info h3 {
    color: #2c3e50;
    margin-bottom: 15px;
}

.payment-info p {
    margin-bottom: 8px;
}

.invoice-footer {
    text-align: center;
    padding-top: 30px;
    border-top: 2px solid #ecf0f1;
}

.invoice-footer p {
    margin-bottom: 10px;
}

.note {
    font-size: 0.85em;
    color: #7f8c8d;
    font-style: italic;
}`,
    variables: [
      { name: 'companyName', description: 'Your company name', defaultValue: 'Your Company' },
      { name: 'address', description: 'Company address', defaultValue: '123 Business St' },
      { name: 'city', description: 'City', defaultValue: 'Sydney' },
      { name: 'country', description: 'Country', defaultValue: 'Australia' },
      { name: 'email', description: 'Contact email', defaultValue: 'billing@company.com' },
      { name: 'invoiceNumber', description: 'Invoice number', defaultValue: 'INV-001' },
      { name: 'invoiceDate', description: 'Invoice date', defaultValue: 'December 18, 2025' },
      { name: 'dueDate', description: 'Due date', defaultValue: 'January 17, 2026' },
      { name: 'clientName', description: 'Client name', defaultValue: 'Client Company' },
      { name: 'clientAddress', description: 'Client address', defaultValue: '456 Client Ave' },
      { name: 'clientCity', description: 'Client city', defaultValue: 'Melbourne' },
      { name: 'clientCountry', description: 'Client country', defaultValue: 'Australia' },
      { name: 'bankName', description: 'Bank name', defaultValue: 'ANZ Bank' },
      { name: 'accountNumber', description: 'Account number', defaultValue: '1234 5678 9012' },
      { name: 'swiftCode', description: 'SWIFT code', defaultValue: 'ANZBAU3M' },
    ],
  },
];

// Helper function to get template by ID
export function getTemplateById(id: string): DocumentTemplate | undefined {
  return DOCUMENT_TEMPLATES.find((template) => template.id === id);
}

// Helper function to get templates by category
export function getTemplatesByCategory(category: DocumentTemplate['category']): DocumentTemplate[] {
  return DOCUMENT_TEMPLATES.filter((template) => template.category === category);
}

// Helper function to replace variables in template
export function replaceTemplateVariables(
  html: string,
  variables: Record<string, string>
): string {
  let result = html;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}
