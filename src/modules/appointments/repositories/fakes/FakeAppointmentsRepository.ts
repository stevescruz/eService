import { v4 as uuidv4 } from 'uuid';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsByProviderAndMonthDTO from '@modules/appointments/dtos/IFindAllAppointmentsByProviderAndMonthDTO';
import IFindAllAppointmentsByProviderAndDayDTO from '@modules/appointments/dtos/IFindAllAppointmentsByProviderAndDayDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllByProviderAndMonth({
    provider_id,
    year,
    month,
  }: IFindAllAppointmentsByProviderAndMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month,
    );
    return appointments;
  }

  public async findAllByProviderAndDay({
    provider_id,
    year,
    month,
    day,
  }: IFindAllAppointmentsByProviderAndDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuidv4(),
      provider_id,
      user_id,
      date,
    } as Appointment);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
