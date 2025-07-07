Deploy the deployables
	a) Open powershell in administrator mode 
	b) Navigate to folder xpm_minimal_deployer_powershell ("<C:\SDL_Dev\XPM-Minimal\onesdldemo\xpm-minimal>\xpm_minimal_deployer_powershell")
	c) run the command 
		-XpmDeployableZipFile : xpm-minimal-deployables.zip file path (e.g : c:\temp\xpm-minimal-deployables.zip)
		-WebSitePath : Dxa Website path  (e.g. : C:\Tridion\Websites\DXA_Preview)
	
	.\xpm_enable.ps1 -XpmDeployableZipFile "c:\temp\xpm-minimal-deployables.zip" -WebSitePath "C:\Tridion\Websites\DXA_Preview" -Experience_space_base_url "https://localhost/ui/editor"