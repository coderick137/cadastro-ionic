import { Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  cliente: Cliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    telefone: ''
  };

  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.clientesService.getClientById(id).subscribe({
      next: (cliente) => this.cliente = cliente,
      error: (error) => console.log(error)
    });
  }

}
