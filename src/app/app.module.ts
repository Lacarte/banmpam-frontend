import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SendComponent } from './components/process/send/send.component';
import { ReceiveComponent } from './components/process/receive/receive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './components/login/login.component';
import { ReceiveTableComponent } from './components/process/receive/receive-table/receive-table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProcessComponent } from './components/process/process.component';
import { MainDashboardComponent } from './components/dashboards/main-dashboard/main-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DialogPickSenderComponent } from './components/dialogs/dialog-pick-sender/dialog-pick-sender.component';
import { TablePickSenderComponent } from './components/dialogs/dialog-pick-sender/table-pick-sender/table-pick-sender.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ServiceRegister } from './services/service.register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablePickReceiverComponent } from './components/dialogs/dialog-pick-sender/table-pick-receiver/table-pick-receiver.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogSendConfirmationComponent } from './components/dialogs/dialog-send-confirmation/dialog-send-confirmation.component';
import { DialogSendHistoryComponent } from './components/dialogs/dialog-send-history/dialog-send-history.component';
import { SendHistoryTableComponent } from './components/dialogs/dialog-send-history/send-history-table/send-history-table.component';
import { SendHistoryComponent } from './components/dialogs/dialog-send-history/send-history/send-history.component';
import { NgxPrintModule } from 'ngx-print';
import { DialogDeliverConfirmationComponent } from './components/dialogs/dialog-deliver-confirmation/dialog-deliver-confirmation.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DialogLogoutComponent } from './components/dialogs/dialog-logout/dialog-logout.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'process', component: ProcessComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginComponent },
   { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SendComponent,
    ReceiveComponent,
    SidenavComponent,
    LoginComponent,
    ReceiveTableComponent,
    ToolbarComponent,
    ProcessComponent,
    MainDashboardComponent,
    NotFoundComponent,
    DialogPickSenderComponent,
    TablePickSenderComponent,
    TablePickReceiverComponent,
    AdminDashboardComponent,
    DialogSendConfirmationComponent,
    DialogSendHistoryComponent,
    SendHistoryTableComponent,
    SendHistoryComponent,
    DialogDeliverConfirmationComponent,
    DialogLogoutComponent,
  ],
  imports: [
   RouterModule.forRoot(
     appRoutes,
      //  { enableTracing: true } // <-- debugging purposes only
          ),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    ClipboardModule
    ],
  providers: [ServiceRegister, AuthService],
  bootstrap: [AppComponent],
  exports: [LoginComponent, RouterModule],
  entryComponents: [DialogPickSenderComponent, DialogSendConfirmationComponent, DialogSendHistoryComponent,
    DialogDeliverConfirmationComponent, DialogLogoutComponent],

})

export class AppModule { }
