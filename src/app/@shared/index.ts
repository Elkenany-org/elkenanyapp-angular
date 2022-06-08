import { CarouselComponent } from "./components/carousel/carousel.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SubmitButtonComponent } from "./components/form/submit-button/submit-button.component";
import { CardComponent } from "./components/app/card/card.component";
import { HorizontalSearchComponent } from "./components/app/horizontal-search/horizontal-search.component";
import { VerticalSearchComponent } from "./components/app/vertical-search/vertical-search.component";
import { DropdownDirective } from "@app/dropdown.directive";
import { LayoutComponent } from "./components/layout/layout.component";
import { AlertComponent } from "./components/alert/alert.component";
import { CvaComponent } from './components/form/cva/cva.component';
import { LoaderComponent } from "./components/loader/loader.component";
import { BannerLogosComponent } from "./components/app/banner-logos/banner-logos.component";
import { NavigationComponent } from "./components/app/navigation/navigation.component";
import { NoDataComponent } from './pages/no-data/no-data.component';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { GalleryCarouelComponent } from './components/gallery-carouel/gallery-carouel.component';


export  const pipes: any[] = [
    ShortDatePipe
];


export  const components: any[] = [
    CarouselComponent,
    NotFoundComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    DropdownDirective,
    SubmitButtonComponent,
    CardComponent,
    VerticalSearchComponent,
    HorizontalSearchComponent,
    AlertComponent,
    CvaComponent,
    LoaderComponent,
    NavigationComponent,
    BannerLogosComponent,

    NoDataComponent,

    GalleryCarouelComponent

    
];