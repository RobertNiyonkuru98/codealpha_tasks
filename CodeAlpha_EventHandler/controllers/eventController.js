const Event = require('../models/events')
const Booking = require('../models/booking')

exports.dashboard = async (req, res) => {
    try {
        // Handle both Guest and Logged-in User
        const user = req.user || null;
        res.render('EventDashboard', { user: user });
    } catch (error) {
        console.log(error)
    }
}
// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.render('EventDetails', { events: events, user: req.user });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching the events.");
    }
}

exports.createEventPage = async (req, res) => {
    try {
        res.render('EventCreation')
    } catch (error) {
        console.log(error)
    }
}

exports.createEvent = async (req, res) => {
   try {

           const eventId = Math.floor(Math.random() * 1000000)

           const isOnline = req.body.isOnline === 'on';

           let price = 0;
           if (req.body.ticketName === 'Standard') price = 10000;
           if (req.body.ticketName === 'VIP') price = 25000;
           if (req.body.ticketName === 'Gold') price = 50000;
           if (req.body.ticketName === 'Free') price = 0;

           const tickets = req.body.ticketName ? [{
               id: "TICK-" + Date.now(),
               name: req.body.ticketName,
               price: price,
               currency: "RWF"
           }] : [];

           const existing = await Event.findOne({ title: req.body.title, date: req.body.date })
           if (existing) {
               return res.status(400).json({ error: 'Event already exists' })
           }
           await Event.create({
               eventId: eventId,
               title: req.body.title,
               description: req.body.description,
               date: req.body.date,
               location: req.body.location,
               isOnline: isOnline,
               category: req.body.category,
               activity: req.body.activity,
               imageUrl: req.body.imageUrl || "https://via.placeholder.com/150",
               organizer: req.body.organizer,
               minParticipants: req.body.minParticipants || 0,
               maxParticipants: req.body.maxParticipants || 0,
               slots: req.body.slots || 0,
               tickets: tickets,
               attendees: [],
               comments: []
           })
           res.redirect('/events')
       } catch (error) {
           console.log(error)
           res.status(500).send("An error occurred while creating the event.")
       }
}

exports.registerEventPage = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).send("Event not found")
        res.render('EventRegister', { event: event, user: req.user })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

exports.registerEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const {name, email, phone, gender} = req.body

        const event = await Event.findById(eventId);

        if (event) {
            // Check if slots are available
            if (event.slots <= 0) {
                return res.status(400).send("Sorry, this event is fully booked!");
            }

            // 1. Create a new Booking record
            await Booking.create({
                userId: req.user._id,
                eventId: event._id,
                status: 'Confirmed'
            })

            // 2. Add user to the Event's attendee list
            event.attendees.push({
                name: req.user.name,
                email: req.user.email,
                phone: String(req.user.mobile_number), // Fix: Force to String to avoid CastError
                gender: req.user.gender
            });

            // 3. Decrement available slots
            event.slots -= 1;

            await event.save();
            
            console.log(`Event ${event.title} is booked successfully for user ${req.user.name}`)
            res.redirect("/bookings")
            return;
        }
 else {
            res.status(500).send("Event not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred while booking the event." + error.message)
    }
}

exports.getEventAttendees = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).send("Event not found")
        
        res.render('EventAttendees', { event: event, user: req.user })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching attendee list")
    }
}
