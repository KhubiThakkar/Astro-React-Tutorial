import { user, users } from "../store/user";
import { useStore } from "@nanostores/react";
import { nanoid } from "nanoid";

export default function UserForm() {
	const $user = useStore(user);
	const $users = useStore(users);

	const createOrUpdateUser = (e) => {
		e.preventDefault();
		if (
			$user._id !== "" &&
			$user.name !== "" &&
			$user.email !== "" &&
			$user.password !== ""
		) {
			users.set(
				$users.map((u) => {
					if (u._id === $user._id) {
						return $user;
					}
					return u;
				})
			);
			user.set({
				_id: "",
				name: "",
				email: "",
				password: "",
			});
		} else if (
			$user._id === "" &&
			$user.name !== "" &&
			$user.email !== "" &&
			$user.password !== ""
		) {
			users.set([
				...$users,
				{
					...$user,
					_id: nanoid(8),
				},
			]);
			user.set({
				_id: "",
				name: "",
				email: "",
				password: "",
			});
		} else {
			alert("Enter Valid data");
		}
	};
	const setUser = (e) => {
		user.set({
			...$user,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<div className="flex justify-center">
				<h1 className="text-5xl my-12">User Form</h1>
			</div>
			<div className="flex justify-center">
				<form onSubmit={createOrUpdateUser} className="w-full max-w-lg">
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Name
							</label>
							<input
								name="name"
								onChange={setUser}
								value={$user.name}
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="Jane Doe"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								Email
							</label>
							<input
								name="email"
								onChange={setUser}
								value={$user.email}
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								type="text"
								placeholder="jane@gmail.com"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-password"
							>
								Password
							</label>
							<input
								name="password"
								onChange={setUser}
								value={$user.password}
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="grid-password"
								type="password"
								placeholder="******************"
							/>
						</div>
					</div>
					<div className="flex justify-center mt-5">
						<button
							type="submit"
							className="items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
						>
							Button
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
