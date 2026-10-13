# Poppy website

The English introduction website for the Poppy group.

Live website: https://poppy-small-steps.bronzegrass16.chatgpt.site/

## Run locally

From the repository root, serve the website directory:

```sh
python -m http.server 4173 --directory website
```

Open http://localhost:4173. No dependencies or build step are required.

## Files

- `index.html`: page content, GitHub repository link and WhatsApp join buttons.
- `styles.css`: responsive layout, Poppins / Playfair Display fonts and animations.
- `app.js`: interactive cards, character greeting and scroll effects.
- `assets/`: logo, character expressions, app icon and GitHub icon.
- `fonts/`: supplied local font files and included license.

Join buttons open WhatsApp with a ready-to-send request. They do not automatically add visitors to a group.
