const Reservation = require('../models/reservations.js')
const Table = require('../models/tables.js')

exports.createReservation = async (req, res) => {
    try {
        const {tableId, reservationDate, guestCount, customerName, phone, email} = req.body;
        const table = await Table.findById(tableId);
        if (!table) {
            res.status(404).json({message: 'Table not found'})
        }
        if (guestCount > table.capacity) {
            return res.status(400).json({message: `This table only seats ${table.capacity} people.`});
        }
        const existingReservation = await Reservation.findOne({tableId, reservationDate, status: 'confirmed'});
        if (existingReservation) {
            return res.status(400).json({message: 'Table is already reserved at the selected time.'})
        }

        const newReservation = new Reservation({
            tableId,
            reservationDate,
            guestCount,
            customerName,
            phone,
            email,
            status: 'confirmed'
        })
        await newReservation.save()

        await Table.findByIdAndUpdate(tableId, {status: 'reserved'});
        res.status(201).json({message: 'Reservation created successfully', reservation: newReservation})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}