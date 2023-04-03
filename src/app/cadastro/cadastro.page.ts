import { Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../services/cliente.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const NEW_MODE = 'new';
const EDIT_MODE = 'edit';
const ADD_CLIENTE_TITLE = 'Adicionar Cliente';
const EDIT_CLIENTE_TITLE = 'Editar Cliente';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})

export class CadastroPage implements OnInit {
  cliente: Cliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  }
  clienteForm: FormGroup = new FormGroup({});
  formMode: string = NEW_MODE;
  pageTitle: string = ADD_CLIENTE_TITLE;
  subscription = new Subscription;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

    ngOnInit(): void {
      this.initForm();
      this.initFormMode();
      this.initRouteParamsSubscription();
    }

    initForm(): void {
      this.clienteForm = this.fb.group({
        nome: [this.cliente.nome, [Validators.required, Validators.minLength(2)]],
        cpf: [this.cliente.cpf, [Validators.required, Validators.minLength(11)]],
        email: [this.cliente.email, [Validators.required, Validators.email]],
        telefone: [this.cliente.telefone, Validators.required]
      })
    }

    initFormMode(): void {
      const id = this.route.snapshot.params['id']
      this.formMode = id ? EDIT_MODE : NEW_MODE;
    }

    initRouteParamsSubscription(): void {
      this.subscription.add(
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');

          if (!id) {
            this.showClient(this.cliente);
          } else {
            this.getClient(+id);
          }
        })
      )
    }

    onSubmit(): void {
      this.createClient();
    }

    showClient(cliente: Cliente): void {
      this.cliente = cliente;
      
      if (this.formMode === EDIT_MODE) {
        this.pageTitle = EDIT_CLIENTE_TITLE;
      } else {
        this.pageTitle = ADD_CLIENTE_TITLE;
      }

      this.clienteForm.patchValue({
        nome: this.cliente.nome,
        cpf: this.cliente.cpf,
        email: this.cliente.email,
        telefone: this.cliente.telefone
      })
    }

    getClient(id: number): void {
      this.subscription.add(
        this.clientesService.getClientById(id).subscribe({
          next: (cliente: Cliente) => this.showClient(cliente),
          error: err => console.log(err)
        })
      );
    }

    createClient(): void {
      if (this.clienteForm.valid) {
        if (this.clienteForm.dirty) {
          const cliente: Cliente = {
            ...this.cliente,
            ...this.clienteForm.value
          }

          if (cliente.id === 0) {
            this.subscription.add(
              this.clientesService.createClient(cliente)
              .subscribe({
                next: () => this.onSaveComplete(),
                error: err => console.log(err)
              })
            )
          } else {
            this.subscription.add(
              this.clientesService.updateClient(cliente)
              .subscribe({
                next: () => this.onSaveComplete(),
                error: err => console.log(err)
              })
            )
          }
        } else {
          this.onSaveComplete();
        }
      } else {
        Object.keys(this.clienteForm.controls).forEach(key => {
          this.clienteForm.controls[key].markAsTouched();
        })
      }
    }

    onSaveComplete(): void {
      this.clienteForm.reset();
      this.router.navigate(['/clientes']);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
