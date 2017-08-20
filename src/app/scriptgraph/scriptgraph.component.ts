import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import {ScriptsService} from '../scripts/scripts.service';

@Component({
  selector: 'app-scriptgraph',
  templateUrl: './scriptgraph.component.html',
  styleUrls: ['./scriptgraph.component.scss']
})
export class ScriptgraphComponent implements OnInit {

  @Input() scriptCode;
  closingData: any = [];
  volumeData: any = [];
  timeData: any = [];
  graphData: any;

  constructor(private scriptService: ScriptsService) {
  }

  ngOnInit() {

    this.scriptService.getDataForGraph(this.scriptCode).subscribe(data => {
      this.createChrat(this.processData(data));
    });


  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  processData(data) {

    let dateStr = '2017-08-18 16:00:00'
    const ketMin='Time Series (5min)';
    dateStr = dateStr.split(' ')[0].trim();
    const dataMAp = Object.keys(data[ketMin]);
    let closeArray = new Array();
    let timeArray = new Array();
    let dataArrayVolume = new Array();

    for (let key of dataMAp) {

      if ( key.search(dateStr) === -1) {
          return;
      }
      let timeStamp = key.split(' ')[1];
      const time = timeStamp.split(':');
      this.closingData.push(data[ketMin][key]["4. close"]);
      this.timeData.push(time[0] + ':' + time[1]);
      this.volumeData.push(data[ketMin][key]["5. volume"]);
      this.graphData = this.closingData;
    }

  }

  changeChartData (type: String, $event) {
    this.graphData = type === 'volume' ? this.volumeData : this.closingData;
    this.createChrat({});
    //$event.preventDefault();
  }

  createChrat(data) {

    let ctx = document.getElementById(this.scriptCode);
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(255, 99, 132)'
          }
        },
        labels: this.timeData.reverse(),
        datasets: [{
          label: '',
          data: this.graphData.reverse(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              // stepSize: 0.10
            }
          }]
        },
          tooltips: {
            mode: 'point'
          }
      }
    });
  }

}