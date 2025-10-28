# TODO: Fix Contrast Issues in Dark and Light Modes

## Steps to Complete

- [x] Update `frontend/src/App.css` to replace hardcoded colors with theme CSS variables (e.g., var(--text-primary), var(--bg-primary)) for elements like headings, text, and backgrounds to ensure proper contrast in both light and dark modes.
- [x] Review and adjust `frontend/src/styles/theme.css` if necessary to improve contrast ratios, such as enhancing --text-primary or --text-secondary values for better readability.
- [x] Test the application by running it locally and switching between light and dark modes to verify that text is readable and contrasts well against backgrounds.
- [x] Fix footer contrast issues by adding footer-specific theme variables and updating footer styles to use them.
- [x] Fixed contrast issue in "Browse Auctions" section by updating --text-muted color in light theme from #64748b to #374151, removing hover effect on btn-primary, and adjusting btn-outline-primary colors for better contrast in light mode.

## Notes

- Focus on elements like .content-card h1, .auction-card .card-title, .display-4, etc., which currently use fixed dark colors.
- Ensure changes align with the existing theme system in theme.css.
- Application is running on http://localhost:5173/ for testing.
