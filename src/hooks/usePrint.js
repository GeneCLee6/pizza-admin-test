import { message } from "antd";
import { requestPrintOrder } from "src/services/orders";

const printKey = "printOrder";

const usePrint = () => {
	const handlePrint = async (_id, type) => {
		message.loading({ content: "正在打印...", printKey });
		try {
			const res = await requestPrintOrder(_id, type);
			if (res?.code === 999) {
				message.error({
					content: "打印机网络不稳定，请稍后再试",
					printKey,
					duration: 2,
				});
				return;
			}
			message.success({
				content: "打印成功",
				printKey,
				duration: 2,
			});
		} catch (error) {
			message.error({
				content: error?.response?.data?.message,
				printKey,
				duration: 2,
			});
		}
	};

	return {
		handlePrint,
	};
};
export default usePrint;
