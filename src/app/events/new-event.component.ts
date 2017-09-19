import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { Sport } from '../shared/sport.model';
import { SportService } from '../shared/sport.service';
import { District } from '../shared/district.model';
import { User } from '../user/user';

import { DistrictService } from '../shared/district.service';
// import { AuthenticationService } from "../user/authentication.service";
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  sports:any[] = [];
  districts:any[] = [];
  userId:number;
  user: User;
  beginner: boolean = false;
  intermediate: boolean = false;  
  advanced: boolean = false;

  toggleBeginner(){
    this.beginner = !this.beginner
  }

  toggleIntermediate(){
    this.intermediate = !this.intermediate
  }

  toggleAdvanced(){
    this.advanced = !this.advanced
  }

  constructor(private eventService:EventService, private router:Router,
    private sportService:SportService, private districtService:DistrictService,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    
    this.sportService.getSports().then(sports => {
      this.sports = sports;
    });
    this.districtService.getDistricts().then(districts => {
      this.districts = districts;
    });
  }

  levelArray(){
    let arr = []
    if (this.beginner == true) {
      arr.push('beginner')
    }
    if (this.intermediate == true) {
      arr.push('intermediate')
    }
    if (this.advanced == true) {
      arr.push('advanced')
    }
    return arr
  }

  add(formValues:any) {
    let newForm = formValues;
    newForm.level = this.levelArray()
    this.eventService.create(newForm)
      .then((event) => {
        this.router.navigate(['/events']);
      });
  }

  closeForm(): void {
    window.scrollTo(0, 0);        
    this.router.navigate(['/events']);
  }

}
