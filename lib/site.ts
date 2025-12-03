import type { ThemeName } from "./themes";

// TODO: Update SITE_URL with your actual domain (e.g., "https://johndoe.dev")
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
// TODO: Update SITE_TITLE with your name (e.g., "John Doe")
export const SITE_TITLE = "[Your Name]";
// TODO: Update SITE_DESCRIPTION with your tagline (e.g., "Full-stack developer and open source enthusiast")
export const SITE_DESCRIPTION = "[Your tagline or short bio]";

/**
 * Theme Configuration
 *
 * Change ACTIVE_THEME to any of these 55 available themes:
 *
 * DARK THEMES (44):
 * - 'vitesse-dark'      - VS Code Vitesse theme
 * - 'github-dark'       - GitHub's dark theme
 * - 'dracula'           - Popular Dracula theme
 * - 'monokai'           - Classic Monokai
 * - 'nord'              - Nord color palette
 * - 'one-dark-pro'      - Atom One Dark Pro
 * - 'tokyo-night'       - Tokyo Night theme
 * - 'catppuccin-mocha'  - Catppuccin Mocha variant
 * - 'solarized-dark'    - Solarized dark
 * - 'material-theme'    - Material Design theme
 * - 'night-owl'         - Night Owl theme
 * - 'palenight'         - Palenight theme
 * - 'ayu-dark'          - Ayu dark theme
 * - 'ayu-mirage'        - Ayu mirage variant
 * - 'gruvbox-dark'      - Gruvbox dark
 * - 'cobalt2'           - Cobalt2 theme
 * - 'synthwave-84'      - Synthwave 84
 * - 'shades-of-purple'  - Shades of Purple
 * - 'moonlight'         - Moonlight theme
 * - 'andromeda'         - Andromeda theme
 * - 'panda'             - Panda theme
 * - 'laserwave'         - Laserwave theme
 * - 'horizon'           - Horizon theme
 * - 'winter-is-coming-dark' - Winter is Coming Dark
 * - 'winter-is-coming-blue' - Winter is Coming Blue
 * - 'oceanic-next'      - Oceanic Next
 * - 'monokai-pro'       - Monokai Pro
 * - 'min-dark'          - Minimalist dark
 * - 'eva-dark'          - Eva Dark
 * - 'halcyon'           - Halcyon theme
 * - 'radical'           - Radical theme
 * - 'rose-pine'         - Rosé Pine
 * - 'rose-pine-moon'    - Rosé Pine Moon
 * - 'kanagawa'          - Kanagawa theme
 * - 'everforest-dark'   - Everforest Dark
 * - 'bearded-arc'       - Bearded Arc
 * - 'bearded-theme'     - Bearded Theme
 * - 'material-ocean'    - Material Ocean
 * - 'darcula'           - JetBrains Darcula
 * - 'rebecca'           - Rebecca theme
 * - 'spacegray'         - Spacegray theme
 * - 'palefire'          - Palefire theme
 * - 'noctis'            - Noctis theme
 * - 'deep-ocean'        - Deep Ocean
 *
 * LIGHT THEMES (11):
 * - 'atom-one-light'    - Atom One Light
 * - 'light-plus'        - VS Code Light+
 * - 'quiet-light'       - Quiet Light
 * - 'solarized-light'   - Solarized light
 * - 'ayu-light'         - Ayu light theme
 * - 'github-light'      - GitHub's light theme
 * - 'min-light'         - Minimalist light
 * - 'eva-light'         - Eva Light
 * - 'rose-pine-dawn'    - Rosé Pine Dawn
 * - 'everforest-light'  - Everforest Light
 * - 'material-lighter'  - Material Lighter
 */
export const ACTIVE_THEME: ThemeName = "noctis";
