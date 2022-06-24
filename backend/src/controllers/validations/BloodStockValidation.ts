import { body } from 'express-validator';

export const BloodStockValidation = [
  // bloodType validation
  body('bloodType')
    .isIn(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .withMessage('Invalid blood type value'),
  // bankCity validation
  body('bankCity')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('City must be alphabets only.')
    .isLength({ max: 50 })
    .withMessage('City must be 50 letters max.'),
  // expirationDate validation
  body('expirationDate').not().isDate().withMessage('Invalid date.'),
  // TODO donorId validation
  body('donorId').optional().isInt().withMessage('Invalid id'),

  // bloodVirusTest validation
  body('bloodVirusTest')
    .isIn(['positive', 'negative'])
    .withMessage('Invalid blood virus test'),
];