import { Component, OnInit } from '@angular/core';
import {SlasService} from '../services/slas.services';
import {Slas} from '../models/slas.model';
import {HTML_CONSTANTS} from '../models/common.model';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-sla-daily-summary',
  templateUrl: './sla-daily-summary.component.html',
  styleUrls: ['./sla-daily-summary.component.css']
})
export class SlaDailySummaryComponent implements OnInit {
     slasDailySummaryResults: Slas[];
     html_constants: Object;
     isResultPresent: boolean;
     private Subscription: Subscription;
     private anotherSubscription : Subscription; 
  constructor(private slasService: SlasService) {
        this.html_constants = HTML_CONSTANTS;
        this.isResultPresent = false;
        this.Subscription = new Subscription();
        
      this.Subscription = this.slasService.slasDailySummary$.subscribe({
            next:(slasResults)=> {
                if(slasResults != null){
                    this.slasDailySummaryResults = slasResults;
                    this.isResultPresent = true;
                    //console.log(slasResults);                       
                }
                  
            }    
        });
  }
  
  ngOnInit() {
      if(this.slasDailySummaryResults == null)
            this.slasService.getSlaDailySummary();
      else
           this.isResultPresent = true;
      
      this.anotherSubscription = this.slasService.getSlaDailySummaryChange().subscribe(results => {
            console.log("results refreshed");
           // console.log(results);
           this.isResultPresent = false;
           this.slasDailySummaryResults = results;
           this.isResultPresent = true;         
        });
  }

  private setClass(item:string){    
      return this.slasService.getClassColor(item);
  }  
   
    
  ngOnDestroy(){
    this.Subscription.unsubscribe(); 
    this.anotherSubscription.unsubscribe();   
  }
}
