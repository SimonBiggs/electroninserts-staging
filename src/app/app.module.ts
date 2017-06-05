import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoutingModule } from './app.routing'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FurtherDetailsComponent } from './further-details/further-details.component';
import { DatabaseManagementComponent } from './database-management/database-management.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { DicomComponent } from './dicom/dicom.component';
import { ParameteriseComponent } from './parameterise/parameterise.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { UseModelComponent } from './use-model/use-model.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FurtherDetailsComponent,
    DatabaseManagementComponent,
    SpecificationsComponent,
    DicomComponent,
    ParameteriseComponent,
    CreateModelComponent,
    UseModelComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
