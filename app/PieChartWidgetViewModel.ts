/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
import Accessor from "esri/core/Accessor";
// esri
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");
import FeatureLayer = require('esri/layers/FeatureLayer');
import Query = require('esri/tasks/support/Query');
import FeatureLayerView = require('esri/views/layers/FeatureLayerView');
import FeatureSet = require('esri/tasks/support/FeatureSet');
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;


interface IPieChartWidgetViewModelProperties {
    view: MapView | SceneView | null,
    typeOfStatistics: string,
    typeOfPie: string,
    featureLayer: FeatureLayer,
    fieldsStat: Array<string>,
    title: string,
    isDisplayed: boolean
}

interface IChartData {
    name: string,
    value: number
};

@subclass("esri.widgets.SaveSessionViewModel")
class PieChartWidgetViewModel extends declared(Accessor) {

    constructor(properties?: IPieChartWidgetViewModelProperties) {
        super();
    }


    //--------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------

    @property()
    view: MapView | SceneView;

    @property()
    featureLayer: FeatureLayer;

    @property()
    title: string;

    @property()
    typeOfPie: string;

    @property()
    typeOfStatistics: string;

    @property()
    fieldsStat: Array<string>;

    @property()
    isDisplayed: boolean = false;

    @property()
    nodeElement: HTMLDivElement;

    @property()
    chartElement: ECharts;

    @property()
    distinc: string;

    onCreateChartButton = (containerNode: string): void => {
        //if not in diplaying, display container and chart
        this.isDisplayed ? this._stopGraphic() : this._createPie(containerNode);
    }

    private _stopGraphic = () => {
        //if click button and in displaying, close container and chart
        this.nodeElement.style.display = "none";
        this.isDisplayed = false;
    }

    private _createPie = (containerNode: string): void => {
        //get chart container and display it

        // @ts-ignore
        !this.nodeElement ? this.nodeElement = document.getElementById(containerNode) : null;
        this.nodeElement.style.display = "block";

        //if no chart initialized, create chart
        !this.chartElement ? this._firstClick(this.nodeElement) : null;

        //change the property state
        this.isDisplayed = true;
    }

    private _firstClick = async (nodeElement: HTMLDivElement) => {
        //check wich type of chart the user wants
        switch (this.typeOfPie) {
            case "classic":
                const { createChartClassic } = await import("./PieChartClassic");
                this.chartElement = await createChartClassic(nodeElement, this.title);
                break;
            case "rose":
                const { createChartRose } = await import("./PieChartRose");
                this.chartElement = await createChartRose(nodeElement, this.title);
                break;
            case "doughnut":
                const { createChartDoughnut } = await import("./PieChartDoughnut");
                this.chartElement = await createChartDoughnut(nodeElement, this.title);
                break;
            default:
                console.log('Error, type wanted out of the box');
        }
        //creating layerviewobject
        const layerView = await this.view.whenLayerView(this.featureLayer);
        //creating statisting definition
        const listStatDef = this.fieldsStat.map(field => {
            return {
                onStatisticField: field,
                outStatisticFieldName: field,
                statisticType: this.typeOfStatistics
            };
        });
        //update the chart
        this._updateChart(layerView, this.chartElement, listStatDef);

        //add click event on chart and flash features
        this.chartElement.on('click', (params: any) => this._createDefinitionExpression(layerView, params));

        //handle the updating of the layerview for updating chart
        layerView.watch("updating", value => {
            !value ? this._updateChart(layerView, this.chartElement, listStatDef) : null
        });
    }

    private _updateChart = async (layerView: FeatureLayerView, chart: any, listStatsDef: Array<object>) => {
        //at the end of the change of the layerview, execute query
        const newData = await this._createStatQuery(layerView, listStatsDef);
        const newValueArray: Array<IChartData> = [];

        //store and format result in array
        for (let [key, value] of Object.entries(newData)) {
            //key = key.replace(/[&\/\\#,+_()$~%.'":*?<>{}]/g, ' ');
            value > 0 ? newValueArray.push({ value: value as number, name: key as string }) : null
        };
        const option: EChartOption = chart.getOption();

        // @ts-ignore
        option.series[0].data = newValueArray;
        chart.setOption(option, true);
        chart.resize();
    }

    private _createStatQuery = async (layerView: FeatureLayerView, listStats: Array<object>): Promise<any> => {
        // query statistics for features only in view extent
        const query: Query = layerView.layer.createQuery();
        query.geometry = this.view.extent;
        // @ts-ignore
        query.outStatistics = listStats;

        //execute query
        const response: FeatureSet = await layerView.queryFeatures(query);
        const statsResult = response.features[0].attributes;

        //return attributes result
        return statsResult;
    }

    //flash features
    private _createDefinitionExpression = (layerView: FeatureLayerView, params: any) => {
        //i don't know how to flash features so i use setTimeout
        const includedEffect = "sepia(70%) saturate(1500%) hue-rotate(320deg)";
        layerView.effect = {
            // @ts-ignore
            filter: {
                where: `${params.name} is not null and ${params.name} > 0`
            },
            includedEffect
        },
            setTimeout(() => {
                // @ts-ignore
                layerView.effect = {}
            }, 500);

    }
}

export = PieChartWidgetViewModel;