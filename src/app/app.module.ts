import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SlasComponent } from './slas/slas.component';
import {DashboardComponent } from './dashboard/dashboard.component';
import {SlasService} from './services/slas.services';

import { RouterModule, Routes } from '@angular/router';
import { PieChartDirective } from './pie-chart.directive';
import { BarChartDirective } from './bar-chart.directive';
import { LoadingComponent } from './loading/loading.component';
import { ParseDatePipe } from './parse-date.pipe';
import { SlaLatestSummaryComponent } from './sla-latest-summary/sla-latest-summary.component';
import { SlaDailySummaryComponent } from './sla-daily-summary/sla-daily-summary.component';
import { IntegrationFlowComponent } from './integration-flow/integration-flow.component';



const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'slas', component: SlasComponent },
  { path: 'slas/latest/summary', component: SlaLatestSummaryComponent},
  { path:'slas/daily/summary', component:SlaDailySummaryComponent},
  { path:'slas/integration/flow', component:IntegrationFlowComponent}
   
  
];


@NgModule({
  declarations: [
    AppComponent,
    SlasComponent,
    DashboardComponent,
    PieChartDirective,
    BarChartDirective,
    LoadingComponent,
    ParseDatePipe,
    SlaLatestSummaryComponent,
    SlaDailySummaryComponent,
    IntegrationFlowComponent
  ],
  imports: [
    BrowserModule, HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [SlasService,ParseDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
