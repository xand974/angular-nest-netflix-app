import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../pages/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = localStorage.getItem('user-profile') ?? null;
    return user !== null;
    // return this.loginService
    //   .checkAuth()
    //   .then((res) => {
    //     if (res) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/login'], {
    //         queryParams: { returnUrl: state.url },
    //       });
    //       return false;
    //     }
    //   })
    //   .catch((err) => {
    //     this.router.navigate(['/login'], {
    //       queryParams: { returnUrl: state.url },
    //     });
    //     return false;
    //   });
  }
}
