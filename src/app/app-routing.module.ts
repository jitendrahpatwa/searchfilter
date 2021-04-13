import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchviewComponent } from './pages/searchview/searchview.component';

const routes: Routes = [
  {
    path: '',
    component: SearchviewComponent
  },
  {
    path: '**',
    component: SearchviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
