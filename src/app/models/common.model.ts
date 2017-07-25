import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
export class MySocket{
    private socket;
   constructor(){}
    
    public getSocketSubscription(change_type:string, socket_url:string){
        let observable = new Observable(observer => {
          this.socket = io(socket_url);
            //console.log(this.socket);
          this.socket.on(change_type, (data) => {
            //console.log("emitted");
            observer.next(data);    
          });
          return () => {
            this.socket.disconnect();
          };  
        })     
        return observable;    
    
    }  
}


export class CONSTANTS {
    public static MET_GOAL_TIME_LOWER = "met goal time";
    public static FAILED_DELIVERY_LOWER = "failed delivery";
    public static MET_NLT_TIME_LOWER = "met nlt time";
    public static DELAYED_DELIVERY_LOWER = "delayed delivery";
    
    public static MET_GOAL_TIME = "Met Goal Time";
    public static FAILED_DELIVERY = "Failed Delivery";
    public static MET_NLT_TIME = "Met NLT Time";
    public static DELAYED_DELIVERY = "Delayed Delivery";
    
    public static WARNING_CLASS = "warning";
    public static SUCCESS_CLASS = "success";
    public static ACTIVE_CLASS = "active";
    public static DANGER_CLASS = "danger";
    //public static 
    public static CHANGE_IN_SLA = "change_in_slas";
    public static CHANGE_IN_INTEGRATION_FLOW = "change_in_int_flow";
    public static CHANGE_IN_DAILY_SUMM = "change_in_daily_summ";
    public static CHANGE_IN_LATEST_SUMM = "change_in_latest_summ";
    
    public static SOCKET_URL = "http://localhost:3007";
}


export class HTML_CONSTANTS {
    public static SLA_CONFIG_KEY = "SLA_CONFIG_KEY";
    public static LOS = "LOS";
    public static SLA_NAME = "SLA_NAME";
    public static SLA_CATEGORY = "SLA_CATEGORY";
    public static FREQUENCY = "FREQUENCY";
    public static RUN_DATE = "RUN_DATE";
    public static SLA_DELIVERY_TS = "SLA_DELIVERY_TS";
    public static SLA_DELIVERY_STAT = "SLA_DELIVERY_STAT";
    public static SLA_GOAL_TIME = "SLA_GOAL_TIME";
    public static SLA_NLT_TIME = "SLA_NLT_TIME";
    public static SLA_DELAY_TIME = "SLA_DELAY_TIME";
    public static INTG_FLOW_KEY = "INTG_FLOW_KEY"; 
    public static ACT_IND = "ACT_IND";
    public static INTG_EXEC_SEQ = "INTG_EXEC_SEQ";   
}