# Define blocks to inject
$headCss = '<link rel="stylesheet" href="/content/TridionBar/css/tridion-bar.css">'
$partialHtml = '@Html.Partial("TridionBar", Html.GetPageTcmUri())'
$scripts = @'
<script type="text/javascript">		
	function getExpBaseUrl(){
		return '@System.Configuration.ConfigurationManager.AppSettings["experience_space_base_url"]'
	}
</script>
<script type="module" src="/content/TridionBar/js/tridion-bar.js"></script>
'@