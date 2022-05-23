import React from "react";
import Head from "src/components/Head";

//import Users from "src/containers/UsersList";
import Categories from "../components/Categories";

//import wrapperStore from "src/redux";

//import { getList } from "src/redux/actions/users";

// export const getServerSideProps = wrapperStore.getServerSideProps(
// 	(store) => async (context) => {
// 		const users = await store.dispatch(await getList());

// 		return {
// 			props: {
// 				userList: users,
// 			},
// 		};
// 	}
// );

const CategoryPage = () => {
	return (
		<>
			<Head title="分类管理" />
			<Categories />
		</>
	);
};

export default CategoryPage;
