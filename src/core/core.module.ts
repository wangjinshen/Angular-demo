import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { SelectivePreloadingStrategyService } from './services/selective-preloading-strategy/selective-preloading-strategy.service';
import { HttpClientService } from './services/http-client/http-client.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    exports: [],
    providers: []
})
export class CoreModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                SelectivePreloadingStrategyService,
                HttpClientService,
            ]
        };
    }
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

