(function(win) {

    var sM = win.siteModel = {};

    siteModel.pages = {
        "home": {
            "disciplines": [
                {
                    "name": "UX Design",
                    "iconUrl": "",
                    "text": "",
                    "detail": {
                        "text": "UX Design in blablabla de lda adeat aloa",
                        "skills": {
                            "Photoshop": 7,
                            "Illustrator": 8
                        }
                    }
                },
                {
                    "name": "UI Design",
                    "iconUrl": "",
                    "text": "",
                    "detail": {
                        "text": "",
                        "skills": {
                            "Photoshop": 7,
                            "Illustrator": 8
                        }
                    }
                },
                {
                    "name": "Front-end Develop",
                    "iconUrl": "",
                    "text": "",
                    "detail": {
                        "text": "",
                        "skills": {
                            "Photoshop": 7,
                            "Illustrator": 8
                        }
                    }
                },
                {
                    "name": "Industrial Design",
                    "iconUrl": "",
                    "detail": {
                        "text": "",
                        "skills": {
                            "Photoshop": 7,
                            "Illustrator": 8
                        }
                    }


                }
            ]
        },
        "project": [
                {
                    "name": "DIGITAL",
                    "project":[
                            {
                                "name": "trend",
                                "description": "How Location-based Social Service Be More Serious",
                                "year": "2014",
                                "team": "Personal"
                            },{
                                "name": "responsive mobile ui",
                                "description": "How Big Screen Mobile Phone Screen Caters Ergonomics",
                                "year": "2013",
                                "team": "Personal"
                            },{
                                "name": "river sunvelop",
                                "description": "A Website for Architecture",
                                "year": "2012",
                                "team": "Personal"
                            }
                        ]
                },{
                    "name": "CONNECTED",
                    "project":[
                            {
                                "name": "hicool",
                                "description": "Re-imagine the First-aid-kit for Hikers",
                                "year": "2014",
                                "team": "Teamwork"
                            },{
                                "name": "meeting room",
                                "description": "Envision the Smart Meeting Room",
                                "year": "2014",
                                "team": "Teamwork"
                            }/*,{
                                 "name": "sit down and talk",
                                 "description": "connection devices",
                                 "year": "2015",
                                 "team": "Teamwork"
                            }*/
                        ]
                },{
                    "name": "PHYSICAL",
                    "project": [
                            {
                                "name": "birdhouse",
                                "description": "What Will Birdhouse for Apartment Residents Be Like",
                                "year": "2014",
                                "team": "Personal"
                            },{
                                "name": "laser level",
                                "description": "Building The New Generation Laser Level",
                                "year": "2013",
                                "team": "Teamwork"
                            },{
                                "name": "creek on bridge",
                                "description": "A Table Design Inspired by Nature",
                                "year": "2013",
                                "team": "Personal"
                            },{
                                "name": "structure",
                                "description": "How to Create A Structure That Supports Weight That Is 300x of Its Own Weight",
                                "year": "2011",
                                "team": "Teamwork"
                            }
                        ]
                }
            ],
        "about": {

        }
    };

    siteModel.preloadImages = [
        'img/icons/icons_scroll_indicator.png',
        'img/photo/'
    ];

})(window);
