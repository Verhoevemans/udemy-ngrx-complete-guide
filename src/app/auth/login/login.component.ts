import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';

import { AuthActions } from '../action-types';
import { AuthService } from '../auth.service';
import { AuthState } from '../reducers';
import { AppState } from '../../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });
  }

  ngOnInit() {

  }

  login() {
    const formValue = this.form.value;
    this.authService.login(formValue.email, formValue.password)
      .subscribe({
        next: (user) => {
          this.store.dispatch(AuthActions.login({ user }));
          this.router.navigateByUrl('/courses');
        },
        error: () => alert('Login Failed')
    });
  }
}

