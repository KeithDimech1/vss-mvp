#!/usr/bin/env python3
"""Compare text content between markdown and HTML documents."""

import re
from pathlib import Path
from html.parser import HTMLParser
from io import StringIO

class HTMLTextExtractor(HTMLParser):
    """Extract text content from HTML."""

    def __init__(self):
        super().__init__()
        self.text = StringIO()
        self.skip_tags = {'script', 'style', 'head'}
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag

    def handle_endtag(self, tag):
        self.current_tag = None

    def handle_data(self, data):
        if self.current_tag not in self.skip_tags:
            text = data.strip()
            if text:
                self.text.write(text + '\n')

    def get_text(self):
        return self.text.getvalue()

def clean_text(text):
    """Normalize whitespace and remove extra blank lines."""
    # Remove multiple spaces
    text = re.sub(r' +', ' ', text)
    # Remove multiple newlines
    text = re.sub(r'\n\n+', '\n\n', text)
    return text.strip()

def extract_html_text(html_file):
    """Extract text from HTML file."""
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()

    extractor = HTMLTextExtractor()
    extractor.feed(html)
    return clean_text(extractor.get_text())

def read_markdown(md_file):
    """Read and clean markdown file."""
    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()
    return clean_text(text)

def find_differences(text1, text2, label1="Text 1", label2="Text 2"):
    """Find and display differences between two texts."""
    lines1 = text1.split('\n')
    lines2 = text2.split('\n')

    print(f"\n{'='*80}")
    print(f"COMPARISON: {label1} vs {label2}")
    print(f"{'='*80}\n")

    print(f"{label1} line count: {len(lines1)}")
    print(f"{label2} line count: {len(lines2)}")

    # Find unique lines in each
    set1 = set(lines1)
    set2 = set(lines2)

    only_in_1 = set1 - set2
    only_in_2 = set2 - set1

    if only_in_1:
        print(f"\n\nLINES ONLY IN {label1} ({len(only_in_1)} lines):")
        print("-" * 80)
        for line in sorted(only_in_1):
            if line:  # Skip empty lines
                print(f"  {line}")

    if only_in_2:
        print(f"\n\nLINES ONLY IN {label2} ({len(only_in_2)} lines):")
        print("-" * 80)
        for line in sorted(only_in_2):
            if line:  # Skip empty lines
                print(f"  {line}")

    if not only_in_1 and not only_in_2:
        print("\n✅ NO DIFFERENCES FOUND - Text content is identical")

def main():
    base_path = Path("/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/06 gdac-tender copy/html")

    md_file = base_path / "earthbank.md"
    html_file = base_path / "Lithodat-EarthBank-Project-Summary-with-images.html"

    print("Reading markdown file...")
    md_text = read_markdown(md_file)

    print("Extracting text from HTML file...")
    html_text = extract_html_text(html_file)

    print("Comparing content...")
    find_differences(md_text, html_text, "Markdown (earthbank.md)", "HTML (EarthBank-with-images.html)")

    # Save extracted texts for manual review if needed
    output_dir = base_path / "comparison_output"
    output_dir.mkdir(exist_ok=True)

    (output_dir / "earthbank_extracted.txt").write_text(md_text, encoding='utf-8')
    (output_dir / "html_extracted.txt").write_text(html_text, encoding='utf-8')

    print(f"\n\n📁 Extracted texts saved to: {output_dir}")
    print("  - earthbank_extracted.txt")
    print("  - html_extracted.txt")

if __name__ == "__main__":
    main()
