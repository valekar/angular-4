import { Directive, OnChanges,ElementRef,Inject,Input } from '@angular/core';
import * as d3 from 'd3';
import * as Shape from 'd3-shape'; 
import * as Chrome from 'd3-scale-chromatic';

@Directive({
  selector: '[pie-chart]',
  //lifecycle:[onChange]
})
export class PieChartDirective implements OnChanges{
   @Input('pieData') data : any; 
  constructor(@Inject(ElementRef) elementRef) { 
    var el = elementRef.domElement;
    var graph = d3.select(el);

    
  }   
    ngOnChanges(){
        if(this.data != null){
            //console.log(this.data);
            this.fullPieChart(this.data);

        }
                
    }   
   /* private pieChartSVG(data){
       // console.log(data);
        var svg = d3.select("#graph").append("svg")
        var chartLayer = svg.append("g").classed("chartLayer", true)
        var  width = 300;//document.querySelector("#graph").clientWidth
        var height = 300;//document.querySelector("#graph").clientHeight
    
       var  margin = {top:40, left:40, bottom:40, right:40 }
        
        
        var chartWidth = width - (margin.left+margin.right)
        var chartHeight = height - (margin.top+margin.bottom)
        var radius = 150;
        svg.attr("width", width).attr("height", height)
        
        
        chartLayer
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform", "translate("+[margin.left, margin.top]+")")
        
        var arcs = d3.pie()
            .sort(null)
            .value(function(d,i) { console.log(d);return +data[i].value;})//return d.value; })
            (<any>data)
        
          
        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius -70)
            .padAngle(0.03)
            .cornerRadius(8)
            
        var pieG = chartLayer.selectAll("g")
            .data([this.cast(data)])
            .enter()
            .append("g")
            .attr("transform", "translate("+[chartWidth/2, chartHeight/2]+")")
        
        var block = pieG.selectAll(".arc").data(arcs)
            
        var newBlock = block.enter().append("g").classed("arc", true)
        newBlock.append("path")
            .attr("d", <any>arc)
            .attr("id", function(d, i) { return "arc-" + i })
            .attr("stroke", "gray")
            .attr("fill", function(d,i){ return d3.interpolateCool(Math.random()) })
        
        newBlock.append("text")
            .attr("dx", 55)
            .attr("dy", -5)
            .append("textPath")
            .attr("xlink:href", function(d, i) { return "#arc-" + i; })
            .text(function(d,i) { console.log(d); return data[i].label;})//return d.data.label
          
    }*/
    

    
 /*   private pieChartSVG_1(data1){
      // data = [10, 20, 100];
        let margin = {top:20, bottom:20, left:20, rigth:20}, 
                   
                     radius = 100;
        

        var  width = 300;
        var height = document.querySelector("#graph").clientHeight;
        var svg = d3.select("#graph").append("svg").attr("width","100%").attr("height",width);
        
        let pie = Shape.pie<Datum>()
                    //.data(data1)
                    .sort(null)
                    .value((d:Datum):number => d.value);
        
        var svg = d3.select("#graph").append("svg").attr("width","100%").attr("height",width);    
        var pieGrp = svg.append("g").attr("transition","translate("+width/2+","+height/2+")");
        
         var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius -70)
            .padAngle(0.03)
            .cornerRadius(8)
        
        let labelArc = d3.arc()
                         .outerRadius(radius - 50)
                         .innerRadius(radius - 50);
            
        let g = pieGrp.selectAll(".arc")
                .data(pie(data1))
                .enter()
                .append("g")
                .attr("class","arc");
        g.append("path").attr("d",<any>arc).style("fill","blue")
        
        //g.append("text").attr("transform",function(d,i){console.log(d);return "translate("+ labelArc.centroid(<any>d.data.label)+")";})
        g.append("text")
            .attr("dx", 55)
            .attr("dy", -5)
            .append("textPath")
            .attr("xlink:href", function(d, i) { return "#arc-" + i; })
            .text(function(d,i) { console.log(d); return data1[i].label;})  
        
    }*/
    
    
    private fullPieChart(data){      
        var  width = 300;//document.querySelector("#graph").clientWidth
        var height = 300;//document.querySelector("#graph").
        var radius = Math.min(width, height) / 2 + 10;
        var svg = d3.select("#pieSVG").remove();
        svg = d3.select("#graph").append("svg").attr("width","100%").attr("height","300").attr("id", "pieSVG");
        var  margin = {top:150, left:300, bottom:40, right:40 }   

        
        var colorScale = d3.scaleOrdinal(<string[]>Chrome["schemeSet3"]);
        
        var arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);
        
        var labelArc = d3.arc()
                        .outerRadius(radius - 40)
                        .innerRadius(radius - 40);
        
        var pie = d3.pie<Datum>()
                    .sort(null)
                    .value((d:Datum):number => d.value);
        
        
        var grp = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
        
        var g = grp.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc")       
        
       g.append("path")
        .attr("d", <any>arc)
        .style("fill", function(d,i){ return colorScale(d.data.label)});
    
       g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(<any>d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.label; });
    
        var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
        
       g.on("mouseover", function(d) {
           div.transition()
             .duration(200)
             .style("opacity", .9);
           div.html("<span class = \"tooltip-inner\">"+(d.data.label)+":"+(d.data.value)+"</span>" + "<br/>" )
             .style("left", (d3.event.pageX-50) + "px")
             .style("top", (d3.event.pageY-20) + "px");
       })
        .on("mouseout", function(d) {
           div.transition()
             .duration(1500)
             .style("opacity", 0);
       });
        
    }
    
}


interface Datum {
        label : string,
        value:number;
                
    }
