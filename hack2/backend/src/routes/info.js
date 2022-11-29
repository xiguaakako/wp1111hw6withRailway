// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    
    
    // TODO Part I-3-a: find the information to all restaurants
    let typeFil = typeFilter
    let mealFil = mealFilter
    let priceFil = priceFilter
    if (!typeFilter) typeFil = []
    if (!mealFilter) mealFil = []
    if (!priceFil) priceFil = []
    priceFil = priceFil.map(e=>e.length)
    let tagFil = [...typeFil, ...mealFil]
    await Info.find(
        (tagFil.length || priceFil.length)?
        {price: (priceFil.length)?{'$in': priceFil }:{},tag: 
            //'$and':[{'$elemMatch':{'$in':typeFil}},{'$elemMatch':{'$in':mealFil}}]
            (tagFil.length)?{'$in':tagFil}:{}
    
        }
        :{}
    )
    .sort((sortBy === 'distance')?{price: 1 }:{distance:1})
    .exec(function(err, data){
        if (err) res.status(403).send({ message: 'error', contents: err });
        else res.status(200).send({ message: 'success', contents: data });
    })
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter

    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    await Comment.find({restaurantId: id}).exec(
        (err, data) => {
            if (err) {
                res.status(403).send({message:'error', contents: {id}})
            }
            else {
                res.status(200).send({message:'success', contents: {id}})
            }
        }
    )

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}