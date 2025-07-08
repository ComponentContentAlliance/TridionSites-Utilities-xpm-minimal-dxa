param (
	[Parameter(Mandatory = $true)]
    [string]$XpmDeployableZipFile,
	 [Parameter(Mandatory = $true)]
    [string]$WebSitePath,
	 [Parameter(Mandatory = $true)]
	[string]$Experience_space_base_url
)

Write-Host "Script started"
$xpmDeployerPath = $PSScriptRoot + "\temp\"  # Folder where script is located
function Get-FileInfo {
    param (
        [string]$XpmDeployableZipFile,
        [string]$WebSitePath,
		[string]$Experience_space_base_url
    )

   # $fullPath = Join-Path -Path $PSScriptRoot -ChildPath $XpmDeployableZipFile
	$fullPath = $XpmDeployableZipFile
	Write-Host "XpmDeployableZipFile : $XpmDeployableZipFile"
    Write-Host "Checking path: $fullPath"
	Write-Host "destination path: $xpmDeployerPath"
	Write-Host "WebSitePath : $WebSitePath"
	Write-Host "Experience_space_base_url: $Experience_space_base_url"
    if (Test-Path $fullPath) {
		
        Write-Host "File exists at: $fullPath"
		Unblock-File -Path $fullPath
		
		# Unzip to same folder
		Expand-Archive -Path $fullPath -DestinationPath $xpmDeployerPath -Force 
		Write-Host "Unzipped $zipFile to $xpmDeployerPath" 
		
		# Copy dll  to dxawebsite\bin
		#iisreset
		if(Test-Path -Path $WebSitePath)
			{ 
				Copy-Item -Path $xpmDeployerPath"\backend\bin\*" -Destination $WebSitePath\bin
				# New-Item -Path $ContentDeliveryInstallPath -ItemType "directory"
				Write-Host "dll file copied to $WebSitePath\bin" 
			}else {
			Write-Warning "Path not found: $WebSitePath"
			} 
			
		# Copy TridionBar.cshtml  to  dxawebsite\Views\Shared
		iisreset
		if(Test-Path -Path ($WebSitePath +"\Views\Shared"))
			{ 
				Copy-Item -Path $xpmDeployerPath"\backend\Views\Shared\TridionBar.cshtml" -Destination $WebSitePath\Views\Shared
				# New-Item -Path $ContentDeliveryInstallPath -ItemType "directory"
				Write-Host "TridionBar.cshtml file copied to $WebSitePath\Views\Shared"
				
				
				# update _layout file 
			    if(Test-Path -Path ($WebSitePath +"\Views\Shared\_Layout.cshtml"))
				{
					.\Files\Update-Layout.ps1 -LayoutFile "$($WebSitePath + "\Views\Shared\_Layout.cshtml")"
				}
				else
				{
					Write-Warning "Path not found: $($WebSitePath + "\Views\Shared\_Layout.cshtml")"
				} 
			}else {
				Write-Warning "Path not found: $($WebSitePath + "\Views\Shared")"
			} 	
			
			
			# copy content folder dxawebsite\Content
			if(Test-Path -Path ($WebSitePath + "\Content"))
			{  
				 Copy-Item -Path $xpmDeployerPath"\frontend\Content\*" -Destination $WebSitePath\Content -Recurse -Force
				# New-Item -Path $ContentDeliveryInstallPath -ItemType "directory"
				Write-Host "TridionBar.cshtml file copied to $WebSitePath\Views\Shared"
			}else {
				Write-Warning "Path not found: $($WebSitePath + "\Content")"
				 New-Item -Path ($WebSitePath + "\Content") -ItemType "directory"
				 Write-Host "Created new folder ($WebSitePath +"\Content")"
				 Copy-Item -Path $xpmDeployerPath"\frontend\Content\*" -Destination $WebSitePath\Content -Recurse
				Write-Host "Content files copied to $WebSitePath\Content"
			} 
			
			
			# Update web.config file  <add key="experience_space_base_url" value="https://localhost/ui/editor" />
			$webConfigFile = "$WebSitePath\Web.config"
			Write-Host "Updating '$webConfigFile' ..."
			[xml]$config = Get-Content $webConfigFile 
			Set-AppSetting "experience_space_base_url" $experience_space_base_url
			$config.Save("$webConfigFile")
			
			
			
    } else {
        Write-Warning "File not found: $fullPath"
    }
}


function Set-AppSetting([string]$key, [string]$value)
{ 
    $appSettingsNode = GetOrCreate-Node("/configuration/appSettings") 
    $appSettingNode = $appSettingsNode.SelectSingleNode("add[@key='$key']") 
    if (!$appSettingNode) 
    {
        $appSettingNode = $config.CreateElement("add")
        $appSettingNode.SetAttribute("key", "$key")
        $appSettingsNode.AppendChild($appSettingNode) | Out-Null 
    }
    $appSettingNode.SetAttribute("value", $value) 
}
function GetOrCreate-Node([string]$path)
{
    $node = $config.SelectSingleNode($path)
    if(!$node)
    {
        $parts = $path.Split("/", [System.StringSplitOptions]::RemoveEmptyEntries)
        $path = ""        
        $parent = $config
        foreach($part in $parts)
        {
            $path += "/$part"
            $node = $config.SelectSingleNode($path)
            if(!$node)
            {
                $node = $config.CreateElement($part)
                $parent.AppendChild($node) | Out-Null
            }
            $parent = $node
        }        
    }
    return $node
}
# Call the function
Get-FileInfo -XpmDeployableZipFile $XpmDeployableZipFile -WebSitePath $WebSitePath -Experience_space_base_url $experience_space_base_url

Write-Host "Script finished"

#Example
#.\xpm_enable.ps1 -XpmDeployableZipFile "c:\temp\xpm-minimal-deployables.zip" -WebSitePath "C:\Tridion\Websites\DXA_Preview" -Experience_space_base_url "https://localhost/ui/editor"
