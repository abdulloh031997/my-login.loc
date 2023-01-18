import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, withHighcharts } from 'react-jsx-highcharts';
import * as ChartModuleMore from 'highcharts/highcharts-more.js';
ChartModuleMore(Highcharts);

const AreaChartLine = (props) => {
    const chart = {
        type: 'area',
    };
    const xAxis = {
        categories: [
            'Янв',
            'Февр',
            'Март',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сент',
            'Окт',
            'Ноя',
            'Дек',
        ],
        crosshair: {
            width: 2,
            color: 'gray',
            dashStyle: 'shortdot',
        },
    };
    const yAxis = [
        {
            id: 'y_axis_0',
            title: {
                text: '',
            },
        },
    ];
    const tooltip = {
        crosshairs: true,
        shared: true,
    };
    const plotOptions = {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: true,
                    },
                },
            },
        },
    };
    console.log(props.stickers);
    const series = [
        {
            name: 'Продажа',
            data: [
                0, 0, 0, 0, props.stickers, 0, 0, 0, 0, 0, 0, 0,
            ],
            color: '#3F8CFF',
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
                stops: [[0, Highcharts.color('#3F8CFF').setOpacity(0.1).get()]],
            },
        },
        {
            name: 'Активация',
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ],
            color: '#00D097',
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 0 },
                stops: [[1, Highcharts.color('#00D097').setOpacity(0.1).get()]],
            },
        },
    ];
    const legend = {
        accessibility: {
            enabled: false,
        },
        keyboardNavigation: {
            enabled: true,
        },
    };
    return (
        <div style={{ width: '100%' }}>
            <HighchartsChart
                chart={chart}
                series={series}
                plotOptions={plotOptions}
                tooltip={tooltip}
                yAxis={yAxis}
                xAxis={xAxis}
                legend={legend}
            />
        </div>
    );
};
export default withHighcharts(AreaChartLine, Highcharts);
