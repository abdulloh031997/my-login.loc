import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, withHighcharts } from 'react-jsx-highcharts';
import { useTranslation } from 'react-i18next';
import * as ChartModuleMore from 'highcharts/highcharts-more.js';
import _ from 'lodash';
ChartModuleMore(Highcharts);

const ChartCircle = (props) => {
    const chart = {
        height: 200,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 180,
        marginRight: 0,
        backgroundColor: 'none',
    };

    const tooltip = {
        shared: false,
        pointFormat:
            '<span style="color:{series.color}"><b>{point.percentage:.1f}%</b><br/>',
    };

    const plotOptions = {
        pie: {
            shadow: false,
            center: ['50%', '50%'],
            // size: '100%',
            innerSize: '50%',
            showInLegend: true,
            dataLabels: {
                enabled: true,
                distance: -30,
                pointFormat: '<b>{point.percentage:.1f}%</b>',
                style: {
                    fontWeight: 'bold',
                    color: 'white',
                },
            },
        },
    };

    const series = [
        {
            type: 'pie',
            name: "O'qilgan",
            data: [
                {
                    name: 'На складе',
                    y: props.instock,
                    color: '#FDC748',
                    length: 190,
                },
                {
                    name: 'Продано',
                    y: props.sold,
                    color: '#3F8CFF',
                    length: 190,
                },
            ],
        },
    ];

    console.log(series);

    const legend = {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        itemMarginTop: 10,
        itemMarginBottom: 10,
    };

    return (
        <div style={{ width: '100%' }}>
            <HighchartsChart
                chart={chart}
                series={series}
                plotOptions={plotOptions}
                tooltip={tooltip}
                legend={legend}
            ></HighchartsChart>
            {/* {series.length} */}
        </div>
    );
};

export default withHighcharts(ChartCircle, Highcharts);