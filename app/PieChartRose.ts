import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;

export const createChartRose = (nodeElement: HTMLDivElement, title: string): Promise<ECharts> => {
    const chart: ECharts = echarts.init(nodeElement)
    const option: EChartOption = {
        title: {
            text: title,
            // @ts-ignore
            x: 'center'
        },

        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        series: [
            {
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                roseType: 'radius',
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        chart.setOption(option, true);
        chart.resize();
    }
    return Promise.resolve(chart)
}