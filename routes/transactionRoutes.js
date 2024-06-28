const express = require('express');
const { 
    addTransaction,
    getAllTransaction,
    editTransaction,
    deleteTransaction,
 } = require('../controllers/transactionCTRL');


//router object
const router = express.Router();

//routes
//add transaction POST Method
router.post('/add-transaction', addTransaction);
//edit transaction POST Method
router.post('/edit-transaction', editTransaction);
//delete transaction POST Method
router.post('/delete-transaction', deleteTransaction);

//get transaction
router.post("/get-transaction", getAllTransaction);


module.exports = router;