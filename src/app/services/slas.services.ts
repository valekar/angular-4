import {Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Slas} from '../models/slas.model';
import {CONSTANTS} from '../models/common.model';
import * as io from 'socket.io-client';
import {MySocket} from '../models/common.model';



@Injectable()
export class SlasService{
    private subject : Subject<any>;
    private SlasLatestSummarySubject : Subject<any>;
    private SlasDailySummarySubject : Subject<any>;
    private SlasFlowIntegrationSubject : Subject<any>;
    private socket;
    private SOCKET_URL : string;
    
    slas$: Observable<any>;
    slasLatestSummary$ : Observable<any>;
    slasDailySummary$ : Observable<any>;
    slasFlowIntegration$: Observable<any>;
    private mySocket : MySocket;
    
    constructor(private http: Http){
        this.subject = new BehaviorSubject<any>(null);
        this.SlasLatestSummarySubject = new BehaviorSubject<any>(null);
        this.SlasDailySummarySubject = new BehaviorSubject<any>(null);
        this.SlasFlowIntegrationSubject = new BehaviorSubject<any>(null);
        
        this.slas$ = this.subject.asObservable();
        this.slasLatestSummary$ = this.SlasLatestSummarySubject.asObservable();
        this.slasDailySummary$ = this.SlasDailySummarySubject.asObservable();
        this.slasFlowIntegration$ = this.SlasFlowIntegrationSubject.asObservable();
        
        //for SOCKET URL CONNECTION
        this.SOCKET_URL = CONSTANTS.SOCKET_URL;
        this.mySocket = new MySocket();
        //console.log('Slas Service Initialized....');
 
    }    
    //api call
    getSlas():any{
            return this.http.get('api/slas')
            .map((res:any) => res.json())
            .subscribe(
                (result:any) => this.subject.next(result), 
                (err:any) => {console.log("Something is going wrong"+ err)}
                );    
    }
    getSlaLatestSummary():any{
        return this.http.get('api/slas/latest/summary')
               .map(res => res.json())
               .subscribe(
                   (result:any) => this.SlasLatestSummarySubject.next(result),
                   (err:any) => (console.log(err))
                   );    
    }
    getSlaDailySummary():any{
        return this.http.get('api/slas/daily/summary')
                    .map((res) => res.json() )
                    .subscribe((result:any) => {this.SlasDailySummarySubject.next(result)},
                                (err:any) => {console.log(err)});
           
    }
    getIntegrationFlows():any{
        return this.http.get('api/slas/integration/flow')
                        .map((res) => res.json())
                        .subscribe(
                            (result:any) =>  {this.SlasFlowIntegrationSubject.next(result)},
                            (err:any) => {console.log(err)}  
                        )    
    }
     //socket io call
     getSlasChange():any{
           
           return this.mySocket.getSocketSubscription(CONSTANTS.CHANGE_IN_SLA,this.SOCKET_URL);
     }
     //socket io call
     getSlaLatestSummaryChange():any{
         return this.mySocket.getSocketSubscription(CONSTANTS.CHANGE_IN_LATEST_SUMM,this.SOCKET_URL); 
     }
    
     getSlaDailySummaryChange():any{
        return this.mySocket.getSocketSubscription(CONSTANTS.CHANGE_IN_DAILY_SUMM,this.SOCKET_URL);
           
     }  
     getIntegrationFlowsChange():any{
        return this.mySocket.getSocketSubscription(CONSTANTS.CHANGE_IN_INTEGRATION_FLOW,this.SOCKET_URL);
           
     }
     
    getClassColor(item:string):string
    {
           // console.log(item); 
            if(item.toLowerCase() == CONSTANTS.MET_GOAL_TIME_LOWER){
                return CONSTANTS.SUCCESS_CLASS;   
            }
            if(item.toLowerCase() == CONSTANTS.FAILED_DELIVERY_LOWER){
                return  CONSTANTS.DANGER_CLASS;   
            }
            if(item.toLowerCase() == CONSTANTS.MET_NLT_TIME_LOWER){
                return CONSTANTS.ACTIVE_CLASS;
            }
            if(item.toLowerCase() == CONSTANTS.DELAYED_DELIVERY_LOWER){
                return CONSTANTS.WARNING_CLASS;    
            }
    }
    
    
    getMappedResults(results:any):Array<Object>{
        let dataResutls :Array<any>;
        let failedDelivery = 0;
        let metNLTTime = 0 ;
        let metGoalTime = 0 ;
        let delayedDelivery = 0 ;
        let finalResults : Array<Object>;
        let sortedResult : Map<string,number>;
        sortedResult = new Map<string,number>();
        finalResults = new Array<Object>();
         dataResutls = results.rows;
                for(var i = 0; i< dataResutls.length; i++){
                   if(dataResutls[i][4].toLowerCase() == CONSTANTS.FAILED_DELIVERY_LOWER){
                        //console.log("failed delivery");
                       failedDelivery += 1;
                       sortedResult[CONSTANTS.FAILED_DELIVERY] = failedDelivery;
                       
                   }
                    if(dataResutls[i][4].toLowerCase() == CONSTANTS.MET_NLT_TIME_LOWER){
                        metNLTTime += 1;
                        sortedResult[CONSTANTS.MET_NLT_TIME] = metNLTTime;    
                   }
                   if(dataResutls[i][4].toLowerCase() == CONSTANTS.MET_GOAL_TIME_LOWER){
                        metGoalTime += 1;
                       sortedResult[CONSTANTS.MET_GOAL_TIME] = metGoalTime;    
                   }
                   if(dataResutls[i][4].toLowerCase() == CONSTANTS.DELAYED_DELIVERY_LOWER){
                        delayedDelivery += 1; 
                        sortedResult[CONSTANTS.DELAYED_DELIVERY] = delayedDelivery;   
                   }         
                }
        
                for(let value in sortedResult){
                    finalResults.push({"label": value,"value":sortedResult[""+value+""]});
                   // this.finalResults.push(this.pieSlas);    
                }
       // console.log(sortedResult);
        return finalResults;
    }
    
    
}




