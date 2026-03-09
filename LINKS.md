# Legaci — Placeholder Links

This file lists every link in the codebase that needs to be updated manually before launch.
It is not rendered anywhere — for reference only.

---

## Navigation (`src/components/Nav.tsx`)

| Label       | Current Value          | Variable / Line | Notes                        |
|-------------|------------------------|-----------------|------------------------------|
| GitHub      | `https://github.com`   | `navLinks[2].href` (line 11) | Replace with your actual GitHub repo URL |

---

## Trust Section (`src/components/Trust.tsx`)

| Badge Label         | Current Value        | Line | Notes                                      |
|---------------------|----------------------|------|--------------------------------------------|
| View on GitHub →    | `https://github.com` | 11   | Link to the open-source encryption repo   |
| Read the Code →     | `https://github.com` | 17   | Can point to same repo or a specific file |
| Our Data Promise →  | `#`                  | 23   | Create a /data-promise page or blog post  |

---

## Footer (`src/components/WaitlistCTA.tsx`)

| Label           | Current Value        | Line | Notes                                      |
|-----------------|----------------------|------|--------------------------------------------|
| Privacy Policy  | `#`                  | 126  | Create /privacy-policy page and link here |
| Terms of Service| `#`                  | 128  | Create /terms page and link here          |
| GitHub          | `https://github.com` | 130  | Replace with your actual GitHub repo URL  |

---

## Notes
- The waitlist form (`src/components/WaitlistCTA.tsx`) currently only does a client-side state change on submit. You will need to wire it up to an email provider (Loops.so, Mailchimp, etc.) before launch.
- `mylegaci.in` in the footer is display text only — no link needed unless you want it to be clickable.
