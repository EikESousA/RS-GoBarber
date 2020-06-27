import AppError from '@shared/errors/AppError';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeCacheProvider = new FakeCacheProvider();

		listProviderAppointmentsService = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,
			fakeCacheProvider,
		);
	});

	it('should be able to list the appointments on a specific day!', async () => {
		const appointment_1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider',
			user_id: 'user',
			date: new Date(2020, 4, 20, 14, 0, 0),
		});
		const appointment_2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider',
			user_id: 'user',
			date: new Date(2020, 4, 20, 15, 0, 0),
		});

		const appointments = await listProviderAppointmentsService.execute({
			provider_id: 'provider',
			day: 20,
			year: 2020,
			month: 5,
		});

		expect(appointments).toEqual([appointment_1, appointment_2]);
	});
});
