const Booking = require('../models/booking')

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({userId: req.user._id}).populate('eventId');
        res.render('EventBooked', { user: req.user, bookings: bookings });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching bookings.");
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.redirect('/bookings')
    } catch (error) {
        console.log(error);
        res.status(500).send("Could not cancel booking.");
    }
}