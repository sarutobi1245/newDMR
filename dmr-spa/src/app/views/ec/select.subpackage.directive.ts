import { Directive, AfterViewInit, ElementRef, OnDestroy, OnChanges, HostListener, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IScanner } from 'src/app/_core/_model/IToDoList';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[autoselectsubpackage]'
})
export class AutoSelectSubpackageDirective implements AfterViewInit, OnInit, OnDestroy {
  subject = new Subject<string>();
  subscription: Subscription[] = [];
  @HostListener('focus') onFocus() {
    setTimeout( () => {
      this.host.nativeElement.select();
    }, 300);
  }
  @HostListener('focusout', ['$event']) onFocusout(value) {
    setTimeout(() => {
      this.host.nativeElement.focus();
      this.host.nativeElement.select();
    }, 30000);
  }
  @HostListener('ngModelChange', ['$event']) onChange(value) {
    this.subject.next(value);
  }
  constructor(private host: ElementRef ) { }
  ngAfterViewInit() {
    setTimeout(() => {
      this.host.nativeElement.focus();
    }, 300);
  }
  ngOnInit() {
    this.subscription.push(this.subject
      .pipe(debounceTime(1000))
      .subscribe(async (arg) => {
        this.host.nativeElement.focus();
        this.host.nativeElement.select();
      }));
  }
  ngOnDestroy() {
    this.subscription.forEach(item => item.unsubscribe());
  }
  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    console.log('document:keydown.enter');
    event.preventDefault();
    this.host.nativeElement.value = this.host.nativeElement.value + '    ';
  }
  @HostListener('document:keydown.tab', ['$event'])
  onKeydownTabHandler(event: KeyboardEvent) {
    console.log('document:keydown.tab');
    event.preventDefault();
    this.host.nativeElement.value = this.host.nativeElement.value + '    ';
  }
}
