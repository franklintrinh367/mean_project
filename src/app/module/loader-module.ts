import { NgModule } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { LoaderInterceptor } from "../interceptors/LoaderInterceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    providers: [
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        }
    ]
})
export class LoaderModule {}