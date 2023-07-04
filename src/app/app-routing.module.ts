import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LectureComponent1 } from './pages/1-lecture/lecture.component';
import { LectureComponent2 } from './pages/2-lecture/lecture.component';
import { LectureComponent3 } from './pages/3-lecture/lecture.component';
import { LectureComponent4 } from './pages/4-lecture/lecture.component';
import { LectureComponent4Rotate } from './pages/4-lecture/rotate.component';
import { LectureComponent4SaveRestore } from './pages/4-lecture/save-restore.component';
import { LectureComponent5 } from './pages/5-lecture/lecture.component';
import { LectureComponent6 } from './pages/6-lecture/lecture.component';
import { LectureComponent6MatrixDefault } from './pages/6-lecture/lecture-matrix-default.component';
import { LectureComponent7 } from './pages/7-lecture/lecture.component';
import { LectureComponent8 } from './pages/8-lecture/lecture.component';
import { LectureComponent9 } from './pages/9-lecture/lecture.component';

const routes: Routes = [
  { path: 'lecture-1/canvas', component: LectureComponent1 },
  { path: 'lecture-2/canvas', component: LectureComponent2 },
  { path: 'lecture-3/canvas', component: LectureComponent3 },
  { path: 'lecture-4/canvas', component: LectureComponent4 },
  { path: 'lecture-4-rotate/canvas', component: LectureComponent4Rotate },
  { path: 'lecture-4-save-restore/canvas', component: LectureComponent4SaveRestore },
  { path: 'lecture-5/canvas', component: LectureComponent5 },
  { path: 'lecture-6/canvas', component: LectureComponent6 },
  { path: 'lecture-6-matrix-default/canvas', component: LectureComponent6MatrixDefault },
  { path: 'lecture-7-matrix-motion/canvas', component: LectureComponent7 },
  { path: 'lecture-8-multiobject/canvas', component: LectureComponent8 },
  { path: 'lecture-9-multiobject/canvas', component: LectureComponent9 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
