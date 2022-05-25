# Plugin usage and configuration

### Step 1: Adding a HTML container for the plugin<br>
Create a HTML div element with with CSS class "job-ads-container" in the page you want the plugin to be shown 
Example:

```html
<div class="job-ads-container"></div>
```

### Step 2: Adding plugin js/css files<br>
Link plugin javascript and css files to your page
Example: 

```html
<link href="https://cdn.jsdelivr.net/gh/aldinmah/jobAdsPluginTest@main/build/static/css/main.f4427ac7.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/gh/aldinmah/jobAdsPluginTest@main/build/static/js/main.c5ab0e1a.js"></script>
```

### Step 3 (Optional): Custom plugin configuration
Different parts of plugin can be configured by using the configuration variable 'jobAdsPluginSettings' (example below).<br>
The variable must be added before plugin initialization in order to setup custom parameters for the plugin

<pre>
<script>
	const jobAdsPluginSettings = {
		disableDynamicImagesOnJobDetails: true,
		primaryButtonBackgroundColor: '#1a7e30',
		primaryButtonTextColor: '#ffffff',
		secondaryButtonBackgroundColor: '#ffffff',
		secondaryButtonTextColor: '#1a7e30',
		linkElementTextColor:'#1a7e30',
		companyName: 'Company Name example',
		companyDetails: 'Company Description lorem ipsum...',
		companyPrivacyPolicyURL: 'https://www.google.com/search?q=privacy+policy',
		companyTermsAndConditionsURL: 'https://www.google.com/search?q=terms+and+conditions',
		cssPluginWrapperClass: 'myWrapperClass',
		customApplyFormURL: '',
		useInternalApplyForm: true,
	}
</script>
</pre>

<strong>cssWrapperClass</strong> : string<br>
-class name used to define a wrapper CSS class which could be used for custom styling of the plugin

<strong>primaryButtonBackgroundColor</strong> : string<br>
-hexCode used to define a primary button background color

<strong>primaryButtonTextColor</strong> : string<br>
-hexCode used to define a primary button text color

<strong>secondaryButtonBackgroundColor</strong> : string<br>
-hexCode used to define a secondary button background color

<strong>secondaryButtonTextColor</strong> : string<br>
-hexCode used to define a secondary button text color

<strong>linkElementTextColor</strong> : string<br>
-hexCode used to define a text color for anchor tags (links)

<strong>disableDynamicImagesOnJobDetails</strong> : boolean<br>
-boolean used to control the loading of dynamic (random) images on the job details screen / page

<strong>companyName</strong> : string<br>
-company name used to show the company name in the job details screen / page

<strong>companyDetails</strong> : string<br>
-company description used to show the company details in the job details screen / page

<strong>companyPrivacyPolicyURL</strong> : string<br>
-company Privacy Policy URL which is used for job application form

<strong>companyTermsAndConditionsURL</strong> : string<br>
-company Terms & Conditions URL which is used for job application form

<strong>customApplyFormURL</strong> : string<br>
-parameter which can be used to define custom apply for job URL (external form)

<strong>useInternalApplyForm</strong> : boolean<br>
-if this parameter is set to true, a internal plugin form will be used for job application regardless of other settings like 'customApplyFormURL' or the form URL provided by the LeanLink API


# Development 

## Setup local environment for development
Step 1: Pull the github code
Step 2: Navigate to project root folder and run `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
