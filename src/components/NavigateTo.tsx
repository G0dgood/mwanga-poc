import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateTo = ({ path }: { path: string }) => {
	const navigate = useNavigate();

	React.useEffect(() => {
		navigate(path);
	}, [navigate, path]);

	return null;
};

export default NavigateTo;
