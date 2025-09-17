#!/bin/bash

# Script to update remaining HTML files with new dropdown system
# Updates hover-based dropdowns to click-based dropdowns

echo "Starting dropdown update process..."

# Array of remaining files to update
declare -a files=(
    "pages/oferta/medycyna-estetyczna.html"
    "pages/oferta/mezoterapia.html"
    "pages/oferta/radiofrekwencja.html"
    "pages/oferta/pielegnacyjne.html"
    "pages/oferta/zabiegi-laserowe.html"
    "pages/oferta/modelujace-sylwetke.html"
    "pages/promocje/index.html"
    "pages/promocje/red-touch.html"
    "pages/promocje/dermapen.html"
    "pages/promocje/morpheus.html"
    "pages/promocje/multifrax.html"
    "pages/promocje/lumecca.html"
    "pages/strefa-wiedzy/blog.html"
    "pages/strefa-wiedzy/domowe-spa.html"
    "pages/strefa-wiedzy/darmowy-ebook.html"
    "pages/strefa-wiedzy/radiofrekwencja-mikroiglowa.html"
    "pages/strefa-wiedzy/laser-frakcyjny.html"
    "pages/strefa-wiedzy/zabiegi-na-cellulit.html"
)

# Update function for each file
update_file() {
    local file="$1"
    echo "Updating: $file"
    
    # The sed commands handle the different path variations
    if [[ "$file" == *"/oferta/"* ]]; then
        # For oferta files (relative paths within oferta folder)
        sed -i 's/<a href="index\.html">Oferta<\/a>/<a href="index.html" class="dropdown-toggle" aria-expanded="false" aria-controls="oferta-menu">Oferta<\/a>/g' "$file"
        sed -i 's/<div class="dropdown-content">/<div class="dropdown-content" id="oferta-menu" role="menu">/g' "$file"
        sed -i 's/<a href="\.\.\/promocje\/index\.html">Promocje<\/a>/<a href="..\/promocje\/index.html" class="dropdown-toggle" aria-expanded="false" aria-controls="promocje-menu">Promocje<\/a>/g' "$file"
        sed -i 's/<a href="#" onclick="return false;">Strefa wiedzy<\/a>/<a href="#" class="dropdown-toggle" aria-expanded="false" aria-controls="strefa-menu">Strefa wiedzy<\/a>/g' "$file"
    else
        # For other files (paths with ../ prefix)
        sed -i 's/<a href="\.\.\/oferta\/index\.html">Oferta<\/a>/<a href="..\/oferta\/index.html" class="dropdown-toggle" aria-expanded="false" aria-controls="oferta-menu">Oferta<\/a>/g' "$file"
        sed -i 's/<div class="dropdown-content">/<div class="dropdown-content" id="oferta-menu" role="menu">/g' "$file"
        sed -i 's/<a href="\.\.\/promocje\/index\.html">Promocje<\/a>/<a href="..\/promocje\/index.html" class="dropdown-toggle" aria-expanded="false" aria-controls="promocje-menu">Promocje<\/a>/g' "$file"
        sed -i 's/<a href="#" onclick="return false;">Strefa wiedzy<\/a>/<a href="#" class="dropdown-toggle" aria-expanded="false" aria-controls="strefa-menu">Strefa wiedzy<\/a>/g' "$file"
    fi
    
    # Add role="menuitem" to all dropdown links
    sed -i 's/<a href="[^"]*">\([^<]*\)<\/a>/<a href="&" role="menuitem">\1<\/a>/g' "$file"
}

# Process each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        update_file "$file"
        echo "✓ Updated: $file"
    else
        echo "✗ File not found: $file"
    fi
done

echo "Dropdown update process completed!"
echo ""
echo "All HTML files have been updated with the new click-based dropdown system:"
echo "- Added class='dropdown-toggle' to dropdown triggers"
echo "- Added aria-expanded='false' for accessibility"
echo "- Added aria-controls with unique IDs"
echo "- Added role='menu' to dropdown containers"
echo "- Added role='menuitem' to all dropdown links"