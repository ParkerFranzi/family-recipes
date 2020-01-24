export default {
    "users": [
        {"userId":1,"fName":"Parker","lName":"Franzi","email":"parker.franzi@gmail.com","picture": "https://www.parkerfranzi.com/wp-content/uploads/2017/08/profile-with-lucky.png", "role":"admin", "password":"qwerty"},
        {"userId":2,"fName":"Lucky","lName":"Franzi","email":"lucky.franzi@gmail.com","picture": "https://www.parkerfranzi.com/wp-content/uploads/2020/01/lucky-scaled.jpg", "role":"member", "password":"asdfg"},
        {"userId":3,"fName":"Diane","lName":"Franzi","email":"diane.franzi@gmail.com","picture": "https://www.parkerfranzi.com/wp-content/uploads/2017/08/profile-with-lucky.png", "role":"member", "password":"zxcvb"},
    ],
    "recipes": [
        {
            "recipeId":1,
            "userId":2,
            "dishName":"Sous Vide Steak",
            "description":"Transform your steak by making sure it's perfectly cooked using sous vide",
            "ingredients":{
                "1":"Thick cut of ribeye, New York, Filet or any tender steak", 
                "2":"Salt",
                "3":"Pepper",
                "4":"Garlic Powder *",
                "5":"Butter *",
            },
            "instructions":{
                "1":"Set water bath on your Sous Vide machine to rare - 125F, medium rare - 130F, medium - 138F",
                "2":"Apply generous amount of salt, pepper, and garlic powder to both sides of the steak",
                "3":"Vacuum seal or place steak in a ziplock bag with as much air removed as possible",
                "4":"Leave in bath for 1-4 hours making sure it doesn't float",
                "5":"Remove steak from bag and pat dry",
                "6":"Heat up cast iron as hot as possible, then add a little oil to the pan",
                "7":"Carefully place steak in pan and check after about 30 seconds if a good crust has formed",
                "8":"Flip the steak when ready and add some butter to the pan, when 2nd side is almost done reduce heat and baste butter on top of the steak",
                "9":"Optionally let rest a few minutes or serve and enjoy immediately",
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/sous-vide-steak-scaled.jpg"
        },
        {
            "recipeId":2,
            "userId":2,
            "dishName":"Sous Vide Ribs",
            "description":"Tender juicy fall off the bone ribs without having to sit by a smoker all day",
            "ingredients":{
                "1":"Ribs", 
                "2":"Salt",
                "3":"Pepper",
                "4":"Garlic Powder *",
                "5":"Or Rub of choice",
            },
            "instructions":{
                "1":"Set water bath on your Sous Vide machine to medium rare - 145F",
                "2":"Apply generous amount of salt, pepper, and garlic powder or rub to cover ribs",
                "3":"Vacuum seal or place pork chop in a ziplock bag with as much air removed as possible",
                "4":"Leave in bath for 24-48 hours making sure it doesn't float",
                "5":"Remove ribs from bag and pat dry",
                "6":"Turn oven to 250F or put in smoker and leave ribs in for about an hour"
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/sous-vide-ribs-scaled.jpg",
        },
        {
            "recipeId":3,
            "userId":2,
            "dishName":"Spicy Peanut Chicken",
            "description":"May not be super traditional Asian cusine but really tasty",
            "ingredients":{
                "1":"2 lbs Chicken Breast or Thighs", 
                "2":"1 lb Brocolli",
                "3":"6 tbsp Peanut Butter",
                "4":"9 tbsp Soy Sauce",
                "5":"3 tbsp Rice/White Vinegar",
                "6":"Add Cayanne to taste",
                "7":"Garlic Powder to taste",
                "8":"Peanuts *",
                "9":"Green Onion as garnish",
                "10":"2 tbsp Cooking oil",
                "11":"ginger"
            },
            "instructions":{
                "1":"Cut up the chicken and brocolli into bite sized pieces, set brocolli aside",
                "2":"In a bowl mix together, peanut butter, soy sauce, vinegar, garlic powder, cayanne, ginger until even consistancy, set aside",
                "3":"Brown the chicken with the cooking oil of your choice",
                "4":"Once chicken is cooked add in the brocolli and peanuts and stir fry for a few minutes, make sure not to drain any of the juices from the chicken",
                "5":"Add the sauce on top over everything, mix everything then cover for about 5 minutes",
                "6":"Garnish with green onion",
                "7":"Serve over rice, cauliflower rice, noodles or just eat it straight"
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/spicy-peanut-chicken-scaled.jpg",
        },
        {
            "recipeId":4,
            "userId":2,
            "dishName":"Sous Vide Pork Shoulder",
            "description":"Easy Pulled Pork Sous Vide",
            "ingredients":{
                "1":"Pork Shoulder 4+ lbs", 
                "2":"Salt",
                "3":"Pepper",
                "4":"Garlic Powder *",
                "5":"Or rub of your choice"
            },
            "instructions":{
                "1":"Set water bath on your Sous Vide machine to more steak like - 140F, pulled pork- 160F",
                "2":"Apply generous amount of salt, pepper, and garlic powder or rub of your choice covering everything",
                "3":"Vacuum seal or place pork shoulder in a ziplock bag with as much air removed as possible",
                "4":"Leave in bath for 18-36 hours lower temperatures you want to have in the bath towards the higher number, making sure it doesn't float",
                "5":"If done at a low temperature sear the outside like a roast",
                "6":"If done more like pulled pork shred some apart and fry some up in a pan for some crispness",
                "7":"Enjoy however you would like to eat it"
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/sous-vide-pulled-pork-scaled.jpg",
        },
        {
            "recipeId":5,
            "userId":1,
            "dishName":"Sous Vide Pork Shoulder",
            "description":"Easy Pulled Pork Sous Vide",
            "ingredients":{
                "1":"Pork Shoulder 4+ lbs", 
                "2":"Salt",
                "3":"Pepper",
                "4":"Garlic Powder *",
                "5":"Or rub of your choice"
            },
            "instructions":{
                "1":"Set water bath on your Sous Vide machine to more steak like - 140F, pulled pork- 160F",
                "2":"Apply generous amount of salt, pepper, and garlic powder or rub of your choice covering everything",
                "3":"Vacuum seal or place pork shoulder in a ziplock bag with as much air removed as possible",
                "4":"Leave in bath for 18-36 hours lower temperatures you want to have in the bath towards the higher number, making sure it doesn't float",
                "5":"If done at a low temperature sear the outside like a roast",
                "6":"If done more like pulled pork shred some apart and fry some up in a pan for some crispness",
                "7":"Enjoy however you would like to eat it"
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/sous-vide-pulled-pork-scaled.jpg",
        },
        {
            "recipeId":6,
            "userId":3,
            "dishName":"Sous Vide Pork Shoulder",
            "description":"Easy Pulled Pork Sous Vide",
            "ingredients":{
                "1":"Pork Shoulder 4+ lbs", 
                "2":"Salt",
                "3":"Pepper",
                "4":"Garlic Powder *",
                "5":"Or rub of your choice"
            },
            "instructions":{
                "1":"Set water bath on your Sous Vide machine to more steak like - 140F, pulled pork- 160F",
                "2":"Apply generous amount of salt, pepper, and garlic powder or rub of your choice covering everything",
                "3":"Vacuum seal or place pork shoulder in a ziplock bag with as much air removed as possible",
                "4":"Leave in bath for 18-36 hours lower temperatures you want to have in the bath towards the higher number, making sure it doesn't float",
                "5":"If done at a low temperature sear the outside like a roast",
                "6":"If done more like pulled pork shred some apart and fry some up in a pan for some crispness",
                "7":"Enjoy however you would like to eat it"
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/sous-vide-pulled-pork-scaled.jpg",
        },
        {
            "recipeId":7,
            "userId":1,
            "dishName":"Sous Vide Pork Shoulder",
            "description":"Easy Pulled Pork Sous Vide",
            "ingredients":{
                "1":"Pork Shoulder 4+ lbs", 
                "2":"Salt",
                "3":"Pepper",
                "4":"Garlic Powder *",
                "5":"Or rub of your choice"
            },
            "instructions":{
                "1":"Set water bath on your Sous Vide machine to more steak like - 140F, pulled pork- 160F",
                "2":"Apply generous amount of salt, pepper, and garlic powder or rub of your choice covering everything",
                "3":"Vacuum seal or place pork shoulder in a ziplock bag with as much air removed as possible",
                "4":"Leave in bath for 18-36 hours lower temperatures you want to have in the bath towards the higher number, making sure it doesn't float",
                "5":"If done at a low temperature sear the outside like a roast",
                "6":"If done more like pulled pork shred some apart and fry some up in a pan for some crispness",
                "7":"Enjoy however you would like to eat it"
            },
            "image":"https://www.parkerfranzi.com/wp-content/uploads/2020/01/sous-vide-pulled-pork-scaled.jpg",
        },
    ]
}