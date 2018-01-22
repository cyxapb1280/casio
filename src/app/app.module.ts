import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { CalcComponent } from './calc/calc.component';

import { StoreModule } from '@ngrx/store';
import { calcReducer } from './reducers';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { CalcNumberPipe } from './calc-number.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    CalcComponent,
    KeyboardComponent,
    KeyboardComponent,
    CalcNumberPipe
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ calc: calcReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
