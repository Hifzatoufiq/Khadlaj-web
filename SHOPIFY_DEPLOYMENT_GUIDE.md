# Khadlaj Perfumes — KSA Campaign Landing Page
## Complete Shopify Deployment & Setup Guide

This guide walks you through publishing the **KSA VIP Campaign Landing Page** to your live or staging Shopify store.

---

### File Overview

| File Path | Description | Where It Goes in Shopify |
|---|---|---|
| [ksa-campaign.html](file:///c:/web/ksa-campaign.html) | Standalone working HTML/CSS/JS preview | Local testing or Custom Liquid / Page Builder block |
| [sections/ksa-campaign.liquid](file:///c:/web/khadlaj-liquid-theme/sections/ksa-campaign.liquid) | Production Shopify Section with Schema | **Theme Editor > Sections** |
| [templates/page.ksa-campaign.json](file:///c:/web/khadlaj-liquid-theme/templates/page.ksa-campaign.json) | Shopify OS 2.0 Page Template | **Theme Editor > Templates** |
| [sections/promotional-banner.liquid](file:///c:/web/khadlaj-liquid-theme/sections/promotional-banner.liquid) | Homepage banner linking to campaign | **Theme Editor > Sections** |

---

### Step 1: Add the Liquid Section to Your Shopify Theme

1. In your Shopify Admin, navigate to:  
   👉 **Online Store** > **Themes**
2. On your current live or draft theme, click the **three dots (`...`)** and select **Edit code**.
3. Under the **Sections** directory on the left, click **Add a new section**.
4. Name the section: `ksa-campaign` (it will create `sections/ksa-campaign.liquid`).
5. Open [sections/ksa-campaign.liquid](file:///c:/web/khadlaj-liquid-theme/sections/ksa-campaign.liquid), copy its complete contents, paste it into the editor, and click **Save**.

---

### Step 2: Add the Page Template

1. Under the **Templates** directory on the left in the Shopify Code Editor, click **Add a new template**.
2. Set the type: **Page**
3. Set the format: **JSON**
4. Set the template name: `ksa-campaign` (it will create `templates/page.ksa-campaign.json`).
5. Open [templates/page.ksa-campaign.json](file:///c:/web/khadlaj-liquid-theme/templates/page.ksa-campaign.json), copy its JSON contents, paste it in, and click **Save**.

> **Note for Vintage / Liquid-only themes (e.g., Gecko 5.8 / older themes):**  
> If your theme uses `.liquid` templates instead of `.json`:
> - Create `templates/page.ksa-campaign.liquid`
> - Inside it, write only one line: `{% section 'ksa-campaign' %}` and save.

---

### Step 3: Create the Campaign Page in Shopify Admin

1. In Shopify Admin, navigate to:  
   👉 **Online Store** > **Pages** > Click **Add page** (top right).
2. Set the Title: **KSA VIP Campaign** (or *المملكة العربية السعودية • خَدْلَجْ*)
3. In the bottom right sidebar under **Theme template**:
   - Change `Default page` to **`ksa-campaign`**.
4. Set the page handle / URL slug to: `ksa-campaign` (so the URL is `https://khadlaj-perfumes.com/pages/ksa-campaign`).
5. Click **Save** and **View page**.

---

### Step 4: Link from Homepage & Navigation Menu

#### Method A: Using the Updated Promotional Banner
If you are using the theme's [promotional-banner.liquid](file:///c:/web/khadlaj-liquid-theme/sections/promotional-banner.liquid), replace it with our updated code. It automatically displays:
- 🇸🇦 **KSA Exclusive Launch** badge
- Callout: *"Claim Your VIP Privilege Pass & Enter the Luxury Discovery Set Giveaway"*
- Gold Button: **`RSVP & Claim Pass →`** linking directly to `/pages/ksa-campaign`.

#### Method B: Navigation Menu
1. Go to **Online Store** > **Navigation** > Select **Main menu** or **Top bar menu**.
2. Click **Add menu item**:
   - **Name**: `🇸🇦 KSA Campaign` or `VIP RSVP`
   - **Link**: Select **Pages** > **KSA VIP Campaign** (`/pages/ksa-campaign`).
3. Click **Save menu**.

---

### Step 5: How Customer Submissions & Giveaway Data Work

1. When customers submit the form:
   - It posts directly to Shopify's native `/contact` endpoint.
   - Submissions automatically carry customer tags: `KSA-VIP-Campaign, Giveaway-2025`.
   - You can view all entries under **Customers** in Shopify Admin by filtering with the tag `KSA-VIP-Campaign`.
2. **Instant Customer Experience**:
   - The form provides real-time client-side validation.
   - Shows an instant animated luxury confirmation card with a personalized VIP Pass Number (e.g. `KSA-VIP-8829`) and privilege code `KSA-VIP20`.
   - Allows 1-click clipboard copy of the code.

---

### Alternative: Pasting into Page Builders (EComposer / PageFly / Shogun)
If you prefer to load the entire landing page through an app or Custom Liquid block:
- Open [ksa-campaign.html](file:///c:/web/ksa-campaign.html).
- Copy all code inside and paste it into any **Custom HTML / Liquid** block in EComposer or PageFly.
