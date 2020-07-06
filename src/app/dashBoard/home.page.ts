import { Component , OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( public storage :Storage) {

    
  }

  ngOnInit() {

    this.storage.get('firstname').then((firstnameVal) => {
   
      this.storage.get('lastname').then((lastnameVal)=>{
        document.getElementById('message').innerHTML=`Hello <b>${firstnameVal} ${lastnameVal} </b>`
      })
      
  
    });

  }


}
