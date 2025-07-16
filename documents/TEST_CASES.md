# FedEx Automation Test Cases

---

## Locations Test Cases

| TC ID   | Priority | Type | Preconditions                | Steps                                                                 | Expected Results                                                                                                   | Postconditions         | Automation Status      |
|---------|----------|------|------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|-----------------------|-----------------------|
| TC-001  | P0       | UI   | On FedEx homepage            | 1. Navigate to Locations page<br>2. Search for “1077 Cranbrook Rd Union”<br>3. Observe map results           | URL contains `/local.fedex.com/en-us`<br>≥ 1 map pin displayed<br>Sidebar cards show name, address, phone, etc.    | None                  | Automated             |
| TC-008  | P2       | UI   | Locations page open          | 1. Enter `00000` in search box<br>2. Submit                           | Message: “Sorry, there are no locations near “00000”….”<br>“browse our directory.” link points to `../en`          | None                  | Automated             |
| TC-010  | P1       | UI   | First visit to any FedEx page| 1. Load homepage<br>2. Click Reject All Cookies                       | Banner disappears<br>No tracking cookies set (verify via DevTools)                                                 | Clear cookies         | Not Automated         |
| TC-011  | P2       | UI   | Geo-locator modal shown      | 1. Choose Colombia → English                                          | URL changes to `/en-co/home.html`<br>Page title matches English Colombia locale                                    | Reset to default locale| Not Automated             |

---

## Rate & Ship Test Cases

| TC ID   | Priority | Type   | Preconditions                | Steps                                                                 | Expected Results                                                                                                   | Postconditions         | Automation Status      |
|---------|----------|--------|------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|-----------------------|-----------------------|
| TC-003  | P0       | UI/API | On Rate & Ship page          | 1. From: “NY” (autocomplete)<br>2. To: “Dallas”<br>3. Packaging: FedEx Large Box<br>4. Weight: 5 lb<br>5. Click Show Rates | Error panel with heading “We are having technical difficulties”<br>Contact support link<br>API returns 400         | None                  | Automated             |
| TC-004  | P0       | UI/API | On Rate & Ship page          | 1. From: “New York, NY”<br>2. To: “Los Angeles, CA”<br>3. Packaging: FedEx Box (5 lb)<br>4. Click Get Rates | API returns 200 with valid quotes<br>Rates table displays ≥ 1 option with cost and delivery dates                   | None                  | Not Automated             |
| TC-012  | P1       | UI     | Rate form filled             | 1. Click Get Rates                                                    | `<fdx-loading-indicator-spinner>` appears then detaches before results show                                        | None                  | Not Automated             |
| TC-013  | P1       | UI     | Rate & Ship page open        | 1. Type `350 5th Ave` into From<br>2. Wait for suggestion list<br>3. Select first suggestion | Input value becomes “Empire State Building, New York, NY” (approx.)                                                | Clear field           | Not Automated             |

---

## Additional Flows & Edge Cases

| TC ID   | Priority | Type   | Preconditions                | Steps                                                                 | Expected Results                                                                                                   | Postconditions         | Automation Status      |
|---------|----------|--------|------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|-----------------------|-----------------------|
| TC-005  | P1       | UI/API | Logged in                    | 1. Navigate to Shipment History<br>2. Mock `/api/shipments`           | Table lists past shipments<br>API returns 200                                                                      | Log out               | Not Automated             |
| TC-006  | P0       | UI     | Valid tracking number exists | 1. Enter `123456789012` into Track<br>2. Click Track                  | Status shows “In Transit” or “Delivered”<br>Map with route points                                                 | None                  | Not Automated             |
| TC-007  | P1       | Mobile | -                            | 1. Emulate Galaxy S9+ / iPhone 12<br>2. Open FedEx app flow<br>3. Get Rates | Rates match web results within ±$1                                                                                | None                  | Not Automated             |
| TC-009  | P2       | Mobile | -                            | 1. Disable network<br>2. Launch FedEx mobile app<br>3. Attempt Track or Get Rates | “No connection” warning appears                                                                                   | None                  | Not Automated             |

---

## Next Steps

- Performance Tests: measure page load & API latency
- Security Checks: validate CSP, certificate errors
- Accessibility Audits: ensure all ARIA roles & contrast
- Expand Mobile Coverage: more device profiles & screen sizes
- Automate Pending Cases: convert P1/P2 manual tests to