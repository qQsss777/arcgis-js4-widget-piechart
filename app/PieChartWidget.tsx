/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { tsx, renderable } from "esri/widgets/support/widget";
import SceneView from "esri/views/SceneView";
import MapView from "esri/views/MapView";
import PieChartWidgetViewModel from "./PieChartWidgetViewModel";

// esri.views
import View = require("esri/views/View");
import FeatureLayer = require('esri/layers/FeatureLayer');


//--------------------------------------------------------------------
//
//  Interfaces
//
//--------------------------------------------------------------------

interface IPieChartWidgetProperties extends __esri.WidgetProperties {
    view: MapView | SceneView,
    typeOfPie: string,
    typeOfStatistics: string,
    featureLayer: FeatureLayer,
    fieldsStat: Array<string>,
    title: string,
}


const CSS = {
    base: "esri-chartwidget esri-widget",
    container: "esri-widget--chart",
    actionChart: "esri-chartwidget-action esri-widget--button",
    chartHiddenIcon: "esri-icon-chart",
    chartVisibleIcon: "esri-icon-close"
};

@subclass("esri.widgets.chartwidget")
class PieChartWidget extends declared(Widget) {

    constructor(properties?: IPieChartWidgetProperties) {
        super();
    }


    //--------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------
    //----------------------------------
    //  view
    //----------------------------------

    @aliasOf("viewModel.view")
    view: View;

    @aliasOf("viewModel.title")
    title: string;

    @aliasOf("viewModel.typeOfPie")
    typeOfPie: string;

    @aliasOf("viewModel.typeOfStatistics")
    typeOfStatistics: string;

    @aliasOf("viewModel.featureLayer")
    featureLayer: FeatureLayer

    @aliasOf("viewModel.fieldsStat")
    fieldsStat: Array<string>

    @aliasOf("viewModel.isDisplay")
    @renderable()
    isDisplay: boolean

    @property({
        type: PieChartWidgetViewModel
    })
    viewModel: PieChartWidgetViewModel = new PieChartWidgetViewModel();


    //-------------------------------------------------------------------
    //
    //  Public methods
    //
    //-------------------------------------------------------------------

    render() {

        const iconDisplay = this.isDisplay ? CSS.chartVisibleIcon : CSS.chartHiddenIcon
        const classBase = this.classes(
            CSS.base
        );

        const classChartButton = this.classes(
            CSS.actionChart,
            iconDisplay
        );

        const classChart = this.classes(
            CSS.container
        );


        return (
            <div class={classBase} >
                <div class="column">
                    <div class="row esri-widget--row--button" style="height:32px;">
                        <button onclick={this.onClick} class={classChartButton} />
                    </div>
                    <div class="row esri-widget--row--chart">
                        <div id="chart" class={classChart} style="width:400px; height:300px; display:none;" ></div>
                    </div>
                </div>
            </div>
        )
    }

    //-------------------------------------------------------------------
    //
    //  Private methods
    //
    //-------------------------------------------------------------------
    onClick = () => {
        return this.viewModel.onCreateChartButton("chart")
    }
}

export = PieChartWidget;