### Electron insert factor modelling

#### Disclaimer and Copyright

Electron insert factor empirical modelling
Copyright (C) 2015-2016  Simon Biggs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but **without any warranty**; without even the implied warranty of
**merchantability** or **fitness for a particular purpose**.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.

#### Description
This online web app is for the modelling of the electron insert factor. **It is not intended to be the sole basis upon which monitor units are adjusted.**
This tool is helpful for two cases, to check for consistency amongst measurements allowing remeasurement when required, and to help a qualified medical physicst make an informed desicion on what the electron insert factor is.
If this model disagrees with the insert factor predicted by your planning system in a significant manner it is recommended you take a measurement of the shape in question.


Any use of this webapp recognises that this program is automatically updated when I make changes. All changes are recorded within Github's version control. The logs of the changes to the web app can be [accessed from here](https://github.com/SimonBiggs/electroninserts-webapp/commits/master), changes to the modelling and parameterisation server are [documented here](https://github.com/SimonBiggs/electronfactor-server/commits/master). 
By using this software you assume the responsibility and risk of any changes this web app undergoes. On the <a routerLink="/details" routerLinkActive="active"> further details page</a> it is outlined how you may download a static version of this webapp if you wish to be in control of when the app updates.

For more information on this model and an overview for which scenarios it has been validated see the publication detailed below. 
Of note is it is suspected that when the long axis of an equivalent ellipse begins to contribute to the loss of lateral scatter the assumptions underpinning the shape parameterisation may no longer hold. This might be able to be overcome by just using circles when the shape becomes that small. The demo data available within the <a routerLink="/create-model" routerLinkActive="active">create model component</a> was collected on an Elekta Agility at an energy of 12 MeV on a 10x10 cm applicator. The smallest width tested was 3.2 cm at isocentre.
For the remaining energies of 6, 9, 15, and 18 MeV the smallest width tested was 5 cm. 
If you are able to further validate this model please contact me so that I may provide more information on where this model has been shown to work and where it does not. 


If you find bugs, have any suggestions, or simply wish to share your results from using this model please submit either an issue or a pull request to the [Github version control system](https://github.com/SimonBiggs/electroninserts-webapp/issues) or [send me an email](mailto:mail@simonbiggs.net).


#### Publication

The paper detailing the algorithim and the samples for which it has been validated:

>> S. Biggs, M. Sobolewski, R. Murry, J. Kenny, Spline modelling electron insert factors using routine measurements. Physica Medica (2015), [doi:10.1016/j.ejmp.2015.11.002](http://dx.doi.org/10.1016/j.ejmp.2015.11.002).

#### Web app structure
This web app is divided into six logical components all of which can be accessed from the navigation menu. These are outlined below:

 * <a routerLink="/specifications" routerLinkActive="active">Machine specifications component</a>
  * Used to define your centre specific machine specifications.
 * <a routerLink="/dicom" routerLinkActive="active">Dicom component</a>
  * Used to extract patient insert shapes from Dicom files.
 * <a routerLink="/parameterise" routerLinkActive="active">Parameterisation component</a>
  * Used to parameterise insert shapes into equivalent ellipse widths and lengths for use within the empirical model.
 * <a routerLink="/create-model" routerLinkActive="active">Create model component</a>
  * Use this to create the model once there are at least 8 measured factors for a given machine, applicator, energy, ssd combination.
 * <a routerLink="/use-model" routerLinkActive="active">Use model component</a>
  * Use this to quickly calculate small or large numbers of predicted factors.
  * Measured factors can be given here to batch evaluate the models ability to predict factors for validation purposes.
 * <a routerLink="/database" routerLinkActive="active">Database management component</a>
  * Use this to transfer and backup the data within the local browser data.
  
#### Demo Instructions
If you wish to simply demo this app these are the following steps you can take:

 * Within the <a routerLink="/dicom" routerLinkActive="active">dicom component</a> download the demo dicom file, load it into the web app and see the insert shapes be pulled from the dicom file without any network traffic.
 * Within the <a routerLink="/parameterise" routerLinkActive="active">parameterise component</a> press the "Load Demo Data" button and then press the "Parameteterise Insert" button to see the parameterisation algorithim in action.
 * Within the <a routerLink="/create-model" routerLinkActive="active">create model component</a> press the "Load Demo Data" button and then press the "Calculate Spline Model" to see the spline model being created. You can then either hover over the model, or tap on the model to view the relevant values.


#### Implementation instructions
To implement this web app in your centre you need to do the following:

 * Specify the machine models and the corresponding applicators, energies, and ssds within the <a routerLink="/specifications" routerLinkActive="active">machine specification component.</a>
 * Collate / measure your electron insert factor measurements. These factors are to measured in accordance to TG 25. Measured insert factors from regular or irregular shapes are able to be used.  
 * Parameterising new insert shapes
  * If the insert shapes are ellipses, you may directly input the ellipse widths and lengths as projected to the isocentre within the <a routerLink="/create-model" routerLinkActive="active">create model component.</a>
  * If you know the x and y coordinates of your insert then determine the equivalent ellipse widths and lengths by inputting x and y coordinates as defined at isocentre within the <a routerLink="/parameterise" routerLinkActive="active">parameterisation component.</a>          
  * If the insert shape is defined within your planning system, export the patient plan to dicom and then read the insert coordinates from the dicom file using the <a routerLink="/dicom" routerLinkActive="active">dicom component.</a>          
  * If you have a batch of generic insert shapes you can directly input the widths and areas of the shapes into the <a routerLink="/create-model" routerLinkActive="active">create model component</a>. The width is defined as the diameter of the largest fully encompassed circle of your insert shapes at isocentre. The area is defined as the insert shape area projected to isocentre. Rectangles can be input in this way by simply inputting the rectangle's width projected to isocentre as width, and its area projected to isocentre as area.
 * Once you have the corresponding equivalent ellipse widths and lengths for your measured factors these may be appended to the relevant machine configuration within the <a routerLink="/create-model" routerLinkActive="active">create model component</a>
 * Whenever a machine configuration gets at least 8 data points you may press the "Run Spline Model" on the <a routerLink="/create-model" routerLinkActive="active">create model component</a> which will allow the prediction of insert factors for other widths and lengths.
 * The <a routerLink="/use-model" routerLinkActive="active">use model component</a> is specifically designed to aid you in looking up large batches of factors. This can be helpful for validating your model.
 * Once you are content with your model use the <a routerLink="/database" routerLinkActive="active">database management component</a> to export and backup your data. This data can be placed on a shared drive for access by users who need to use the model.
 * If you need to have a consistent reliable interface you may wish to consider downloading a copy of this web app and serving it within your centre's intranet. This can be achieved by following the relevant steps given within the <a routerLink="/details" fragment="locally" routerLinkActive="active">further details component</a>.