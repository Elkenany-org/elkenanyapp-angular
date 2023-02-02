import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AccessibilityConfig, Image, ImageEvent } from '@ks89/angular-modal-gallery';
import { number } from 'echarts';
@Component({
  selector: 'app-gallery-carouel',
  templateUrl: './gallery-carouel.component.html',
  styleUrls: ['./gallery-carouel.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GalleryCarouelComponent implements OnInit,OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
  //  console.log( changes['images'].currentValue)   
  }


  @Input() images?:{id?:number, image:string}[] 
  imageIndex = 1;
  galleryId = 1;
  autoPlay = true;
  showArrows = true;
  showDots = true;

  imagesRect: Image[] = [


  ];
  ngOnInit(): void {
    for(let i=0; i< this.images!.length; i++) {
        this.imagesRect.push(    new Image(i, { img: this.images![i].image }, { img: this.images![i].image }),)
        // console.log(this.images![i].image)
    }
    // console.log(this.images)
  }




  accessibilityConfig: AccessibilityConfig = {
    backgroundAriaLabel: 'CUSTOM Modal gallery full screen background',
    backgroundTitle: 'CUSTOM background title',

    plainGalleryContentAriaLabel: 'CUSTOM Plain gallery content',
    plainGalleryContentTitle: 'CUSTOM plain gallery content title',

    modalGalleryContentAriaLabel: 'CUSTOM Modal gallery content',
    modalGalleryContentTitle: 'CUSTOM modal gallery content title',

    loadingSpinnerAriaLabel: 'CUSTOM The current image is loading. Please be patient.',
    loadingSpinnerTitle: 'CUSTOM The current image is loading. Please be patient.',

    mainContainerAriaLabel: 'CUSTOM Current image and navigation',
    mainContainerTitle: 'CUSTOM main container title',
    mainPrevImageAriaLabel: 'CUSTOM Previous image',
    mainPrevImageTitle: 'CUSTOM Previous image',
    mainNextImageAriaLabel: 'CUSTOM Next image',
    mainNextImageTitle: 'CUSTOM Next image',

    dotsContainerAriaLabel: 'CUSTOM Image navigation dots',
    dotsContainerTitle: 'CUSTOM dots container title',
    dotAriaLabel: 'CUSTOM Navigate to image number',

    previewsContainerAriaLabel: 'CUSTOM Image previews',
    previewsContainerTitle: 'CUSTOM previews title',
    previewScrollPrevAriaLabel: 'CUSTOM Scroll previous previews',
    previewScrollPrevTitle: 'CUSTOM Scroll previous previews',
    previewScrollNextAriaLabel: 'CUSTOM Scroll next previews',
    previewScrollNextTitle: 'CUSTOM Scroll next previews',

    carouselContainerAriaLabel: 'Current image and navigation',
    carouselContainerTitle: '',
    carouselPrevImageAriaLabel: 'Previous image',
    carouselPrevImageTitle: 'Previous image',
    carouselNextImageAriaLabel: 'Next image',
    carouselNextImageTitle: 'Next image',
    carouselPreviewsContainerAriaLabel: 'Image previews',
    carouselPreviewsContainerTitle: '',
    carouselPreviewScrollPrevAriaLabel: 'Scroll previous previews',
    carouselPreviewScrollPrevTitle: 'Scroll previous previews',
    carouselPreviewScrollNextAriaLabel: 'Scroll next previews',
    carouselPreviewScrollNextTitle: 'Scroll next previews'
  };



  addRandomImage() {
    const imageToCopy: Image = this.imagesRect[Math.floor(Math.random() * this.imagesRect.length)];
    const newImage: Image = new Image(this.imagesRect.length - 1 + 1, imageToCopy.modal, imageToCopy.plain);
    this.imagesRect = [...this.imagesRect, newImage];
  }

  onChangeAutoPlay() {
    this.autoPlay = !this.autoPlay;
  }

  onChangeShowArrows() {
    this.showArrows = !this.showArrows;
  }

  onChangeShowDots() {
    this.showDots = !this.showDots;
  }

  // output evets
  onShow(event: any) {
    console.log('show', event);
  }

  onFirstImage(event: any) {
    console.log('firstImage', event);
  }

  onLastImage(event: any) {
    console.log('lastImage', event);
  }
}
