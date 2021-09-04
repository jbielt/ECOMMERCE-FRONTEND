import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import {LocalstorageService} from "../services/localstorage.service";

@Injectable()
export class UsersEffects {

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if(this.localstorageService.isValidToken()) {

      } else {

      }
    })
  ))

  constructor(private readonly actions$: Actions,
              private localstorageService: LocalstorageService) {}
}
