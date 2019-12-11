# Widget Pie Chart for ArcGIS API for JavaScript

This is a widget for ArcGIS API for Javascript 4. It allows you go back to your previous extent during your map navigation. It works **only for 2D map** for the moment.

This widget is based on the echarts library : https://www.echartsjs.com/en/index.html

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/qQsss777/arcgis-js4-widget-savesession.git`

### Setup
You must have a ArcGIS JS versio >= 4.11.

It requires the installation of:
- TypeScript : https://www.typescriptlang.org/index.html#download-links
- gulp-cli : https://gulpjs.com/

You need the ArcGIS API for JavaScript Typings too : https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html#install-the-arcgis-api-for-javascript-typings

>  install npm packages @types/arcgis-js-api

You need to install to install echartsjs too. You can follow this link : https://www.echartsjs.com/en/tutorial.html

```shell
$ npm install -g typescript
$ npm install -g gulp-cli
$ npm install
```

To test it, you can follow this guide to use it : https://developers.arcgis.com/javascript/latest/sample-code/widgets-custom-recenter/index.html#4 (paragraph Reference and use the custom widget )


Then you can build the widget with running the command :

```shell
$ gulp
```
If you don't use ArcGIS Webpack Plugin don't forget to import first the widget & echarts in your html file.

```javascript
<script type="text/javascript">
    var dojoConfig = {
        paths: {
            echarts: location.pathname.replace(/\/[^/]+$/, "") + "./echarts",
            dist: location.pathname.replace(/\/[^/]+$/, "") + "/dist"
        }
    };
</script>
<script src="https://js.arcgis.com/4.13/"></script>
```

Then you can use it in your js files. Don't forget the css !

---

## Configuration

This widget have many properties:
- view: represents map view
- title: title of the chart (string)
- featureLayer: represents the feature layer object. **Be careful, statistics capability must be activated on the service.**
- fieldsStat: lists of the fields needed to calculate statistics (Array of string)
- typeOfPie: type of pie. There are 3 types : "classic", "rose" and "doughnut"
- typeOfStatistics: type of statistics. You can retrieve the list with this link https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-StatisticDefinition.html

```javascript

const map = new Map({
    basemap: "satellite"
});


var view = new MapView({
    map: map,
    container: "app",
    zoom: 11,
    center: [-4.5696403, 48.4083868]
});

const myWidget = new PieChartWidget({
    view: view,
    title: 'Répartion des activités nautiques \n rade de Brest le 19/06/2010',
    featureLayer: featureLayer,
    fieldsStat: ["Autre", "Aviron", "Kayak", "Pneumatique", "Jet_ski", "Passagers", "PAV", "Vedette", "Voilier", "Voilelegere"],
    typeOfPie: 'classic',
    typeOfStatistics: 'sum'
  });
view.ui.add(myWidget, "top-right")

```

ArcGIS Widget is bases on MVC pattern (https://developers.arcgis.com/javascript/latest/sample-code/widgets-custom-widget/index.html) so you can use only the viewmodel if you want. The properties are the same, just one more to display or not :
- isDisplayed (boolean)

```javascript

const map = new Map({
    basemap: "satellite"
});


var view = new MapView({
    map: map,
    container: "app",
    zoom: 11,
    center: [-4.5696403, 48.4083868]
});

  const classic = new PieChartWidgetViewModel({
    view,
    title: 'Répartion des activités nautiques \n rade de Brest le 19/06/2010',
    featureLayer,
    fieldsStat: ["Autre", "Aviron", "Kayak", "Pneumatique", "Jet_ski", "Passagers", "PAV", "Vedette", "Voilier", "Voilelegere"],
    typeOfPie: 'classic',
    typeOfStatistics: 'sum',
    isDisplay: false
  })

  classic.onCreateChartButton("classic-chart")

  const rose = new PieChartWidgetViewModel({
    view,
    title: 'Répartion des activités nautiques \n rade de Brest le 19/06/2010',
    featureLayer,
    fieldsStat: ["Autre", "Aviron", "Kayak", "Pneumatique", "Jet_ski", "Passagers", "PAV", "Vedette", "Voilier", "Voilelegere"],
    typeOfPie: 'rose',
    typeOfStatistics: 'sum',
    isDisplay: false
  })

  rose.onCreateChartButton("rose-chart")

  const doughnut = new PieChartWidgetViewModel({
    view,
    title: 'Répartion des activités nautiques \n rade de Brest le 19/06/2010',
    featureLayer,
    fieldsStat: ["Autre", "Aviron", "Kayak", "Pneumatique", "Jet_ski", "Passagers", "PAV", "Vedette", "Voilier", "Voilelegere"],
    typeOfPie: 'doughnut',
    typeOfStatistics: 'sum',
    isDisplay: false
  })

  doughnut.onCreateChartButton("doughnut-chart")

```
---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**

