#!/bin/bash
set -e

cd "/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/06 gdac-tender/appendices/CV"

for html in CV-*.html; do
  pdf="${html%.html}.pdf"
  echo "Converting $html to $pdf..."
  /usr/sbin/cupsfilter "$html" > "$pdf"
  echo "✓ Created $pdf"
done

echo ""
echo "All PDFs regenerated successfully!"
