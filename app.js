const prompt = require('prompt-sync')();



const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');



const Customer = require("./models/Customer")

async function connect(){
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('welcome User you are Connected to MongoDB')

    const username = prompt('What is your name? ');
    console.log(`Your name is ${username}, so how can I help you`);




await runCommands(showList())

//   await mongoose.disconnect();
//   console.log('Disconnected from MongoDB');

//   process.exit();
}

async function createCustomer(customerName,customerAge) {
    const createdCustomer = await Customer.create({
        name:customerName,
        age: customerAge      
    })  
    console.log("created customer: ", createdCustomer)  
}

async function showCustomer() {
    const existedCustomer = await Customer.find({
    
    })
    existedCustomer.forEach((e,i)=>{
        console.log(`${i+1}. id: ${e._id} -- Name: ${e.name}, Age: ${e.age}`)
    }) 
    return existedCustomer
}

async function updateCutomer(id, updatedName, updatedAge){
    const updatedCustomer = await Customer.findByIdAndUpdate(id, {
        name: updatedName,
        age: updatedAge
    })
    console.log(updatedCustomer)
}

async function deleteCustomer(id) {
    const deletedCustomer = await Customer.findByIdAndDelete(id)
    console.log(deletedCustomer)    
}

function showList(){
    console.log("  1. Create a customer")
    console.log("  2. View all customers")
    console.log("  3. Update a customer")
    console.log("  4. Delete a customer")
    console.log("  5. quit")
    const actiontoRun = prompt('Choose the Number of action to run: ')
    return actiontoRun
}

async function runCommands(actiontoRun) {
    switch(actiontoRun){
        case "1":
            console.log("  1. Creating a customer:")
            const customerName = prompt('What is the created customer name? ');
            const customerAge = prompt(`What is ${customerName} age? `);
            await createCustomer(customerName,customerAge)
            await runCommands(showList())
            break

        case "2":
            console.log("  2. View all customers:")
            await showCustomer()
            await runCommands(showList())
            break

        case "3":
            console.log("  3. Update a customer:")
            await showCustomer()
            const idtoUpdate = prompt('Copy and paste the id of the customer you would like to update here: ')
            const newName = prompt('What is the customers new name? ')
            const newAge = prompt('What is the customers new age? ')
            await updateCutomer(idtoUpdate,newName,newAge)
            await runCommands(showList())
            break

        case "4":
            console.log("  4. Delete a customer")
            await showCustomer()
            const idtoDelete = prompt('Copy and paste the id of the customer you would like to delete here: ')
            await deleteCustomer(idtoDelete)
            await runCommands(showList())
            break

        case "5":
            console.log("  5. quit")
            mongoose.connection.close()
            console.log("exiting...")
        }
    
}

connect()