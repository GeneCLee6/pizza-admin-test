import React from "react";
import { Avatar } from "antd";

const AvatarCpn = (props) => {
	const { src, fullName, style, className, size, vip, ...attr } = props;

	return (
		<Avatar
			{...attr}
			size={size}
			className={className}
			src={src || "https://i.pravatar.cc/150?img=37"}
			style={{
				border: "1px solid rgba(228, 228, 228, 0.6)",
				...style,
			}}
		>
			{!src ? (
				<div style={{ fontSize: size / 3, lineHeight: size + "px" }}>
					{fullName?.slice(0, 2)}
				</div>
			) : (
				""
			)}
		</Avatar>
	);
};

export default AvatarCpn;
