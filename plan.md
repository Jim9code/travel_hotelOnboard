Here’s a detailed **prompt** you can drop into your `plan.md` file for Cursor so it can scaffold the **hotel onboarding dashboard** with Next.js, TypeScript, and JSX. I’ll make sure it covers the CRUD system, call response statuses, and ability to call hotels individually or sequentially:

---

# plan.md

## Goal

Build a **Hotel Onboarding Dashboard** using **Next.js (App Router)** with **TypeScript** and **JSX/TSX**.

The dashboard will display a table of hotels with the following columns:

1. **No.** (Auto-increment ID)
2. **Hotel Name**
3. **Phone Number** (with clickable phone icon to trigger a call)
4. **Address**
5. **Response** (status indicator buttons: Red, Green, Orange, Black)

   * **Red = No Answer**
   * **Green = Answered**
   * **Orange = Call back in 2–3 minutes**
   * **Black = Switched Off**
6. **Conversation** (text field for notes)

## Features

* **CRUD operations** for hotels:

  * Add new hotel
  * Edit hotel details
  * Delete hotel
  * View full hotel details
* **Response Status Selection**: Click a colored box to set the call response.
* **Call Functionality**:

  * Phone number field has a clickable icon to trigger a call (`tel:` link).
  * Ability to **call hotels individually** or **call sequentially (one by one)**.
* **UI/UX**:

  * Use a **responsive table layout** with TailwindCSS.
  * Use icons from `lucide-react` (phone, edit, delete, etc.).
  * Each row should have controls for editing/deleting.
  * Add a floating button (`+`) for adding new hotels.

## Tech Stack

* **Frontend**: Next.js (App Router), TypeScript, JSX/TSX
* **Styling**: TailwindCSS
* **State Management**: React hooks + Context API or Zustand



## Pages/Routes

* `/dashboard` → Hotel list table with CRUD controls
* `/dashboard/new` → Add new hotel form
* `/dashboard/[id]/edit` → Edit hotel details
* API endpoints under `/api/hotels`:

  * `GET /api/hotels` → Fetch all hotels
  * `POST /api/hotels` → Add new hotel
  * `PUT /api/hotels/:id` → Update hotel
  * `DELETE /api/hotels/:id` → Delete hotel

## Extra

* **Bulk call option**: Add a button “Call Next Hotel” to automatically go row by row.
* **Filter/search bar** to quickly find hotels by name, number, or address.

---

Do you want me to also **generate the starter Next.js + TypeScript + Tailwind project code** with Prisma setup so you can paste directly into Cursor and run immediately?
