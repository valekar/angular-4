import { Component, OnInit } from '@angular/core';
import {SlasService} from '../services/slas.services';
import {Subscription} from 'rxjs/Subscription';
import {Slas} from '../models/slas.model';
import {HTML_CONSTANTS} from '../models/common.model';

@Component({
  selector: 'app-integration-flow',
  templateUrl: './integration-flow.component.html',
  styleUrls: ['./integration-flow.component.css']
})
export class IntegrationFlowComponent implements OnInit {
   private Subscription : Subscription; 
   private flowResults : Slas[];
   private isResultPresent : boolean;
   private html_constants : Object;
    private anotherSubscription : Subscription;
  constructor(private slasService:SlasService) {
      this.Subscription = new Subscription();
      this.isResultPresent = false;
      this.html_constants = HTML_CONSTANTS;
      
      this.slasService.slasFlowIntegration$.subscribe({
        next : (results) =>  {
            if(results!=null){
                this.flowResults = results;
                this.isResultPresent = true;    
            }    
        }    
      })
            
  
  }

  ngOnInit() {
      if(this.flowResults == null)
        this.slasService.getIntegrationFlows();
      else 
        this.isResultPresent = true;
      
      
       this.anotherSubscription = this.slasService.getIntegrationFlowsChange().subscribe(results => {
            console.log("results refreshed");
           // console.log(results);
           this.isResultPresent = false;
           this.flowResults = results;
           this.isResultPresent = true;         
        });
      
  }

  ngOnDestroy(){
      this.Subscription.unsubscribe();
      this.anotherSubscription.unsubscribe();
  }  
    
}
