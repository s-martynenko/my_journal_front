import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-photo-change',
  templateUrl: './photo-change.component.html',
  styleUrls: ['./photo-change.component.scss']
})
export class PhotoChangeComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

}
