#!/usr/bin/env python3
"""
GDAC-SA Organizational Chart Generator
Creates a clean, non-overlapping SVG organizational chart with square boxes
"""

# Chart dimensions
BOX_SIZE = 140  # Square boxes
HORIZONTAL_GAP = 40  # Space between boxes horizontally
VERTICAL_GAP = 80   # Space between levels vertically
CANVAS_WIDTH = 1800
CANVAS_HEIGHT = 1400
START_Y = 80  # Start position for first level

# Define the organizational structure
class Person:
    def __init__(self, name, title, level, color_scheme):
        self.name = name
        self.title = title
        self.level = level
        self.color_scheme = color_scheme
        self.x = 0
        self.y = 0
        self.reports_to = []
        self.dotted_lines = []

# Color schemes (gradient start, gradient end, text color)
COLORS = {
    'client': ('#f59e0b', '#d97706', '#ffffff'),      # Gold
    'ceo': ('#1e3a5f', '#2d5a87', '#ffffff'),         # Dark Navy
    'advisory': ('#dc2626', '#b91c1c', '#ffffff'),    # Red
    'csuite': ('#1e40af', '#1e3a8a', '#ffffff'),      # Dark Blue
    'director': ('#0ea5e9', '#0284c7', '#ffffff'),    # Sky Blue
    'manager': ('#8b5cf6', '#7c3aed', '#ffffff'),     # Purple
    'specialist': ('#a78bfa', '#8b5cf6', '#ffffff'),  # Light Purple
    'dev': ('#10b981', '#059669', '#ffffff'),         # Green
    'data_quality': ('#14b8a6', '#0d9488', '#ffffff') # Teal
}

# Create all people
people = {
    # Level 0 - Top tier (SGS and Dr. Mahdi)
    'sgs': Person('Saudi Geological Survey', '(SGS - Client)', 0, 'client'),
    'mahdi': Person('Dr. Mahdi AbuAli', 'GDAC Saudi Lead', 0, 'advisory'),

    # Level 1 - CEO
    'fabian': Person('Dr. Fabian Kohlmann', 'Managing Director and CEO', 1, 'ceo'),

    # Level 2 - C-Suite
    'keith': Person('Keith Dimech', 'Chief Operating Officer', 2, 'csuite'),
    'qusay': Person('Dr. Qusay Abeed', 'GDAC Geological Technical Director', 2, 'csuite'),
    'wayne': Person('Dr. Wayne Peter Noble', 'Chief Information Officer', 2, 'csuite'),

    # Level 3 - Directors
    'gerd': Person('Gerd Moritz Theile', 'Chief Technology Officer', 3, 'director'),

    # Level 4 - Managers
    'juan': Person('Juan Baca', 'Quality Manager', 4, 'manager'),
    'vinko': Person('Vinko Novak', 'Head of Data Security', 4, 'manager'),
    'pedro': Person('Pedro Ferreira', 'AI Software Development Lead', 4, 'manager'),

    # Level 4 - Senior Specialists (same level as managers)
    'behnam': Person('Dr. Behnam Sadeghi', 'ML Technical Advisor', 4, 'specialist'),
    'nilesh': Person('Nilesh Vyavahare', 'GIS Full Stack Developer', 4, 'specialist'),

    # Level 5 - Team Members
    'xinyan': Person('Xinyan Zhang', 'Frontend Developer', 5, 'dev'),
    'lujia': Person('Lujia Yang', 'Frontend Developer', 5, 'dev'),
    'tarun': Person('Tarun Sengar', 'Backend Developer', 5, 'dev'),
    'nirali': Person('Nirali Dudharejiya', 'Backend Developer', 5, 'dev'),
    'annemarie': Person('Annemarie Grass', 'Head of Cyber Defence', 5, 'manager'),
    'cris': Person('Cris Ibarra', 'Geology Data Quality Specialist', 5, 'data_quality'),
    'perla': Person('Perla Luque', 'Geology Quality Specialist', 5, 'data_quality'),
    'alejandra': Person('Dr. Alejandra Bedoya', 'Geology Quality Specialist', 5, 'data_quality'),
}

# Define reporting structure (solid lines)
reporting = {
    'fabian': ['keith', 'qusay', 'wayne'],
    'keith': ['juan'],
    'wayne': ['gerd', 'vinko', 'pedro', 'behnam', 'nilesh', 'xinyan', 'lujia'],
    'qusay': ['cris', 'perla', 'alejandra'],
    'gerd': ['tarun', 'nirali'],
    'vinko': ['annemarie'],
}

# Define dotted line relationships
dotted = {
    'mahdi': ['fabian', 'sgs'],
    'fabian': ['sgs'],
}

# Set up relationships
for manager, reports in reporting.items():
    for report in reports:
        people[manager].reports_to.append(people[report])

for source, targets in dotted.items():
    for target in targets:
        people[source].dotted_lines.append(people[target])

# Calculate positions - grid layout
# Level 0: SGS and Mahdi side by side
level_0 = [people['sgs'], people['mahdi']]
x_start_0 = (CANVAS_WIDTH - (len(level_0) * BOX_SIZE + (len(level_0)-1) * HORIZONTAL_GAP)) / 2
for i, person in enumerate(level_0):
    person.x = x_start_0 + i * (BOX_SIZE + HORIZONTAL_GAP)
    person.y = START_Y

# Level 1: CEO (centered)
people['fabian'].x = (CANVAS_WIDTH - BOX_SIZE) / 2
people['fabian'].y = START_Y + VERTICAL_GAP + BOX_SIZE

# Level 2: C-Suite (3 people)
level_2 = [people['keith'], people['qusay'], people['wayne']]
x_start_2 = (CANVAS_WIDTH - (len(level_2) * BOX_SIZE + (len(level_2)-1) * HORIZONTAL_GAP)) / 2
for i, person in enumerate(level_2):
    person.x = x_start_2 + i * (BOX_SIZE + HORIZONTAL_GAP)
    person.y = people['fabian'].y + VERTICAL_GAP + BOX_SIZE

# Level 3: CTO (under Wayne)
people['gerd'].x = people['wayne'].x
people['gerd'].y = level_2[0].y + VERTICAL_GAP + BOX_SIZE

# Level 4: Managers and Specialists (5 people spread across)
level_4 = [people['juan'], people['vinko'], people['pedro'], people['behnam'], people['nilesh']]
# Position under their managers
people['juan'].x = people['keith'].x  # Under Keith
people['vinko'].x = people['wayne'].x - (BOX_SIZE + HORIZONTAL_GAP)  # Left of Wayne's column
people['pedro'].x = people['wayne'].x  # Under Wayne
people['behnam'].x = people['wayne'].x + (BOX_SIZE + HORIZONTAL_GAP)  # Right of Wayne
people['nilesh'].x = people['wayne'].x + 2 * (BOX_SIZE + HORIZONTAL_GAP)  # Further right

for person in level_4:
    person.y = people['gerd'].y + VERTICAL_GAP + BOX_SIZE

# Level 5: Team Members (9 people - arranged in 2 rows to avoid overlap)
# Calculate base X positions for columns
col1_x = people['keith'].x  # 650
col2_x = col1_x + (BOX_SIZE + HORIZONTAL_GAP)  # 830
col3_x = col2_x + (BOX_SIZE + HORIZONTAL_GAP)  # 1010
col4_x = col3_x + (BOX_SIZE + HORIZONTAL_GAP)  # 1190
col5_x = col4_x + (BOX_SIZE + HORIZONTAL_GAP)  # 1370

# Row 1: Data Quality team (under Qusay) + Frontend devs (under Wayne)
people['cris'].x = col2_x  # 830 (under Qusay who is at 830)
people['perla'].x = col3_x  # 1010
people['alejandra'].x = col4_x  # 1190
people['xinyan'].x = col1_x  # 650 (frontend, spread out)
people['lujia'].x = col5_x  # 1370 (frontend, spread out)

# Set Y position for first row
level_5_row1 = [people['xinyan'], people['cris'], people['perla'], people['alejandra'], people['lujia']]
for person in level_5_row1:
    person.y = level_4[0].y + VERTICAL_GAP + BOX_SIZE

# Row 2: Backend developers (under Gerd/CTO) + Security (under Vinko)
people['annemarie'].x = col2_x  # 830 (under Vinko who is at 830)
people['tarun'].x = col3_x  # 1010 (under Gerd who is at 1010)
people['nirali'].x = col4_x  # 1190 (next to Tarun)

# Set Y position for second row (below first row)
level_5_row2 = [people['annemarie'], people['tarun'], people['nirali']]
for person in level_5_row2:
    person.y = level_5_row1[0].y + BOX_SIZE + VERTICAL_GAP

# Generate SVG
def generate_gradient(id_name, color1, color2):
    return f'''    <linearGradient id="{id_name}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{color2};stop-opacity:1" />
    </linearGradient>'''

def generate_box(person):
    colors = COLORS[person.color_scheme]
    grad_id = f"{person.name.replace(' ', '_').replace('.', '')}_grad"

    # Split title into multiple lines if too long
    title_lines = []
    if len(person.title) > 25:
        words = person.title.split()
        line = ""
        for word in words:
            if len(line + word) < 25:
                line += word + " "
            else:
                title_lines.append(line.strip())
                line = word + " "
        if line:
            title_lines.append(line.strip())
    else:
        title_lines = [person.title]

    # Calculate center
    cx = person.x + BOX_SIZE / 2
    cy = person.y + BOX_SIZE / 2

    # Generate box
    box = f'''  <!-- {person.name} -->
  <rect x="{person.x}" y="{person.y}" width="{BOX_SIZE}" height="{BOX_SIZE}" rx="8" fill="url(#{grad_id})" filter="url(#shadow)"/>
  <text x="{cx}" y="{cy - 10}" text-anchor="middle" font-size="11" font-weight="bold" fill="{colors[2]}">{person.name}</text>'''

    # Add title lines
    for i, line in enumerate(title_lines):
        y_offset = cy + 5 + (i * 14)
        box += f'\n  <text x="{cx}" y="{y_offset}" text-anchor="middle" font-size="9" fill="{colors[2]}" opacity="0.9">{line}</text>'

    return box, grad_id, colors

def get_center(person):
    return (person.x + BOX_SIZE / 2, person.y + BOX_SIZE / 2)

def generate_line(from_person, to_person, dotted=False):
    fx, fy = get_center(from_person)
    tx, ty = get_center(to_person)

    # Start from bottom of source box
    fy = from_person.y + BOX_SIZE
    # End at top of target box
    ty = to_person.y

    style = 'stroke-dasharray="6,4"' if dotted else ''
    color = '#f59e0b' if dotted else '#94a3b8'

    # If boxes are on the same horizontal level, draw direct line
    if abs(fx - tx) < 5:
        return f'  <line x1="{fx}" y1="{fy}" x2="{tx}" y2="{ty}" stroke="{color}" stroke-width="2" {style}/>'

    # Otherwise, draw with midpoint
    mid_y = (fy + ty) / 2
    return f'''  <line x1="{fx}" y1="{fy}" x2="{fx}" y2="{mid_y}" stroke="{color}" stroke-width="2" {style}/>
  <line x1="{fx}" y1="{mid_y}" x2="{tx}" y2="{mid_y}" stroke="{color}" stroke-width="2" {style}/>
  <line x1="{tx}" y1="{mid_y}" x2="{tx}" y2="{ty}" stroke="{color}" stroke-width="2" {style}/>'''

# Build SVG
svg_parts = []
svg_parts.append(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" font-family="system-ui, -apple-system, sans-serif">
  <defs>''')

# Add gradients
gradients_added = set()
for person in people.values():
    colors = COLORS[person.color_scheme]
    grad_id = f"{person.name.replace(' ', '_').replace('.', '')}_grad"
    if person.color_scheme not in gradients_added:
        svg_parts.append(generate_gradient(grad_id, colors[0], colors[1]))
        gradients_added.add(person.color_scheme)

# Add shadow filter
svg_parts.append('''    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="{}" height="{}" fill="#f8fafc"/>

  <!-- Title -->
  <text x="{}" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">GDAC-SA Team Organizational Structure</text>

  <!-- Connection Lines -->'''.format(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH/2))

# Add solid lines
for manager_key, reports in reporting.items():
    for report_key in reports:
        svg_parts.append(generate_line(people[manager_key], people[report_key], dotted=False))

# Add dotted lines
for source_key, targets in dotted.items():
    for target_key in targets:
        svg_parts.append(generate_line(people[source_key], people[target_key], dotted=True))

svg_parts.append('\n  <!-- Boxes -->')

# Add boxes in level order
for level in range(6):
    for person in people.values():
        if person.level == level:
            box, _, _ = generate_box(person)
            svg_parts.append(box)

# Add legend
svg_parts.append('''
  <!-- Legend -->
  <rect x="40" y="1020" width="320" height="130" rx="6" fill="white" stroke="#cbd5e1" stroke-width="2" filter="url(#shadow)"/>
  <text x="200" y="1050" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">LEGEND</text>
  <line x1="60" y1="1075" x2="130" y2="1075" stroke="#94a3b8" stroke-width="2"/>
  <text x="145" y="1080" font-size="11" fill="#475569">Direct Report</text>
  <line x1="60" y1="1105" x2="130" y2="1105" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="145" y="1110" font-size="11" fill="#475569">Advisory / Client Relationship</text>
  <text x="200" y="1135" text-anchor="middle" font-size="10" fill="#64748b">Total Team: 19 Members + 1 Client Entity</text>

  <!-- Footer -->
  <text x="900" y="1180" text-anchor="middle" font-size="10" fill="#94a3b8">GDAC-SA Advanced Analytics Platform - 2025</text>

</svg>''')

# Write to file
output_svg = '\n'.join(svg_parts)
print(output_svg)
