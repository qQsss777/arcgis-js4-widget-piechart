import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;

export const createChartClassic = (nodeElement: HTMLDivElement, title: string): Promise<ECharts> => {
    const chart = echarts.init(nodeElement);
    const option: EChartOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: [],

                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        title: {
            text: title,
            // @ts-ignore
            x: 'center'
        },
    };
    if (option && typeof option === "object") {
        chart.setOption(option, true);
        chart.resize();
    }
    return Promise.resolve(chart);
}

