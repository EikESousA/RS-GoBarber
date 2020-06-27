import AppError from '@shared/errors/AppError';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeNotificationsRepository = new FakeNotificationsRepository();
		fakeCacheProvider = new FakeCacheProvider();
		createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
			fakeNotificationsRepository,
			fakeCacheProvider,
		);
	});

	it('should be able to create a new appointment!', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		const appointment = await createAppointmentService.execute({
			date: new Date(2020, 4, 10, 13),
			user_id: 'user-id',
			provider_id: 'provider-id',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('provider-id');
	});

	it('should not be able to create two appointment on the same time!', async () => {
		const appointmentDate = new Date(2021, 4, 10, 11);

		await createAppointmentService.execute({
			date: appointmentDate,
			user_id: 'user-id',
			provider_id: 'provider-id',
		});

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				user_id: 'user-id',
				provider_id: 'provider-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment on a past date!', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 10, 11),
				user_id: 'user-id',
				provider_id: 'provider-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointmnet with same user as provider!', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 10, 13),
				user_id: 'user-id',
				provider_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointmnet befor 8am and after 5pm!', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 11, 7),
				user_id: 'user-id',
				provider_id: 'provider-id',
			}),
		).rejects.toBeInstanceOf(AppError);

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 11, 18),
				user_id: 'user-id',
				provider_id: 'provider-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
