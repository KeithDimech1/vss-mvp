Hi Geoff,

Please send the invite to the three of us.

Talk soon.

Best,
Fabian

Image

On Fri, 12 Dec 2025, 11:34 pm Geoff Clark, <geoff.clark@mapbox.com> wrote:
Thank you Fabian - the times below don't look quite right for KSA and Melbourne - but regardless, 8am UK (11am KSA) works on Monday for Gavin and me (Gavin is in my team and has a focus on partnerships and KSA).

Who should I send the invite to - just you or Wayne and Keith also?

Geoff.

On Fri, Dec 12, 2025 at 12:21 AM Fabian Kohlmann <fabian.kohlmann@lithodat.com> wrote:
Hi Geoff,

Thank you for your quick and clear response. I appreciate you taking ownership of this discussion immediately-that speed is precisely what we need right now, particularly as the RFQ deadline for the SGS tender is 24 December.

Your comment that the use case aligns well with Atlas on-premise deployments in air-gapped/sovereign environments confirms our belief that Mapbox is the superior technological partner for this flagship KSA tender.

To finalise our alignment on the key points you raised: deployment model, security posture, and Mapbox’s expected role-I would like to speak as soon as possible.

 I am available for a focused call on Monday, 15 December, at the following times (Riyadh/KSA Time):

Date	Time (Riyadh/KSA Time)	Time (Melbourne/AEDT)
Mon, 15 Dec	9:00 AM – 10:00 AM	1:00 PM – 2:00 PM
Mon, 15 Dec	11:00 AM – 12:00 PM	3:00 PM – 4:00 PM
Mon, 15 Dec	2:00 PM – 3:00 PM	6:00 PM – 7:00 PM
Please choose the slot that works best for you and your team.

Thanks again for your interest, and I look forward to speaking early next week.

Best regards,

Fabian

Image


On Fri, 12 Dec 2025 at 10:50, Geoff Clark <geoff.clark@mapbox.com> wrote:
Fabian,



Thanks for the detailed context. Helpful and clear.



I lead Mapbox sales for EMEA, including Saudi Arabia, and I will own this discussion directly.



At a high level, the use case you outline aligns well with Atlas on-premise deployments we already support in high-security government environments, including air-gapped and sovereign setups in the region.



We are interested in exploring participation with you as a consortium partner and treating this as a potential flagship KSA reference, subject to standard internal diligence on scope, architecture, and commercial structure.



I suggest we speak early next week to align on:



Deployment model and security posture.
Expected role of Mapbox within the consortium.
Rough scale and timelines tied to the SGS tender.




If helpful, we can also provide high-level Atlas positioning you can reference in your internal discussions ahead of Tuesday, without over-committing.



I will make time before Monday. Please propose slots.



Regards,

Geoff


Geoff Clark
Head of EMEA
Mapbox.com

On 11 Dec 2025, at 23:37, Peter Sirota <peter.sirota@mapbox.com> wrote:

﻿
Fabian, Geoff is our sales leader in the region and would be the right person to engage with. 

We are looking forward to expanding our business in KSA. 

Peter 

On Thu, Dec 11, 2025 at 2:42 PM Fabian Kohlmann <fabian.kohlmann@lithodat.com> wrote:
To the Mapbox Strategic Partnerships Team,

I am writing to you as the Lead Applicant for the upcoming high-value Saudi Geological Survey (SGS) GDAC AI Platform tender. We are currently evaluating our Consortium Partners for this multi-million dollar bid. We have reached a strategic "fork in the road" regarding our geospatial infrastructure and we need a response from Mapbox by Monday.


Strategic Context (Why we are bidding):

This tender participation is the direct result of multiple high-level engagements between Lithodat, the Saudi Geological Survey (SGS), and the Ministry of Industry and Mineral Resources (MIM). Following these discussions, we were expressly invited by the client to apply for this tender. We have a strong existing relationship with the decision-makers.


The Opportunity:

Our proprietary Geological AI platform is natively built on Mapbox. We prefer to keep this stack for the Saudi implementation. We have reviewed the official RFQ and confirmed it is vendor-agnostic, meaning there is no mandate for legacy ESRI systems. This is a rare open door for a modern stack.


Our Track Record (Government):

We are deeply experienced in deploying Mapbox in high-security government environments. We have already delivered major national platforms using Mapbox architecture, including:

Isotopes.au (https://app.isotopes.au): A federated data platform uniting CSIRO, Geoscience Australia, ANSTO, and the National Measurement Institute stable isotope data.

EarthBank (https://www.auscope.org.au/earthbank): A government (NCRIS)-funded national data platform that makes geochemical data and samples discoverable across all Australian universities, laboratories, and museums.


The Situation:

ESRI Saudi Arabia is actively engaging us to join our consortium. They want to replace our map layer with ArcGIS. However, we believe Mapbox Atlas (On-Premises) is the superior solution for this tender because:

Data Sovereignty: It meets the strict Saudi requirements for keeping data inside the Kingdom (offline/air-gapped).

Performance: It handles large-scale geological visualizations faster than legacy GIS.


The Ask:

We want to bid with Mapbox, not ESRI. Are you interested in joining this consortium to secure a flagship use-case in the Middle East?

Please let us know your interest level so we can finalize our partner structure before our Tuesday meeting with ESRI.

Regards,

Dr. Fabian Kohlmann

Image





We will have to figure out the costs and deployment / server costs as this is all going to have to be added on. 

On Sat, 13 Dec 2025 at 11:59 am, Fabian Kohlmann <fabian.kohlmann@lithodat.com> wrote:
Hi all,

I did some quite intense research today and please find below an AI summary of a few hours research I did. I think that will.be the perfect approach. That may also.explain why their current system is so crazy slow! Still may not to be too easy to implement but that would be the only way that works I would say. Plus if we get that working than we should be fine for a all global government agencies... see below:


1. Executive Summary
We have secured a direct line to Mapbox leadership (MENA Lead & CEO) regarding the Saudi Geological Survey (SGS) and Ministry of Industry (MIM) tender.
Our analysis identifies a critical compliance risk in the standard approach that competitors will likely overlook. By pivoting our bid to a "Sovereign Hybrid Cloud" model using AWS Outposts and Mapbox Atlas, we can satisfy the strict Saudi Data Residency regulations (NDMO) while still delivering the global investor portal SGS requires.
2. The Core Dilemma: Sovereignty vs. Velocity
The tender presents two conflicting requirements that cannot be solved by a standard software implementation:
 * Requirement A (The Vault): SGS holds classified data (gold/uranium reserves) that is a "Strategic National Asset." Under NDMO Level 3/4 standards, this data—and the metadata regarding where geologists are looking—cannot leave KSA.
 * Requirement B (The Showroom): SGS aims to attract foreign investment (BHP, Rio Tinto, etc.). The investment portal must be accessible globally with low latency. A server located solely in Riyadh will be too slow for an investor in New York or London.
The Failure Mode: If we bid a standard Public Cloud solution (Google Maps/Esri Cloud), we violate Requirement A. If we bid a purely Air-Gapped On-Premise solution, we fail Requirement B.
3. The Hidden "Espionage" Risk (Why Standard APIs Fail)
We must clarify to the client why "storing" data locally is not enough. We must also control the "processing."
 * The Scenario: An SGS geologist wants to inspect a potential mining site in the empty quarter. They open their app to zoom in on the coordinates.
 * The Leak: If we use a standard cloud mapping API, that "Zoom Request" (Coordinate + IP Address + User ID) is sent to a US server to fetch the map tiles.
 * The Consequence: Even if the database is in Riyadh, we have just signaled to a foreign entity exactly where Saudi Arabia is exploring for resources before it is announced. This constitutes an Economic Espionage Risk.
4. The Solution: The "Hybrid Airlock" Architecture
We are proposing a dual-tier architecture that uses AWS Outposts to bridge the gap.
Tier 1: The Sovereign Zone (Internal Use)
 * Infrastructure: AWS Outposts (Physical rack located in Riyadh).
 * Software: Mapbox Atlas (Self-hosted engine).
 * Data Flow: 100% Offline. No coordinates ever leave the building.
 * Function: SGS geologists analyze sensitive reserve data securely.
Tier 2: The Public Zone (Investor Portal)
 * Infrastructure: Mapbox Global Cloud (Public CDN).
 * Software: Standard Web APIs.
 * Function: We build a "Sanitization Pipeline" that takes approved data from Tier 1, degrades the precision (e.g., from exact drill holes to general hex-grids), and pushes it to Tier 2 for global investors to view instantly.
5. Commercial Strategy & Partnership Value
We are meeting with the Mapbox MENA Lead on Monday to lock in the commercial structure. We are not positioning ourselves as a simple software reseller.
 * The Pivot: We are acting as the Managed Service Provider (MSP).
 * The Revenue Model: Instead of charging a small margin on a software license, we will bundle the AWS Hardware, the Atlas Software, and our Management Fee into a single line item: "Sovereign Geospatial Platform Service."
 * The Margin: This allows us to charge a premium for "Compliance & Security" while negotiating a wholesale "Partner Rate" from Mapbox for the underlying licenses.
6. Immediate Next Steps (Monday Meeting)
We are meeting the Mapbox MENA Lead to confirm:
 * Licensing Structure: Securing a "Hybrid Agreement" that covers both the Atlas (On-Prem) and Cloud (Public) usage without double-billing.
 * AWS Outposts Certification: Confirming their engineering support for deploying on AWS EKS within the Outposts environment.
 * Satellite Updates: ensuring the license includes quarterly refreshes of high-res satellite imagery (Maxar/DigitalGlobe) required for mining exploration.
Recommendation: We should proceed with the "Hybrid Airlock" bid strategy as our primary differentiator against legacy competitors like Esri, who struggle to deliver this mix of modern UX and strict sovereignty.


Image