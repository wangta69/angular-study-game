import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LectureComponent1 } from './pages/1-lecture/lecture.component';
import { LectureComponent2 } from './pages/2-lecture/lecture.component';
import { LectureComponent3 } from './pages/3-lecture/lecture.component';
import { LectureComponent4 } from './pages/4-lecture/lecture.component';
import { LectureComponent4Rotate } from './pages/4-lecture/rotate.component';
import { LectureComponent4SaveRestore } from './pages/4-lecture/save-restore.component';

@NgModule({
  declarations: [
    AppComponent,
    LectureComponent1,
    LectureComponent2,
    LectureComponent3,
    LectureComponent4,
    LectureComponent4Rotate,
    LectureComponent4SaveRestore
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
