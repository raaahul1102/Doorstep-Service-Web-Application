import { Router } from "express";
import { getProfile, loginUser, logoutUser, register } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeAvailability, createServices, getApplication, getProviderServices, getServicesByProviderId, outforDelivery, serviceProviderApplication } from "../controllers/serviceProvider.controllers.js";
import {getAllServices, getCategories} from '../controllers/service.controller.js'
// import {upload} from "../middlewares/multer.middleware.js"
import express from 'express'
import  multer  from "multer";
import { AddCategories, AddCity, getAllCity, getAllPendingApplication, removeCategories, removeCities, removeServices, verifyServiceProviderApplication } from "../controllers/admin.controller.js";
import { addOrder, allOrder } from "../controllers/order.controller.js";
// const router=Router()
const router=express.Router();
const storage = multer.diskStorage({
  
    destination: 'uploads/', 
    filename: (req, file, cb) => {
       
      cb(null, file.originalname);
      //console.log("8",file.originalname)
    },
  });
const upload = multer({ storage,limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/register',register)
router.post('/login',loginUser)
router.post('/logout',verifyJWT,logoutUser)
router.post('/application',upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'certifications', maxCount: 1 }]),serviceProviderApplication)
router.get('/categories',getCategories)
router.post('/addcity',AddCity)
router.get('/allcities',getAllCity)
router.get('/services',getAllServices)
router.get('/pendingapplication',getAllPendingApplication);
router.post('/removecity',removeCities);
router.post('/updatestatus',verifyServiceProviderApplication);
router.post('/addcategory',upload.single('image'),AddCategories)
router.post('/addorder',addOrder)
router.post('/orders',allOrder)
router.post('/getprofile',getProfile)
router.post('/getapplication',getApplication)
router.post('/createservices',upload.single('serviceImage'),createServices)
router.post('/getservicebyid',getProviderServices)
router.post('/updateavailability',changeAvailability)
router.post('/removecategories',removeCategories)
router.post('/removeservice',removeServices)
router.post('/getservicesbyproviderid',getServicesByProviderId)
router.post('/outfordelivery',outforDelivery)
//router.get('/allServices',getAllServies)
export default router;




