import {  Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import {SlasService} from '../services/slas.services';
import {PieSlas} from '../models/slas.model';
import {CONSTANTS} from '../models/common.model'
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
   styleUrls: [
    './dashboard.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit{   

    
    private pieData : Array<any>;
    private barData: Array<any>; 
    private title:string;
    
    private toggleLoading:boolean;
    private subscription : Subscription;
    private anotherSubscription : Subscription;
    
    constructor(private slasService: SlasService){
        this.title = "SLA"   
        this.constructResults();
        this.toggleLoading = true;
    }
     
    private constructResults(){ 
        let formattedResults : Array<Object>;       
        this.subscription = this.slasService.slas$.subscribe({next:(results) => {
            if(results !=null){           
               
                formattedResults = this.slasService.getMappedResults(results);
                //console.log(formattedResults);
                this.pieData = formattedResults;
                this.barData = formattedResults;
                this.toggleLoading = false;
            }
        }});
    }
    
    
    
    ngOnInit(){
        let formattedResults : Array<Object>;
        if((this.pieData || this.barData) == null)
            this.slasService.getSlas();
        else
           this.toggleLoading = false; 
            
        
         this.anotherSubscription = this.slasService.getSlasChange().subscribe(results => {
           console.log("results refreshed");
           this.toggleLoading = true;
           formattedResults = this.slasService.getMappedResults(results);          
           //console.log(formattedResults);
           this.pieData = formattedResults;
           this.barData = formattedResults;  
             
           this.toggleLoading = false;         
        });
    }
    
    
   ngOnDestroy() {
    this.subscription.unsubscribe(); 
    this.anotherSubscription.unsubscribe();    
   }
    
}





