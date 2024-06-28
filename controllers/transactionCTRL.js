const transactionModel = require('../models/transactionModel');
const moment= require('moment');

const getAllTransaction =async(req,res)=>{
    try{
        const {frequency, selectedDate, type} = req.body;
        if(frequency==='all'){
            const transactions=await transactionModel.find();
            res.status(200).json(
                transactions
            )
        }
        else{
            const transactions = await transactionModel.find({
                ...(frequency !== 'custom'? {
                    date:{
                    $gt: moment().subtract(Number(frequency), 'days').toDate(),
                },
                }:{
                    date: {
                        $gte : selectedDate[0],
                        $lte : selectedDate[1]
                    }
                }) ,
                ...(type !=='all' && {type}),
                userid:req.body.userid})
                
            res.status(200).json(transactions);
        }
        
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteTransaction =async(req,res)=>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction Deleted!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const editTransaction =async(req,res)=>{
    try{
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload);
        res.status(200).send('Edit Successfully');
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const addTransaction =async(req,res)=>{
    try{
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send('Transaction Created')
    }catch (error){
        console.log(error);
        res.status(500).json(error);

    }
}

module.exports ={getAllTransaction, addTransaction,editTransaction,deleteTransaction};