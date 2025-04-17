const express = require('express');
const router = express.Router();
const { 
  getAllServices, 
  getService, 
  createService, 
  updateService, 
  deleteService,
  getFeaturedServices,
  getServicesByCategory,
  searchServices,
  uploadServiceImages,
  resizeServiceImages
} = require('../controllers/serviceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const reviewRouter = require('./reviewRoutes');

// Redireccionar a las rutas de reseñas
router.use('/:serviceId/reviews', reviewRouter);

// Rutas públicas
router.get('/', getAllServices);
router.get('/featured', getFeaturedServices);
router.get('/category/:categoryId', getServicesByCategory);
router.get('/search', searchServices);
router.get('/:id', getService);

// Rutas protegidas
router.use(protect);

// Rutas para proveedores de servicios
router.post('/', 
  restrictTo('provider', 'admin'),
  uploadServiceImages,
  resizeServiceImages,
  createService
);

router.route('/:id')
  .patch(
    restrictTo('provider', 'admin'),
    uploadServiceImages,
    resizeServiceImages,
    updateService
  )
  .delete(
    restrictTo('provider', 'admin'),
    deleteService
  );

module.exports = router; 