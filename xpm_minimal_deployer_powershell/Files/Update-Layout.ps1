param (
    [string]$LayoutFile = "_Layout.cshtml"
)
. .\Files\blocks_to_inject.ps1
# Ensure file exists
if (!(Test-Path $LayoutFile)) {
    Write-Error "File not found: $LayoutFile"
    exit 1
}

# Read content
$content = Get-Content $LayoutFile -Raw



# Add CSS before </head>
if ($content -notmatch [regex]::Escape($headCss)) {
    $content = $content -replace '</head>', "$headCss`n</head>"
}

# Add partial HTML if not present
#if ($content -notmatch [regex]::Escape($partialHtml)) {
    # Insert after <body> or any div if body tag not used
#    $content = $content -replace '<body[^>]*>', "`$&`n$partialHtml"
#}


# Only insert if not already present
if ($content -notmatch [regex]::Escape($partialHtml)) {
    # Replace @RenderBody() with itself + partial HTML
    $content = $content -replace '(@RenderBody\(\))', "`$1`n	$partialHtml"
}

# Add script before </body>
if ($content -notmatch [regex]::Escape($scripts)) {
    $content = $content -replace '</body>', "$scripts`n</body>"
}

# Backup original
Copy-Item $LayoutFile "$LayoutFile.bak" -Force

# Write updated file
Set-Content -Path $LayoutFile -Value $content -Force -Encoding UTF8

Write-Host "Layout updated successfully: $LayoutFile"


#Example
#.\Update-Layout.ps1 -LayoutFile "C:\Tridion\Websites\DXA_Preview\Views\Shared\_Layout.cshtml"