import React from 'react'
import { getUserPrivileges } from '../../../../hooks/auth';
import AgentDashboard from './AgentDashboard';
import Dashboard from './Dashboard';

const DashboardHub = () => {
	const { isAgent } = getUserPrivileges();

	return (
		<div>
			{isAgent ? <AgentDashboard /> : <Dashboard />}
		</div>
	)
}

export default DashboardHub
