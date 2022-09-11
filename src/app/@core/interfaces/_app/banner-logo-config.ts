


 //----------------------------- Config  -----------------------------//


 export interface Config {
    banner: {
        id: number
        image : string
        link: string
    }[];
    config: {
        class:string;
        slidesToShow: number;
        slidesToScroll: number;
        dots: boolean;
        autoplay: boolean;
        autoplaySpeed: number;
        responsive?: {
             breakpoint: number,
             settings: {
                slidesToShow:number 
            }
        } []
    };
    
  }
  
  export const BannerConfig : Config = {
    banner: [],
    config:{
        "class":"banner",
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 3000,

    }
  }
  
  
  export const logoConfig : Config = {
    banner: [],
    config:{
    "class":"",
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "dots": false,
    "autoplay": true,
    "autoplaySpeed": 5000,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1
        }
        }
    ]
    }, 
  }
  
  
  
  
  