#!/usr/bin/env python3
"""
Extract text content from HTML files and create markdown versions
"""

from bs4 import BeautifulSoup
import os
import re

def clean_text(text):
    """Clean up extracted text - remove excess whitespace but preserve paragraphs"""
    # Replace multiple spaces with single space
    text = re.sub(r' +', ' ', text)
    # Remove spaces at start/end of lines
    lines = [line.strip() for line in text.split('\n')]
    # Remove empty lines but preserve paragraph breaks
    cleaned_lines = []
    prev_empty = False
    for line in lines:
        if line:
            cleaned_lines.append(line)
            prev_empty = False
        elif not prev_empty:
            cleaned_lines.append('')
            prev_empty = True
    return '\n'.join(cleaned_lines)

def extract_text_from_html(html_file):
    """Extract text content from HTML file"""
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove script and style elements
    for script in soup(["script", "style"]):
        script.decompose()

    # Get text
    text = soup.get_text()

    # Clean up the text
    text = clean_text(text)

    return text

def main():
    # Directory containing HTML files
    review_dir = os.path.dirname(os.path.abspath(__file__))

    # HTML files to process
    html_files = [
        'H-Isotopes-au-Project-Summary-Clean.html',
        'I-NRCan-Project-Summary-Clean.html',
        'Lithodat-EarthBank-Project-Summary-MERGED.html'
    ]

    for idx, html_file in enumerate(html_files, 1):
        html_path = os.path.join(review_dir, html_file)

        if not os.path.exists(html_path):
            print(f"Warning: {html_file} not found")
            continue

        print(f"Processing {html_file}...")

        # Extract text
        text_content = extract_text_from_html(html_path)

        # Create markdown filename
        base_name = os.path.splitext(html_file)[0]
        md_filename = f"{idx:02d}-{base_name}.md"
        md_path = os.path.join(review_dir, md_filename)

        # Write markdown file
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(f"# {base_name}\n\n")
            f.write("<!-- Extracted text content from HTML -->\n")
            f.write("<!-- Source: {} -->\n\n".format(html_file))
            f.write(text_content)

        print(f"Created {md_filename}")
        print(f"  Characters: {len(text_content):,}")
        print()

if __name__ == '__main__':
    main()
