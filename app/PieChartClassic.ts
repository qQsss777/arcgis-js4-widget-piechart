import echarts from 'echarts';

export const createChartClassic = (nodeElement: HTMLDivElement, title: string): any => {
    const chart = echarts.init(nodeElement);
    const option = {
        title: {
            text: title,
            x: 'center'
        },

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
        ]
    };
    if (option && typeof option === "object") {
        chart.setOption(option, true);
        chart.resize();
    }
    return Promise.resolve(chart);
}

