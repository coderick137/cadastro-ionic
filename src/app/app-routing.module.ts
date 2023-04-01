import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientesPage } from './clientes/clientes.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    component: ClientesPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
