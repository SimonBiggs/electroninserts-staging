import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service'

@Component({
  selector: 'app-dicom',
  templateUrl: './dicom.component.html',
  styleUrls: ['./dicom.component.css']
})
export class DicomComponent implements OnInit {

  constructor(
    private myTitleService: TitleService
  ) { }

  ngOnInit() {
    this.myTitleService.set('DICOM Insert Shape Extraction');
  }
}