import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { OrderModule } from './order/order.module';

import { AppComponent } from './app.component';
//import { EmptyComponent } from './empty.component';
//import { OrderItemComponent } from './item.component';

import { ShortLargeStringsPipe } from './pipes/short-large-strings.pipe';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
//		EmptyComponent,
//		OrderItemComponent,
		ShortLargeStringsPipe
	],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [
		ShortLargeStringsPipe
	],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}