import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Cliente, ClientesService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.getCliente();
  }

  getCliente(): void {
    this.clientesService.getClients().subscribe({
        next: (clientes) => this.clientes = clientes,
        error: (error) => console.log(error)
    });
  }

  getClientById(id: number): void {
    this.clientesService.getClientById(id).subscribe({
        next: (cliente) => console.log(cliente),
        error: (error) => console.log(error)
    });
  }
  

}
