import { Component,OnInit } from '@angular/core';
import {SlasService} from '../services/slas.services';
import {Slas} from '../models/slas.model';
import {CONSTANTS} from '../models/common.model';
import {ParseDatePipe} from '../parse-date.pipe';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'slas',
  templateUrl: './slas.component.html',

})
export class SlasComponent implements OnInit{
  slasResults:Slas[];
  isSlasPresent :boolean
  //private slaStatus:string;
 // private statusClassName : string;
  private classes : Array<string>;
  private subscription : Subscription;
  private anotherSubscription : Subscription;
    constructor(private slasService:SlasService){
       this.isSlasPresent = false;
       //this.classes = [{""}] 
      // this.statusClassName = CONSTANTS.WARNING;

        this.subscription = this.slasService.slas$.
        subscribe({            
            next:(slasResults) => {              
                 if(slasResults!=null){
                    this.slasResults = slasResults;
                    this.isSlasPresent = true;   
                    //this.subscription.unsubscribe();        
             }   
            }
        });  
    }
       
    private statusClassName(item){
        return this.slasService.getClassColor(item);
        
    }
  

    ngOnInit(){
        if(this.slasResults == null){
            this.slasService.getSlas();    
        }   
        else {
            this.isSlasPresent = true;    
        }
        
       this.anotherSubscription = this.slasService.getSlasChange().subscribe(results => {
            console.log("results refreshed");
           // console.log(results);
           this.isSlasPresent = false;
           this.slasResults = results;
           this.isSlasPresent = true;         
        });
        
    }
    
         
    ngOnDestroy(){
        this.subscription.unsubscribe();  
        this.anotherSubscription.unsubscribe();  
    }
    
}


