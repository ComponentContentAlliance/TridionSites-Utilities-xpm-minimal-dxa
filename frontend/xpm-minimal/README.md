### XPM Minimal

### Steps to deploy the xpm-minimal with DXA application

- Navigate to content directory (C:\tridion\Websites\DXA_Preview\content\xpm-minimal) of the website

- Create content and xpm-minimal directories if not available

- Deploy the JS (xpm-minimal.js) and CSS (xpm-minimal.css) file to the content\xpm-minimal\ directory

- Navigate to layouts directory (C:\tridion\Websites\DXA_Preview\Views\Shared)

- Edit the layout file of the website and insert the below JS file path, JS script and CSS file path

- CSS file path in the head section of the page

```html
<link rel="stylesheet" href="/content/xpm-minimal/css/xpm-minimal.css" />
```

- JS file path and JS Script before the close of the body tag

  ```js
  	<script type="text/javascript">
  		function getExpBaseUrl(){
  			return '@System.Configuration.ConfigurationManager.AppSettings["experience_space_base_url"]'
  		}
  	</script>
  	<script type="text/javascript" src="/content/xpm-minimal/js/xpm-minimal.js"></script>

  ```

- Navigate to web.config file available in website directory (C:\tridion\Websites\DXA_Preview)

- Enter the experience space base URL inside the appSettings as shown below

  ```xml

  	<appSettings>
  		<add key="experience_space_base_url" value="https://sites.tridiondemo.com/ui/editor" />
  	</appSettings>

  ```

- Reload the webpage

- On hover of the page, components, the components region shows highlighted border and icon to navigate to experience space.

- Click on the icon to navigate to experience to edit the Page/Component.

\*Note: Please make sure the data-component-Id and data-page-Id attributes related dll's and configuration changes are deployed
