import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {ProtectedRouteGuard} from './core/guards/protected-route.guard';
import {SignInRouteGuard} from './core/guards/sign-in-route.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    canActivate: [SignInRouteGuard],
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [ProtectedRouteGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./main-app/main-app.module').then(mod => mod.MainAppModule)
      }
    ]
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
