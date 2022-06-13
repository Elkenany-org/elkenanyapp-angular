export class StatisticsChart {
    chartOptions:any
    arr2:any=[]



    drowShart(data:any):any {
        this.arr2=[]
        let Result= [];
        for(let i=0 ; i < data.length ; i++){
          Result.push(data[i]?.changes);
        }
        for(let k=0 ; k < Result.length ; k++){
          this.arr2.push({
            type: "line",
            showInLegend: true,
            name: data[k].name,
            xValueFormatString: "MMM DD, YYYY",
            dataPoints: []
          })
          for(let j=0 ; j < Result[k].length ; j++){
            if(Result[k][j].price != 0){
              this.arr2[k].dataPoints.push( { x:  new Date(Result[k][j].date), y:Result[k][j].change || Result[k][j].price}) // Result[k][j].change

            }
          }
          
        }
        console.log(data[0].changes[0].price);
        console.log(data[0].changes[0].change);

        this.chartOptions ={
          zoomEnabled: true,
          exportEnabled: true,

          animationEnabled: true,
          theme: "light2",
          title:{
          // text: "Actual vs Projected Sales"
          },
          axisX:{
          valueFormatString: "D MMM YYYY"
          },
          axisY: {
          title: (data[0].changes[0].price)?"price":  "Number of changes",
          // includeZero: true,
		      valueFormatString: "#,##0 LE"
          },
          toolTip: {
          shared: true
          },
          legend: {
          cursor: "pointer",
          itemclick: function (e: any) {
            // console.log("dds");
            
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              // console.log(e);
    
    
              e.dataSeries.visible = false;
              // console.log('d');
    
            } else {
              // console.log(e);
    
              e.dataSeries.visible = true;
            } 
            e.chart.render();
          }
          },
          data: this.arr2
        }	
    
        return this.chartOptions
      }
}