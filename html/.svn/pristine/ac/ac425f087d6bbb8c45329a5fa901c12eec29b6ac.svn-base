var allChart={
    chartTag_people:{
        itemTitle:'人员在线',
        title: Object.assign({},publicSet.title),
        credits:publicSet.credits,
        tooltip: Object.assign({},publicSet.tipStyle,{
          valueSuffix: '个'
        }),
        pane:Object.assign({},publicSet.paneStyle),
        chart:Object.assign({},publicSet.chart,{
            height:215
          }),
        plotOptions:publicSet.plotOptions,

        yAxis: {
          stops:[
            [1, publicSet.gaugeLinearStyle],
          ],
          lineWidth: 0,
          tickInterval:0,
          minorTickInterval: null,
          tickPixelInterval: 400,
          tickWidth: 0,
          title: {
              y: -70
          },
          labels: {
              x:0,
              y:16
          },
          min: 0,
          max: 200,
      },
      
      series: [
          {
          name:'在线',
          borderColor:'yellow',
          type:'solidgauge',
          data:[80],
          },
          {
              name:'在线',
              borderColor:'yellow',
              type:'gauge',
              data:[80],
              },
      ]

      },
      chartTag_forklift:{
          itemTitle:'叉车在线',
          title: Object.assign({},publicSet.title),
          credits:publicSet.credits,
          tooltip: Object.assign({},publicSet.tipStyle,{
              valueSuffix: '个'
          }),
          pane:Object.assign({},publicSet.paneStyle),
          chart:Object.assign({},publicSet.chart,{
            height:215
          }),

          yAxis: {
            stops:[
            [1, publicSet.gaugeLinearStyle],

          ],
            lineWidth: 0,
            tickInterval:0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16,
            },
            min: 0,
            max: 200,
            // title: {
                // text: '速度'
            // }
        },
        plotOptions:publicSet.plotOptions,
        series: [
            {
            name:'在线',
            type:'solidgauge',
            data:[160],
        },
        {
          name:'在线',
          type:'gauge',
          data:[160],
      },
      ]

      },
      chartAnchor:{
        itemTitle:'基站在线',
        title: Object.assign({},publicSet.title),
        credits:publicSet.credits,
        tooltip: Object.assign({},publicSet.tipStyle,{
            valueSuffix: '个'
        }),
        pane:Object.assign({},publicSet.paneStyle),
        chart:Object.assign({},publicSet.chart,{
          height:215
        }),

        yAxis: {
          stops:[
          [1, publicSet.gaugeLinearStyle],

        ],
          lineWidth: 0,
          tickInterval:0,
          minorTickInterval: null,
          tickPixelInterval: 400,
          tickWidth: 0,
          title: {
              y: -70
          },
          labels: {
              y: 16,
          },
          min: 0,
          max: 200,
          // title: {
              // text: '速度'
          // }
      },
      plotOptions:publicSet.plotOptions,
      series: [
          {
          name:'在线',
          type:'solidgauge',
          data:[160],
      },
      {
        name:'在线',
        type:'gauge',
        data:[160],
    },
    ]

    },
    materialNum:{
        itemTitle:'物资数量',
        title:Object.assign({},publicSet.title),
        credits:publicSet.credits,
        tooltip:Object.assign({},publicSet.tipStyle,{
          pointFormat: '<span style="display:block;padding:0 5px;background:#798697;">数量:{point.y}</span>',
        }),
        legend:Object.assign({},publicSet.legend),
        chart:Object.assign({},publicSet.chart,{
              type:'column',
              // spacingTop:'45px',
        }),
        plotOptions: publicSet.plotOptions,
        xAxis: {
            type: 'category',
        },
        yAxis: {
            title: {
                text: '数量'
            }
        },  
        series: [{
            name: '物资类型',
            colorByPoint: true,
            data: [{
                name: 'M1',
                y: 186,
                drilldown: 'M1'
            }, {
                name: 'M2',
                y: 24,
                drilldown: 'M2'
            }, {
                name: 'M3',
                y: 10,
                drilldown: 'M3'
            }, {
                name: 'M4',
                y: 77,
                drilldown: 'M4'
            }, {
                name: 'M5',
                y: 91,
                drilldown: 'M5'
            // }, {
            //     name: 'Proprietary or Undetectable',
            //     y: 0.2,
            //     drilldown: null
            },
            {
                name: 'M7',
                y: 68,
                drilldown: null
            },
            {
                name: 'M8',
                y: 88,
                drilldown: null
            },
            {
                name: 'M9',
                y: 20,
                drilldown: null
            },
            {
                name: 'M10',
                y: 16,
                drilldown: null
            },
        ]
        }],
        drilldown: {
            // 可钻取数据列样式
            activeAxisLabelStyle:publicSet.activeAxisLabelStyle,
            series: [{
                name: 'M1',
                id: 'M1', //MUST
                data: [
                    {name:'T0001',y:24},
                    {name:'T0002',y:25},
                    {name:'T0003',y:26},
                    {name:'T0004',y:27},
                    {name:'T0005',y:28},
                ]
            }, {
                name: 'M2',
                id: 'M2',
                data: [
                    [
                        'T0007',
                        5
                    ],
                    [
                        'T0008',
                        4
                    ],
                    [
                        'T0009',
                        8
                    ],
                    [
                        'T0010',
                        9
                    ],
                    [
                        'T0011',
                        5
                    ],
                    [
                        'T0012',
                        12
                    ],
                    [
                        'T0013',
                        24
                    ],
                    [
                        'T0014',
                        1
                    ],
                    [
                        'T0015',
                        6
                    ],
                    [
                        'T0016',
                        55
                    ],
                    [
                        'T0017',
                        38
                    ],
                    [
                        'T0018',
                        19
                    ],
                    [
                        'T0010',
                        19
                    ],
                    [
                        'T0010',
                        16
                    ]
                ]
            }, {
                name: 'M3',
                id: 'M3',
                data: [
                    [
                        'T0001',
                        2
                    ],
                    [
                        'T0002',
                        32
                    ],
                    [
                        'T0003',
                        31
                    ],
                    [
                        'T0004',
                        27
                    ],
                    [
                        'T0005',
                        102
                    ],
                    [
                        'T0006',
                        33
                    ],
                    [
                        'T0007',
                        22
                    ],
                    [
                        'T0008',
                        15
                    ]
                ]
            }, {
                name: 'M4',
                id: 'M4',
                data: [
                    [
                        'T0001',
                        56
                    ],
                    [
                        'T0002',
                        77
                    ],
                    [
                        'T0001',
                        42
                    ],
                    [
                        'T0003',
                        3
                    ],
                    [
                        'T0004',
                        29
                    ],
                    [
                        'T0005',
                        26
                    ],
                    [
                        'T0006',
                        17
                    ]
                ]
            }, {
                name: 'M5',
                id: 'M5',
                data: [
                    [
                        'T0001',
                        34
                    ],
                    [
                        'T0001',
                        24
                    ],
                    [
                        'T0001',
                        17
                    ],
                    [
                        'T0001',
                        16
                    ]
                ]
            }]
        }
    },
    statisticsOnline:{
        itemTitle:'七日日均在线',
        title:Object.assign({},publicSet.title),
        credits:publicSet.credits,
        tooltip:Object.assign({},publicSet.tipStyle,{
          pointFormat: '<span style="display:block;padding:0 5px;background:#798697;">秒:{point.y}</span>',
        }),
        legend:Object.assign({},publicSet.legend),
        chart:Object.assign({},publicSet.chart,{
              type:'column',
              // spacingTop:'45px',
        }),
        plotOptions: publicSet.plotOptions,
        xAxis: {
            type: 'category',
        },
        yAxis: {
            title: {
                text: '时间'
            }
        },  
        series: [{
            name: '名称',
            colorByPoint: true,
            data: [{
                name: 'M1',
                y: 186,
                drilldown: 'M1'
            }, {
                name: 'M2',
                y: 24,
                drilldown: 'M2'
            }, {
                name: 'M3',
                y: 10,
                drilldown: 'M3'
            }, {
                name: 'M4',
                y: 77,
                drilldown: 'M4'
            }, {
                name: 'M5',
                y: 91,
                drilldown: 'M5'
            // }, {
            //     name: 'Proprietary or Undetectable',
            //     y: 0.2,
            //     drilldown: null
            },
            {
                name: 'M7',
                y: 68,
                drilldown: null
            },
            {
                name: 'M8',
                y: 88,
                drilldown: null
            },
            {
                name: 'M9',
                y: 20,
                drilldown: null
            },
            {
                name: 'M10',
                y: 16,
                drilldown: null
            },
        ]
        }],
        drilldown: {
            // 可钻取数据列样式
            activeAxisLabelStyle:publicSet.activeAxisLabelStyle,
            series: [{
                name: 'M1',
                id: 'M1', //MUST
                data: [
                    {name:'T0001',y:24},
                    {name:'T0002',y:25},
                    {name:'T0003',y:26},
                    {name:'T0004',y:27},
                    {name:'T0005',y:28},
                ]
            }, {
                name: 'M2',
                id: 'M2',
                data: [
                    [
                        'T0007',
                        5
                    ],
                    [
                        'T0008',
                        4
                    ],
                    [
                        'T0009',
                        8
                    ],
                    [
                        'T0010',
                        9
                    ],
                    [
                        'T0011',
                        5
                    ],
                    [
                        'T0012',
                        12
                    ],
                    [
                        'T0013',
                        24
                    ],
                    [
                        'T0014',
                        1
                    ],
                    [
                        'T0015',
                        6
                    ],
                    [
                        'T0016',
                        55
                    ],
                    [
                        'T0017',
                        38
                    ],
                    [
                        'T0018',
                        19
                    ],
                    [
                        'T0010',
                        19
                    ],
                    [
                        'T0010',
                        16
                    ]
                ]
            }, {
                name: 'M3',
                id: 'M3',
                data: [
                    [
                        'T0001',
                        2
                    ],
                    [
                        'T0002',
                        32
                    ],
                    [
                        'T0003',
                        31
                    ],
                    [
                        'T0004',
                        27
                    ],
                    [
                        'T0005',
                        102
                    ],
                    [
                        'T0006',
                        33
                    ],
                    [
                        'T0007',
                        22
                    ],
                    [
                        'T0008',
                        15
                    ]
                ]
            }, {
                name: 'M4',
                id: 'M4',
                data: [
                    [
                        'T0001',
                        56
                    ],
                    [
                        'T0002',
                        77
                    ],
                    [
                        'T0001',
                        42
                    ],
                    [
                        'T0003',
                        3
                    ],
                    [
                        'T0004',
                        29
                    ],
                    [
                        'T0005',
                        26
                    ],
                    [
                        'T0006',
                        17
                    ]
                ]
            }, {
                name: 'M5',
                id: 'M5',
                data: [
                    [
                        'T0001',
                        34
                    ],
                    [
                        'T0001',
                        24
                    ],
                    [
                        'T0001',
                        17
                    ],
                    [
                        'T0001',
                        16
                    ]
                ]
            }]
        }
    },
    inOutLib:{
        itemTitle:'当天出/入库',
        title:Object.assign({},publicSet.title),
        credits:publicSet.credits,
        tooltip:Object.assign({},publicSet.tipStyle,{
          pointFormat: '<span style="display:block;padding:0 5px;background:#798697;">数量:{point.y}</span>',
        }),
        legend:Object.assign({},publicSet.legend),
        chart:Object.assign({},publicSet.chart,{
              type:'column',
              // spacingTop:'45px',
        }),
        plotOptions: publicSet.plotOptions,
        xAxis: {
            type: 'category',
        },
        yAxis: {
            title: {
                text: '数量'
            }
        },  
        series: [{
            name: '物资类型',
            colorByPoint: true,
            data: [{
                name: 'M1',
                y: 186,
                drilldown: 'M1'
            }, {
                name: 'M2',
                y: 24,
                drilldown: 'M2'
            }, {
                name: 'M3',
                y: 10,
                drilldown: 'M3'
            }, {
                name: 'M4',
                y: 77,
                drilldown: 'M4'
            }, {
                name: 'M5',
                y: 91,
                drilldown: 'M5'
            // }, {
            //     name: 'Proprietary or Undetectable',
            //     y: 0.2,
            //     drilldown: null
            },
            {
                name: 'M7',
                y: 68,
                drilldown: null
            },
            {
                name: 'M8',
                y: 88,
                drilldown: null
            },
            {
                name: 'M9',
                y: 20,
                drilldown: null
            },
            {
                name: 'M10',
                y: 16,
                drilldown: null
            },
        ]
        }],
        drilldown: {
            // 可钻取数据列样式
            activeAxisLabelStyle:publicSet.activeAxisLabelStyle,
            series: [{
                name: 'M1',
                id: 'M1', //MUST
                data: [
                    {name:'T0001',y:24},
                    {name:'T0002',y:25},
                    {name:'T0003',y:26},
                    {name:'T0004',y:27},
                    {name:'T0005',y:28},
                ]
            }, {
                name: 'M2',
                id: 'M2',
                data: [
                    [
                        'T0007',
                        5
                    ],
                    [
                        'T0008',
                        4
                    ],
                    [
                        'T0009',
                        8
                    ],
                    [
                        'T0010',
                        9
                    ],
                    [
                        'T0011',
                        5
                    ],
                    [
                        'T0012',
                        12
                    ],
                    [
                        'T0013',
                        24
                    ],
                    [
                        'T0014',
                        1
                    ],
                    [
                        'T0015',
                        6
                    ],
                    [
                        'T0016',
                        55
                    ],
                    [
                        'T0017',
                        38
                    ],
                    [
                        'T0018',
                        19
                    ],
                    [
                        'T0010',
                        19
                    ],
                    [
                        'T0010',
                        16
                    ]
                ]
            }, {
                name: 'M3',
                id: 'M3',
                data: [
                    [
                        'T0001',
                        2
                    ],
                    [
                        'T0002',
                        32
                    ],
                    [
                        'T0003',
                        31
                    ],
                    [
                        'T0004',
                        27
                    ],
                    [
                        'T0005',
                        102
                    ],
                    [
                        'T0006',
                        33
                    ],
                    [
                        'T0007',
                        22
                    ],
                    [
                        'T0008',
                        15
                    ]
                ]
            }, {
                name: 'M4',
                id: 'M4',
                data: [
                    [
                        'T0001',
                        56
                    ],
                    [
                        'T0002',
                        77
                    ],
                    [
                        'T0001',
                        42
                    ],
                    [
                        'T0003',
                        3
                    ],
                    [
                        'T0004',
                        29
                    ],
                    [
                        'T0005',
                        26
                    ],
                    [
                        'T0006',
                        17
                    ]
                ]
            }, {
                name: 'M5',
                id: 'M5',
                data: [
                    [
                        'T0001',
                        34
                    ],
                    [
                        'T0001',
                        24
                    ],
                    [
                        'T0001',
                        17
                    ],
                    [
                        'T0001',
                        16
                    ]
                ]
            }]
        }
    },
    attendance_chart:{},
}