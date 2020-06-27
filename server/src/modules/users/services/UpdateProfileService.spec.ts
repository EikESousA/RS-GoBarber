import AppError from '@shared/errors/AppError';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		updateProfileService = new UpdateProfileService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('should be able to update the profile!', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const updatedUser = await updateProfileService.execute({
			user_id: user.id,
			name: 'Joh Doe2',
			email: 'johndoe2@example.com',
		});

		expect(updatedUser.name).toBe('Joh Doe2');
		expect(updatedUser.email).toBe('johndoe2@example.com');
	});

	it('should not be able to show the profile from non-existing-user!', async () => {
		await expect(
			updateProfileService.execute({
				user_id: 'non-existing-user-id',
				name: 'Joh Doe',
				email: 'johndoe@example.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to change to another user email!', async () => {
		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const user = await fakeUsersRepository.create({
			name: 'Teste',
			email: 'teste@example.com',
			password: '123456',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Teste',
				email: 'johndoe@example.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update the password!', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const updatedUser = await updateProfileService.execute({
			user_id: user.id,
			name: 'Joh Doe2',
			email: 'johndoe2@example.com',
			old_password: '123456',
			password: '123123',
		});

		expect(updatedUser.name).toBe('Joh Doe2');
		expect(updatedUser.email).toBe('johndoe2@example.com');
		expect(updatedUser.password).toBe('123123');
	});

	it('should be able to update the password without old password!', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Joh Doe2',
				email: 'johndoe2@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update the password with wrong old password!', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Joh Doe2',
				email: 'johndoe2@example.com',
				old_password: 'wrong-old-password',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
