import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';
let EmailForTheCurrentUser = 'null'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class login implements OnInit {

  validations_form: FormGroup;



  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public storage: Storage
  ) { }

  ngOnInit() {



    this.validations_form = this.formBuilder.group({


      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required,
      ])),

    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 7 characters long.' },
    ],
  };

  onSubmit(values) {
   
    this.storage.get('email').then(emailVal => {
      this.storage.get('password').then(passwordVal => {

        if (values['email'] == emailVal && values['password'] == passwordVal) {
          this.router.navigate(['/dashBoard'])
        }
        else{
          document.getElementById('logInFaild').innerHTML="invalid information"
        }


      })

    })

    
    

   
  }
}
