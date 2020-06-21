import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
	it('should be able to create a new user!', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create a new user with same email from another!', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await expect(
			createUserService.execute({
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
