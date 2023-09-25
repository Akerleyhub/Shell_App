import { Component } from '@angular/core';

@Component({
  selector: 'app-new-interp-pattern',
  templateUrl: './new-interp-pattern.component.html',
  styleUrls: ['./new-interp-pattern.component.css']
})
export class NewInterpPatternComponent {
  id: string="";
  name:string="";
  description:string="";
  context:string="";

  selected = 0;
  pattern_styles: any[] = [
    {style_id: 1, description: 'VALUE'},
    {style_id: 2, description: 'MNEUMONIC VALUE'}
  ];

  submit(){
    console.log(this.id,this.name,this.description);
  }
}
