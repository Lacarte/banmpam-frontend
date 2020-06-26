import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AppUserAuth } from 'src/app/security/app-user-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // form: FormGroup;
  private formSubmitAttempt: boolean;
    securityObject: AppUserAuth = null;



  public loginForm: FormGroup = new FormGroup({
    $key: new FormControl(null),

    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
  });

  constructor(
    // private fb: FormBuilder,
    public authService: AuthService, private sidebarService: SidenavService
  ) {
    this.securityObject = this.authService.securityObject;
  }





  ngOnInit() {
    // this.form = this.fb.group({
    //// userName: ['', Validators.required],
    // password: ['', Validators.required]
    // });
    this.sidebarService.hide();
    console.log('Init');

  }


  ngAfterViewInit() {
    // doing something with my ViewChild
    // this.sidebarService.hide();

  }

  // isFieldInvalid(field: string) {
  //   return (
  //     (!this.form.get(field).valid && this.form.get(field).touched) ||
  //     (this.form.get(field).untouched && this.formSubmitAttempt)
  //   );
  // }


  public initializeFormGroup() {
    this.loginForm.setValue({
      $key: null,
      username: '',
      password: '',
    });
  }



  onSubmit() {

  console.log( this.securityObject);

  if (this.loginForm.valid) {
        this.authService.auth(this.loginForm.get('username').value, this.loginForm.get('password').value);
        console.log(this.loginForm.value);
    }
    //   this.formSubmitAttempt = true;
  }

}
