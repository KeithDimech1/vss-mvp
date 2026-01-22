#!/usr/bin/env python3
"""
Merge two HTML files:
- Take the title page and CSS from file 1 (with-no-images.html)
- Take all content (including images) from file 2 (Lithodat-EarthBank-Project-Summary.html)
- Combine: title page from file1 + content from file2, using file1's CSS
"""

from bs4 import BeautifulSoup
import sys

def merge_html_files(file1_path, file2_path, output_path):
    """
    Merge HTML files:
    - Title page from file1
    - Content (with images) from file2
    - CSS from file1
    """
    print(f"Reading file 1 (for title page and CSS): {file1_path}")
    with open(file1_path, 'r', encoding='utf-8') as f:
        html1 = f.read()

    print(f"Reading file 2 (for content with images): {file2_path}")
    with open(file2_path, 'r', encoding='utf-8') as f:
        html2 = f.read()

    # Parse both files
    print("Parsing HTML files...")
    soup1 = BeautifulSoup(html1, 'html.parser')
    soup2 = BeautifulSoup(html2, 'html.parser')

    # Extract components from file 1
    style1 = soup1.find('style')
    body1 = soup1.find('body')

    # Extract body from file 2
    body2 = soup2.find('body')

    # Create new HTML structure
    print("Creating merged HTML...")
    new_soup = BeautifulSoup('<!DOCTYPE html><html lang="en"></html>', 'html.parser')
    new_html = new_soup.find('html')

    # Add head with style from file 1
    new_head = new_soup.new_tag('head')
    meta_charset = new_soup.new_tag('meta', charset='UTF-8')
    meta_viewport = new_soup.new_tag('meta', attrs={'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0'})
    new_head.append(meta_charset)
    new_head.append(meta_viewport)

    title_tag = new_soup.new_tag('title')
    title_tag.string = 'EarthBank Project Summary - Lithodat Pty Ltd'
    new_head.append(title_tag)

    if style1:
        new_head.append(style1)

    new_html.append(new_head)

    # Create new body
    new_body = new_soup.new_tag('body')

    # 1. Add title page from file 1 (if it exists)
    if body1:
        # Look for title page section in file 1
        title_page = body1.find(class_='title-page')
        if title_page:
            print("Found title page in file 1 - adding it...")
            new_body.append(title_page)
        else:
            # If no title-page class, look for first few elements that might be the title
            print("Looking for title page elements in file 1...")
            # Take first 3-5 top-level elements from body1 (likely the title page)
            count = 0
            for child in body1.children:
                if child.name:  # Skip text nodes
                    new_body.append(child)
                    count += 1
                    if count >= 3:  # Adjust this number based on title page structure
                        break

    # 2. Add all content from file 2 (WITH images)
    if body2:
        print("Adding all content from file 2 (including images)...")
        for child in list(body2.children):
            new_body.append(child)

    new_html.append(new_body)

    # Write output
    print(f"Writing merged file to: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(str(new_soup.prettify()))

    print("✅ Merge complete!")
    print(f"Output: {output_path}")

if __name__ == '__main__':
    file1 = '/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/07 final tender/05 Final (1) copy/html/Lithodat-EarthBank-Project-Summary-with-no-images.html'
    file2 = '/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/07 final tender/05 Final (1) copy/html/Lithodat-EarthBank-Project-Summary.html'
    output = '/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/build-data/07 final tender/05 Final (1) copy/html/Lithodat-EarthBank-Project-Summary-MERGED.html'

    merge_html_files(file1, file2, output)
