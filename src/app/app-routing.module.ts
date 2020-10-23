import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoFormComponent } from './contato/form/contato-form.component';
import { ContatoListComponent } from './contato/list/contato-list.component';

const routes: Routes = [	  
  { path: 'contatos', component: ContatoListComponent },
  { path: 'addcontato', component: ContatoFormComponent },
  { path: 'editcontato/:id', component: ContatoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
