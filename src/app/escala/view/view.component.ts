import { Component, OnInit } from '@angular/core';
import { EscalaService } from '../escala.service';
import { ActivatedRoute } from '@angular/router';
import { Escala } from '../escala';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 
  id: string;
  escala: Escala;
  constructor(
    private activatedRoute: ActivatedRoute,
    private escalaService: EscalaService,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.escalaService.getById(this.id).subscribe(
        data => {
          this.escala = data;
        }
      )
    }
  }

}