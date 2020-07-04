mongoimport--db ny - restaurant collection--file primer_dataset.json--drop

db.restaurants.find({
    cuisine: {
        $in: ["Delicatessen", "American"]
    }
})

db.restaurants.find({
    "borough": "Brooklyn",
    "cuisine": "Hamburgers"
})

// De manière équivalente
db.restaurants.find({
    $and: [{
            "borough": "Brooklyn"
        },
        {
            "cuisine": "Hamburgers"
        }
    ]
})

// 1
db.collection.find().forEach(doc => print(tojson(doc)))

// 2
const myCursor = db.users.find(restriction);
while (myCursor.hasNext()) {
    print(tojson(myCursor.next()));
}

// Combien y a t il de restaurants qui font de la cuisine italienne et qui ont eu un score de 10 au moins ? Affichez également le nom, les scores et les coordonnées GPS de ces restaurants. Ordonnez les résultats par ordre décroissant sur les noms des restaurants.
db.collection.findOne(query, restriction).sort({
    key: 1
}) // 1 for ascending order and -1 for descending

db.restaurants.find({
    cuisine: "Italian",
    "grades": {
        $elemMatch: {
            "score": {
                $gt: 10
            }
        }
    }
}, {
    name: 1,
    grades: 1,
    coord: 1
}).sort({
    name: 1
}).count()

// code ebauche avant partie détaillé
db.restaurants.find({
    cuisine: "Italian"
}).sort({
    name: 1
}).count()

// partie elemMatch
{
    "grades": {
        $elemMatch: {
            "score": {
                $gt: 10
            }
        }
    }
}

db.restaurants
    .find({        cuisine: "Italian",
        "grades.score": {            $lte: 10        }
    }, {        name: 1,
        _id: 0,
        "grades.score": 1
    })
    .sort({
        name: 1
    });