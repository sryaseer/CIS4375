const express = require('express'),
router = new express.Router()

//post /account        create
//get /acount          retrieve
//get /account/:id      retrieve
//put /account/:id      update
//delete /account/:id   delete

router.post('/', async (req,res) => {
  console.log('in home :)')

})



module.exports = router
