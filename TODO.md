# TODO: Fix Contrast Issues in Dark and Light Modes

## Steps to Complete

- [x] Update `frontend/src/App.css` to replace hardcoded colors with theme CSS variables (e.g., var(--text-primary), var(--bg-primary)) for elements like headings, text, and backgrounds to ensure proper contrast in both light and dark modes.
- [x] Review and adjust `frontend/src/styles/theme.css` if necessary to improve contrast ratios, such as enhancing --text-primary or --text-secondary values for better readability.
- [x] Test the application by running it locally and switching between light and dark modes to verify that text is readable and contrasts well against backgrounds.
- [x] Fix footer contrast issues by adding footer-specific theme variables and updating footer styles to use them.
- [x] Fixed contrast issue in "Browse Auctions" section by updating --text-muted color in light theme from #64748b to #374151, removing hover effect on btn-primary, and adjusting btn-outline-primary colors for better contrast in light mode.
- [x] Added comprehensive analytics and statistics section to the dashboard displaying: Total Auctions Created, Active Auctions, Auctions Won, Total Value Won, Bids Placed, Ended Auctions, and Value Created.
- [x] Enhanced the landing page (Home.tsx) with a modern hero section featuring gradient background, floating visual elements, platform statistics with custom stat cards, and improved featured auctions section with better responsive design.
- [x] Fixed footer positioning issue on home page by adding proper flex layout structure to ensure footer stays at bottom.
- [x] Fixed contrast issues in Create Auction, Login, and Register pages by updating text-muted color in dark theme to #cbd5e0 for better readability.
- [x] Fixed placeholder text color in form inputs to use --text-secondary for proper contrast in dark mode.
- [x] Added "Meet Developers" link beside the portfolio link in the footer.
- [x] Fixed contrast issue in Auctions page by changing bg-light to bg-secondary for the empty state container.
- [x] Fixed form-text color in dark mode to use #cbd5e0 for better contrast.
- [x] Updated form help text in Create Auction page to be more descriptive and actionable.
- [x] Made form-text elements smaller (0.875rem) for better visual hierarchy.
- [x] Improved Auctions page UI with more engaging copy, better icons, shadows, and visual enhancements.
- [x] Changed placeholder image background in AuctionCard to a gradient for better visual appeal in dark mode.
- [x] Updated empty state background in AuctionsPage to use theme variable for better consistency.
- [x] Fixed TypeScript error in auctionController.ts by adding optional chaining for bid.user property.

## Notes

- Focus on elements like .content-card h1, .auction-card .card-title, .display-4, etc., which currently use fixed dark colors.
- Ensure changes align with the existing theme system in theme.css.
- Application is running on http://localhost:5173/ for testing.
