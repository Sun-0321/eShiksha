import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginComponent } from "../pages/login/login.component";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";

const TOKEN_HEADER = 'Authorization';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


    constructor(private loginService: LoginService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        //add jwt token from localstorage request
        const token = this.loginService.getToken();
        console.log("inside interceptor");

        let authReq = req;
        if (token != null) {
            authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];