import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login' ,
    pathMatch: 'full'
  },
  {
  path: 'login',
  loadComponent: () => import("./login/login.page").then((m) => m.LoginPage)
  },
  {
    path: 'admin',
    loadComponent: () => import("./admin/admin.page").then((m) => m.AdminPage)
  },
  {
    path: 'guest',
    loadComponent: () => import("./guest/guest.page").then((m) => m.GuestPage)
  },
  {
    path: '**',
    redirectTo:'login'
  }


];
