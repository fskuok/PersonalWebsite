(function(win) {

    var SM = win.siteModel = {
        pages: {
            "home": {},
            "project":{}
        },
        preloadImages : [
            'img/icons/icons_scroll_indicator.png'
        ],
        links : {
            "Vishal Pallikandi": "http://vishalpallikandi.wix.com/portfolio",
            "Stamp Siripanich": "http://www.stampsiripanich.com",
            "Hanyue Hu": "http://hanyue.me",
            "Behnam Heydari": "http://behnamheydari.com",
            "Wei-Hsun Chen": "http://www.weihsunchen.com"
        }
    };



    SM.pages.project.categories = [
        {
            "name": "digital",
            "projects":[
                {
                    "name": "triends",
                    "description": "How Location-based Social Service Be More Personalized ?",
                    "year": "2014",
                    "duration": "3 Months",
                    "type": "Mobile App Design",
                    "process": ["Interviews", "Questionnaires", "Wireframing", "Prototyping", "UI Design", "HTML App Developing", "Market Analysis"]
                },{
                    "name": "responsive mobile ui",
                    "description": "How Big Screen Mobile Phone Interface Caters Ergonomics ?",
                    "year": "2013",
                    "duration": "2 Months",
                    "type": "UI Study & Design",
                    "process": ["Ergonomics Research", "UI Design"]
                },{
                    "name": "river sunvelop",
                    "description": "A Website for Architecture",
                    "year": "2012",
                    "duration": "6 Months",
                    "type": "Website Design & Development",
                    "process": ["UI Design", "Front End Development", "Website Management"]
                }
            ]
        },{
            "name": "connected",
            "projects":[
                {
                    "name": "hicool",
                    "description": "Re-imagine the First-aid-kit for Hikers",
                    "year": "2014",
                    "duration": "3 Weeks",
                    "type": "Product & App Design",
                    "process": ["Research", "Concept Generation", "Prototyping", "Interface Design"],
                    "team": ["Behnam Heydari", "Wei-Hsun Chen"],
                    "role": "Shared work in research, concept generation; Fully designed graphics, mobile app interfaces, built 3D Models;"
                },{
                    "name": "meeting room",
                    "description": "Envision the Smart Meeting Room",
                    "year": "2014",
                    "duration": "2 Months",
                    "type": "Internet of Things Design",
                    "process": ["Research", "Concept Generation", "Prototyping", "IoT System Developing", "Web Developing"],
                    "team": ["Behnam Heydari", "Hanyue Hu", "Stamp Siripanich", "Vishal Pallikandi"],
                    "role": "Shared work in research, concept generation; Fully designed and developed Agenda Board; Presentable illustrations"
                }/*,{
                 "name": "sit down and talk",
                 "description": "connection devices",
                 "year": "2015",
                 "team": "Teamwork"
                 }*/
            ]
        },{
            "name": "physical",
            "projects": [
                {
                    "name": "birdhouse",
                    "description": "What Will Birdhouse for Apartment Residents Be Like ?",
                    "year": "2014",
                    "duration": "2 weeks",
                    "type": "Product Design",
                    "process": ["User Research", "Market Research", "Concept Developing", "Prototyping", "Detail Design", "Design Illustration"]

                },{
                    "name": "laser level",
                    "description": "Building The New Generation Laser Level",
                    "type": "Product Design",
                    "year": "2013",
                    "duration": "2 weeks",
                    "team": ["Supported by two Industrial Designers"],
                    "role": "Individually worked on prototyping, ergonomics study, and 3D model building; Shared works in concept generation and form design.",
                    "process": ["User Research", "Prototyping", "Ergonomics Study", "Form Design", "Design Illustration"]
                },{
                    "name": "creek on bridge",
                    "description": "A Table Design Inspired by Nature",
                    "type": "Furniture Design",
                    "year": "2013",
                    "duration": "1 Month",
                    "process": ["Form Design", "Model Making"]
                },{
                    "name": "structure",
                    "description": "Creating A Structure That Supports Weight That Is 300x of Its Own Weight",
                    "year": "2011",
                    "duration": "2 Month",
                    "type": "Structure Design",
                    "team": ["Dong Peng", "Hailin Wang"]
                }
            ]
        }
    ];

})(window);
