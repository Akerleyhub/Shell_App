import { Component } from '@angular/core';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.css']
})

// Adding instrument
export class InstrumentComponent {
  instrumentSerial: number=0; //this should be the serial.next value
  instrumentName: string="";
  instrumentDescription:string="";

  addInstrument(){
    //call Service here to send the data
    
  }
}
