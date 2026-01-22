#!/usr/bin/env python3
"""
Update HTML files with corrected text from CEO review
"""

import os
import re

def update_file(filepath, replacements):
    """Apply a list of text replacements to a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes_made = 0

    for old_text, new_text in replacements:
        if old_text in content:
            content = content.replace(old_text, new_text)
            changes_made += 1
            print(f"  ✓ Replaced: {old_text[:60]}...")
        else:
            print(f"  ✗ NOT FOUND: {old_text[:60]}...")

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  → File updated with {changes_made} changes\n")
    else:
        print(f"  → No changes made\n")

    return changes_made

def main():
    review_dir = os.path.dirname(os.path.abspath(__file__))

    print("=" * 70)
    print("UPDATING HTML FILES WITH CEO CORRECTIONS")
    print("=" * 70)
    print()

    # FILE 1: Isotopes.au
    print("FILE 1: H-Isotopes-au-Project-Summary-Clean.html")
    print("-" * 70)
    isotopes_file = os.path.join(review_dir, 'H-Isotopes-au-Project-Summary-Clean.html')
    isotopes_replacements = [
        (
            'include stable isotopes (δ¹³C, δ¹⁸O, δ²H, δ¹⁵N), radiogenic isotopes (⁸⁷Sr/⁸⁶Sr, Nd, Pb), and δ³⁴S for mineral deposit studies.',
            'include stable isotopes (δ¹³C, δ¹⁸O, δ²H, δ¹⁵N) and radiogenic isotopes (⁸⁷Sr/⁸⁶Sr) for mineral deposit studies.'
        ),
    ]
    update_file(isotopes_file, isotopes_replacements)

    # FILE 2: NRCan CATCH
    print("FILE 2: I-NRCan-Project-Summary-Clean.html")
    print("-" * 70)
    nrcan_file = os.path.join(review_dir, 'I-NRCan-Project-Summary-Clean.html')
    nrcan_replacements = [
        # Change 1: Project Overview
        (
            'database is a $400,000 CAD national platform integrating 51 years of',
            'database is a $400,000 CAD national database integrating 51 years of'
        ),
        # Change 2: Platform scale -> Database scale
        (
            'Platform scale: 996 fission-track datapoints',
            'Database scale: 996 fission-track datapoints'
        ),
        # Change 3: Platform: -> Data Access:
        (
            'mso-ansi-language:EN\'>Platform:</span></strong>',
            'mso-ansi-language:EN\'>Data Access:</span></strong>'
        ),
        (
            'AusGeochem provides FAIR data access, enabling international research community\naccess through open-source platform.',
            'Published via AusGeochem for FAIR data access, enabling international research community\naccess to the CATCH dataset.'
        ),
        # Change 4: Section title
        (
            '4. Platform Capabilities',
            '4. Data Model &amp; Structure'
        ),
        # Change 5: Purpose-built data structure -> data model
        (
            'CATCH employs purpose-built data structure',
            'CATCH employs a purpose-built data model'
        ),
        (
            'provides ML-compatible, cloud-ready structure.',
            'provides ML-compatible, standardized structure.'
        ),
        # Change 6: Figure caption
        (
            'Data accessible via AusGeochem platform.',
            'Data published via AusGeochem.'
        ),
        # Change 7: Advanced Features -> Data Completeness
        (
            'mso-ansi-language:EN\'>Advanced Features:</span></strong>',
            'mso-ansi-language:EN\'>Data Completeness:</span></strong>'
        ),
        # Change 8: FAIR Principles
        (
            'through AusGeochem platform with no authentication barriers',
            'through AusGeochem with no authentication barriers'
        ),
    ]
    update_file(nrcan_file, nrcan_replacements)

    # FILE 3: EarthBank
    print("FILE 3: Lithodat-EarthBank-Project-Summary-MERGED.html")
    print("-" * 70)
    earthbank_file = os.path.join(review_dir, 'Lithodat-EarthBank-Project-Summary-MERGED.html')
    earthbank_replacements = [
        # Change 1: Platform Scale - 10 -> 13+
        (
            '10 university laboratories integrated',
            '13+ university laboratories integrated'
        ),
        # Change 2: History section - 10 -> 13+
        (
            'from 10 university facilities into',
            'from 13+ university facilities into'
        ),
        # Change 3: Universities section (simple text match)
        (
            'Ten Australian laboratories (Curtin, Melbourne, ANU, UWA, Macquarie,',
            '13+ Australian universities and laboratories integrated into single FAIR-aligned platform.'
        ),
        # Remove the rest of the old university list
        (
            '            Queensland, Adelaide, Monash, Tasmania, Wollongong) integrated into single FAIR-aligned platform.',
            ''
        ),
        # Change 4: Industry section
        (
            '15% of users from industry (BHP, AngloAmerican, Chalice Mining), demonstrating',
            '15% of users from industry (including tier 1 mining companies), demonstrating'
        ),
        # Change 5: Museums (simple text match)
        (
            'Museums Victoria collaboration digitized 43,500 historical specimens; 80,000+',
            'Multiple museum collaborations including Museums Victoria (43,500 historical specimens digitized;'
        ),
        (
            '            additional specimens targeted,',
            '            80,000+ additional specimens targeted),'
        ),
        # Change 6: International - remove EarthScope (simple text match)
        (
            '            (tectonic-geochemical integration), EarthScope (USA), EPOS (Europe), IGSN e.V.',
            '            (tectonic-geochemical integration), EPOS (Europe), IGSN e.V.'
        ),
    ]
    update_file(earthbank_file, earthbank_replacements)

    print("=" * 70)
    print("HTML UPDATE COMPLETE")
    print("=" * 70)

if __name__ == '__main__':
    main()
