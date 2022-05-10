import { Directive,OnInit,Renderer2,ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string= 'transparent';
  @Input('appBetterHighlight') highlightColor:string ='blue';
  @HostBinding('style.backgroundColor') backgroundColor!:string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor=this.defaultColor;
  //  this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'red');
  }

  @HostListener('mouseover') mouseover(eventData: MouseEvent) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'red');
    //this.backgroundColor = 'blue';//@HostBinding('style.backgroundColor') ın satırı
    this.backgroundColor=this.highlightColor;//@Input kullanım satırı
  }

  @HostListener('mouseleave') mouseleave(eventData: MouseEvent) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent');
    //this.backgroundColor= 'transparent';//@HostBinding('style.backgroundColor') ın satırı
    this.backgroundColor=this.defaultColor// @Input() kullanım satırı
  }

}
