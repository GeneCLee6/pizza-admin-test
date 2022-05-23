import React from "react";
import Image from "next/image";

const Logo = (props) => {
	const { ...attrs } = props;

	return (
		<Image
			width={120}
			height={120}
			{...attrs}
			src="/images/logo.png"
			//src="http://www.napoletanapizza.com/image/data/napole_logo.png"
			alt="Logo"
		/>
	);
};

export default Logo;
