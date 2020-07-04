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

// 1. Combien y a t il de restaurants qui font de la cuisine italienne et qui ont eu un score de 10 au moins ? Affichez également le nom, les scores et les coordonnées GPS de ces restaurants. Ordonnez les résultats par ordre décroissant sur les noms des restaurants.
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
    _id: 0,
    "grades.score": 1,
    "address.coord": 1
}).sort({
    name: 1
})

// code ebauche avant la partie détaillé
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

// 2. Quels sont les restaurants qui ont un grade A avec un score supérieur ou égal à 20 ? Affichez uniquement les noms et ordonnez les par ordre décroissant. Affichez le nombre de résultat.
db.restaurants.find({
    $and: [{
        "grades.grade": "A"
    }, {
        "grades.score": {
            $gte: 20
        }
    }]
}, {
    _id: 0,
    name: 1
}).sort({
    name: -1
}).count()