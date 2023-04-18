


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
        centerMode?: boolean;
        centerPadding?:any;
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
        // "centerMode": true,
        // "centerPadding": '20px',
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 2000,

    }
  }
  
  
  export const logoConfig : Config = {
    banner: [],
    config:{
    "class":"",
    "slidesToShow": 5,
    "slidesToScroll": 5,
    "dots": false,
    "autoplay": true,
    "autoplaySpeed": 5000,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 4
        }
        },
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 3
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 2
        }
        },
        {
        breakpoint:320,
        settings: {
            slidesToShow: 1
        }
        }
    ]
    }, 
  }
  
  
  export const logoConfig1 : Config = {
    banner: [],
    config:{
    "class":"",
    "slidesToShow": 6,
    "slidesToScroll": 6,
    "dots": false,
    "autoplay": true,
    "autoplaySpeed": 5000,

    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 4
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 3
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 2
        }
        }
    ]
    }, 
  }
  
  export const MainBannerConfig : Config = {
    banner: [],
    config:{
        "class":"banner",
        "slidesToShow": 3,
        "slidesToScroll": 1,
        "centerMode": true,
        "centerPadding": '20px',
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 2000,

    }
  }

  
  export const mostvisitedConfig : Config = {
    banner: [],
    config:{
        "class":"banner",
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 2000,
    responsive: [
        {
        breakpoint: 1324,
        settings: {
            slidesToShow: 3
        }
        },
        {
        breakpoint: 900,
        settings: {
            slidesToShow: 2
        }
        },
        {
        breakpoint: 700,
        settings: {
            slidesToShow: 1
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

  export const newestservicesConfig : Config = {
    banner: [],
    config:{
        "class":"banner",
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 2000,
    responsive: [
        {
        breakpoint: 1324,
        settings: {
            slidesToShow: 3
        }
        },
        {
        breakpoint: 900,
        settings: {
            slidesToShow: 2
        }
        },
        {
        breakpoint: 700,
        settings: {
            slidesToShow: 1
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

  export const questionsConfig : Config = {
    banner: [],
    config:{
        "class":"banner",
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 2000,
    responsive: [
        {
        breakpoint: 1324,
        settings: {
            slidesToShow: 3
        }
        },
        {
        breakpoint: 900,
        settings: {
            slidesToShow: 2
        }
        },
        {
        breakpoint: 700,
        settings: {
            slidesToShow: 1
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
