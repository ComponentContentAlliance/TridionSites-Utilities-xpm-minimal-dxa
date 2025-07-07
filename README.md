1)	 Build the Solution Sdl.Web.Mvc.sln project (Version SDL.DXA.NET.2.2.9)
2)	 Build the npm project
		a.	Open command prompt navigate to the “\frontend\tridion-bar\
				Run the command
					    npm install
			            npm run build	
3)	Create a xpm-minimal-deployables.zip package using the following PowerShell command 

	Run the below command: 
	Compress-Archive -Path "C:\SDL_Dev\XPM-Minimal\onesdldemo\xpm-minimal\xpm-minimal-deployables\*" -DestinationPath "C:\SDL_Dev\XPM-Minimal\onesdldemo\xpm-minimal\xpm-minimal-deployables.zip"

4)	Deploy the deployables
	a) Open powershell in administrator mode 
	b) Navigate to folder xpm_minimal_deployer_powershell ("<C:\SDL_Dev\XPM-Minimal\onesdldemo\xpm-minimal>\xpm_minimal_deployer_powershell")
	c) run the command 
		-XpmDeployableZipFile : xpm-minimal-deployables.zip file path (e.g : c:\temp\xpm-minimal-deployables.zip)
		-WebSitePath : Dxa Website path  (e.g. : C:\Tridion\Websites\DXA_Preview)
	
	.\xpm_enable.ps1 -XpmDeployableZipFile "c:\temp\xpm-minimal-deployables.zip" -WebSitePath "C:\Tridion\Websites\DXA_Preview" -Experience_space_base_url "https://localhost/ui/editor"
		
