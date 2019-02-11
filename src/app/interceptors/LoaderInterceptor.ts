import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{

    private requests : HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) {}

    intercept(req : HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.loaderService.getIsLoading.next(true);

        return Observable.create(
            observer => {
                const subscription = handler.handle(req).subscribe(
                    event => {
                        if(event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },

                    err => {
                        this.removeRequest(req);
                        observer.error(err);
                    },

                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    }
                );

                return () => {
                    this.removeRequest(req);
                    subscription.unsubscribe();
                }
            }
        )
    }

    removeRequest(req: HttpRequest<any>) {
        const i  = this.requests.indexOf(req);
        if(i >= 0) {
            this.requests.splice(i, 1);
        }

        this.loaderService.getIsLoading.next(false);
    }

}