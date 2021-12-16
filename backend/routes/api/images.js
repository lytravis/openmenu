const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Event, Image, Reservation, Review, Type } = require("../../db/models");

const router = express.Router();






module.exports = router;
