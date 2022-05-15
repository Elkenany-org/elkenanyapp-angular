
export interface Config {
    images: {
        img : string
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
    }
 }





export const Multi_banner : Config = {
    images: [],
    config:{
    "class":"",
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 3000,
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


export const banner_header : Config = {
    images: [],
    config:{
        "class":"",
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": true,
        "autoplay": true,
       "autoplaySpeed": 3000,
    }
}

export const banner_sub_header : Config = {
    images: [],
    config:{
        "class":"banner",
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": false,
        "autoplay": true,
       "autoplaySpeed": 3000,
    }
}

///////////////////////////////////////

 export interface Config_test {
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
    }
 }
export const Banner_test : Config_test = {
    banner: [],
    config:{
        "class":"banner",
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": false,
        "autoplay": true,
       "autoplaySpeed": 3000,
    }
}


export const logo_test : Config_test = {
    banner: [],
    config:{
    "class":"",
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 3000,
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



