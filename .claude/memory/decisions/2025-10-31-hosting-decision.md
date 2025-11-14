# Hosting Decision for VSS Platform MVP

**Date:** 2025-10-31
**Decision Maker:** Keith Dimech
**Status:** ✅ Decided

---

## Decision

**Use Vercel for hosting the VSS Platform MVP**

---

## Context

We need to deploy a web-based VSS Platform prototype for Lithodat's 14 team members to complete VSM assessments. The application needs to be:
- Live and accessible within this week
- Free or very low cost for prototype phase
- Easy to deploy and maintain
- Supports Next.js and PostgreSQL
- Can scale if needed

Original plan considered GoDaddy (domain owner), but decided to use a proven platform instead.

---

## Options Considered

### Option 1: GoDaddy ❌
**Pros:**
- Already own clair.au domain
- Everything in one place

**Cons:**
- Unknown Node.js support capabilities
- Would require investigation time
- Less developer-friendly
- Harder to deploy Next.js apps
- No built-in database offering

**Verdict:** Rejected - too much uncertainty, could waste time

---

### Option 2: Vercel ✅ **SELECTED**
**Pros:**
- Built specifically for Next.js (same company)
- Free tier perfect for MVP (14 users)
- Automatic deployments (git push = deploy)
- Built-in database (Vercel Postgres)
- Serverless architecture
- Excellent performance
- 2-minute deployment
- Professional hosting
- Can add custom domain later (clair.au)

**Cons:**
- Need to configure DNS if we want custom domain (but optional)
- Another service to manage (but minimal management needed)

**Verdict:** Selected - perfect match for our tech stack and timeline

---

### Option 3: Railway
**Pros:**
- Full-stack hosting
- Database included
- Good for Node.js

**Cons:**
- $5/month cost (not free)
- More complex than needed for MVP
- Not as Next.js optimized

**Verdict:** Rejected - cost not justified for MVP, Vercel is better fit

---

### Option 4: Netlify
**Pros:**
- Free tier
- Easy deployment

**Cons:**
- Better for static sites
- Would need external database
- Less ideal for dynamic Next.js features

**Verdict:** Rejected - not optimal for our use case

---

## Rationale

**Why Vercel:**

1. **Perfect Tech Match**
   - Next.js is made by Vercel
   - First-class Next.js support
   - Optimized for our exact stack

2. **Zero Cost for MVP**
   - Free tier covers 14 users easily
   - No credit card required to start
   - Can upgrade later if needed

3. **Speed to Deploy**
   - Can deploy in literally 2 minutes
   - No server configuration
   - No DevOps complexity

4. **Built-in Database**
   - Vercel Postgres included
   - Serverless, scales automatically
   - No separate DB service to manage

5. **Professional Infrastructure**
   - Global CDN
   - Automatic SSL
   - DDoS protection
   - 99.9% uptime SLA

6. **Development Experience**
   - Preview deployments for every git push
   - Easy environment variables
   - Excellent logs and monitoring
   - Great developer tools

7. **Future Flexibility**
   - Can add clair.au domain later (5 min DNS config)
   - Can scale to production easily
   - Can upgrade to paid plan if needed
   - Can migrate away if requirements change

---

## Domain Strategy

**For MVP (This Week):**
- Use default Vercel domain: `vss-mvp.vercel.app`
- Simple, works immediately
- No DNS configuration needed
- Team can access right away

**For Production (Later):**
- Add custom domain: `vss.clair.au` or `clair.au/vss`
- Takes 5 minutes to configure DNS in GoDaddy
- Point to Vercel with CNAME record
- Zero downtime migration

**Rationale:** Get MVP live fast, add custom domain after validating with team

---

## Implementation Plan

**Phase 1 (This Week):**
1. Create Vercel account (free)
2. Connect GitHub repository
3. Deploy Next.js app
4. Setup Vercel Postgres database
5. Share `vss-mvp.vercel.app` URL with team

**Phase 2 (After Validation):**
1. Login to GoDaddy DNS
2. Add CNAME record: `vss` → `cname.vercel-dns.com`
3. Configure in Vercel dashboard
4. Team now accesses via `vss.clair.au`

---

## Cost Analysis

### MVP Phase (Week 1)
- **Hosting:** $0 (Vercel free tier)
- **Database:** $0 (Vercel Postgres free tier)
- **Domain:** $0 (already own clair.au)
- **Total:** $0/month

### Production Phase (If Successful)
- **Hosting:** $20/month (Vercel Pro - if needed)
- **Database:** $0-20/month (depends on usage)
- **Domain:** $0 (already paid)
- **Total:** $0-40/month

**Budget Impact:** Minimal - can start free, pay only if successful

---

## Risks & Mitigation

### Risk 1: Free Tier Limitations
**Impact:** Low
**Probability:** Low (14 users well within limits)
**Mitigation:** Monitor usage, upgrade to Pro if needed ($20/month)

### Risk 2: Team Confused by Vercel Domain
**Impact:** Low
**Probability:** Low
**Mitigation:** Clear instructions in launch email, can add custom domain quickly

### Risk 3: Vendor Lock-in
**Impact:** Medium
**Probability:** Low
**Mitigation:** Next.js is portable, can redeploy to any Node.js host if needed

---

## Success Criteria

This decision will be successful if:
- ✅ App deploys in < 30 minutes on Day 1
- ✅ Zero deployment issues
- ✅ Team can access without problems
- ✅ No performance issues with 14 users
- ✅ Zero hosting costs during MVP phase
- ✅ Can add custom domain easily if desired

---

## Alternatives Revisited

**If Vercel doesn't work** (unlikely), fallback options in priority order:
1. Railway ($5/month) - full-stack alternative
2. DigitalOcean App Platform ($5/month) - more control
3. AWS Amplify (pay-as-you-go) - enterprise option

**If we need custom domain immediately:**
- Can configure DNS on Day 1, takes 5 extra minutes
- Not critical for MVP validation

---

## Next Steps

- [x] Decision documented
- [ ] Create Vercel account (Day 1 of implementation)
- [ ] Deploy first version (Day 1)
- [ ] Share URL with team (Day 5)
- [ ] Monitor usage and performance
- [ ] Evaluate custom domain need after 1 week

---

## References

- Vercel Pricing: https://vercel.com/pricing
- Vercel Docs: https://vercel.com/docs
- Next.js + Vercel: https://nextjs.org/docs/deployment
- Implementation Plan: `.claude/plans/2025-10-31-rapid-mvp-5-day-plan.md`

---

**Decision Status:** ✅ Final
**Confidence Level:** High (9/10)
**Review Date:** After MVP launch (1 week)

**Approved By:** Keith Dimech
**Date:** 2025-10-31
