const event = require('../models/events')
const attendees = require('../models/attendees')
const booking = require('../models/booking')
const users = require('../models/users')

// Get All Events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.render('EventDetails', { events: events });
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
               attendees: req.body.attendees ? [req.body.attendees] : [],
               comments: req.body.comments ? [req.body.comments] : []
           })
           res.redirect('/')
       } catch (error) {
           console.log(error)
           res.status(500).send("An error occurred while creating the event.")
       }
}

exports.registerEventPage = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(404).send("Event not found")
        res.render('EventRegister', { event: event })
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
            event.attendees.push({
                name: name,
                email: email,
                phone: phone,
                gender: gender
            });
            await event.save();
            console.log(`Event ${event.title} is booked successfully for user ${name}`)

            res.redirect("/")
            return;
        } else {
            res.status(404).send("Event not found")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred while booking the event." + error.message)
    }
}
