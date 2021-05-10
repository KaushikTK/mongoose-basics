const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://127.0.0.1:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true}); // var connection is a promise and the same is used to create a db as well

connection.then(()=>{console.log(`success`)}).catch((err)=>{console.log(`${err}`)}); // connection is successful

// schema : structure of the document and their default values and their validation, etc

const sampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: '1'
    },
    address: {
        plot_no: String,
        street_name: String,
        area: String
    }
})

// let's create a collection called Sample_collection with sampleSchema as the structure of each document
const Sample_collection = new mongoose.model('Sample_collection',sampleSchema)

// insert one document
const create_n_insert = async () =>{
    try{
        const Raju = Sample_collection({
            name:'Raju',
            age: 35,
            address:{
                plot_no: '100/b4',
                street_name: 'Ram nagar',
                area: 'velachery'
            }
        })
        
        const result = await Raju.save();
        console.log(result);

    }catch(err){
        console.log(err);
    }
}
//create_n_insert();

////////////////////////////////////////////////////////////

// insert many documents
const create_n_insertMany = async ()=>{
    try {
        const Ramu = Sample_collection({
            name:'Ramu',
            age: 46,
            address:{
                plot_no: '265',
                street_name: 'bhuvaneshwari nagar',
                area: 'madipakkam'
            }
        })
        const Arjun = Sample_collection({
            name:'Arjun',
            age: 11,
            address:{
                plot_no: '123',
                street_name: 'Gandhi nagar',
                area: 'Thiruvanmiyur'
            }
        })

        const result = await Sample_collection.insertMany([Ramu, Arjun]);
        console.log(result);

    } catch (error) {
        console.log(error)
    }
}

//create_n_insertMany();

////////////////////////////////////////////////////////////

// document retrieval
const getDocument = async ()=>{
    const data = await Sample_collection.find({'address.area':'velachery'},{name:1}).limit(5); // shows only the first 5 names present in each document
    console.log(data);
}

//getDocument();

////////////////////////////////////////////////////////////

// using comparison operators like =,<=,>=, etc
// ref: https://docs.mongodb.com/manual/reference/operator/query-comparison/

const find_using_operators = async ()=>{
    const data = await Sample_collection.find(
        {age: {$gte: 40}},
        {name:1});
    console.log(data);
}

//find_using_operators();

////////////////////////////////////////////////////////////

// using logical operators like and, or, nor, etc
// ref: https://docs.mongodb.com/manual/reference/operator/query-logical/

const find_using_logical_op = async ()=>{
    const data = await Sample_collection.find(
        {$and:[{$or:[{age:19},{'address.area':'Velachery'}]},{name:'Raju'}]}
        )
    console.log(data);
}

//find_using_logical_op();

////////////////////////////////////////////////////////////

/*
// count
const result = await Sample_collection.find().countDocuments();

// sort
const result = await Sample_collection.find().sort({name:1}); // or ({name : -1})
*/

////////////////////////////////////////////////////////////

// update
const update_doc = async (name)=>{
    try {
        const res = await Sample_collection.updateOne({name:name},{$set:{name:'Kaushik TK'}});
        // or use updateMany()
        console.log(res)

    } catch (error) {
        console.log(error)
    }
}

//update_doc('Raju')

////////////////////////////////////////////////////////////

// delete 

const delete_doc = async (name)=>{
    const res = await Sample_collection.deleteOne({name:name}); // or deleteMany()
    console.log(res);
}

//delete_doc('Kaushik TK');