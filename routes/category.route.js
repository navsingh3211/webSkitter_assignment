import express from 'express';
import {
  createCategory,
  categoryListing
} from '../controllers/category.controller.js';

const router = express.Router();

router.post(
  '/create-category',createCategory
);
router.get(
  '/category-listing',categoryListing
);


export default router;