import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppService } from 'src/app/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analytique',
  templateUrl: './analytique.component.html',
  styleUrls: ['./analytique.component.css']
})
export class AnalytiqueComponent implements OnInit {
  
    myScriptElement: HTMLScriptElement | undefined;
    filiereId: number | undefined;
  
  /** Based on the screen size, switch from standard to one column per row */
  


  constructor(private breakpointObserver: BreakpointObserver, private service: AppService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src = ' https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement);}
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.filiereId = params['filiereId'];});
     
    }

}
