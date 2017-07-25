/*export class Slas{
    SLA_LOG_KEY :number;
    SLA_CONFIG_KEY:number;
    RUN_DATE:string;
    SLA_DELIVERY_TS:string;
    SLA_DELIVERY_STAT:string;
    INTERVENTION_IND:string;
}*/

export class Slas{
    metaData:[string];
    rows:[any];    

}


export interface Frequency {
  letter: string,
  frequency: number
}

export class PieSlas{
     label :string
     value :number
}





