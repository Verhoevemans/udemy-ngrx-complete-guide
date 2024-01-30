import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap } from 'rxjs/operators';

import { CourseActions } from './action-types';
import { CoursesHttpService } from './services/courses-http.service';
import { allCoursesLoaded } from './course.actions';
import { Update } from '@ngrx/entity';
import { Course } from './model/course';

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      switchMap(action => this.coursesHttpService.findAllCourses()),
      map(courses => allCoursesLoaded({ courses }))
    ));

    saveCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CourseActions.courseUpdated),
      switchMap((action: { update: Update<Course> }) => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
    ), { dispatch: false });

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {}
}
