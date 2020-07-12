import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProvidersService = new ListProvidersService(
			fakeUsersRepository,
			fakeCacheProvider,
		);
	});

	it('should be able to list providers!', async () => {
		const user_1 = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const user_2 = await fakeUsersRepository.create({
			name: 'John Tre',
			email: 'johntre@example.com',
			password: '123456',
		});

		const loggedUser = await fakeUsersRepository.create({
			name: 'John Qua',
			email: 'johnqua@example.com',
			password: '123456',
		});

		const providers = await listProvidersService.execute({
			user_id: loggedUser.id,
		});

		expect(providers).toEqual([user_1, user_2]);
	});
});
