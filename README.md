# Plugin configuration
Configuration variable 'jobAdsPluginSettings' (example below) should be added before initialization of the plugin

<pre>
<script>
	const jobAdsPluginSettings = {
		disableDynamicImagesOnJobDetails: true,
		primaryButtonBackgroundColor: '#1976d2',
		primaryButtonTextColor: '#ffffff',
		secondaryButtonBackgroundColor: '#ffffff',
		secondaryButtonTextColor: '#1976d2',
		linkElementTextColor:'#1a7e30',
		companyName: 'Lorem Ipsum',
		companyDetails: 'Lorem ipsum',
		companyPrivacyPolicyURL: 'https://www.google.com/search?q=privacy+policy',
		companyTermsAndConditionsURL: 'https://www.google.com/search?q=terms+and+conditions',
		cssPluginWrapperClass: 'myWrapperClass',
		customApplyFormURL: '',
		useInternalApplyForm: true,
	}
</script>
</pre>

<strong>cssWrapperClass</strong> : string<br>
-class name used to define a wrapper CSS class which could be used for custom styling of the widget

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


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
