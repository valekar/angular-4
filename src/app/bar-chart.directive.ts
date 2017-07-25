import { Directive, OnChanges,ElementRef,Inject,Input } from '@angular/core';
import * as d3 from 'd3';
import * as Shape from 'd3-shape'; 
@Directive({
  selector: '[bar-chart]'
})
export class BarChartDirective implements OnChanges{
  @Input('barData') data : any; 
  constructor() { 
    
  
  }  
  ngOnChanges(){
      if(this.data!= null){
          //console.log(this.data);
          this.barSvg(this.data);
      }
  
  }
          
    private barSvg(data){
        var  width = 300;
        var height = document.querySelector("#bargraph").clientHeight;
        var svg = d3.select("#barSVG").remove();
        svg = d3.select("#bargraph").append("svg").attr("width","100%").attr("height",width).attr("id", "barSVG");
    
        var  margin = {top:40, left:10, bottom:40, right:0 } 
        var barGrp = svg.append("g").attr("transition","translate("+margin.left+","+margin.bottom+")");
        /*barGrp.selectAll('rect').data(data)           
            .enter().append('rect')
            .attr('x', function(d,i){return i*60 + 10;})
            .attr('y' ,function(d,i){return 290 - data[i].value*10;} )
            .attr("height", function(d,i){return data[i].value*10;})//return d.value;
            .attr("width",50)
            .attr("fill","teal");*/
        
        barGrp.selectAll('rect').data(data)           
            .enter().append('rect')
            .attr('x', margin.left)
            .attr('y' ,function(d,i){return i*60 + 10;} )
            .attr("height", 50)//return d.value;
            .attr("width",function(d,i){return +data[i].value*5;})
            .attr("fill","teal")
            ;
        barGrp.selectAll("text").data(data)
               .enter().append("text")
               .text(function(d,i){return data[i].label;})
               .attr("x",function(d,i){return (+data[i].value*5+10 )})
               .attr("y",function(d,i){return i*60 + 40;})
               .attr("class", "barChart")    
        
        var xScale = d3.scaleLinear()
                    .domain(d3.extent(data,function(d,i){return +data[i].value;}))
                    .range([0,d3.max(data,function(d,i){return +data[i].value*5;})]);
        
        var yDomain = [];
        var yRange = [];
        
        for(var i=0;i<data.length;i++){
            yDomain.push(data[i].label);    
        }
        yRange = yDomain.slice();
        
        var yScale = d3.scalePoint().domain(yDomain).range([280,0]);
        var leftAxis = d3.axisLeft(yScale).tickValues([]);
        barGrp.append("g").attr("transform", "translate("+margin.left+"," + 280 + ")").call(d3.axisBottom(xScale));
        barGrp.append("g").attr("transform", "translate("+margin.left+",0)").call(leftAxis);
        
    
    }
  


}
