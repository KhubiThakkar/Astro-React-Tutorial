import { user, users } from "../store/user";
import { useStore } from "@nanostores/react";
export default function UserTable() {
	const $user = useStore(user);
	const $users = useStore(users);
	const setUser = (u) => {
		user.set(u);
	};
	const deleteUser = (id) => {
		users.set(
			$users.filter((u) => {
				if (u._id !== id) {
					return u;
				}
			})
		);
	};
	return (
		<>
			<div className="flex justify-center">
				<h1 className="text-5xl my-12">User Table</h1>
			</div>
			<div className="flex justify-center">
				<table className="table-fixed">
					<thead>
						<tr>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">Password</th>
							<th className="px-4 py-2">Edit</th>
							<th className="px-4 py-2">Delete</th>
						</tr>
					</thead>
					<tbody>
						{$users.map((u) => {
							return (
								<tr key={u._id}>
									<td className="border px-4 py-2">{u.name}</td>
									<td className="border px-4 py-2">{u.email}</td>
									<td className="border px-4 py-2">{u.password}</td>
									<td className="border px-4 py-2">
										<button
											onClick={() => setUser(u)}
											type="edit"
											className="items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
										>
											Edit
										</button>
									</td>
									<td className="border px-4 py-2">
										<button
											onClick={() => deleteUser(u._id)}
											type="delete"
											className="items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
