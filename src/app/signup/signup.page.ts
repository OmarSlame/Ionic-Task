import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
 

 

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public storage :Storage
  ) { }

  ngOnInit() {
   
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(7),
        Validators.required,
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

   
    this.validations_form = this.formBuilder.group({
     
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First Name is required.' },
      {type: 'minlength', message: 'First Name must be at least 3 characters long.'}
    ],
    'lastname': [
      { type: 'required', message: 'Last Name is required.' },
      {type: 'minlength', message: 'Last Name must be at least 3 characters long.'}
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 7 characters long.' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
  };

  onSubmit(values){
  
    this.storage.set('firstname',values['firstname'])
    this.storage.set('lastname',values['lastname'])
    this.storage.set('email',values['email'])
    this.storage.set('password' , values['matching_passwords']['password'])

    this.router.navigate(["/login"]);
  }
}
