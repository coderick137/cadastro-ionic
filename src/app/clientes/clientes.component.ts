import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ClientesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
