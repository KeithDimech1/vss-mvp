# Deploy VSS MVP to app.clair.au

**Do this FIRST before deploying Beyond Zero**

**Time:** 30-45 minutes (including DNS propagation wait)
**Difficulty:** ⭐ Easy

---

## 🎯 What You're Deploying

**Application:** VSS MVP (Viable Strategy System)
**From:** Current Vercel deployment (`vss-mvp.vercel.app`)
**To:** `app.clair.au`

**Location:** `/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/prototypes/web-app/code/vss-mvp`

---

## ✅ Prerequisites

- [ ] Access to GoDaddy account for clair.au
- [ ] Access to Vercel account (cl-air organization)
- [ ] VSS MVP is currently deployed and working

**Check current deployment:**
Visit your current Vercel URL to confirm VSS is working.

---

## 🚀 Step-by-Step Deployment

### Step 1: Add Custom Domain in Vercel (5 minutes)

**Navigate to Vercel:**
1. Open browser: https://vercel.com/cl-air/vss-mvp
2. Click **Settings** (in top menu)
3. Click **Domains** (in left sidebar)
4. You'll see your current domain (`vss-mvp.vercel.app`)

**Add new domain:**
1. Click **Add** button
2. Enter: `app.clair.au`
3. Click **Add**

**Vercel will show:**
```
⚠️ Invalid Configuration

To configure your domain, add this DNS record:

Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

**Leave this tab open** - we'll come back to verify.

---

### Step 2: Configure DNS in GoDaddy (10 minutes)

**Login to GoDaddy:**
1. Go to: https://dcc.godaddy.com/
2. Sign in with your credentials
3. Find `clair.au` in your domains list
4. Click **DNS** or **Manage DNS**

**Add CNAME Record:**
1. Click **Add New Record** or **Add**
2. Fill in:
   - **Type:** Select `CNAME` from dropdown
   - **Name:** `app`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** `600` (10 minutes) - or leave default
3. Click **Save**

**Confirmation:**
You should see the new record in your DNS records list:
```
Type: CNAME
Name: app
Points to: cname.vercel-dns.com
TTL: 600 seconds
```

---

### Step 3: Wait for DNS Verification (10-30 minutes)

**Back in Vercel:**
1. Return to the Vercel domains page
2. Refresh the page
3. Watch the status of `app.clair.au`

**Status progression:**
1. ⚠️ **Invalid Configuration** (DNS not set up yet)
2. 🔄 **Pending Verification** (DNS found, waiting)
3. ✅ **Valid Configuration** (DNS verified!)
4. 🔒 **SSL Certificate Provisioned** (HTTPS ready)

**Typical wait time:** 10-30 minutes
**Maximum:** Can take up to 24 hours (rare)

**What's happening:**
- Vercel is checking GoDaddy DNS servers
- DNS changes propagate globally
- SSL certificate is being generated

**You can check DNS propagation:**
```bash
# On your Mac terminal
dig app.clair.au

# Should eventually show:
# app.clair.au.  600  IN  CNAME  cname.vercel-dns.com.
```

**Or check globally:**
Visit: https://www.whatsmydns.net/#CNAME/app.clair.au

---

### Step 4: Test Your Deployment (10 minutes)

**Once you see ✅ Valid Configuration in Vercel:**

**Visit the new URL:**
1. Open browser
2. Go to: `https://app.clair.au`

**Should see:**
- 🔒 Secure padlock (HTTPS working)
- VSS login page or dashboard (if logged in)

**Test all functionality:**
- [ ] Page loads without errors
- [ ] HTTPS/SSL working (green padlock)
- [ ] Login page displays correctly
- [ ] Can log in successfully
- [ ] Dashboard loads after login
- [ ] Navigation works
- [ ] Admin panel accessible (if you're a manager)
- [ ] Actions system works
- [ ] Database queries work
- [ ] No console errors (press F12 → Console tab)

**Test specific URLs:**
- https://app.clair.au/login
- https://app.clair.au/dashboard
- https://app.clair.au/admin (if manager)
- https://app.clair.au/actions

**All working?** ✅ **VSS deployment complete!**

---

## ✅ Success Checklist

- [ ] Domain added in Vercel
- [ ] CNAME record added in GoDaddy
- [ ] DNS verified in Vercel (✅ status)
- [ ] SSL certificate provisioned (🔒 icon)
- [ ] https://app.clair.au loads
- [ ] HTTPS working (green padlock)
- [ ] Login works
- [ ] Dashboard accessible
- [ ] All features functional
- [ ] No errors in browser console

---

## 🚨 Troubleshooting

### Issue: "Invalid Configuration" persists for hours

**Possible causes:**
- DNS record not saved in GoDaddy
- Typo in CNAME record
- Using wrong record type (should be CNAME, not A)

**Solutions:**
1. Go back to GoDaddy DNS settings
2. Verify the CNAME record exists and is correct:
   - Name: `app` (not `app.clair.au`)
   - Value: `cname.vercel-dns.com` (not `cname.vercel-dns.com.`)
3. Check for typos
4. Try removing and re-adding the record
5. Wait another 30 minutes

---

### Issue: DNS verification check

**Check if DNS is working:**
```bash
# Open Terminal on Mac
dig app.clair.au

# Should show something like:
# ;; ANSWER SECTION:
# app.clair.au.  600  IN  CNAME  cname.vercel-dns.com.
```

**If it doesn't show CNAME:**
- DNS hasn't propagated yet - wait longer
- Or DNS record wasn't saved correctly - check GoDaddy

---

### Issue: SSL Certificate error

**Symptoms:**
- "Your connection is not private" warning
- "NET::ERR_CERT_AUTHORITY_INVALID"

**This is normal during provisioning!**

**Solutions:**
1. Wait - SSL can take up to 24 hours to provision
2. Check Vercel dashboard shows "SSL Certificate Provisioned"
3. Try clearing browser cache and reload
4. Try incognito/private browsing mode
5. If persists after 24 hours, contact Vercel support

---

### Issue: Page loads but features broken

**Check environment variables:**
1. In Vercel dashboard: Settings → Environment Variables
2. Verify these are set:
   - `DATABASE_URL` (Neon PostgreSQL connection string)
   - `JWT_SECRET` (JWT signing secret)
3. If missing, add them and redeploy:
   ```bash
   # In VSS project directory
   vercel --prod
   ```

---

### Issue: Cookies/sessions not working

**Symptoms:**
- Login succeeds but immediately redirects back to login
- Session doesn't persist

**This shouldn't happen with subdomain deployment!**

But if it does:
1. Clear browser cookies for `app.clair.au`
2. Try incognito/private browsing
3. Check browser console for cookie errors
4. Verify `JWT_SECRET` is set in Vercel environment variables

---

## 📊 What Just Happened?

**Before:**
```
User → vss-mvp.vercel.app → Vercel → VSS App → Neon DB
```

**After:**
```
User → app.clair.au → GoDaddy DNS → cname.vercel-dns.com
                                            ↓
                                        Vercel → VSS App → Neon DB
```

**Your DNS setup:**
```
clair.au (GoDaddy)
└── CNAME: app → cname.vercel-dns.com
    └── Points to Vercel's servers
        └── Vercel routes to vss-mvp project
            └── Serves your VSS application
```

---

## 🎉 VSS Deployment Complete!

**You now have:**
- ✅ VSS MVP running at `app.clair.au`
- ✅ HTTPS/SSL enabled automatically
- ✅ Professional, branded URL
- ✅ Same functionality as before
- ✅ Ready for production use

**Old URL still works:**
- `vss-mvp.vercel.app` still accessible
- You can use both URLs
- Vercel auto-redirects to primary domain (optional setting)

---

## 📈 Optional: Set Primary Domain

**Make app.clair.au the primary domain:**

1. In Vercel → Domains
2. Find `app.clair.au`
3. Click three dots (⋮) → **Set as Primary**

**Effect:**
- Vercel will redirect `vss-mvp.vercel.app` → `app.clair.au`
- All links will use the custom domain

---

## 📞 Need Help?

**Vercel Support:**
- Dashboard: https://vercel.com/cl-air/vss-mvp
- Logs: https://vercel.com/cl-air/vss-mvp/logs
- Docs: https://vercel.com/docs/concepts/projects/domains

**GoDaddy Support:**
- DNS Help: https://www.godaddy.com/help/add-a-cname-record-19236
- 24/7 phone support available

**Check deployment logs:**
```bash
vercel logs --project=vss-mvp --follow
```

---

## ➡️ NEXT: Deploy Beyond Zero

**VSS is live?** Great! Now you can deploy Beyond Zero.

**Next guide:**
```bash
open "/Users/keithdimech/Pathway/Dev/Beyond Zero/docs/subdomain-deployment/START-HERE-BEYONDZERO.md"
```

Or continue with the Quick Start guide for Beyond Zero deployment.

---

## 📝 What You Learned

- ✅ How to add custom domains in Vercel
- ✅ How to configure CNAME records in GoDaddy
- ✅ How DNS propagation works
- ✅ How SSL certificates auto-provision
- ✅ How to verify and test deployments

**These same steps apply to any Vercel project!**

---

**Last Updated:** 2025-11-05
**Status:** ✅ Ready to Use
**Next Step:** Deploy Beyond Zero to `beyondzero.clair.au`
