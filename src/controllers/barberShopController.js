const BarberShop = require('../models/barberShop');


exports.createBarberShop = async (req, res) => {
  const { name, url } = req.body;
  try {
    const ownerId = req.user.id;
    const barberShop = new BarberShop({ name, ownerId, url, barbers: [] });
    await barberShop.save();
    res.status(201).json(barberShop);
  } catch (error) {
    res.status(400).json({ message: 'Error creating barber shop', error });
  }
};

exports.getBarberShop = async (req, res) => {
  try {
    const { url } = req.params;
    const barberShop = await BarberShop.findOne({ url: url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });
    res.json(barberShop);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving barber shop', error });
  }
};

exports.postCreateBarber = async (req, res) => {
  try {
    const { url } = req.params;
    const { barberName } = req.body;

    if (!barberName) {
      return res.status(400).json({ message: 'Barber name is required' });
    }

    const barberShop = await BarberShop.findOne({ url: url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });

    const existingBarber = barberShop.barbers.find((b) => b.name === barberName);
    if (existingBarber) {
      return res.status(400).json({ message: 'Barber already exists' });
    }

    barberShop.barbers.push({ name: barberName, schedule: [] });
    await barberShop.save();
    res.status(201).json({ message: 'Barber created successfully!', barbers: barberShop.barbers });
  } catch (error) {
    console.error('Error creating barber:', error);
    res.status(500).json({ message: 'Error creating barber', error: error.message });
  }
};

exports.postCreateAppointments = async (req, res) => {
  try {
    const { url } = req.params;
    const { barberName, client, dateTime, serviceType } = req.body;

    if (!barberName || !client || !client.name || !client.phone || !dateTime || !serviceType) {
      return res.status(400).json({ message: 'Incomplete data for creating appointment' });
    }

    const barberShop = await BarberShop.findOne({ url: url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });

    const barber = barberShop.barbers.find((b) => b.name === barberName);
    if (!barber) return res.status(404).json({ message: 'Barber not found' });

    barber.schedule.push({ client, dateTime, serviceType });
    await barberShop.save();
    res.status(201).json({ message: 'Appointment created successfully!', schedule: barber.schedule });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

exports.getBarbers = async (req, res) => {
  try {
    const { url } = req.params;
    const barberShop = await BarberShop.findOne({ url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });

    const barbers = barberShop.barbers.map((barber) => ({
      id: barber._id,
      name: barber.name,
    }));

    res.status(200).json({ barbers });
  } catch (error) {
    console.error('Error retrieving barbers:', error);
    res.status(500).json({ message: 'Error retrieving barbers', error: error.message });
  }
};

exports.getBarberSchedule = async (req, res) => {
  try {
    const { url, barberId } = req.params;
    const barberShop = await BarberShop.findOne({ url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });

    const barber = barberShop.barbers.find(b => b._id.toString() === barberId);
    if (!barber) return res.status(404).json({ message: 'Barber not found' });

    const availableSlots = barber.schedule
      .filter((appointment) => !appointment.client)
      .map((slot) => ({
        dateTime: slot.dateTime,
        serviceType: slot.serviceType,
      }));

    res.status(200).json({ barber: barber.name, availableSlots });
  } catch (error) {
    console.error('Error retrieving barber schedule:', error);
    res.status(500).json({ message: 'Error retrieving schedule', error: error.message });
  }
};

exports.putUpdateAppointment = async (req, res) => {
  try {
    const { url, barberId, appointmentId } = req.params;
    const { client, dateTime, serviceType } = req.body;

    if (!client || !client.name || !client.phone || !dateTime || !serviceType) {
      return res.status(400).json({ message: 'Incomplete data for updating appointment' });
    }

    const barberShop = await BarberShop.findOne({ url: url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });

    const barber = barberShop.barbers.find((b) => b._id.toString() === barberId);
    if (!barber) return res.status(404).json({ message: 'Barber not found' });

    const appointment = barber.schedule.find((app) => app._id.toString() === appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Atualiza os dados do agendamento
    appointment.client = client;
    appointment.dateTime = dateTime;
    appointment.serviceType = serviceType;

    await barberShop.save();
    res.status(200).json({ message: 'Appointment updated successfully!', schedule: barber.schedule });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { url, barberId, appointmentId } = req.params;

    const barberShop = await BarberShop.findOne({ url: url });
    if (!barberShop) return res.status(404).json({ message: 'Barber shop not found' });

    const barber = barberShop.barbers.find((b) => b._id.toString() === barberId);
    if (!barber) return res.status(404).json({ message: 'Barber not found' });

    const appointmentIndex = barber.schedule.findIndex((app) => app._id.toString() === appointmentId);
    if (appointmentIndex === -1) return res.status(404).json({ message: 'Appointment not found' });

    // Deleta o agendamento
    barber.schedule.splice(appointmentIndex, 1);

    await barberShop.save();
    res.status(200).json({ message: 'Appointment deleted successfully!', schedule: barber.schedule });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};
