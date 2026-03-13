Instructions to Access Website:
https://zsimmons.dev


Use of AI:
Below is a transcript of the conversation I had with GitHub Copilot (Claude Opus 4.6) to create the contents of the website.

# CSE 561 Project 3 — Personal Website Development Log

## Full Conversation Transcript

---

### User: Website Content & Design Request

> All of the edits to the actual home page and everything in the requirements you will take care of based on my descriptions.
>
> **Details:**
> - Classes: CSE573 Applications of AI, CSE561 Network Systems
> - CV/Resume pasted (full resume provided)
> - Parallax scrolling / storytelling website
> - Themed around hobbies: Volleyball, Snowboarding, Running, Espresso, Hiking/Backpacking/Mountains
> - Emphasis on aesthetically pleasing with insight into who I am
>
> "Do something wild lets see how far you can take this!"

### Copilot Response: Full Website Build

**Design concept: PNW Mountains / Alpine Parallax**

Built a complete custom website with:

**Files created:**
- `_layouts/default.html` — Custom layout with themed navigation and footer
- `assets/css/style.css` — 700+ lines of custom CSS with:
  - Night sky → dawn color gradient system
  - Parallax mountain SVG layers
  - CSS-animated starfield
  - Scroll-triggered reveal animations
  - Responsive mobile design
  - Print styles for resume
- `assets/js/main.js` — JavaScript for:
  - Starfield generation (200 animated stars)
  - Parallax scroll effects on mountain layers
  - Intersection Observer scroll animations
  - Mobile hamburger navigation
  - Active nav link highlighting
- `index.html` — Main parallax storytelling page with sections:
  - **Hero:** Night sky + 4-layer mountain parallax + animated stars
  - **The Trailhead (About):** Personal introduction with stat cards
  - **The Ascent (Journey):** Career timeline from UMich to Boeing
  - **Base Camp (Education):** Degree cards + current UW coursework
  - **The Ridge (Skills):** Technical skills with hover-animated tags
  - **The View (Adventures Preview):** Cards linking to hobbies page
- `adventures.html` — Deep-dive subpage with sections on:
  - Mountains & Trails
  - Snowboarding
  - The Science of Espresso (with spec cards: 18g dose, 36g yield, 93°C, 27s)
  - Running & Volleyball
- `resume.html` — Full CV page matching the theme
- `404.html` — Custom "Lost on the trail" themed error page

**Design choices:**
- Color palette: Night deep (#0b0d17), twilight (#1a2744), glacier blue (#6b9ac4), golden (#f2cc8f), dawn coral (#e07a5f)
- Typography: Montserrat (headings), Source Sans 3 (body), Playfair Display (accents)
- Section naming follows mountain climbing metaphor: Trailhead → Ascent → Base Camp → Ridge → View

---

### User: Custom Domain Setup Request

> Walk me through how to set up a top level domain...
> I'm thinking of something along the lines of "zwsimmons.me", do you have any other ideas?

### Copilot Response: Domain Ideas & Setup Guide

**Domain suggestions:**

| Domain | Why |
|--------|-----|
| `zwsimmons.me` | Your idea — initials + surname |
| `zsimmons.dev` | Tech-forward, signals engineer |
| `wade.sh` | Short, punchy, mirrors professor's style |
| `zsimmons.page` | Clean, literally a web page |

**Favorites:** `wade.sh` (clever + cheap), `zsimmons.dev` (professional)

**Setup steps provided:**
1. Purchase domain on Cloudflare
2. Configure DNS records (4 A records pointing to GitHub Pages IPs, 1 CNAME for www)
3. Add CNAME file to repo
4. Tell GitHub Pages about the domain
5. Wait for DNS propagation
6. Verify with curl

---

### User: DNS Resolving But Through Cloudflare Proxy

> ```
> dig zsimmons.dev @8.8.8.8
> zsimmons.dev.    300    IN    A    172.67.148.253
> zsimmons.dev.    300    IN    A    104.21.29.123
> ```

### Copilot Response: Fix Cloudflare Proxy Mode

The IPs returning are Cloudflare proxy IPs, not GitHub Pages IPs. Need DNS-only mode (grey cloud, not orange cloud) for GitHub Pages to handle SSL correctly.

Also updated `_config.yml` to set `url: "https://zsimmons.dev"`.

---

### User: Site is Live!

> ```
> curl -I https://zsimmons.dev
> HTTP/2 200
> server: GitHub.com
> ```

### Copilot Response:

**https://zsimmons.dev is live!** HTTP/2 200 with `server: GitHub.com` confirms TLS is active and the site is being served correctly. Reminded to check "Enforce HTTPS" in Settings → Pages.

---

### User: Part 3 — Certificate Setup

> **Part 3: Set up a certificate to encrypt your website**
> After setting up the TLD, you may have noticed that it's not correctly encrypted. We suggest you use Let's Encrypt, a freely available certificate authority.
>
> **Requirements:** A demonstrated encrypted website using a major network CA (nothing local).

### Copilot Response:

**This is already done!** GitHub Pages automatically provisioned a Let's Encrypt SSL certificate when the custom domain was configured. The `curl` output confirmed HTTPS is active with HTTP/2.

Verify certificate details with:
```bash
curl -vI https://zsimmons.dev 2>&1 | grep -E "issuer|subject|expire"
```

Expected output:
```
*  subject: CN=zsimmons.dev
*  issuer: C=US; O=Let's Encrypt; CN=R11
```

**All three parts complete:**
1. Part 1: Jekyll site on GitHub Pages with content ✅
2. Part 2: Custom TLD `zsimmons.dev` via Cloudflare ✅
3. Part 3: Let's Encrypt SSL certificate via GitHub Pages ✅
