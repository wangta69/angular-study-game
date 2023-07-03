import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LectureComponent1 } from './pages/1-lecture/lecture.component';
import { LectureComponent2 } from './pages/2-lecture/lecture.component';
import { LectureComponent3 } from './pages/3-lecture/lecture.component';
import { LectureComponent4 } from './pages/4-lecture/lecture.component';
import { LectureComponent4Rotate } from './pages/4-lecture/rotate.component';
import { LectureComponent4SaveRestore } from './pages/4-lecture/save-restore.component';

const routes: Routes = [
  { path: 'lecture-1/canvas', component: LectureComponent1 },
  { path: 'lecture-2/canvas', component: LectureComponent2 },
  { path: 'lecture-3/canvas', component: LectureComponent3 },
  { path: 'lecture-4/canvas', component: LectureComponent4 },
  { path: 'lecture-4-rotate/canvas', component: LectureComponent4Rotate },
  { path: 'lecture-4-save-restore/canvas', component: LectureComponent4SaveRestore },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
