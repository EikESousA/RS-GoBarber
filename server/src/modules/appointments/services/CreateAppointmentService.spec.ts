import AppError from '@shared/errors/AppError';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
	it('should be able to create a new appointment!', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();

		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const appointment = await createAppointmentService.execute({
			date: new Date(),
			provider_id: '123123',
		});

		expect(appointment).toHaveProperty('id');
	});

	it('should not be able to create two appointmnets on the same time!', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();

		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const appointmentDate = new Date(2020, 4, 10, 11);

		const appointment = await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: '123123',
		});

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
