import React from 'react';
import ApexCharts from "react-apexcharts";
import "./Chart.scss";

const Chart = () => {

  return (
    <div>
      <div className='Wrap'>
        <div className='ChartVol'>
          <ApexCharts 
              series= {[
              { name: 'network1',
                data: [21, 40, 28, 71, 42, 96, 10]
              }, {
                name: 'network2',
                data: [11, 62, 45, 2, 34, 52, 41] 
              },{
                  name: 'network3',
                  data: [79, 5, 25, 43, 9, 45, 21] 
                }
                  ]}
              options={{    
                chart: {
                  type: 'area',
                  toolbar: {
                    show: false,
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },    
                title: {
                  text: 'Received Network Traffic per Container',
                  align: 'center'
                },  
                xaxis: {
                  categories: ['15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30'],
                },      
              }}>
          </ApexCharts>
        </div>
        <div className='ChartVol'>
          <ApexCharts 
              series= {[
              { name: 'network1',
                data: [32, 4, 82, 15, 42, 19, 99]
              }, 
              {
                name: 'network2',
                data: [99, 35, 45, 29, 74, 25, 41] 
              }, 
              {
                name: 'network3',
                data: [9, 53, 25, 43, 29, 85, 11] 
              }
                  ]}
              options={{    
                chart: {
                  type: 'area',
                  toolbar: {
                    show: false,
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },     
                title: {
                  text: 'Sent Network Traffic per Container',
                  align: 'center'
                },  
                xaxis: {
                  categories: ['15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30'],
                },       
              }}>
          </ApexCharts>
        </div>
        <div className='ChartVol'>
          <ApexCharts
            series= {[
              {name: "RSS",
              data: [60, 41, 35, 51, 49, 62, 91]}
            ]}
            options={{ 
              chart: {
                type: 'line',
                zoom: {
                  enabled: false
                },
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'RSS Memory Usage per Container',
                align: 'center'
              },
              xaxis: {
                categories: ['15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30'],
              },
              
            
            }}>
              
          </ApexCharts>
        </div>
        <div className='ChartVol'>
          <ApexCharts
            series= {[
              {name: "CPU",
              data: [28, 41, 35, 51, 49, 79, 91, ]}
            ]}
            options={{ 
              chart: {
                type: 'line',
                zoom: {
                  enabled: false
                },
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'CPU Usage per Container',
                align: 'center'
              },
              xaxis: {
                categories: ['15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30'],
              },            
            }}>
          </ApexCharts>
        </div>
      </div>
    </div>
  );
};

export default Chart;