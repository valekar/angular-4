import { Component, OnInit } from '@angular/core';
import  {SlasService} from '../services/slas.services';
import {Slas} from '../models/slas.model';
import {Subscription} from 'rxjs/Subscription';
import {HTML_CONSTANTS} from '../models/common.model';

@Component({
  selector: 'app-sla-latest-summary',
  templateUrl: './sla-latest-summary.component.html',
  styleUrls: ['./sla-latest-summary.component.css']
})
export class SlaLatestSummaryComponent implements OnInit {
   private slasLatestResults : Slas[];
   private isResultPresent : boolean;
   private Subscription : Subscription;
   private html_constants : Object;
   private anotherSubscription : Subscription; 
  constructor(private slasService : SlasService) {
      this.Subscription = new Subscription();
      this.html_constants = HTML_CONSTANTS;
      this.Subscription = this.slasService.slasLatestSummary$.subscribe({
        next:(results) => {
            if(results!=null){
                this.slasLatestResults = results;
                this.isResultPresent = true; 
                //console.log(this.slasLatestResults);
            }
              
        }    
      })
  
  
  }

  private setClass(item:string){
    return this.slasService.getClassColor(item);    
  }  
    
  ngOnInit() {
      if(this.slasLatestResults == null)
        this.slasService.getSlaLatestSummary();
      else
        this.isResultPresent = true;
      
      
       this.anotherSubscription = this.slasService.getSlaLatestSummaryChange().subscribe(results => {
            console.log("results refreshed");
           // console.log(results);
           this.isResultPresent = false;
           this.slasLatestResults = results;
           this.isResultPresent = true;         
        });
  }

   ngOnDestroy(){
      this.Subscription.unsubscribe(); 
      this.anotherSubscription.unsubscribe();
   }
}
