import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appImageCache]'
})
export class ImageCacheDirective implements AfterViewInit {
  @Input() cache: string;

  constructor(public el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.crossOrigin = null; // CORS enabling
    const cache = localStorage.getItem(this.cache);
    if (cache) {
      this.el.nativeElement.src = cache;
    } else {
      this.cacheImage();
    }
  }

  cacheImage() {
    const request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(this.cache, reader.result as string);
        this.el.nativeElement.src = reader.result;
      };
      reader.readAsDataURL(request.response);
    };

    request.onerror = (error) => {
      console.log(error, 'error on load...');
    };

    const url = this.cache;

    request.open('GET', url);
    request.send();
  }
}
