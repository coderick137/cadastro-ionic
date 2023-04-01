import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: 'clientes',
    loadComponent: () => import('./clientes/clientes.component').then((m) => m.ClientesComponent),
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full',
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
